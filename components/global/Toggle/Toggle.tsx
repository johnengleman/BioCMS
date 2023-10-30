import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useOnClickOutside } from 'usehooks-ts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const Toggle = () => {
  const router = useRouter()
  const ref = useRef(null)
  const sort = router?.query?.sort || 'date-asc'
  const [showMenu, setShowMenu] = useState(false)

  useOnClickOutside(ref, () => setShowMenu(false))

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
    <div
      className={styles.sortToggle}
      ref={ref}
    >
      <span
        className={styles.selected}
        onClick={() => setShowMenu(!showMenu)}
      >
        sorted by <span className="direction">{sort}</span>{' '}
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
            onClick={() => handleSetShowMenu('Date - Asc')}
          >
            Date Died - Asc
          </li>
          <li
            onClick={() => handleSetShowMenu('Date - Desc')}
          >
            Date Died - Desc
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Toggle
