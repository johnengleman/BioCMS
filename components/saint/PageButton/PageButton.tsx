import React from 'react'
import {
  FaBook,
  FaUsers,
  FaStar,
  FaFeather,
  FaWind,
  FaSeedling,
  FaQuoteRight,
  FaCross,
  FaPray,
} from 'react-icons/fa'
import styles from './styles.module.scss'

const tocConfig = {
  biography: {
    backgroundColor: '#7d7b2e',
    icon: FaSeedling,
    name: 'Biography',
  },
  miracles: {
    backgroundColor: '#e61c18',
    icon: FaStar,
    name: 'Miracles',
  },
  teachings: {
    backgroundColor: '#2b335d',
    icon: FaFeather,
    name: 'Teachings',
  },
  legacy: {
    backgroundColor: '#2b5d51',
    icon: FaWind,
    name: 'Legacy',
  },
  similarSaints: {
    backgroundColor: '#92a729',
    icon: FaUsers,
    name: 'Similar Saints',
  },
  books: {
    backgroundColor: '#3e6f2b',
    icon: FaBook,
    name: 'Books',
  },
  quotes: {
    backgroundColor: '#323c2e',
    icon: FaQuoteRight,
    name: 'Quotes',
  },
  relics: {
    backgroundColor: '#73182e',
    icon: FaCross,
    name: 'Relics',
  },
  novenas: {
    backgroundColor: '#71855a',
    icon: FaPray,
    name: 'Novenas',
  },
}

const PageButton = ({
  type,
  bio,
  active,
}: {
  type: string
  bio: boolean
  active?: boolean
}) => {
  return (
    <button
      className={`${styles.pageButton} ${
        bio ? styles.bio : ''
      } ${active ? styles.active : ''}`}
    >
      <div
        className={styles.icon}
        style={{
          backgroundColor: tocConfig[type]?.backgroundColor,
        }}
      >
        {React.createElement(tocConfig[type]?.icon, {
          style: {
            color: '#fff',
            fontSize: '16px',
          },
        })}
      </div>
      {tocConfig[type]?.name}
    </button>
  )
}

export default PageButton
