import { TREATMENTS } from '@/constants/treatments';
import styles from './TreatmentNav.module.scss';

// 헤더 아래에 붙어 따라오는 항목 바로가기
export default function TreatmentNav() {
  return (
    <nav className={styles.nav} aria-label="진료항목 바로가기">
      <ul className={styles.nav__list}>
        {TREATMENTS.map((treatment) => (
          <li key={treatment.id}>
            <a className={styles.nav__link} href={`#${treatment.id}`}>
              {treatment.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
