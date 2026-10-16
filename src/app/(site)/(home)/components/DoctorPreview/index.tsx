import ButtonLink from '@/components/ButtonLink';
import DoctorCard from '@/components/DoctorCard';
import SectionHeading from '@/components/SectionHeading';
import { getPublishedDoctors } from '@/lib/repository/doctors';
import { reveal } from '@/utils/ts/reveal';
import styles from './DoctorPreview.module.scss';

// 의료진 미리보기 — 관리자 화면에서 노출·순서를 바꾸면 그대로 반영된다.
export default async function DoctorPreview() {
  const doctors = await getPublishedDoctors();
  if (doctors.length === 0) return null;

  return (
    <section className={styles.preview} aria-labelledby="doctor-preview-title">
      <div className={styles.preview__inner}>
        <div className={styles.preview__head}>
          <SectionHeading id="doctor-preview-title" title="의료진" />
          <ButtonLink href="/doctors" variant="secondary">
            경력 전체 보기
          </ButtonLink>
        </div>
        <ul className={styles.preview__list} data-reveal-stagger="">
          {doctors.map((doctor) => (
            <li key={doctor.id} {...reveal()}>
              <DoctorCard doctor={doctor} careerLimit={3} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
