import { describe, expect, it } from 'vitest';
import { formatClock, formatDate } from './formatDate';

describe('formatDate', () => {
  it('한국 시간 기준 YYYY.MM.DD', () => {
    // UTC 16:00 은 한국 시간으로 다음 날 01:00
    expect(formatDate(new Date('2026-10-15T16:00:00Z'))).toBe('2026.10.16');
  });
});

describe('formatClock', () => {
  it.each([
    ['08:00', '오전 8시'],
    ['12:00', '오후 12시'],
    ['13:30', '오후 1시 30분'],
    ['21:00', '오후 9시'],
    ['00:00', '오전 12시'],
  ])('%s → %s', (input, expected) => {
    expect(formatClock(input)).toBe(expected);
  });
});
