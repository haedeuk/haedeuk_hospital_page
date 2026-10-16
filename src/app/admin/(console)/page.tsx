import DashboardSummary from './components/DashboardSummary';
import styles from './Dashboard.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '대시보드' };

export default function DashboardPage() {
  return (
    <>
      <h1 className={styles.title}>대시보드</h1>
      <DashboardSummary />
    </>
  );
}
