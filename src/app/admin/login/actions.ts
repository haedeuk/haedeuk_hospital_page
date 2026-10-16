'use server';

import { createHash, timingSafeEqual } from 'node:crypto';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ADMIN_LOGIN_ID, getAdminEmail } from '@/lib/auth/requireAdmin';
import { createServerSupabase } from '@/lib/supabase/server';
import type { FormState } from '@/types/formState';

const loginSchema = z.object({
  loginId: z.string().trim().min(1),
  password: z.string().min(1),
});

// 아이디가 틀렸는지 비밀번호가 틀렸는지 구분하지 않고 같은 문구를 쓴다.
const LOGIN_FAILED = '아이디 또는 비밀번호가 올바르지 않습니다.';

// 길이가 달라도 같은 시간에 비교되도록 해시끼리 비교한다.
function safeEqual(a: string, b: string): boolean {
  const digest = (value: string) => createHash('sha256').update(value).digest();
  return timingSafeEqual(digest(a), digest(b));
}

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    loginId: formData.get('loginId'),
    password: formData.get('password'),
  });
  if (!parsed.success) return { status: 'error', message: '아이디와 비밀번호를 입력해 주세요.' };

  // 관리자는 한 명 — 아이디 admin 이나 관리자 이메일 그대로 모두 ADMIN_EMAIL 계정 하나에만 연결된다.
  const adminEmail = getAdminEmail();
  const loginId = parsed.data.loginId.toLowerCase();
  const isKnownId = safeEqual(loginId, ADMIN_LOGIN_ID) || safeEqual(loginId, adminEmail);

  // 아이디가 맞든 틀리든 항상 Supabase 에 물어 같은 경로·비슷한 시간을 거친다.
  // (아이디가 틀렸을 때만 일찍 돌려보내면 응답 시간 차이로 관리자 이메일을 추측할 수 있다)
  // 비밀번호 대입 시도는 Supabase Auth 의 로그인 횟수 제한이 막는다.
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email: adminEmail, password: parsed.data.password });

  if (error) return { status: 'error', message: LOGIN_FAILED };
  if (!isKnownId) {
    await supabase.auth.signOut();
    return { status: 'error', message: LOGIN_FAILED };
  }

  redirect('/admin');
}
