import { getImageProps } from 'next/image';
import LogoGold from '@/assets/images/logo/logo-gold.png';
import LogoWhite from '@/assets/images/logo/logo-white.png';

interface LogoProps {
  className?: string;
  // inverse: 어두운 바탕(푸터) 전용 — 테마와 무관하게 흰 글자 로고
  tone?: 'auto' | 'inverse';
  priority?: boolean;
}

// 라이트는 금색·브라운 글자 로고, 다크는 흰 글자 로고로 OS 테마에 맞춰 바꾼다.
export default function Logo({ className, tone = 'auto', priority = false }: LogoProps) {
  const common = { alt: '해득금천한의원', sizes: '240px', priority };
  const { props: whiteProps } = getImageProps({ ...common, src: LogoWhite });

  if (tone === 'inverse') {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} {...whiteProps} />;
  }

  const { props: goldProps } = getImageProps({ ...common, src: LogoGold });
  return (
    <picture className={className}>
      <source media="(prefers-color-scheme: dark)" srcSet={whiteProps.srcSet} sizes="240px" />
      {}
      <img {...goldProps} />
    </picture>
  );
}
