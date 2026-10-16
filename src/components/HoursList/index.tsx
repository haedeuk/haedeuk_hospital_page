import { LUNCH_BREAK, OPENING_HOURS } from '@/constants/clinic';
import { formatClock } from '@/utils/ts/formatDate';
import styles from './HoursList.module.scss';

interface HoursListProps {
  tone?: 'default' | 'inverse';
}

export default function HoursList({ tone = 'default' }: HoursListProps) {
  const rows = [...OPENING_HOURS, LUNCH_BREAK];

  return (
    <dl className={`${styles.hours} ${tone === 'inverse' ? styles['hours--inverse'] : ''}`}>
      {rows.map((row) => (
        <div className={styles.hours__row} key={row.label}>
          <dt className={styles.hours__label}>{row.label}</dt>
          <dd className={styles.hours__time}>
            <time dateTime={row.open}>{formatClock(row.open)}</time>
            {' ~ '}
            <time dateTime={row.close}>{formatClock(row.close)}</time>
          </dd>
        </div>
      ))}
    </dl>
  );
}
