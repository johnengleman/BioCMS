import { APP_URL } from '../../../utils/site'
import styles from './styles.module.scss'

// The prayer app, as one card in the saints waterfall. It is cream, so
// it stands out among the dark saint cards.
const AppCard = () => (
  <aside className={styles.card}>
    <div className={styles.kicker}>The Find a Saint app</div>
    <h3 className={styles.title}>Pray with the saints every day</h3>
    <p className={styles.text}>
      Daily prayers, novenas, and a quiet reminder on each feast day.
    </p>
    <a
      href={APP_URL}
      className={styles.button}
    >
      Get the app
    </a>
    <div
      className={styles.phone}
      aria-hidden="true"
    >
      <div className={styles.phoneTitle}>Today</div>
      <div className={styles.phoneSub}>Morning prayer</div>
      <div className={styles.row}>
        <i />
        <div>
          <b>Novena · Day 3 of 9</b>
          <span>3 min</span>
        </div>
      </div>
      <div className={styles.row}>
        <i />
        <div>
          <b>Litany of the saints</b>
          <span>5 min</span>
        </div>
      </div>
    </div>
  </aside>
)

export default AppCard
