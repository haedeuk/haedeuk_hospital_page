import 'server-only';
import { cache } from 'react';
import { withRetry } from '@/lib/db/retry';
import { prisma } from '@/lib/prisma';
import type { FeeCategory } from '@/constants/fees';
import type { Fee as FeeRow } from '@/generated/prisma/client';
import type { Fee } from '@/types/domain';

function toFee(row: FeeRow): Fee {
  return {
    id: row.id,
    // DB 의 CHECK 제약이 세 값만 허용한다
    category: row.category as FeeCategory,
    name: row.name,
    amount: row.amount,
    pricePrefix: row.pricePrefix,
    sortOrder: row.sortOrder,
    updatedAt: row.updatedAt.toISOString(),
  };
}

// 한 요청 안에서는 한 번만 읽고(cache), 순간적인 연결 끊김은 한 번 다시 묻는다(withRetry)
export const getFees = cache(async (): Promise<Fee[]> => {
  const rows = await withRetry(() => prisma.fee.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] }));
  return rows.map(toFee);
});
