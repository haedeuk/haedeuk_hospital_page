import Link from 'next/link';
import styles from './ButtonLink.module.scss';
import type { ReactNode } from 'react';

// accent·inverse 는 어두운 띠 위에서 쓴다
type Variant = 'primary' | 'secondary' | 'accent' | 'inverse';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: 'medium' | 'small';
  icon?: ReactNode;
  className?: string;
}

// 내부 경로는 next/link, 전화·외부 링크는 <a>. 외부 링크는 새 탭으로 연다.
export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'medium',
  icon,
  className,
}: ButtonLinkProps) {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    size === 'small' ? styles['button--small'] : '',
    className ?? '',
  ].join(' ');
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (href.startsWith('/')) {
    return (
      <Link className={classNames} href={href}>
        {content}
      </Link>
    );
  }

  const isExternal = href.startsWith('http');
  return (
    <a
      className={classNames}
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );
}
