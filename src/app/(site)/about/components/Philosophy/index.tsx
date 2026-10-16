import Image from 'next/image';
import HeroLobby from '@/assets/images/hero-lobby.jpg';
import styles from './Philosophy.module.scss';

export default function Philosophy() {
  return (
    <section className={styles.philosophy} aria-labelledby="philosophy-title">
      <div className={styles.philosophy__inner}>
        <figure className={styles.philosophy__media}>
          <Image
            src={HeroLobby}
            alt="해득금천한의원 로비의 대리석 접수 데스크"
            placeholder="blur"
            fill
            sizes="(width <= 900px) 130vw, 730px"
          />
        </figure>
        <div className={styles.philosophy__text}>
          <h2 className={styles.philosophy__title} id="philosophy-title">
            금천구청역 가까이,
            <br />
            입원실을 갖춘 한의원
          </h2>
          <p className={styles.philosophy__body}>
            시흥사거리 현대시장 입구, 1호선 금천구청역 1번 출구에서 걸어서 10분 거리에 있습니다. 교통사고 후유증
            치료는 물론 재활 치료도 하고, 입원 치료가 필요하면 당일 입원과 상시 입원이 가능합니다.
          </p>
          <p className={styles.philosophy__body}>
            평일은 물론 주말과 공휴일에도 진료합니다. 편하신 시간에 내원하셔서 깊이 있고 꼼꼼한 상담을 받아 보세요.
          </p>
        </div>
      </div>
    </section>
  );
}
