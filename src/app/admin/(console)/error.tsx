'use client';

import Link from 'next/link';
import ErrorState from '@/components/ErrorState';
import styles from './ConsoleError.module.scss';

// 관리자 화면의 데이터를 받지 못했을 때. 다시 시도하면 이 화면의 데이터만 새로 받는다.
export default function ConsoleError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <ErrorState
      title="데이터를 불러오지 못했습니다"
      description={'데이터베이스에 연결하지 못했습니다.\n잠시 후 다시 시도해 주세요. 저장한 내용은 그대로 남아 있습니다.'}
      offlineDescription="인터넷 연결을 확인한 뒤 다시 시도해 주세요."
      code={error.digest}
      actions={
        <>
          <button type="button" className={styles.retry} onClick={() => retry()}>
            다시 시도
          </button>
          <Link className={styles.link} href="/admin">
            대시보드로
          </Link>
        </>
      }
    />
  );
}
