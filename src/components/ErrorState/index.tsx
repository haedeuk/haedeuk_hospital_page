'use client';

import { useSyncExternalStore } from 'react';
import styles from './ErrorState.module.scss';
import type { ReactNode } from 'react';

interface ErrorStateProps {
  title: string;
  description: string;
  // 인터넷이 끊겼을 때 대신 보여 줄 문구
  offlineDescription?: string;
  actions: ReactNode;
  // 문의할 때 알려 줄 오류 코드 (Next 가 붙여 주는 digest)
  code?: string;
}

const subscribe = (onChange: () => void) => {
  window.addEventListener('online', onChange);
  window.addEventListener('offline', onChange);
  return () => {
    window.removeEventListener('online', onChange);
    window.removeEventListener('offline', onChange);
  };
};

// 데이터를 받지 못했을 때의 대체 화면. 원인(오프라인/서버)에 맞는 문구와 다음 행동을 보여 준다.
export default function ErrorState({ title, description, offlineDescription, actions, code }: ErrorStateProps) {
  const isOffline = useSyncExternalStore(subscribe, () => !navigator.onLine, () => false);

  return (
    <section className={styles.error} role="alert">
      <span className={styles.error__icon} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          {isOffline ? (
            <path d="M3 9.5a14 14 0 0 1 18 0M6.5 13a9 9 0 0 1 11 0M10 16.5a4 4 0 0 1 4 0M12 20h0M3 3l18 18" />
          ) : (
            <path d="M12 8v5M12 16.5h0M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0z" />
          )}
        </svg>
      </span>
      <h1 className={styles.error__title}>{isOffline ? '인터넷 연결이 끊겼습니다' : title}</h1>
      <p className={styles.error__description}>{isOffline && offlineDescription ? offlineDescription : description}</p>
      <div className={styles.error__actions}>{actions}</div>
      {code && <p className={styles.error__code}>오류 코드 {code}</p>}
    </section>
  );
}
