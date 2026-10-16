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

// 08:00 → 오전 8시, 13:30 → 오후 1시 30분
export function formatClock(time: string): string {
  const [hour, minute] = time.split(':').map((value) => Number.parseInt(value, 10));
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return minute === 0 ? `${period} ${displayHour}시` : `${period} ${displayHour}시 ${minute}분`;
}
