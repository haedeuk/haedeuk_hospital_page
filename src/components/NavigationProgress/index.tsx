'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import styles from './NavigationProgress.module.scss';

// 페이지 이동 진행 표시줄. 링크를 누르는 순간 화면 맨 위 선이 차오르기 시작하고,
// 새 주소로 바뀌면 끝까지 채운 뒤 사라진다. 렌더 없이 data 속성으로만 움직인다.
export default function NavigationProgress() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest('a');
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const url = new URL(anchor.href, window.location.href);
      const isSamePage = url.pathname === window.location.pathname && url.search === window.location.search;
      if (url.origin !== window.location.origin || isSamePage) return;

      bar.dataset.state = 'loading';
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // 주소가 바뀌면 이동이 끝난 것이다
  useEffect(() => {
    const bar = barRef.current;
    if (firstRender.current) {
      firstRender.current = false;
      return undefined;
    }
    if (!bar || bar.dataset.state !== 'loading') return undefined;

    bar.dataset.state = 'done';
    const timer = window.setTimeout(() => {
      bar.dataset.state = 'idle';
    }, 500);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return <div ref={barRef} className={styles.progress} data-state="idle" aria-hidden="true" />;
}
