import Image from 'next/image';
import Doc1 from '@/assets/images/gallery/doc1.png';
import SectionHeading from '@/components/SectionHeading';
import { STRENGTHS } from '@/constants/treatments';
import { reveal } from '@/utils/ts/reveal';
import styles from './Strengths.module.scss';

export default function Strengths() {
  return (
    <section className={styles.strengths} aria-labelledby="strengths-title">
      <div className={styles.strengths__inner}>
        <figure className={styles.strengths__media} {...reveal('zoom')}>
          <Image
            src={Doc1}
            alt="진료 책상과 추나 테이블이 놓인 해득금천한의원 원장 진료실"
            placeholder="blur"
            fill
            sizes="(width <= 900px) 118vw, 680px"
          />
        </figure>
        <div className={styles.strengths__body}>
          <SectionHeading
            id="strengths-title"
            title={'환자의 입장에서\n최선을 다하겠습니다'}
            description={'편하신 시간에 오셔서\n충분히 상담받아 보세요.'}
          />
          <ul className={styles.strengths__list} data-reveal-stagger="">
            {STRENGTHS.map((item) => (
              <li key={item.title} className={styles.strengths__item} {...reveal()}>
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
