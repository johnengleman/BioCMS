import FilterSimple from '../FilterSimple/FilterSimple'
import styles from './styles.module.scss'

const HeroSimple = ({ title, filtersCount }) => (
  <div className={styles.hero}>
    <div className={styles.heroContent}>
      <div className={styles.titleBox}>
        <h1>{title}</h1>
      </div>
      <FilterSimple
        filtersCount={filtersCount}
        sort={false}
      />
    </div>
  </div>
)

export default HeroSimple
