import Image from 'next/image';
import Hero2 from '@/assets/images/hero-2.jpg';
import styles from './Philosophy.module.scss';

export default function Philosophy() {
  return (
    <section className={styles.philosophy} aria-labelledby="philosophy-title">
      <div className={styles.philosophy__inner}>
        <figure className={styles.philosophy__media}>
          <Image
            src={Hero2}
            alt="해득금천한의원 로비의 대리석 접수 데스크"
            placeholder="blur"
            fill
            sizes="(width <= 900px) 100vw, 560px"
          />
        </figure>
        <div className={styles.philosophy__text}>
          <h2 className={styles.philosophy__title} id="philosophy-title">
            환자의 입장에서
            <br />
            최선을 다하겠습니다
          </h2>
          <p className={styles.philosophy__body}>
            같은 통증이라도 원인과 체질, 생활 환경은 사람마다 다릅니다. 해득금천한의원은 충분한 상담과 진찰로 지금의
            상태를 먼저 살피고, 한 분 한 분에게 맞는 치료를 계획합니다.
          </p>
          <p className={styles.philosophy__body}>
            모든 환자분께서 건강을 회복하실 수 있도록, 정성과 진심을 다해 진료하겠습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
