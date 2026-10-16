'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeftIcon } from '@/components/Icons';
import styles from './BackToTop.module.scss';

const SHOW_AFTER = 900;

// 길게 내려가면 나타나는 맨 위로 버튼. 렌더 없이 data 속성으로만 보이고 숨는다.
export default function BackToTop() {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = ref.current;
    if (!button) return undefined;

    const update = () => {
      button.dataset.visible = String(window.scrollY > SHOW_AFTER);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, []);

  const scrollToTop = () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <button ref={ref} type="button" className={styles.top} aria-label="맨 위로" data-visible="false" onClick={scrollToTop}>
      <ChevronLeftIcon size={20} className={styles.top__icon} />
    </button>
  );
}
