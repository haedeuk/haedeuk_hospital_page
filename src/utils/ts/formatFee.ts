// 비급여 금액 표기. 금액이 없으면 '-', 접두어가 있으면 "장당 1,000원" 처럼 붙인다.
export function formatFee(amount: number | null, prefix: string | null): string {
  if (amount === null) return '-';

  const price = `${amount.toLocaleString('ko-KR')}원`;
  return prefix ? `${prefix} ${price}` : price;
}
