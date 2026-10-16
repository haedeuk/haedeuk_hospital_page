import Image from 'next/image';
import ButtonLink from '@/components/ButtonLink';
import SectionHeading from '@/components/SectionHeading';
import { GALLERY } from '@/constants/gallery';
import styles from './BentoGallery.module.scss';

// 로비, 진료실, 치료실, 입원실, 입구 다섯 장을 격자로
const PICKS = ['로비와 접수', '진료실', '치료실', '입원실', '한의원 입구'];
const ITEMS = PICKS.map((caption) => GALLERY.find((item) => item.caption === caption)).filter((item) => item !== undefined);

export default function BentoGallery() {
  return (
    <section className={styles.bento} aria-labelledby="bento-title">
      <div className={styles.bento__inner}>
        <div className={styles.bento__head}>
          <SectionHeading
            id="bento-title"
            title="한의원 둘러보기"
            description="실제 해득금천한의원의 로비, 진료실, 치료실, 입원실입니다."
          />
          <ButtonLink href="/about" variant="secondary">
            시설 사진 더 보기
          </ButtonLink>
        </div>
        <ul className={styles.bento__grid}>
          {ITEMS.map((item, index) => (
            <li key={item.caption} className={styles.bento__item}>
              <figure className={styles.bento__figure}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  placeholder="blur"
                  fill
                  sizes={index === 0 ? '(width <= 900px) 100vw, 600px' : '(width <= 900px) 50vw, 300px'}
                />
              </figure>
              <span className={styles.bento__caption}>{item.caption}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
