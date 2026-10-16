import DoctorCard from '@/components/DoctorCard';
import JsonLd from '@/components/JsonLd';
import { getPublishedDoctors } from '@/lib/repository/doctors';
import { physiciansJsonLd } from '@/lib/seo/jsonLd';
import { reveal } from '@/utils/ts/reveal';
import styles from './DoctorList.module.scss';

export default async function DoctorList() {
  const doctors = await getPublishedDoctors();

  return (
    <section className={styles.list} aria-label="의료진 목록">
      <div className={styles.list__inner}>
        {doctors.length === 0 ? (
          <p className={styles.list__empty}>의료진 정보를 준비하고 있습니다.</p>
        ) : (
          <ul className={styles.list__grid} data-reveal-stagger="">
            {doctors.map((doctor) => (
              <li key={doctor.id} {...reveal()}>
                <DoctorCard doctor={doctor} layout="horizontal" headingLevel="h2" />
              </li>
            ))}
          </ul>
        )}
      </div>
      <JsonLd data={physiciansJsonLd(doctors)} />
    </section>
  );
}
