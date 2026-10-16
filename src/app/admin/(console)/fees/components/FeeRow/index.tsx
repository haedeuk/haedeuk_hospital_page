'use client';

import { useActionState, useState } from 'react';
import ConfirmDelete from '@/components/admin/ConfirmDelete';
import SubmitButton from '@/components/admin/SubmitButton';
import { INITIAL_FORM_STATE } from '@/types/formState';
import { formatFee } from '@/utils/ts/formatFee';
import type { Fee } from '@/types/domain';
import type { FormState } from '@/types/formState';
import { deleteFee, moveFee, saveFee } from '../../actions';
import FeeInputs from './FeeInputs';
import styles from './FeeRow.module.scss';

interface FeeRowProps {
  fee: Fee;
  isFirst: boolean;
  isLast: boolean;
}

// 보기 ↔ 인라인 수정. 저장에 성공하면 보기로 돌아간다.
export default function FeeRow({ fee, isFirst, isLast }: FeeRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saveState, saveAction] = useActionState(async (prev: FormState, formData: FormData) => {
    const result = await saveFee(prev, formData);
    if (result.status === 'success') setIsEditing(false);
    return result;
  }, INITIAL_FORM_STATE);
  const [moveState, moveAction] = useActionState(moveFee, INITIAL_FORM_STATE);

  if (isEditing) {
    return (
      <li className={`${styles.row} ${styles['row--editing']}`}>
        <form action={saveAction} className={styles.row__form}>
          <input type="hidden" name="id" value={fee.id} />
          <input type="hidden" name="category" value={fee.category} />
          <FeeInputs fee={fee} errors={saveState.fieldErrors} />
          <div className={styles.row__actions}>
            <button type="button" className={styles.row__text} onClick={() => setIsEditing(false)}>
              취소
            </button>
            <SubmitButton size="small" pendingLabel="저장 중…">
              저장
            </SubmitButton>
          </div>
        </form>
        {saveState.status === 'error' && (
          <p className={styles.row__error} role="alert">
            {saveState.message}
          </p>
        )}
      </li>
    );
  }

  return (
    <li className={styles.row}>
      <div className={styles.row__view}>
        <span className={styles.row__name}>{fee.name}</span>
        <span className={styles.row__prefix}>{fee.pricePrefix ?? ''}</span>
        <span className={styles.row__price}>{formatFee(fee.amount, fee.pricePrefix)}</span>
        <div className={styles.row__actions}>
          <form action={moveAction} className={styles.row__move}>
            <input type="hidden" name="id" value={fee.id} />
            {!isFirst && (
              <SubmitButton variant="secondary" size="small" name="direction" value="up" ariaLabel={`${fee.name} 위로`}>
                ↑
              </SubmitButton>
            )}
            {!isLast && (
              <SubmitButton variant="secondary" size="small" name="direction" value="down" ariaLabel={`${fee.name} 아래로`}>
                ↓
              </SubmitButton>
            )}
          </form>
          <button type="button" className={styles.row__text} onClick={() => setIsEditing(true)}>
            수정
          </button>
          <ConfirmDelete id={fee.id} itemName={fee.name} description="홈페이지 비급여 표에서도 바로 사라집니다." action={deleteFee} />
        </div>
      </div>
      {moveState.status === 'error' && (
        <p className={styles.row__error} role="alert">
          {moveState.message}
        </p>
      )}
    </li>
  );
}
