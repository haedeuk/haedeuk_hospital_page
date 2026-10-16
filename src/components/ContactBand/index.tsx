import ButtonLink from '@/components/ButtonLink';
import { CalendarIcon, PhoneIcon } from '@/components/Icons';
import { CLINIC, CLINIC_LINKS } from '@/constants/clinic';
import { reveal } from '@/utils/ts/reveal';
import styles from './ContactBand.module.scss';

// 하위 페이지 끝의 예약·문의 띠
export default function ContactBand() {
  return (
    <section className={styles.band} aria-labelledby="contact-band-title">
      <div className={styles.band__inner} {...reveal()}>
        <div className={styles.band__text}>
          <h2 className={styles.band__title} id="contact-band-title">
            예약과 문의
          </h2>
          <p className={styles.band__description}>
            {'평일은 저녁\u00a09시, 주말과 공휴일은 오후\u00a05시까지 진료합니다.\n전화나 네이버 예약으로 편하게 문의해 주세요.'}
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
