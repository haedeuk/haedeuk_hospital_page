import { FEE_CATEGORIES } from '@/constants/fees';
import type { Fee, FeeGroup } from '@/types/domain';

// 대분류 순서는 고지 양식 순서(FEE_CATEGORIES)를 따르고, 항목이 없는 대분류는 뺀다.
export function groupFees(fees: readonly Fee[]): FeeGroup[] {
  return FEE_CATEGORIES.map((category) => ({
    category,
    fees: fees
      .filter((fee) => fee.category === category)
      .sort((a, b) => a.sortOrder - b.sortOrder),
  })).filter((group) => group.fees.length > 0);
}

export function latestUpdatedAt(items: readonly { updatedAt: string }[]): Date | null {
  if (items.length === 0) return null;

  return new Date(Math.max(...items.map((item) => new Date(item.updatedAt).getTime())));
}
