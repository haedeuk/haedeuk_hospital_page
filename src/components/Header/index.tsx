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

  // 스크롤하면 헤더 아래에 경계선이 생긴다. 렌더를 일으키지 않게 data 속성만 바꾼다.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const update = () => {
      header.dataset.scrolled = String(window.scrollY > 8);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
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
