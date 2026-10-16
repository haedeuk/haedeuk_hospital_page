import { describe, expect, it } from 'vitest';
import { feeSchema } from './fee';

const base = { category: '행위료', name: '경옥고', amount: '150,000', pricePrefix: '' };

describe('feeSchema', () => {
  it('쉼표·원·공백을 지우고 숫자로 바꾼다', () => {
    expect(feeSchema.parse({ ...base, amount: ' 150,000원 ' }).amount).toBe(150000);
  });

  it('금액을 비우면 null (화면에 - 표시)', () => {
    expect(feeSchema.parse({ ...base, amount: '' }).amount).toBeNull();
  });

  it('접두어를 비우면 null', () => {
    expect(feeSchema.parse(base).pricePrefix).toBeNull();
    expect(feeSchema.parse({ ...base, pricePrefix: ' 장당 ' }).pricePrefix).toBe('장당');
  });

  it('숫자가 아닌 금액·없는 대분류·빈 명칭을 거부한다', () => {
    expect(feeSchema.safeParse({ ...base, amount: '12a' }).success).toBe(false);
    expect(feeSchema.safeParse({ ...base, category: '기타' }).success).toBe(false);
    expect(feeSchema.safeParse({ ...base, name: '   ' }).success).toBe(false);
  });
});
