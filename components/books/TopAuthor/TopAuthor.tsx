import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import styles from './styles.module.scss'

const TopAuthor = ({ images = {}, name = '' }) => (
  <div className={styles.topAuthor}>
    <ImageGlobal
      src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${images[0]?.directus_files_id.id}?key=search`}
      fill={false}
      width={35}
      height={35}
    />
    <div className={styles.name}>{name}</div>
  </div>
)

export default TopAuthor
