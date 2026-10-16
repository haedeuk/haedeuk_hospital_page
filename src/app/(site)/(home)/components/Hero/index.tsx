import Image from 'next/image';
import LobbyPhoto from '@/assets/images/hero-2.jpg';
import ButtonLink from '@/components/ButtonLink';
import { CalendarIcon, PhoneIcon } from '@/components/Icons';
import { CLINIC, CLINIC_LINKS } from '@/constants/clinic';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.hero__inner}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title} id="hero-title">
            체계적인 진료
            <br />
            체질 맞춤 처방
          </h1>
          <p className={styles.hero__description}>
            아침 8시부터 진료합니다. 평일은 밤 9시, 주말과 공휴일은 오후 5시까지 문을 엽니다.
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

        <div className={styles.hero__visual}>
          <div className={styles.hero__photo}>
            <Image
              src={LobbyPhoto}
              alt="대리석 벽과 금색 로고가 있는 해득금천한의원 로비"
              placeholder="blur"
              priority
              quality={90}
              fill
              // 가로 사진을 칸에 맞춰 자르므로 실제로 그려지는 폭은 칸보다 넓다 (모바일 4:3 → 약 1.34배, 데스크톱 5:4 → 약 1.42배)
              sizes="(width <= 900px) 134vw, 880px"
            />
          </div>
          <div className={styles.hero__panel}>
            <p className={styles.hero__panelLabel}>365일 진료</p>
            <p className={styles.hero__panelTitle}>입원실을 운영합니다</p>
            <p className={styles.hero__panelText}>입원 치료가 필요하면 당일에도 입원하실 수 있습니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
