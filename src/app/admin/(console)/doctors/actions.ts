'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { prisma } from '@/lib/prisma';
import { DOCTOR_PHOTO_BUCKET } from '@/lib/supabase/env';
import { doctorSchema, validatePhoto } from '@/lib/validation/doctor';
import type { ServerSupabase } from '@/lib/supabase/server';
import type { FormState } from '@/types/formState';

const SAVE_FAILED: FormState = { status: 'error', message: '저장하지 못했습니다. 잠시 후 다시 시도해 주세요.' };
const idSchema = z.uuid();

// 의사 정보가 보이는 공개 페이지를 즉시 다시 만든다.
function revalidateDoctorPages() {
  ['/', '/doctors', '/sitemap.xml'].forEach((path) => revalidatePath(path));
  revalidatePath('/admin', 'layout');
}

function photoExtension(type: string) {
  if (type === 'image/png') return 'png';
  if (type === 'image/webp') return 'webp';
  return 'jpg';
}

async function removePhoto(supabase: ServerSupabase, path: string | null) {
  if (!path) return;
  // 파일 정리 실패는 저장 결과를 바꾸지 않는다 (DB 는 이미 새 경로를 가리킨다).
  await supabase.storage.from(DOCTOR_PHOTO_BUCKET).remove([path]);
}

export async function saveDoctor(_prev: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const parsed = doctorSchema.safeParse({
    name: formData.get('name') ?? '',
    position: formData.get('position') ?? '',
    careers: formData.get('careers') ?? '',
    isPublished: formData.get('isPublished') === 'on',
  });
  if (!parsed.success) {
    return { status: 'error', message: '입력값을 확인해 주세요.', fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const photo = validatePhoto(formData.get('photo'));
  if (photo.error) return { status: 'error', message: photo.error, fieldErrors: { photo: [photo.error] } };

  const idValue = formData.get('id');
  const isNew = typeof idValue !== 'string' || idValue === '';
  let doctorId: string;
  let previousPhotoPath: string | null = null;

  try {
    if (isNew) {
      // 새 의사는 목록 맨 뒤에 붙인다.
      const last = await prisma.doctor.aggregate({ _max: { sortOrder: true } });
      const created = await prisma.doctor.create({
        data: { ...parsed.data, sortOrder: (last._max.sortOrder ?? 0) + 1 },
        select: { id: true },
      });
      doctorId = created.id;
    } else {
      if (!idSchema.safeParse(idValue).success) return SAVE_FAILED;
      const current = await prisma.doctor.findUnique({ where: { id: idValue }, select: { photoPath: true } });
      if (!current) return { status: 'error', message: '이미 삭제된 의사입니다. 목록에서 다시 확인해 주세요.' };

      doctorId = idValue;
      previousPhotoPath = current.photoPath;
      await prisma.doctor.update({ where: { id: doctorId }, data: parsed.data });
    }
  } catch {
    return SAVE_FAILED;
  }

  if (photo.file) {
    const path = `${doctorId}/${Date.now()}.${photoExtension(photo.file.type)}`;
    const { error: uploadError } = await supabase.storage
      .from(DOCTOR_PHOTO_BUCKET)
      .upload(path, photo.file, { contentType: photo.file.type, cacheControl: '31536000' });

    if (uploadError) {
      revalidateDoctorPages();
      // 새 의사는 이미 만들어졌다. 다시 제출하면 중복이 생기므로 수정 화면으로 보낸다.
      if (isNew) redirect(`/admin/doctors/${doctorId}?photo=failed`);
      return { status: 'error', message: '정보는 저장했지만 사진을 올리지 못했습니다. 사진만 다시 올려 주세요.' };
    }

    await prisma.doctor.update({ where: { id: doctorId }, data: { photoPath: path } });
    await removePhoto(supabase, previousPhotoPath);
  } else if (formData.get('removePhoto') === 'on' && previousPhotoPath) {
    await prisma.doctor.update({ where: { id: doctorId }, data: { photoPath: null } });
    await removePhoto(supabase, previousPhotoPath);
  }

  revalidateDoctorPages();
  redirect('/admin/doctors?saved=1');
}

export async function deleteDoctor(_prev: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const id = idSchema.safeParse(formData.get('id'));
  if (!id.success) return { status: 'error', message: '삭제할 의사를 찾지 못했습니다.' };

  try {
    const deleted = await prisma.doctor.delete({ where: { id: id.data }, select: { photoPath: true } });
    await removePhoto(supabase, deleted.photoPath);
  } catch {
    return { status: 'error', message: '삭제하지 못했습니다. 이미 삭제됐는지 목록을 새로고침해 확인해 주세요.' };
  }

  revalidateDoctorPages();
  return { status: 'success', message: '삭제했습니다.' };
}

export async function setDoctorPublished(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = idSchema.safeParse(formData.get('id'));
  const isPublished = formData.get('isPublished') === 'true';
  if (!id.success) return { status: 'error', message: '노출 상태를 바꾸지 못했습니다.' };

  try {
    await prisma.doctor.update({ where: { id: id.data }, data: { isPublished } });
  } catch {
    return { status: 'error', message: '노출 상태를 바꾸지 못했습니다.' };
  }

  revalidateDoctorPages();
  return { status: 'success', message: isPublished ? '홈페이지에 노출합니다.' : '홈페이지에서 숨겼습니다.' };
}

// 이웃한 의사와 자리를 바꾸고 순서를 1부터 다시 매긴다.
export async function moveDoctor(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const direction = formData.get('direction') === 'up' ? -1 : 1;

  try {
    await prisma.$transaction(async (tx) => {
      const rows = await tx.doctor.findMany({
        select: { id: true, sortOrder: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      });
      const ids = rows.map((row) => row.id);
      const index = ids.indexOf(id);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= ids.length) return;

      [ids[index], ids[target]] = [ids[target], ids[index]];
      await Promise.all(
        ids
          .map((rowId, order) => ({ rowId, sortOrder: order + 1 }))
          .filter(({ rowId, sortOrder }) => rows.find((row) => row.id === rowId)?.sortOrder !== sortOrder)
          .map(({ rowId, sortOrder }) => tx.doctor.update({ where: { id: rowId }, data: { sortOrder } })),
      );
    });
  } catch {
    return { status: 'error', message: '순서를 바꾸지 못했습니다.' };
  }

  revalidateDoctorPages();
  return { status: 'success' };
}
