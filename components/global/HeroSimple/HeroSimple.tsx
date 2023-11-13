import FilterSimple from '../FilterSimple/FilterSimple'
import styles from './styles.module.scss'

const HeroSimple = ({ title, filtersCount, type }) => (
  <div className={styles.hero}>
    <div className={styles.heroContent}>
      <div className={styles.titleBox}>
        <h1>{title}</h1>
      </div>
      <FilterSimple
        filtersCount={filtersCount}
        sort={false}
        type={type}
      />
    </div>
  </div>
)

export default HeroSimple
