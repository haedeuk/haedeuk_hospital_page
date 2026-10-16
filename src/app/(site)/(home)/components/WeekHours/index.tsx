import { LUNCH_BREAK, OPENING_HOURS } from '@/constants/clinic';
import { formatClock } from '@/utils/ts/formatDate';
import { reveal } from '@/utils/ts/reveal';
import styles from './WeekHours.module.scss';

const DAY_LABELS: Record<string, string> = {
  Monday: '월',
  Tuesday: '화',
  Wednesday: '수',
  Thursday: '목',
  Friday: '금',
  Saturday: '토',
  Sunday: '일',
  PublicHolidays: '공휴일',
};

// 하루를 08시~21시 막대로 본다. 문 여는 시간이 같아 막대 길이가 곧 진료가 끝나는 시각이다.
const DAY_START = 8;
const DAY_END = 21;
const hourOf = (time: string) => Number.parseInt(time.split(':')[0], 10);

const DAYS = OPENING_HOURS.flatMap((hours) =>
  hours.days.map((day) => ({
    key: day,
    label: DAY_LABELS[day],
    open: hours.open,
    close: hours.close,
    ratio: (hourOf(hours.close) - DAY_START) / (DAY_END - DAY_START),
    isWeekend: hours.label !== '평일',
  })),
);

// 365일 진료라는 이 병원의 가장 큰 특징을 일주일 막대로 보여 준다.
export default function WeekHours() {
  return (
    <section className={styles.week} aria-labelledby="week-title">
      <div className={styles.week__inner}>
        <div className={styles.week__text} {...reveal()}>
          <h2 className={styles.week__title} id="week-title">
            365일 연중무휴
          </h2>
          <p className={styles.week__description}>
            {`일요일과 공휴일에도 진료합니다.\n점심시간은 ${formatClock(LUNCH_BREAK.open)}부터 ${formatClock(LUNCH_BREAK.close)}까지입니다.`}
          </p>
        </div>
        <ol className={styles.week__days} data-reveal-stagger="">
          {DAYS.map((day) => (
            <li
              key={day.key}
              className={`${styles.week__day} ${day.isWeekend ? styles['week__day--weekend'] : ''}`}
              {...reveal('fade')}
            >
              <span className={styles.week__label}>{day.label}</span>
              <span className={styles.week__track} aria-hidden="true">
                <span className={styles.week__bar} style={{ height: `${day.ratio * 100}%` }} />
              </span>
              <span className={styles.week__time}>
                <time dateTime={day.open}>{day.open}</time>
                <time dateTime={day.close}>{day.close}</time>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
