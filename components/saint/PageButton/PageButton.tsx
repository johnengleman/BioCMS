import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBooks,
  faFamily,
  faStarChristmas,
  faFeather,
  faWind,
  faFlowerTulip,
} from '@fortawesome/pro-regular-svg-icons'
import styles from './styles.module.scss'

const tocConfig = {
  biography: {
    backgroundColor: '#7d7b2e',
    icon: faFlowerTulip,
    name: 'Biography',
  },
  miracles: {
    backgroundColor: '#e61c18',
    icon: faStarChristmas,
    name: 'Miracles',
  },
  teachings: {
    backgroundColor: '#2b335d',
    icon: faFeather,
    name: 'Teachings',
  },
  legacy: {
    backgroundColor: '#2b5d51',
    icon: faWind,
    name: 'Legacy',
  },
  similarSaints: {
    backgroundColor: '#92a729',
    icon: faFamily,
    name: 'Similar Saints',
  },
  books: {
    backgroundColor: '#3e6f2b',
    icon: faBooks,
    name: 'Books',
  },
}

const PageButton = ({ type, active }) => {
  return (
    <button
      className={`${styles.pageButton}  ${
        active ? styles.active : ''
      }`}
    >
      <div
        className={styles.icon}
        style={{
          backgroundColor: tocConfig[type]?.backgroundColor,
        }}
      >
        <FontAwesomeIcon
          icon={tocConfig[type]?.icon}
          style={{
            color: `#fff`,
            fontSize: '16px',
          }}
        />
      </div>
      {tocConfig[type]?.name}
    </button>
  )
}

export default PageButton
