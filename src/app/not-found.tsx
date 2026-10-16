import Link from 'next/link';
import styles from './NotFound.module.scss';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <p className={styles.notFound__code}>404</p>
      <h1 className={styles.notFound__title}>페이지를 찾을 수 없습니다</h1>
      <p className={styles.notFound__description}>주소가 바뀌었거나 없어진 페이지입니다.</p>
      <Link className={styles.notFound__link} href="/">
        홈으로 가기
      </Link>
    </main>
  );
}
