import { useEffect, useState, useRef, useMemo } from 'react'
import * as S from './styles'
import Carousel from '../Carousel/Caorusel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { flushSync } from 'react-dom'
import Toggle from '../Toggle/Toggle'
import {
  faCalendarDays,
  faCameraRetro,
  faFire,
  faFamily,
} from '@fortawesome/pro-duotone-svg-icons'

const Filter = ({
  setFilter,
  selectedFilter,
  options,
  title,
}) => {
  const [isSticky, setIsSticky] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const originalOffsetTop = useRef<number>(0)
  const pageLoadedRef = useRef<boolean>(false)
  const canUseTransition = useRef<boolean>(false)

  if (typeof window !== 'undefined') {
    canUseTransition.current =
      typeof (document as any)?.startViewTransition ===
      'function'
  }

  useEffect(() => {
    const delayIncrement = 150 // Time in milliseconds. Adjust as necessary.

    options.forEach((_, i) => {
      setTimeout(() => {
        const slide = document.querySelector(
          `.embla__slide:nth-child(${i + 1})`,
        )
        slide?.classList.add('visible')
      }, i * delayIncrement)
    })
  }, [options])

  useEffect(() => {
    let isCurrentlySticky = false // Outside of the observer to track the state
    let refRef
    if (ref?.current) {
      refRef = ref?.current
    }

    const handleScroll = () => {
      if (
        window.scrollY < originalOffsetTop.current &&
        isCurrentlySticky
      ) {
        requestAnimationFrame(() => {
          //   setIsSticky(false)
          isCurrentlySticky = false
        })
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !isCurrentlySticky) {
          // setIsSticky(true)
          isCurrentlySticky = true
        }
      },
      {
        rootMargin: '-75px 0px 0px 0px', // Adjust as needed
      },
    )

    // window.addEventListener('scroll', handleScroll)

    if (ref.current) {
      originalOffsetTop.current = ref.current.offsetTop
      observer.observe(ref.current)
    }

    return () => {
      if (refRef) {
        observer.unobserve(refRef)
      }
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <S.Filter>
      <div className="content-container">
        <h1>Find a saint, find a friend.</h1>
        <p className="instruction">Use a preset?</p>
        <div className="bento-container">
          <div className="bento active">
            <h3>Patron Saints</h3>
            <FontAwesomeIcon
              icon={faFamily}
              style={{
                fontSize: '20px',
                '--fa-primary-color': '#ccad00',
                '--fa-secondary-color': '#ccad00',
              }}
            />
          </div>
          {/* <div className="bento">
          <h3>Top 100 Most Popular</h3>
          <FontAwesomeIcon
            icon={faFire}
            style={{
              fontSize: '20px',
              '--fa-primary-color': '#ccad00',
              '--fa-secondary-color': '#ccad00',
            }}
          />
        </div> */}
          <div className="bento">
            <h3>20th Century Saints</h3>
            <FontAwesomeIcon
              icon={faCameraRetro}
              style={{
                fontSize: '20px',
                '--fa-primary-color': '#ccad00',
                '--fa-secondary-color': '#ccad00',
              }}
            />
          </div>
          <div className="bento">
            <h3>Saints by Months</h3>
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{
                fontSize: '20px',
                '--fa-primary-color': '#ccad00',
                '--fa-secondary-color': '#ccad00',
              }}
            />
          </div>
        </div>
        <p className="instruction">Add a filter?</p>
        <div
          ref={wrapperRef}
          className="filter-container"
        >
          <div
            className={isSticky ? 'placeholder' : ''}
            style={{
              height: isSticky
                ? `${ref.current?.offsetHeight}px`
                : '0',
            }}
          ></div>
          <div
            ref={ref}
            className={
              isSticky
                ? 'slide-container sticky'
                : 'slide-container'
            }
          >
            {options?.map((filter, i) => {
              const filterLowerCase = filter.toLowerCase()
              return (
                <div
                  key={i}
                  className={`slide ${
                    filterLowerCase === selectedFilter
                      ? 'selected visible'
                      : pageLoadedRef.current
                      ? 'visible'
                      : ''
                  }`}
                  onClick={() => {
                    pageLoadedRef.current = true
                    if (canUseTransition.current) {
                      ;(
                        document as any
                      )?.startViewTransition(() => {
                        flushSync(() => {
                          setFilter(
                            selectedFilter !==
                              filterLowerCase
                              ? filter
                              : 'all',
                          )
                        })
                      })
                    } else {
                      setFilter(
                        selectedFilter !== filterLowerCase
                          ? filter
                          : 'all',
                      )
                    }
                  }}
                >
                  {filter.replace(/-/g, ' ')}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Toggle />
    </S.Filter>
  )
}

export default Filter
