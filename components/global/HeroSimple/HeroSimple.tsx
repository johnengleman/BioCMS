import FilterSimple from '../FilterSimple/FilterSimple.server'
import styles from './styles.module.scss'

const HeroSimple = ({ title, type, searchParams }) => (
  <div className={styles.hero}>
    <div className={styles.heroContent}>
      <div className={styles.titleBox}>
        <h1>{title}</h1>
      </div>
      <FilterSimple
        sort={false}
        type={type}
        searchParams={searchParams}
      />
    </div>
  </div>
)

export default HeroSimple
