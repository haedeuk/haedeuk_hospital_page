import 'server-only';
import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';

export const ADMIN_LOGIN_PATH = '/admin/login';

// 로그인 화면의 아이디. 관리자는 한 명이라 이 아이디 하나만 받는다.
export const ADMIN_LOGIN_ID = 'admin';

// 관리자 계정의 Supabase 이메일. 비밀번호는 코드·환경변수 어디에도 두지 않는다(Supabase 가 보관).
export function getAdminEmail(): string {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) throw new Error('ADMIN_EMAIL 이 설정되지 않았습니다.');

  return email;
}

// 세션이 있고 그 이메일이 ADMIN_EMAIL 과 같을 때만 통과한다. 아니면 null.
export async function getAdminSession() {
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getClaims();
  const email = typeof data?.claims?.email === 'string' ? data.claims.email.toLowerCase() : null;

  if (!email || email !== getAdminEmail()) return null;

  return { supabase, email };
}

// 관리자 화면 레이아웃과 **모든 서버 액션**의 첫 줄. 서버 액션은 화면을 거치지 않고도 호출될 수 있다.
export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect(ADMIN_LOGIN_PATH);

  return session;
}
