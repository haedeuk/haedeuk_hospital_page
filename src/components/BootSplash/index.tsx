'use client';

import { useEffect } from 'react';
import Logo from '@/components/Logo';

const MIN_VISIBLE_MS = 600;
const MAX_WAIT_MS = 2500;
const FADE_MS = 600;
const SESSION_KEY = 'hd-booted';

const wait = (ms: number) => new Promise<void>((resolve) => { setTimeout(resolve, ms); });

// 첫 방문 보딩화면. 서버 HTML 에 함께 그려 두고, html.booting 일 때만 보인다.
// 하이드레이션이 끝난 뒤(이 effect) 글꼴과 첫 화면 사진(페이지 load)이 준비되면 걷는다.
// 너무 빨리 끝나 깜빡이지 않게 최소 0.6초, 느린 망에서 오래 붙잡지 않게 최대 2.5초.
export default function BootSplash() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('booting')) return undefined;

    let cancelled = false;
    const pageLoaded =
      document.readyState === 'complete'
        ? Promise.resolve()
        : new Promise<void>((resolve) => { window.addEventListener('load', () => resolve(), { once: true }); });
    const ready = Promise.all([document.fonts.ready, pageLoaded]);

    Promise.all([Promise.race([ready, wait(MAX_WAIT_MS)]), wait(MIN_VISIBLE_MS)]).then(async () => {
      if (cancelled) return;
      root.classList.add('booted');
      // 보딩화면이 걷히는 순간 스크롤 등장 애니메이션을 시작하라고 알린다
      window.dispatchEvent(new Event('hd:booted'));
      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // 시크릿 모드 등에서 저장이 막혀도 다음에 한 번 더 보일 뿐이다
      }
      await wait(FADE_MS);
      root.classList.remove('booting', 'booted');
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="boot-splash" aria-hidden="true">
      <Logo tone="inverse" priority className="boot-splash__logo" />
      <span className="boot-splash__bar" />
      <span className="boot-splash__text">365일 진료합니다</span>
    </div>
  );
}
