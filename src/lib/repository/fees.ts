import 'server-only';
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

export async function getFees(): Promise<Fee[]> {
  const rows = await prisma.fee.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] });
  return rows.map(toFee);
}
