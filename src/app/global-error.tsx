'use client';

import ErrorState from '@/components/ErrorState';
import { CLINIC } from '@/constants/clinic';
import '@/styles/index.scss';
import styles from './GlobalError.module.scss';

// 루트 레이아웃까지 실패했을 때의 마지막 화면. 레이아웃이 없으므로 html·body 를 직접 그린다.
export default function GlobalError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="ko">
      <body>
        <main className={styles.page}>
          <ErrorState
            title="페이지를 표시하지 못했습니다"
            description={`잠시 후 다시 시도해 주세요.\n급하신 경우 ${CLINIC.phone}로 전화 주시면 바로 안내해 드립니다.`}
            code={error.digest}
            actions={
              <>
                <button type="button" className={styles.retry} onClick={() => retry()}>
                  다시 시도
                </button>
                <a className={styles.link} href={CLINIC.phoneHref}>
                  전화 문의
                </a>
              </>
            }
          />
        </main>
      </body>
    </html>
  );
}
