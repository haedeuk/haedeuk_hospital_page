import FeeBoard from './components/FeeBoard';
import styles from './Fees.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '비급여 관리' };

export default function AdminFeesPage() {
  return (
    <>
      <div className={styles.head}>
        <h1 className={styles.head__title}>비급여 관리</h1>
        <p className={styles.head__description}>
          금액을 비워 두면 홈페이지에 ‘-’로 표시됩니다. 접두어(예: 장당)는 금액 앞에 붙습니다.
        </p>
      </div>
      <FeeBoard />
    </>
  );
}
