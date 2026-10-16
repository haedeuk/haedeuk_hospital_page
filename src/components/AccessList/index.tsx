import { BusIcon, ParkingIcon, TrainIcon } from '@/components/Icons';
import { CLINIC_ACCESS } from '@/constants/clinic';
import styles from './AccessList.module.scss';

// 지하철 · 버스 · 주차 안내 (네이버 플레이스에 병원이 등록한 정보)
export default function AccessList() {
  const { subway, bus, parking } = CLINIC_ACCESS;
  const items = [
    {
      icon: <TrainIcon size={20} />,
      label: '지하철',
      title: `${subway.line} ${subway.station} ${subway.exit}`,
      detail: subway.walk,
    },
    { icon: <BusIcon size={20} />, label: '버스', title: `${bus.stop} 정류장`, detail: bus.walk },
    {
      icon: <ParkingIcon size={20} />,
      label: '주차',
      title: `${parking.place} · ${parking.support}`,
      detail: parking.note,
    },
  ];

  return (
    <ul className={styles.access}>
      {items.map((item) => (
        <li key={item.label} className={styles.access__item}>
          <span className={styles.access__icon}>{item.icon}</span>
          <span className={styles.access__text}>
            <span className={styles.access__label}>{item.label}</span>
            <span className={styles.access__title}>{item.title}</span>
            <span className={styles.access__detail}>{item.detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
