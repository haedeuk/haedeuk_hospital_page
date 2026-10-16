'use client';

import { useEffect, useRef, useState } from 'react';
import { TREATMENTS } from '@/constants/treatments';
import styles from './TreatmentNav.module.scss';

// 헤더 아래에 붙어 따라오는 항목 바로가기. 지금 보고 있는 항목의 칩이 강조되고,
// 모바일에서는 그 칩이 보이도록 가로 스크롤이 따라간다.
export default function TreatmentNav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = TREATMENTS.map((treatment) => document.getElementById(treatment.id)).filter(
      (section): section is HTMLElement => section !== null,
    );

    // 화면 위쪽 40% 지점을 지나는 섹션을 "지금 보는 항목"으로 본다
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    const chip = activeId ? list?.querySelector<HTMLElement>(`[data-id="${activeId}"]`) : null;
    if (!list || !chip) return;

    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    list.scrollTo({ left: chip.offsetLeft - list.clientWidth / 2 + chip.offsetWidth / 2, behavior });
  }, [activeId]);

  return (
    <nav className={styles.nav} aria-label="진료항목 바로가기">
      <ul ref={listRef} className={styles.nav__list}>
        {TREATMENTS.map((treatment) => (
          <li key={treatment.id}>
            <a
              className={styles.nav__link}
              href={`#${treatment.id}`}
              data-id={treatment.id}
              aria-current={activeId === treatment.id ? 'true' : undefined}
            >
              {treatment.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
