import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import { GALLERY } from '@/constants/gallery';
import styles from './Facilities.module.scss';

export default function Facilities() {
  return (
    <section className={styles.facilities} aria-labelledby="facilities-title">
      <div className={styles.facilities__inner}>
        <SectionHeading
          id="facilities-title"
          title="시설 둘러보기"
          description="로비부터 진료실, 치료실, 입원실까지 해득금천한의원의 공간을 소개합니다."
        />
        <ul className={styles.facilities__grid}>
          {GALLERY.map((item) => (
            <li key={item.caption} className={styles.facilities__item}>
              <figure className={styles.facilities__figure}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  placeholder="blur"
                  fill
                  sizes="(width <= 600px) 100vw, (width <= 900px) 50vw, 400px"
                />
                <figcaption className={styles.facilities__caption}>{item.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
