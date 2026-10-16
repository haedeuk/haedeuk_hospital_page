'use server';

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

export async function signIn(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = loginSchema.safeParse({
    loginId: formData.get('loginId'),
    password: formData.get('password'),
  });
  if (!parsed.success) return { status: 'error', message: '아이디와 비밀번호를 입력해 주세요.' };

  // 관리자는 한 명 — 아이디 admin 이나 관리자 이메일 그대로 모두 ADMIN_EMAIL 계정 하나에만 연결된다.
  const adminEmail = getAdminEmail();
  const loginId = parsed.data.loginId.toLowerCase();
  if (loginId !== ADMIN_LOGIN_ID && loginId !== adminEmail) return { status: 'error', message: LOGIN_FAILED };

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email: adminEmail, password: parsed.data.password });
  if (error) return { status: 'error', message: LOGIN_FAILED };

  redirect('/admin');
}
