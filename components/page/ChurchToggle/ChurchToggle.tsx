import {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react'
import { useRouter } from 'next/router'
import { ChurchContext } from '../../../context/ChurchContext'
import CatholicCross from '../../global/Icons/CatholicCross/CatholicCross'
import OrthodoxCross from '../../global/Icons/OrthodoxCross/OrthodoxCross'
import * as S from './styles'

const ChurchToggle = () => {
  const router = useRouter()
  const church = router.query.church || 'all'

  const { selectedChurch, setSelectedChurch } =
    useContext(ChurchContext)
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
          offsetLeft: el.offsetLeft,
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
      church,
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
    <S.ChurchToggle>
      <ul
        className="switch"
        ref={churchToggleRef}
      >
        <div
          className="button"
          style={{
            width: buttonDimensions.width,
            height: buttonDimensions.height,
            transform: `translateX(${buttonDimensions.offsetLeft}px)`,
          }}
        ></div>
        <li
          data-church="catholic"
          className={`option ${
            selectedChurch === 'catholic' ? 'active' : ''
          }`}
          onClick={(e) => handleSetChurch(e, 'catholic')}
        >
          <CatholicCross />
          Roman <br />
          Catholic
        </li>
        <li
          data-church="orthodox"
          className={`option ${
            selectedChurch === 'orthodox' ? 'active' : ''
          }`}
          onClick={(e) => handleSetChurch(e, 'orthodox')}
        >
          <OrthodoxCross />
          Eastern <br /> Orthodox
        </li>
        <li
          data-church="all"
          className={`option ${
            selectedChurch === 'all' ? 'active' : ''
          }`}
          onClick={(e) => {
            handleSetChurch(e, 'all')
          }}
        >
          All
        </li>
      </ul>
    </S.ChurchToggle>
  )
}

export default ChurchToggle
