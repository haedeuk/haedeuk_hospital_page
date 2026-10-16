import { reveal } from '@/utils/ts/reveal';
import styles from './SectionHeading.module.scss';
import type { ReactNode } from 'react';

interface SectionHeadingProps {
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  id?: string;
}

export default function SectionHeading({ title, description, align = 'left', id }: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${align === 'center' ? styles['heading--center'] : ''}`} {...reveal()}>
      <h2 className={styles.heading__title} id={id}>
        {title}
      </h2>
      {description && <p className={styles.heading__description}>{description}</p>}
    </div>
  );
}
