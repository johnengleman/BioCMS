import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useOnClickOutside } from 'usehooks-ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const Toggle = () => {
  const router = useRouter()
  const ref = useRef(null)
  const sort = router?.query?.sort || 'created-newest'
  const [showMenu, setShowMenu] = useState(false)

  useOnClickOutside(ref, () => setShowMenu(false))

  const handleSetShowMenu = (sort) => {
    setShowMenu(false)
    const newQuery = {
      ...router.query,
      sort: sort.replace(/ /g, '-').toLowerCase(),
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
    <div className={styles.sortToggleContainer}>
      <div
        className={styles.sortToggle}
        ref={ref}
      >
        <span
          className={styles.selected}
          onClick={() => setShowMenu(!showMenu)}
        >
          sort by{' '}
          <span className={styles.direction}>{sort}</span>
          <FontAwesomeIcon
            icon={faCaretUp}
            rotation={showMenu ? 180 : 90}
            size="lg"
          />
        </span>
        <div
          className={`${styles.dropdown} ${
            showMenu ? styles.visible : ''
          }`}
        >
          <ul>
            <li
              onClick={() =>
                handleSetShowMenu('died-oldest')
              }
            >
              Died - Oldest
            </li>
            <li
              onClick={() =>
                handleSetShowMenu('died-newest')
              }
            >
              Died - Newest
            </li>
            <li
              onClick={() =>
                handleSetShowMenu('created-oldest')
              }
            >
              Created - Oldest
            </li>
            <li
              onClick={() =>
                handleSetShowMenu('created-newest')
              }
            >
              Created - Newest
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Toggle
