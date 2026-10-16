import { describe, expect, it } from 'vitest';
import { doctorSchema, validatePhoto } from './doctor';

describe('doctorSchema', () => {
  it('경력 textarea 를 줄 단위 배열로 바꾼다', () => {
    const parsed = doctorSchema.parse({
      name: ' 김혜인 ',
      position: '대표원장',
      careers: '현) 대표원장\n\n원광대학교 한의과대학 졸업\n',
      isPublished: true,
    });

    expect(parsed.name).toBe('김혜인');
    expect(parsed.careers).toEqual(['현) 대표원장', '원광대학교 한의과대학 졸업']);
  });

  it('이름·직함이 비면 거부한다', () => {
    expect(doctorSchema.safeParse({ name: '', position: '진료원장', careers: '', isPublished: true }).success).toBe(false);
    expect(doctorSchema.safeParse({ name: '김', position: ' ', careers: '', isPublished: true }).success).toBe(false);
  });
});

describe('validatePhoto', () => {
  it('파일을 고르지 않으면 변경 없음', () => {
    expect(validatePhoto(null)).toEqual({ file: null });
    expect(validatePhoto(new File([], ''))).toEqual({ file: null });
  });

  it('이미지가 아니거나 5MB 를 넘으면 오류', () => {
    expect(validatePhoto(new File(['x'], 'a.gif', { type: 'image/gif' })).error).toBeDefined();
    const big = new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'a.jpg', { type: 'image/jpeg' });
    expect(validatePhoto(big).error).toBeDefined();
  });

  it('JPG·PNG·WEBP 는 통과', () => {
    const file = new File(['x'], 'a.webp', { type: 'image/webp' });
    expect(validatePhoto(file).file).toBe(file);
  });
});
