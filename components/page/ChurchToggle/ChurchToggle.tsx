import {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react'
import { useRouter } from 'next/router'
import { SiteContext } from '../../../context/SiteContext'
import CatholicCross from '../../global/Icons/CatholicCross/CatholicCross'
import OrthodoxCross from '../../global/Icons/OrthodoxCross/OrthodoxCross'
import styles from './styles.module.scss'

const ChurchToggle = () => {
  const router = useRouter()
  const church = router.query.church || 'all'

  const { selectedChurch, setSelectedChurch } =
    useContext(SiteContext)
  const [buttonDimensions, setButtonDimensions] = useState({
    offsetLeft: 211,
    width: 43,
    height: 26,
  })

  const churchToggleRef = useRef<HTMLUListElement | null>(
    null,
  )

  const handleSetChurchFromQuery = (church = 'all') => {
    if (churchToggleRef.current) {
      const el = churchToggleRef.current.querySelector(
        `[data-church="${church}"]`,
      )

      if (el && el instanceof HTMLElement) {
        setButtonDimensions({
          offsetLeft: el.offsetLeft - 3,
          width: el.clientWidth,
          height: el.clientHeight,
        })
      }
    }
  }

  useEffect(() => {
    handleSetChurchFromQuery()
  }, [setSelectedChurch, church])

  useEffect(() => {
    if (church && !Array.isArray(church)) {
      setSelectedChurch(church)
      handleSetChurchFromQuery(church)
    }
  }, [setSelectedChurch, church])

  const handleSetChurch = (e, church) => {
    const liElement = e.target.closest('li')

    setButtonDimensions({
      offsetLeft: liElement.offsetLeft,
      width: liElement.clientWidth,
      height: liElement.clientHeight,
    })

    const newQuery = {
      ...router.query,
      church: church,
    }
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true },
    )

    setSelectedChurch(church)
  }

  return (
    <div className={styles.churchToggle}>
      <ul
        className={styles.switch}
        ref={churchToggleRef}
      >
        <div
          className={styles.button}
          style={{
            width: buttonDimensions.width,
            height: buttonDimensions.height,
            transform: `translateX(${buttonDimensions.offsetLeft}px)`,
          }}
        ></div>
        <li
          data-church="catholic"
          className={`${styles.option} ${
            selectedChurch === 'catholic'
              ? styles.active
              : ''
          }`}
          onClick={(e) => handleSetChurch(e, 'catholic')}
        >
          <CatholicCross />
          Roman <br />
          Catholic
        </li>
        <li
          data-church="orthodox"
          className={`${styles.option} ${
            selectedChurch === 'orthodox'
              ? styles.active
              : ''
          }`}
          onClick={(e) => handleSetChurch(e, 'orthodox')}
        >
          <OrthodoxCross />
          Eastern <br /> Orthodox
        </li>
        <li
          data-church="all"
          className={`${styles.option} ${
            selectedChurch === 'all' ? styles.active : ''
          }`}
          onClick={(e) => {
            handleSetChurch(e, 'all')
          }}
        >
          All
        </li>
      </ul>
    </div>
  )
}

export default ChurchToggle
