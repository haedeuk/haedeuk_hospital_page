import Image from 'next/image';
import Link from 'next/link';
import { listDoctors } from '@/lib/repository/doctors';
import DoctorRowActions from '../DoctorRowActions';
import styles from './DoctorTable.module.scss';

export default async function DoctorTable() {
  const doctors = await listDoctors();

  if (doctors.length === 0) {
    return <p className={styles.empty}>등록된 의사가 없습니다. 오른쪽 위 ‘의사 추가’로 등록해 주세요.</p>;
  }

  return (
    <ol className={styles.table}>
      {doctors.map((doctor, index) => (
        <li key={doctor.id} className={`${styles.row} ${doctor.isPublished ? '' : styles['row--hidden']}`}>
          <span className={styles.row__order}>{index + 1}</span>
          <span className={styles.row__photo}>
            {doctor.photoUrl ? (
              <Image src={doctor.photoUrl} alt="" fill sizes="56px" />
            ) : (
              <span aria-hidden="true">{doctor.name.charAt(0)}</span>
            )}
          </span>
          <span className={styles.row__info}>
            <Link className={styles.row__name} href={`/admin/doctors/${doctor.id}`}>
              {doctor.name}
            </Link>
            <span className={styles.row__meta}>
              {doctor.position} · 경력 {doctor.careers.length}줄
            </span>
          </span>
          <DoctorRowActions
            id={doctor.id}
            name={doctor.name}
            isPublished={doctor.isPublished}
            isFirst={index === 0}
            isLast={index === doctors.length - 1}
          />
        </li>
      ))}
    </ol>
  );
}
