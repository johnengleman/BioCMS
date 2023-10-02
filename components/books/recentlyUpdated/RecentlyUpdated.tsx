import Carousel from '../../global/Carousel/Caorusel'
import styles from './styles.module.scss'

const RecentlyUpdated = ({
  children = [],
  title = '',
  options = {},
}) => (
  <div className={styles.recentlyUpdated}>
    <div className={styles.headerContainer}></div>
    <Carousel options={options}>{children}</Carousel>
  </div>
)

export default RecentlyUpdated
