import Image from 'next/image';
import { CheckIcon } from '@/components/Icons';
import type { Treatment } from '@/constants/treatments';
import styles from './TreatmentSection.module.scss';

interface TreatmentSectionProps {
  treatment: Treatment;
  isReversed: boolean;
}

// 이미지·글이 좌우로 번갈아 놓인다.
export default function TreatmentSection({ treatment, isReversed }: TreatmentSectionProps) {
  return (
    <section
      id={treatment.id}
      className={`${styles.section} ${isReversed ? styles['section--reversed'] : ''}`}
      aria-labelledby={`${treatment.id}-title`}
    >
      <figure className={styles.section__media}>
        <Image
          src={treatment.image}
          alt={treatment.alt}
          placeholder="blur"
          fill
          sizes="(width <= 900px) 100vw, 560px"
        />
      </figure>
      <div className={styles.section__body}>
        <h2 className={styles.section__title} id={`${treatment.id}-title`}>
          {treatment.title}
        </h2>
        <p className={styles.section__summary}>{treatment.summary}</p>
        <p className={styles.section__description}>{treatment.description}</p>
        <ul className={styles.section__points}>
          {treatment.points.map((point) => (
            <li key={point} className={styles.section__point}>
              <CheckIcon size={18} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
