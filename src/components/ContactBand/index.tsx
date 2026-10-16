import ButtonLink from '@/components/ButtonLink';
import { CalendarIcon, PhoneIcon } from '@/components/Icons';
import { CLINIC, CLINIC_LINKS } from '@/constants/clinic';
import styles from './ContactBand.module.scss';

// 하위 페이지 끝의 예약·문의 띠
export default function ContactBand() {
  return (
    <section className={styles.band} aria-labelledby="contact-band-title">
      <div className={styles.band__inner}>
        <div className={styles.band__text}>
          <h2 className={styles.band__title} id="contact-band-title">
            예약과 문의
          </h2>
          <p className={styles.band__description}>
            평일은 오후 9시까지, 주말과 공휴일은 오후 5시까지 진료합니다.
          </p>
        </div>
        <div className={styles.band__actions}>
          <ButtonLink href={CLINIC.phoneHref} variant="accent" icon={<PhoneIcon size={18} />}>
            {CLINIC.phone}
          </ButtonLink>
          <ButtonLink href={CLINIC_LINKS.naverBooking} variant="inverse" icon={<CalendarIcon size={18} />}>
            네이버 예약
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
