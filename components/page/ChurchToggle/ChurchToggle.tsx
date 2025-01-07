'use client'

import { useState, useRef, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import CatholicCross from '../../global/Icons/CatholicCross/CatholicCross'
import OrthodoxCross from '../../global/Icons/OrthodoxCross/OrthodoxCross'
import styles from './styles.module.scss'

const ChurchToggle = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
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

    // Updates cookie
    Cookies.set(
      'findasaint.com',
      JSON.stringify({ church: church }),
      {
        expires: 365,
        path: '/',
        secure: true,
        sameSite: 'Lax',
      },
    )

    const newSearchParams = new URLSearchParams(
      searchParams.toString(),
    )
    newSearchParams.set('church', church)

    router.replace(`/?${newSearchParams.toString()}`)
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
          onClick={(e) => updateCookieAndToggle(e, 'all')}
        >
          All
        </li>
      </ul>
    </div>
  )
}

export default ChurchToggle
