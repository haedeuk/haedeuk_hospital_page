import 'server-only';
import { cache } from 'react';
import { z } from 'zod';
import { withRetry } from '@/lib/db/retry';
import { prisma } from '@/lib/prisma';
import { getDoctorPhotoUrl } from '@/lib/supabase/env';
import type { Doctor as DoctorRow } from '@/generated/prisma/client';
import type { Doctor } from '@/types/domain';

const ORDER = [{ sortOrder: 'asc' as const }, { createdAt: 'asc' as const }];

function toDoctor(row: DoctorRow): Doctor {
  return {
    id: row.id,
    name: row.name,
    position: row.position,
    careers: row.careers,
    photoPath: row.photoPath,
    photoUrl: getDoctorPhotoUrl(row.photoPath),
    sortOrder: row.sortOrder,
    isPublished: row.isPublished,
    updatedAt: row.updatedAt.toISOString(),
  };
}

// cache: 한 요청 안에서 같은 조회를 한 번만 한다 (예: 메타데이터와 목록이 같은 의사 목록을 읽을 때)
// withRetry: 풀러 연결이 순간적으로 끊기면 한 번 다시 묻는다

// 공개 화면: 노출 중인 의사만, 관리자가 정한 순서대로
export const getPublishedDoctors = cache(async (): Promise<Doctor[]> => {
  const rows = await withRetry(() => prisma.doctor.findMany({ where: { isPublished: true }, orderBy: ORDER }));
  return rows.map(toDoctor);
});

// 관리자 화면: 숨긴 의사까지
export const listDoctors = cache(async (): Promise<Doctor[]> => {
  const rows = await withRetry(() => prisma.doctor.findMany({ orderBy: ORDER }));
  return rows.map(toDoctor);
});

export const getDoctor = cache(async (id: string): Promise<Doctor | null> => {
  // 주소창에 아무 문자열이나 넣으면 uuid 캐스팅 오류가 나므로 먼저 거른다.
  if (!z.uuid().safeParse(id).success) return null;

  const row = await withRetry(() => prisma.doctor.findUnique({ where: { id } }));
  return row ? toDoctor(row) : null;
});
