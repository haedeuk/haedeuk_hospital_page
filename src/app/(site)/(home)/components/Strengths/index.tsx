import Image from 'next/image';
import Doc1 from '@/assets/images/gallery/doc1.png';
import SectionHeading from '@/components/SectionHeading';
import { STRENGTHS } from '@/constants/treatments';
import styles from './Strengths.module.scss';

export default function Strengths() {
  return (
    <section className={styles.strengths} aria-labelledby="strengths-title">
      <div className={styles.strengths__inner}>
        <figure className={styles.strengths__media}>
          <Image
            src={Doc1}
            alt="진료 책상과 추나 테이블이 놓인 해득금천한의원 원장 진료실"
            placeholder="blur"
            fill
            sizes="(width <= 900px) 100vw, 520px"
          />
        </figure>
        <div className={styles.strengths__body}>
          <SectionHeading
            id="strengths-title"
            title={'환자의 입장에서\n진료합니다'}
            description="편하신 시간에 내원하셔서 충분히 상담받으세요. 진찰부터 치료 계획까지 한 분씩 따로 세웁니다."
          />
          <ul className={styles.strengths__list}>
            {STRENGTHS.map((item) => (
              <li key={item.title} className={styles.strengths__item}>
                <h3 className={styles.strengths__title}>{item.title}</h3>
                <p className={styles.strengths__description}>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
