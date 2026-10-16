'use client';

import { useEffect } from 'react';

// 화면 아래쪽 6% 를 남기고 들어오면 나타난다
const REVEAL_LINE = 0.94;

const isBooting = () => {
  const { classList } = document.documentElement;
  return classList.contains('booting') && !classList.contains('booted');
};

// data-reveal 요소 가운데 화면에 들어왔거나 이미 지나친 것에 data-revealed 를 단다.
// "화면에 들어올 때"만 알려 주는 IntersectionObserver 는 휠을 크게 굴려 짧은 요소를 건너뛰면
// 놓치므로, 스크롤마다(프레임당 한 번) 남은 요소의 위치를 직접 확인한다. 모두 나타나면 스크롤 감시를 멈춘다.
// 페이지를 옮기면 본문이 로딩 화면(Suspense) 뒤에 늦게 붙으므로, 주소가 아니라 DOM 에 요소가 붙는 것을 보고 다시 찾는다.
// 본문보다 먼저 하이드레이션돼 속성을 미리 달 수 있는데, 그 경고는 utils/ts/reveal 이 막는다. 그리는 것은 없다.
export default function ScrollReveal() {
  useEffect(() => {
    // head 의 안전장치(3초 뒤 강제 표시)에 "관찰자가 살아 있다"고 알린다
    (window as Window & { __revealReady?: boolean }).__revealReady = true;

    let pending: HTMLElement[] = [];
    let needsCollect = true;
    let isListening = false;
    let frame = 0;

    const sweep = () => {
      frame = 0;
      // 보딩화면 뒤에서 미리 나타나 버리지 않게, 보딩화면이 걷힐 때(hd:booted) 다시 확인한다
      if (isBooting()) return;
      if (needsCollect) {
        needsCollect = false;
        pending = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'));
      }
      const line = window.innerHeight * REVEAL_LINE;
      pending = pending.filter((element) => {
        if (element.getBoundingClientRect().top > line) return true;
        element.setAttribute('data-revealed', '');
        return false;
      });
      if (pending.length > 0) listen();
      else unlisten();
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(sweep);
    };
    const listen = () => {
      if (isListening) return;
      isListening = true;
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
    };
    const unlisten = () => {
      isListening = false;
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };

    const observer = new MutationObserver(() => {
      needsCollect = true;
      schedule();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('hd:booted', schedule, { once: true });
    schedule();

    return () => {
      observer.disconnect();
      unlisten();
      window.removeEventListener('hd:booted', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
