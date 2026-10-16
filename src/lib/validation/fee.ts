import { z } from 'zod';
import { FEE_CATEGORIES } from '@/constants/fees';

// 금액 칸은 "250,000" 처럼 쉼표를 써도 되고, 비워 두면 '-' 로 표시된다.
const amountField = z
  .string()
  .trim()
  .transform((value) => value.replace(/[,\s원]/g, ''))
  .refine((value) => value === '' || /^\d+$/.test(value), '금액은 숫자만 입력해 주세요.')
  .transform((value) => (value === '' ? null : Number.parseInt(value, 10)))
  .refine((value) => value === null || value <= 100_000_000, '금액이 너무 큽니다.');

export const feeSchema = z.object({
  category: z.enum(FEE_CATEGORIES, { message: '대분류를 선택해 주세요.' }),
  name: z.string().trim().min(1, '명칭을 입력해 주세요.').max(60, '명칭은 60자 이내로 입력해 주세요.'),
  amount: amountField,
  pricePrefix: z
    .string()
    .trim()
    .max(10, '접두어는 10자 이내로 입력해 주세요.')
    .transform((value) => (value === '' ? null : value)),
});

export type FeeInput = z.infer<typeof feeSchema>;
