'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CalendarIcon, CloseIcon, PhoneIcon } from '@/components/Icons';
import { CLINIC, CLINIC_LINKS } from '@/constants/clinic';
import { NAV_ITEMS } from '@/constants/navigation';
import styles from './Header.module.scss';
import type { CSSProperties } from 'react';

interface MobileMenuProps {
  pathname: string;
  onClose: () => void;
}

export default function MobileMenu({ pathname, onClose }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // 열려 있는 동안 뒤 페이지 스크롤을 막고, Esc 로 닫는다.
  useEffect(() => {
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  // 헤더의 backdrop-filter 가 fixed 요소의 기준 상자가 되어 서랍이 헤더 안에 갇히므로 body 로 꺼낸다.
  return createPortal(
    <div className={styles.drawer} id="mobile-menu" role="dialog" aria-modal="true" aria-label="전체 메뉴">
      <button type="button" className={styles.drawer__backdrop} aria-label="메뉴 닫기" tabIndex={-1} onClick={onClose} />
      <div className={styles.drawer__panel}>
        <div className={styles.drawer__top}>
          <span className={styles.drawer__title}>{CLINIC.name}</span>
          <button ref={closeRef} type="button" className={styles.drawer__close} aria-label="메뉴 닫기" onClick={onClose}>
            <CloseIcon size={24} />
          </button>
        </div>
        <nav aria-label="모바일 메뉴">
          <ul className={styles.drawer__list}>
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href} className={styles.drawer__item} style={{ '--i': index } as CSSProperties}>
                <Link
                  href={item.href}
                  className={styles.drawer__link}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.drawer__actions}>
          <a className={styles.drawer__action} href={CLINIC.phoneHref}>
            <PhoneIcon size={18} />
            전화 {CLINIC.phone}
          </a>
          <a className={styles.drawer__action} href={CLINIC_LINKS.naverBooking} target="_blank" rel="noopener noreferrer">
            <CalendarIcon size={18} />
            네이버 예약
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
