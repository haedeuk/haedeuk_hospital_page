'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import ConfirmDelete from '@/components/admin/ConfirmDelete';
import SubmitButton from '@/components/admin/SubmitButton';
import { INITIAL_FORM_STATE } from '@/types/formState';
import { deleteDoctor, moveDoctor, setDoctorPublished } from '../../actions';
import styles from './DoctorRowActions.module.scss';

interface DoctorRowActionsProps {
  id: string;
  name: string;
  isPublished: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export default function DoctorRowActions({ id, name, isPublished, isFirst, isLast }: DoctorRowActionsProps) {
  const [publishState, publishAction] = useActionState(setDoctorPublished, INITIAL_FORM_STATE);
  const [moveState, moveAction] = useActionState(moveDoctor, INITIAL_FORM_STATE);
  const error = [publishState, moveState].find((state) => state.status === 'error');

  return (
    <div className={styles.actions}>
      <form action={publishAction}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="isPublished" value={String(!isPublished)} />
        <button
          type="submit"
          role="switch"
          aria-checked={isPublished}
          aria-label={`${name} 홈페이지 노출`}
          className={`${styles.toggle} ${isPublished ? styles['toggle--on'] : ''}`}
        >
          <span className={styles.toggle__track} aria-hidden="true">
            <span className={styles.toggle__thumb} />
          </span>
          {isPublished ? '노출' : '숨김'}
        </button>
      </form>

      <form action={moveAction} className={styles.actions__move}>
        <input type="hidden" name="id" value={id} />
        {!isFirst && (
          <SubmitButton variant="secondary" size="small" name="direction" value="up" ariaLabel={`${name} 위로`}>
            ↑
          </SubmitButton>
        )}
        {!isLast && (
          <SubmitButton variant="secondary" size="small" name="direction" value="down" ariaLabel={`${name} 아래로`}>
            ↓
          </SubmitButton>
        )}
      </form>

      <Link className={styles.actions__edit} href={`/admin/doctors/${id}`}>
        수정
      </Link>
      <ConfirmDelete
        id={id}
        itemName={name}
        description="홈페이지 의료진 소개에서도 바로 사라지고, 올린 사진도 함께 지워집니다. 잠시 숨기려면 ‘노출’ 스위치를 끄세요."
        action={deleteDoctor}
      />

      {error && (
        <p className={styles.actions__error} role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
