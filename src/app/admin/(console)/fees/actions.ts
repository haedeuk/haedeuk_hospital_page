'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth/requireAdmin';
import { prisma } from '@/lib/prisma';
import { feeSchema } from '@/lib/validation/fee';
import type { FormState } from '@/types/formState';

const idSchema = z.uuid();

function revalidateFeePages() {
  ['/fees', '/sitemap.xml'].forEach((path) => revalidatePath(path));
  revalidatePath('/admin', 'layout');
}

// 새 항목은 대분류 맨 뒤에 붙고, id 가 있으면 수정한다.
export async function saveFee(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();

  const parsed = feeSchema.safeParse({
    category: formData.get('category'),
    name: formData.get('name') ?? '',
    amount: formData.get('amount') ?? '',
    pricePrefix: formData.get('pricePrefix') ?? '',
  });
  if (!parsed.success) {
    return { status: 'error', message: '입력값을 확인해 주세요.', fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const id = formData.get('id');
  try {
    if (typeof id === 'string' && id) {
      if (!idSchema.safeParse(id).success) throw new Error('잘못된 id');
      await prisma.fee.update({ where: { id }, data: parsed.data });
    } else {
      const last = await prisma.fee.aggregate({
        where: { category: parsed.data.category },
        _max: { sortOrder: true },
      });
      await prisma.fee.create({ data: { ...parsed.data, sortOrder: (last._max.sortOrder ?? 0) + 1 } });
    }
  } catch {
    return { status: 'error', message: '저장하지 못했습니다. 잠시 후 다시 시도해 주세요.' };
  }

  revalidateFeePages();
  return { status: 'success', message: '저장했습니다.' };
}

export async function deleteFee(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = idSchema.safeParse(formData.get('id'));

  try {
    if (!id.success) throw new Error('잘못된 id');
    await prisma.fee.delete({ where: { id: id.data } });
  } catch {
    return { status: 'error', message: '삭제하지 못했습니다. 이미 삭제됐는지 새로고침해 확인해 주세요.' };
  }

  revalidateFeePages();
  return { status: 'success', message: '삭제했습니다.' };
}

// 같은 대분류 안에서 이웃 항목과 자리를 바꾼다.
export async function moveFee(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const id = String(formData.get('id') ?? '');
  const direction = formData.get('direction') === 'up' ? -1 : 1;

  try {
    await prisma.$transaction(async (tx) => {
      const current = await tx.fee.findUnique({ where: { id }, select: { category: true } });
      if (!current) return;

      const rows = await tx.fee.findMany({
        where: { category: current.category },
        select: { id: true, sortOrder: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      });
      const ids = rows.map((row) => row.id);
      const index = ids.indexOf(id);
      const target = index + direction;
      if (target < 0 || target >= ids.length) return;

      [ids[index], ids[target]] = [ids[target], ids[index]];
      await Promise.all(
        ids
          .map((rowId, order) => ({ rowId, sortOrder: order + 1 }))
          .filter(({ rowId, sortOrder }) => rows.find((row) => row.id === rowId)?.sortOrder !== sortOrder)
          .map(({ rowId, sortOrder }) => tx.fee.update({ where: { id: rowId }, data: { sortOrder } })),
      );
    });
  } catch {
    return { status: 'error', message: '순서를 바꾸지 못했습니다.' };
  }

  revalidateFeePages();
  return { status: 'success' };
}
