'use client';

import { useActionState, useState } from 'react';
import SubmitButton from '@/components/admin/SubmitButton';
import { INITIAL_FORM_STATE } from '@/types/formState';
import type { FeeCategory } from '@/constants/fees';
import type { FormState } from '@/types/formState';
import { saveFee } from '../../actions';
import FeeInputs from '../FeeRow/FeeInputs';
import styles from '../FeeRow/FeeRow.module.scss';

// 대분류 맨 아래의 "+ 항목 추가". 추가에 성공하면 칸을 비우고 닫는다.
export default function NewFeeRow({ category }: { category: FeeCategory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(async (prev: FormState, formData: FormData) => {
    const result = await saveFee(prev, formData);
    if (result.status === 'success') setIsOpen(false);
    return result;
  }, INITIAL_FORM_STATE);

  if (!isOpen) {
    return (
      <button type="button" className={styles.add} onClick={() => setIsOpen(true)}>
        + {category} 항목 추가
      </button>
    );
  }

  return (
    <div className={`${styles.row} ${styles['row--editing']} ${styles['row--new']}`}>
      <form action={formAction} className={styles.row__form}>
        <input type="hidden" name="category" value={category} />
        <FeeInputs errors={state.fieldErrors} />
        <div className={styles.row__actions}>
          <button type="button" className={styles.row__text} onClick={() => setIsOpen(false)}>
            취소
          </button>
          <SubmitButton size="small" pendingLabel="추가 중…">
            추가
          </SubmitButton>
        </div>
      </form>
      {state.status === 'error' && (
        <p className={styles.row__error} role="alert">
          {state.message}
        </p>
      )}
    </div>
  );
}
