import { useState, useRef, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import CatholicCross from '../../global/Icons/CatholicCross/CatholicCross'
import OrthodoxCross from '../../global/Icons/OrthodoxCross/OrthodoxCross'
import styles from './styles.module.scss'

const ChurchToggle = () => {
  const router = useRouter()
  const [selectedChurch, setSelectedChurch] =
    useState('all')
  const [buttonDimensions, setButtonDimensions] = useState({
    offsetLeft: 211,
    width: 43,
    height: 26,
  })

  const churchToggleRef = useRef<HTMLUListElement | null>(
    null,
  )

  const updateToggle = (church = 'all') => {
    // Updates toggle to match cookie
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

  const updateCookieAndToggle = (e, church) => {
    setSelectedChurch(church)

    // Updates toggle
    const liElement = e.target.closest('li')
    setButtonDimensions({
      offsetLeft: liElement.offsetLeft,
      width: liElement.clientWidth,
      height: liElement.clientHeight,
    })

    // Updates toggle
    Cookies.set(
      'findasaint.com',
      JSON.stringify({ church: church }),
    )

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
    )
  }

  useEffect(() => {
    const cookie = Cookies.get('findasaint.com')

    if (cookie) {
      try {
        const data = JSON.parse(cookie)
        setSelectedChurch(data.church)
        updateToggle(data.church)
      } catch (err) {
        console.error(err)
      }
    } else {
      updateToggle('all')
    }
  }, [])

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
          className={`${
            selectedChurch === 'catholic'
              ? styles.active
              : ''
          }`}
          onClick={(e) =>
            updateCookieAndToggle(e, 'catholic')
          }
        >
          <CatholicCross />
          Roman <br />
          Catholic
        </li>
        <li
          data-church="orthodox"
          className={`${
            selectedChurch === 'orthodox'
              ? styles.active
              : ''
          }`}
          onClick={(e) =>
            updateCookieAndToggle(e, 'orthodox')
          }
        >
          <OrthodoxCross />
          Eastern <br /> Orthodox
        </li>
        <li
          data-church="all"
          className={`${
            selectedChurch === 'all' ? styles.active : ''
          }`}
          onClick={(e) => {
            updateCookieAndToggle(e, 'all')
          }}
        >
          All
        </li>
      </ul>
    </div>
  )
}

export default ChurchToggle
