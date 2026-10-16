import Link from 'next/link';
import DoctorTable from './components/DoctorTable';
import SavedNotice from './components/SavedNotice';
import styles from './Doctors.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '의료진 관리' };

export default async function AdminDoctorsPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;

  return (
    <>
      <div className={styles.head}>
        <div>
          <h1 className={styles.head__title}>의료진 관리</h1>
          <p className={styles.head__description}>노출 순서는 홈페이지 의료진 소개에 그대로 반영됩니다.</p>
        </div>
        <Link className={styles.head__add} href="/admin/doctors/new">
          + 의사 추가
        </Link>
      </div>
      {saved && <SavedNotice />}
      <DoctorTable />
    </>
  );
}
