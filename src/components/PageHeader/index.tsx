import Link from 'next/link';
import styles from './PageHeader.module.scss';

interface PageHeaderProps {
  title: string;
  description: string;
  crumbs: readonly { name: string; path: string }[];
}

// 하위 페이지 머리. 페이지의 유일한 h1 이 여기 있다.
export default function PageHeader({ title, description, crumbs }: PageHeaderProps) {
  return (
    <section className={styles.header}>
      <div className={styles.header__inner}>
        <nav aria-label="현재 위치" className={styles.header__crumbs}>
          <ol>
            <li>
              <Link href="/">홈</Link>
            </li>
            {crumbs.map((crumb) => (
              <li key={crumb.path}>
                <Link href={crumb.path} aria-current="page">
                  {crumb.name}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <h1 className={styles.header__title}>{title}</h1>
        <p className={styles.header__description}>{description}</p>
      </div>
    </section>
  );
}
