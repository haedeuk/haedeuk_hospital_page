// 관리자 화면의 경력 입력은 "한 줄에 하나"인 textarea 다. DB 에는 배열로 저장한다.
export function parseCareers(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function joinCareers(careers: readonly string[]): string {
  return careers.join('\n');
}

// "현) 해득금천한의원 대표원장" → { tag: '현', text: '해득금천한의원 대표원장' }
export function splitCareerTag(line: string): { tag: '현' | '전' | null; text: string } {
  const match = line.match(/^(현|전)\)\s*(.*)$/);
  if (!match) return { tag: null, text: line };

  return { tag: match[1] as '현' | '전', text: match[2] };
}
