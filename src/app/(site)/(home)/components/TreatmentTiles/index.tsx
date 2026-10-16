import Image from 'next/image';
import Link from 'next/link';
import ButtonLink from '@/components/ButtonLink';
import SectionHeading from '@/components/SectionHeading';
import { TREATMENTS } from '@/constants/treatments';
import styles from './TreatmentTiles.module.scss';

export default function TreatmentTiles() {
  return (
    <section className={styles.treatments} aria-labelledby="treatments-title">
      <div className={styles.treatments__inner}>
        <div className={styles.treatments__head}>
          <SectionHeading
            id="treatments-title"
            title="진료항목"
            description="증상과 체질을 함께 살펴 침, 약침, 추나, 한약, 입원 치료를 계획합니다."
          />
          <ButtonLink href="/treatments" variant="secondary">
            진료항목 자세히 보기
          </ButtonLink>
        </div>
        <ul className={styles.treatments__grid}>
          {TREATMENTS.map((treatment) => (
            <li key={treatment.id}>
              <Link className={styles.treatments__item} href={`/treatments#${treatment.id}`}>
                <span className={styles.treatments__media}>
                  <Image
                    src={treatment.image}
                    alt=""
                    placeholder="blur"
                    fill
                    sizes="(width <= 600px) 100vw, (width <= 900px) 50vw, 380px"
                  />
                </span>
                <span className={styles.treatments__title}>{treatment.title}</span>
                <span className={styles.treatments__summary}>{treatment.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
