import Image from 'next/image';
import HeroLobby from '@/assets/images/hero-lobby.jpg';
import ButtonLink from '@/components/ButtonLink';
import { BedIcon, CalendarIcon, PhoneIcon } from '@/components/Icons';
import { CLINIC, CLINIC_LINKS } from '@/constants/clinic';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.hero__inner}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title} id="hero-title">
            체계적인 진료,
            <br />
            체질에 맞춘 처방
          </h1>
          <p className={styles.hero__description}>
            금천구 시흥사거리에서 365일 진료하고 입원실을 운영합니다. 충분한 상담으로 지금의 상태부터 살핀 뒤 치료를
            계획합니다.
          </p>
          <div className={styles.hero__actions}>
            <ButtonLink href={CLINIC.phoneHref} icon={<PhoneIcon size={18} />}>
              {CLINIC.phone}
            </ButtonLink>
            <ButtonLink href={CLINIC_LINKS.naverBooking} variant="secondary" icon={<CalendarIcon size={18} />}>
              네이버 예약
            </ButtonLink>
          </div>
        </div>

        <figure className={styles.hero__visual}>
          <div className={styles.hero__photo}>
            <Image
              src={HeroLobby}
              alt="대리석 벽과 금색 로고가 있는 해득금천한의원 로비"
              placeholder="blur"
              priority
              fill
              sizes="(width <= 900px) 100vw, 640px"
            />
          </div>
          <figcaption className={styles.hero__note}>
            <span className={styles.hero__noteIcon}>
              <BedIcon size={18} />
            </span>
            <span>
              <strong>입원실 운영</strong>
              <small>당일 입원도 가능합니다</small>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
