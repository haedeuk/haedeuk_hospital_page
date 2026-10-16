import type { Fee } from '@/types/domain';
import styles from './FeeRow.module.scss';

interface FeeInputsProps {
  fee?: Pick<Fee, 'name' | 'amount' | 'pricePrefix'>;
  errors?: Record<string, string[] | undefined>;
}

// 수정 행과 새 항목 행이 같은 칸 구성을 쓴다.
export default function FeeInputs({ fee, errors = {} }: FeeInputsProps) {
  const fields = [
    { name: 'name', label: '명칭', defaultValue: fee?.name ?? '', placeholder: '예: 경옥고', required: true },
    { name: 'pricePrefix', label: '접두어', defaultValue: fee?.pricePrefix ?? '', placeholder: '장당' },
    {
      name: 'amount',
      label: '금액(원)',
      defaultValue: fee?.amount?.toLocaleString('ko-KR') ?? '',
      placeholder: '비우면 -',
      inputMode: 'numeric' as const,
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <label key={field.name} className={styles.row__field}>
          <span className="sr-only">{field.label}</span>
          <input
            name={field.name}
            defaultValue={field.defaultValue}
            placeholder={field.placeholder}
            required={field.required}
            inputMode={field.inputMode}
            aria-invalid={Boolean(errors[field.name]?.length)}
          />
          {errors[field.name]?.map((error) => (
            <span key={error} className={styles.row__fieldError}>
              {error}
            </span>
          ))}
        </label>
      ))}
    </>
  );
}
