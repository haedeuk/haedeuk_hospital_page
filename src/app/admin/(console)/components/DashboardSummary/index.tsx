import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';
import { listDoctors } from '@/lib/repository/doctors';
import { getFees } from '@/lib/repository/fees';
import { formatDate } from '@/utils/ts/formatDate';
import { latestUpdatedAt } from '@/utils/ts/groupFees';
import styles from './DashboardSummary.module.scss';

export default async function DashboardSummary() {
  const [doctors, fees] = await Promise.all([listDoctors(), getFees()]);
  const published = doctors.filter((doctor) => doctor.isPublished).length;
  const doctorsUpdatedAt = latestUpdatedAt(doctors);
  const feesUpdatedAt = latestUpdatedAt(fees);

  const cards = [
    {
      href: '/admin/doctors',
      title: '의료진',
      value: `${doctors.length}명`,
      detail: `홈페이지 노출 ${published}명 · 숨김 ${doctors.length - published}명`,
      updatedAt: doctorsUpdatedAt,
    },
    {
      href: '/admin/fees',
      title: '비급여 항목',
      value: `${fees.length}개`,
      detail: '행위료 · 치료재료대 · 제증명수수료',
      updatedAt: feesUpdatedAt,
    },
  ];

  return (
    <ul className={styles.summary}>
      {cards.map((card) => (
        <li key={card.href}>
          <Link className={styles.summary__card} href={card.href}>
            <span className={styles.summary__title}>{card.title}</span>
            <span className={styles.summary__value}>{card.value}</span>
            <span className={styles.summary__detail}>{card.detail}</span>
            <span className={styles.summary__footer}>
              {card.updatedAt ? `최근 수정 ${formatDate(card.updatedAt)}` : '아직 데이터가 없습니다'}
              <ArrowRightIcon size={16} />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
