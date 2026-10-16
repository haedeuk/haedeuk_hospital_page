import styles from './PageSkeleton.module.scss';

interface PageSkeletonProps {
  // site: 공개 페이지(제목 + 카드 3장) / admin: 관리자 화면(제목 + 목록 줄)
  variant?: 'site' | 'admin';
}

// 서버에서 데이터를 읽는 동안 빈 화면 대신 보여 주는 뼈대. 실제 화면과 같은 자리에 같은 크기로 놓는다.
export default function PageSkeleton({ variant = 'site' }: PageSkeletonProps) {
  return (
    <div className={`${styles.skeleton} ${styles[`skeleton--${variant}`]}`} role="status" aria-live="polite">
      <span className="sr-only">불러오는 중입니다</span>
      <div className={styles.skeleton__head}>
        <span className={`${styles.skeleton__block} ${styles['skeleton__block--title']}`} />
        <span className={`${styles.skeleton__block} ${styles['skeleton__block--line']}`} />
      </div>
      {variant === 'site' ? (
        <div className={styles.skeleton__grid}>
          {[0, 1, 2].map((index) => (
            <span key={index} className={`${styles.skeleton__block} ${styles['skeleton__block--card']}`} />
          ))}
        </div>
      ) : (
        <div className={styles.skeleton__rows}>
          {[0, 1, 2, 3].map((index) => (
            <span key={index} className={`${styles.skeleton__block} ${styles['skeleton__block--row']}`} />
          ))}
        </div>
      )}
    </div>
  );
}
