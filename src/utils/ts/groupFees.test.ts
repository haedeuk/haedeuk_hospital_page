import { describe, expect, it } from 'vitest';
import type { Fee } from '@/types/domain';
import { groupFees, latestUpdatedAt } from './groupFees';

const fee = (overrides: Partial<Fee>): Fee => ({
  id: crypto.randomUUID(),
  category: '행위료',
  name: '항목',
  amount: 1000,
  pricePrefix: null,
  sortOrder: 0,
  updatedAt: '2026-10-01T00:00:00Z',
  ...overrides,
});

describe('groupFees', () => {
  it('고지 양식 순서로 묶고 대분류 안에서는 sortOrder 로 정렬한다', () => {
    const groups = groupFees([
      fee({ category: '제증명수수료', name: '소견서' }),
      fee({ category: '행위료', name: '나', sortOrder: 2 }),
      fee({ category: '행위료', name: '가', sortOrder: 1 }),
    ]);

    expect(groups.map((group) => group.category)).toEqual(['행위료', '제증명수수료']);
    expect(groups[0].fees.map((item) => item.name)).toEqual(['가', '나']);
  });

  it('항목이 없는 대분류는 빠진다', () => {
    expect(groupFees([])).toEqual([]);
  });
});

describe('latestUpdatedAt', () => {
  it('가장 최근 수정 시각을 돌려준다', () => {
    const latest = latestUpdatedAt([
      { updatedAt: '2026-10-01T00:00:00Z' },
      { updatedAt: '2026-10-15T09:00:00Z' },
    ]);
    expect(latest?.toISOString()).toBe('2026-10-15T09:00:00.000Z');
  });

  it('빈 목록이면 null', () => {
    expect(latestUpdatedAt([])).toBeNull();
  });
});
