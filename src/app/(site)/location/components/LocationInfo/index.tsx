import AccessList from '@/components/AccessList';
import ButtonLink from '@/components/ButtonLink';
import HoursList from '@/components/HoursList';
import { CalendarIcon, ChatIcon, ClockIcon, MapPinIcon, PhoneIcon, WalletIcon } from '@/components/Icons';
import KakaoMap from '@/components/KakaoMap';
import { CLINIC, CLINIC_ACCESS, CLINIC_LINKS } from '@/constants/clinic';
import AddressCopy from '../AddressCopy';
import styles from './LocationInfo.module.scss';

export default function LocationInfo() {
  return (
    <section className={styles.location} aria-label="위치와 진료시간">
      <div className={styles.location__inner}>
        <div className={styles.location__mapColumn}>
          <KakaoMap className={styles.location__map} />
          <div className={styles.location__access}>
            <h2 className={styles.location__heading}>
              <MapPinIcon size={18} />
              찾아오시는 길
            </h2>
            <p className={styles.location__landmark}>{CLINIC_ACCESS.landmark}</p>
            <AccessList />
          </div>
        </div>

        <div className={styles.location__panel}>
          <div className={styles.location__block}>
            <h2 className={styles.location__heading}>
              <MapPinIcon size={18} />
              주소
            </h2>
            <address className={styles.location__address}>{CLINIC.address.full}</address>
            <AddressCopy address={CLINIC.address.full} />
            <div className={styles.location__links}>
              <ButtonLink href={CLINIC_LINKS.naverPlace} variant="secondary" size="small">
                네이버 지도
              </ButtonLink>
              <ButtonLink href={CLINIC_LINKS.kakaoDirections} variant="secondary" size="small">
                카카오맵 길찾기
              </ButtonLink>
            </div>
          </div>

          <div className={styles.location__block}>
            <h2 className={styles.location__heading}>
              <PhoneIcon size={18} />
              전화와 예약
            </h2>
            <a className={styles.location__phone} href={CLINIC.phoneHref}>
              {CLINIC.phone}
            </a>
            <div className={styles.location__links}>
              <ButtonLink href={CLINIC_LINKS.naverBooking} size="small" icon={<CalendarIcon size={16} />}>
                네이버 예약
              </ButtonLink>
              <ButtonLink href={CLINIC_LINKS.naverTalk} variant="secondary" size="small" icon={<ChatIcon size={16} />}>
                네이버 톡톡 문의
              </ButtonLink>
            </div>
          </div>

          <div className={styles.location__block}>
            <h2 className={styles.location__heading}>
              <ClockIcon size={18} />
              진료시간
            </h2>
            <HoursList />
            <p className={styles.location__note}>입원은 당일에도 가능하고 365일 언제든 하실 수 있습니다.</p>
          </div>

          <div className={styles.location__block}>
            <h2 className={styles.location__heading}>
              <WalletIcon size={18} />
              결제와 편의시설
            </h2>
            <ul className={styles.location__chips}>
              {[...CLINIC_ACCESS.payments, ...CLINIC_ACCESS.amenities].map((item) => (
                <li key={item} className={styles.location__chip}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
