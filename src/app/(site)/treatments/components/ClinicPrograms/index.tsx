import SectionHeading from '@/components/SectionHeading';
import { CLINIC_PROGRAMS } from '@/constants/clinic';
import { reveal } from '@/utils/ts/reveal';
import styles from './ClinicPrograms.module.scss';

// 네이버 플레이스에 병원이 소개한 클리닉을 분야별로
export default function ClinicPrograms() {
  return (
    <section className={styles.programs} aria-labelledby="programs-title">
      <div className={styles.programs__inner}>
        <SectionHeading id="programs-title" title="분야별 클리닉" />
        <div className={styles.programs__grid} data-reveal-stagger="">
          {CLINIC_PROGRAMS.map((program) => (
            <div key={program.group} className={styles.programs__column} {...reveal()}>
              <h3 className={styles.programs__group}>{program.group}</h3>
              <ul className={styles.programs__items}>
                {program.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
