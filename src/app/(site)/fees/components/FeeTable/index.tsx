import { CLINIC } from '@/constants/clinic';
import { getFees } from '@/lib/repository/fees';
import { formatDate } from '@/utils/ts/formatDate';
import { formatFee } from '@/utils/ts/formatFee';
import { groupFees, latestUpdatedAt } from '@/utils/ts/groupFees';
import styles from './FeeTable.module.scss';

export default async function FeeTable() {
  const fees = await getFees();
  const groups = groupFees(fees);
  const updatedAt = latestUpdatedAt(fees);

  return (
    <section className={styles.fees} aria-label="비급여 항목">
      <div className={styles.fees__inner}>
        <div className={styles.fees__meta}>
          {updatedAt && (
            <p>
              최종 수정일 <time dateTime={updatedAt.toISOString()}>{formatDate(updatedAt)}</time>
            </p>
          )}
        </div>

        {groups.map((group) => (
          <div key={group.category} className={styles.fees__group}>
            <h2 className={styles.fees__category}>
              {group.category}
              <span className={styles.fees__count}>{group.fees.length}개 항목</span>
            </h2>
            <table className={styles.fees__table}>
              <caption className="sr-only">{group.category} 비급여 항목과 비용</caption>
              <thead>
                <tr>
                  <th scope="col">명칭</th>
                  <th scope="col">비용</th>
                </tr>
              </thead>
              <tbody>
                {group.fees.map((fee) => (
                  <tr key={fee.id}>
                    <th scope="row">{fee.name}</th>
                    <td>{formatFee(fee.amount, fee.pricePrefix)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        <ul className={styles.fees__notice}>
          <li>진료비는 환자분의 상태와 치료 내용에 따라 달라질 수 있습니다.</li>
          <li>
            자세한 내용은 전화(<a href={CLINIC.phoneHref}>{CLINIC.phone}</a>)로 문의해 주세요.
          </li>
        </ul>
      </div>
    </section>
  );
}
