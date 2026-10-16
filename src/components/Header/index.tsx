'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MenuIcon, PhoneIcon } from '@/components/Icons';
import Logo from '@/components/Logo';
import { CLINIC } from '@/constants/clinic';
import { NAV_ITEMS } from '@/constants/navigation';
import MobileMenu from './MobileMenu';
import styles from './Header.module.scss';

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 스크롤하면 경계선이 생기고, 아래로 내리면 숨고 위로 올리면 다시 나타난다.
  // 렌더를 일으키지 않게 data 속성만 바꾼다. 진료항목 바로가기처럼 헤더 밑에 붙는 요소는
  // html[data-header-hidden] 을 보고 위치를 따라온다.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    let lastY = window.scrollY;
    const update = () => {
      const y = window.scrollY;
      const hidden = y > 160 && y > lastY + 4 ? true : y < lastY - 4 || y <= 160 ? false : null;

      header.dataset.scrolled = String(y > 8);
      if (hidden !== null) {
        header.dataset.hidden = String(hidden);
        document.documentElement.dataset.headerHidden = String(hidden);
      }
      lastY = y;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => {
      window.removeEventListener('scroll', update);
      delete document.documentElement.dataset.headerHidden;
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.header__inner}>
        <Link href="/" className={styles.header__logo} aria-label={`${CLINIC.name} 홈`}>
          <Logo priority />
        </Link>

        <nav className={styles.header__nav} aria-label="주 메뉴">
          <ul className={styles.header__list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.header__link}
                  aria-current={isActivePath(pathname, item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a className={styles.header__call} href={CLINIC.phoneHref}>
          <PhoneIcon size={16} />
          {CLINIC.phone}
        </a>

        <button
          type="button"
          className={styles.header__toggle}
          aria-label="메뉴 열기"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(true)}
        >
          <MenuIcon size={24} />
        </button>
      </div>

      {isMenuOpen && <MobileMenu pathname={pathname} onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
}
