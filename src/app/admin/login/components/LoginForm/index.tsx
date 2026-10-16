'use client';

import { useActionState, useState } from 'react';
import Field from '@/components/admin/Field';
import FormMessage from '@/components/admin/FormMessage';
import SubmitButton from '@/components/admin/SubmitButton';
import { INITIAL_FORM_STATE } from '@/types/formState';
import { signIn } from '../../actions';
import styles from './LoginForm.module.scss';

export default function LoginForm() {
  // 실패해도 아이디는 남긴다 (React 19 는 제출 뒤 폼을 비운다). 비밀번호는 비워지는 게 맞다.
  const [loginId, setLoginId] = useState('');
  const [state, formAction] = useActionState(signIn, INITIAL_FORM_STATE);

  return (
    <form action={formAction} className={styles.form} noValidate>
      <Field id="loginId" label="아이디">
        <input
          id="loginId"
          name="loginId"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={loginId}
          onChange={(event) => setLoginId(event.target.value)}
        />
      </Field>
      <Field id="password" label="비밀번호">
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </Field>
      <FormMessage state={state} />
      <SubmitButton pendingLabel="확인 중…">로그인</SubmitButton>
    </form>
  );
}
