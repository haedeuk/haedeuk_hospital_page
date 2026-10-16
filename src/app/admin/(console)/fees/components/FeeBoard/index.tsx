import { FEE_CATEGORIES } from '@/constants/fees';
import { getFees } from '@/lib/repository/fees';
import FeeRow from '../FeeRow';
import NewFeeRow from '../NewFeeRow';
import styles from './FeeBoard.module.scss';

export default async function FeeBoard() {
  const fees = await getFees();

  // 항목이 하나도 없는 대분류에도 추가 버튼이 있어야 해서 groupFees 대신 전체 대분류를 돈다.
  return (
    <div className={styles.board}>
      {FEE_CATEGORIES.map((category) => {
        const items = fees.filter((fee) => fee.category === category).sort((a, b) => a.sortOrder - b.sortOrder);

        return (
          <section key={category} className={styles.board__group} aria-labelledby={`fee-${category}`}>
            <h2 className={styles.board__category} id={`fee-${category}`}>
              {category}
              <span className={styles.board__count}>{items.length}개</span>
            </h2>
            <div className={styles.board__labels} aria-hidden="true">
              <span>명칭</span>
              <span>접두어</span>
              <span>금액(원)</span>
              <span />
            </div>
            <ul className={styles.board__list}>
              {items.map((fee, index) => (
                <FeeRow key={fee.id} fee={fee} isFirst={index === 0} isLast={index === items.length - 1} />
              ))}
            </ul>
            <NewFeeRow category={category} />
          </section>
        );
      })}
    </div>
  );
}
