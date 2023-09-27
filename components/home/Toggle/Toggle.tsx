import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from './styles.module.scss';

const Toggle = () => {
  const router = useRouter()
  const sort = router?.query?.sort || 'chronological-asc'
  const [showMenu, setShowMenu] = useState(false)

  const handleSetShowMenu = (sort) => {
    setShowMenu(false)
    const newQuery = {
      ...router.query,
      sort: sort.replace(/ /g, '').toLowerCase(),
    }
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <div className={styles.sortToggle}>
      <span
        className={styles.selected}
        onClick={() => setShowMenu(!showMenu)}
      >
        sort by <span className="direction">{sort}</span>
      </span>
      <div
        className={`${styles.dropdown} ${showMenu ? styles.visible : ''}`}
      >
        <ul>
          {/* <li
            onClick={() =>
              handleSetShowMenu('Newest - Asc')
            }
          >
            Newest - Asc
          </li>
          <li
            onClick={() =>
              handleSetShowMenu('Newest - Desc')
            }
          >
            Newest - Desc
          </li> */}
          <li
            onClick={() =>
              handleSetShowMenu('Chronological - Asc')
            }
          >
            Chronological - Asc
          </li>
          <li
            onClick={() =>
              handleSetShowMenu('Chronological - Desc')
            }
          >
            Chronological - Desc
          </li>
        </ul>
      </div>
      </div>
  )
}

export default Toggle
