import { z } from 'zod';
import { parseCareers } from '@/utils/ts/careers';

export const doctorSchema = z.object({
  name: z.string().trim().min(1, '이름을 입력해 주세요.').max(30, '이름은 30자 이내로 입력해 주세요.'),
  position: z.string().trim().min(1, '직함을 입력해 주세요.').max(30, '직함은 30자 이내로 입력해 주세요.'),
  careers: z
    .string()
    .transform(parseCareers)
    .pipe(
      z
        .array(z.string().max(100, '경력 한 줄은 100자 이내로 입력해 주세요.'))
        .max(40, '경력은 40줄까지 입력할 수 있습니다.'),
    ),
  isPublished: z.boolean(),
});

export type DoctorInput = z.infer<typeof doctorSchema>;

export const PHOTO_MAX_BYTES = 5 * 1024 * 1024;
export const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

// 업로드 파일 검사. 파일을 고르지 않았으면 null (사진 변경 없음).
export function validatePhoto(file: FormDataEntryValue | null): { file: File | null; error?: string } {
  if (!(file instanceof File) || file.size === 0) return { file: null };

  if (!PHOTO_TYPES.includes(file.type as (typeof PHOTO_TYPES)[number])) {
    return { file: null, error: 'JPG, PNG, WEBP 파일만 올릴 수 있습니다.' };
  }
  if (file.size > PHOTO_MAX_BYTES) {
    return { file: null, error: '사진은 5MB 이하만 올릴 수 있습니다.' };
  }

  return { file };
}
