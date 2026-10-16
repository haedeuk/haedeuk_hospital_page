import Link from 'next/link';
import HoursList from '@/components/HoursList';
import Logo from '@/components/Logo';
import { CLINIC, CLINIC_LINKS } from '@/constants/clinic';
import { NAV_ITEMS } from '@/constants/navigation';
import styles from './Footer.module.scss';

// 관리자 화면으로 가는 링크는 두지 않는다.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__brand}>
          <Logo tone="inverse" className={styles.footer__logo} />
          <p className={styles.footer__slogan}>365일 진료하고 입원실을 운영합니다.</p>
          <a className={styles.footer__phone} href={CLINIC.phoneHref}>
            {CLINIC.phone}
          </a>
          <ul className={styles.footer__social}>
            {[
              { href: CLINIC_LINKS.naverPlace, label: '네이버 플레이스' },
              { href: CLINIC_LINKS.naverBlog, label: '네이버 블로그' },
              { href: CLINIC_LINKS.naverTalk, label: '네이버 톡톡' },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav className={styles.footer__nav} aria-label="하단 메뉴">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer__hours}>
          <p className={styles.footer__heading}>진료시간</p>
          <HoursList tone="inverse" />
        </div>
      </div>

      <div className={styles.footer__bottom}>
        <address className={styles.footer__info}>
          <span>{CLINIC.name}</span>
          <span>주소 {CLINIC.address.full}</span>
          <span>대표 {CLINIC.ceo}</span>
          <span>사업자등록번호 {CLINIC.businessNumber}</span>
        </address>
        <p className={styles.footer__copyright}>© {new Date().getFullYear()} HaeDeuk GeumCheon. All rights reserved.</p>
      </div>
    </footer>
  );
}
