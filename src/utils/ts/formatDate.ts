// 2026.10.16 형태
export function formatDate(date: Date): string {
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));

  return `${parts.year}.${parts.month}.${parts.day}`;
}

// 시각 표현이 두 줄로 갈라지지 않게 쓰는 줄바꿈 없는 공백
const NBSP = '\u00a0';

// 08:00 → 오전 8시, 13:30 → 오후 1시 30분 (사이 공백은 줄바꿈 없는 공백)
export function formatClock(time: string): string {
  const [hour, minute] = time.split(':').map((value) => Number.parseInt(value, 10));
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  const words = minute === 0 ? [period, `${displayHour}시`] : [period, `${displayHour}시`, `${minute}분`];

  return words.join(NBSP);
}
