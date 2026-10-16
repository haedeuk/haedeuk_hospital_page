'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRightIcon } from '@/components/Icons';
import Logo from '@/components/Logo';
import { signOut } from '../../actions';
import styles from './Sidebar.module.scss';

const MENU = [
  { href: '/admin', label: '대시보드' },
  { href: '/admin/doctors', label: '의료진 관리' },
  { href: '/admin/fees', label: '비급여 관리' },
];

export default function Sidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/admin' ? pathname === href : pathname.startsWith(href));

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__brand}>
        <Logo className={styles.sidebar__logo} />
        <span className={styles.sidebar__badge}>관리자</span>
      </div>
      <nav aria-label="관리자 메뉴">
        <ul className={styles.sidebar__menu}>
          {MENU.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.sidebar__link}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.sidebar__footer}>
        <a className={styles.sidebar__site} href="/" target="_blank" rel="noopener noreferrer">
          홈페이지 보기
          <ArrowRightIcon size={14} />
        </a>
        <p className={styles.sidebar__email}>{email}</p>
        <form action={signOut}>
          <button type="submit" className={styles.sidebar__logout}>
            로그아웃
          </button>
        </form>
      </div>
    </aside>
  );
}
