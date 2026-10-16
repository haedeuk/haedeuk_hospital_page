import Image from 'next/image';
import { splitCareerTag } from '@/utils/ts/careers';
import type { Doctor } from '@/types/domain';
import styles from './DoctorCard.module.scss';

interface DoctorCardProps {
  doctor: Pick<Doctor, 'name' | 'position' | 'careers' | 'photoUrl'>;
  // 홈 미리보기처럼 경력을 몇 줄만 보여 줄 때
  careerLimit?: number;
  headingLevel?: 'h2' | 'h3';
  // 의료진 페이지: 사진이 있으면 왼쪽에 크게
  layout?: 'vertical' | 'horizontal';
}

// 사진이 없으면 큰 빈 칸을 두지 않고 이름 옆에 이니셜만 둔다.
export default function DoctorCard({
  doctor,
  careerLimit,
  headingLevel: Heading = 'h3',
  layout = 'vertical',
}: DoctorCardProps) {
  const careers = careerLimit ? doctor.careers.slice(0, careerLimit) : doctor.careers;
  const hasPhoto = Boolean(doctor.photoUrl);
  const classNames = [
    styles.doctor,
    layout === 'horizontal' ? styles['doctor--horizontal'] : '',
    hasPhoto ? styles['doctor--withPhoto'] : '',
  ].join(' ');

  return (
    <article className={classNames}>
      {doctor.photoUrl && (
        <div className={styles.doctor__photo}>
          <Image
            src={doctor.photoUrl}
            alt={`${doctor.name} ${doctor.position}`}
            fill
            sizes="(width <= 600px) 100vw, (width <= 900px) 50vw, 280px"
          />
        </div>
      )}
      <div className={styles.doctor__body}>
        <div className={styles.doctor__head}>
          {!hasPhoto && (
            <span className={styles.doctor__monogram} aria-hidden="true">
              {doctor.name.charAt(0)}
            </span>
          )}
          <div>
            <Heading className={styles.doctor__name}>{doctor.name}</Heading>
            <p className={styles.doctor__position}>{doctor.position}</p>
          </div>
        </div>
        {careers.length > 0 && (
          <ul className={styles.doctor__careers}>
            {careers.map((line) => {
              const { tag, text } = splitCareerTag(line);
              return (
                <li key={line} className={styles.doctor__career}>
                  {tag && (
                    <span className={`${styles.doctor__tag} ${tag === '현' ? styles['doctor__tag--current'] : ''}`}>
                      {tag}
                    </span>
                  )}
                  {text}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </article>
  );
}
