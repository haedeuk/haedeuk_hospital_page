import AccessList from '@/components/AccessList';
import ButtonLink from '@/components/ButtonLink';
import { CalendarIcon, PhoneIcon } from '@/components/Icons';
import KakaoMap from '@/components/KakaoMap';
import SectionHeading from '@/components/SectionHeading';
import { CLINIC, CLINIC_ACCESS, CLINIC_LINKS } from '@/constants/clinic';
import { reveal } from '@/utils/ts/reveal';
import styles from './VisitInfo.module.scss';

// 진료시간은 바로 위 WeekHours 가 보여 주므로 여기서는 찾아오는 길만 다룬다.
export default function VisitInfo() {
  return (
    <section className={styles.visit} aria-labelledby="visit-title">
      <div className={styles.visit__inner}>
        <div className={styles.visit__info}>
          <SectionHeading id="visit-title" title="오시는 길" description={`${CLINIC_ACCESS.landmark}입니다.`} />
          <address className={styles.visit__address} {...reveal()}>{CLINIC.address.full}</address>
          <AccessList />
          <div className={styles.visit__actions}>
            <ButtonLink href={CLINIC.phoneHref} icon={<PhoneIcon size={18} />}>
              {CLINIC.phone}
            </ButtonLink>
            <ButtonLink href={CLINIC_LINKS.naverBooking} variant="secondary" icon={<CalendarIcon size={18} />}>
              네이버 예약
            </ButtonLink>
          </div>
        </div>
        <div className={styles.visit__map} {...reveal('fade')}>
          <KakaoMap className={styles.visit__canvas} />
          <ButtonLink href="/location" variant="secondary" size="small">
            자세한 길 안내
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
