import { CalendarIcon, MapPinIcon, PhoneIcon } from '@/components/Icons';
import { CLINIC, CLINIC_LINKS } from '@/constants/clinic';
import styles from './FloatingCta.module.scss';

// 모바일: 화면 아래 고정 바 / 데스크톱: 오른쪽 아래 원형 버튼
export default function FloatingCta() {
  const actions = [
    { href: CLINIC.phoneHref, label: '전화 문의', icon: <PhoneIcon size={20} />, external: false },
    { href: CLINIC_LINKS.naverBooking, label: '네이버 예약', icon: <CalendarIcon size={20} />, external: true },
    { href: CLINIC_LINKS.naverPlace, label: '길찾기', icon: <MapPinIcon size={20} />, external: true },
  ];

  return (
    <nav className={styles.cta} aria-label="빠른 연락">
      {actions.map((action) => (
        <a
          key={action.label}
          className={styles.cta__item}
          href={action.href}
          {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {action.icon}
          <span className={styles.cta__label}>{action.label}</span>
        </a>
      ))}
    </nav>
  );
}
