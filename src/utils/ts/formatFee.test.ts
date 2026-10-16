import { describe, expect, it } from 'vitest';
import { formatFee } from './formatFee';

describe('formatFee', () => {
  it('금액에 천 단위 쉼표와 원을 붙인다', () => {
    expect(formatFee(250000, null)).toBe('250,000원');
  });

  it('접두어가 있으면 앞에 붙인다', () => {
    expect(formatFee(1000, '장당')).toBe('장당 1,000원');
  });

  it('금액이 없으면 - 만 보여 준다 (기존 사이트의 "-원" 버그)', () => {
    expect(formatFee(null, null)).toBe('-');
    expect(formatFee(null, '장당')).toBe('-');
  });

  it('0원도 금액으로 표시한다', () => {
    expect(formatFee(0, null)).toBe('0원');
  });
});
