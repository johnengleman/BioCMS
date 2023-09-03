import { useEffect, useState, useRef, useMemo } from 'react'
import * as S from './styles'
import Carousel from '../Carousel/Caorusel'
import { flushSync } from 'react-dom'
import Header from '../../page/Header/Header'

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
          setIsSticky(false)
          isCurrentlySticky = false
        })
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !isCurrentlySticky) {
          setIsSticky(true)
          isCurrentlySticky = true
        }
      },
      {
        rootMargin: '-75px 0px 0px 0px', // Adjust as needed
      },
    )

    window.addEventListener('scroll', handleScroll)

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
      <Header>{title}</Header>
      <div ref={wrapperRef}>
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
          className={isSticky ? 'sticky' : ''}
        >
          <Carousel
            options={{
              slidesToScroll: 'auto',
              align: 'start',
              loop: true,
              skipSnaps: true,
              dragFree: true,
            }}
          >
            {options?.map((filter, i) => (
              <div
                key={i}
                className={`embla__slide ${
                  filter === selectedFilter
                    ? 'selected visible'
                    : pageLoadedRef.current
                    ? 'visible'
                    : ''
                }`}
                onClick={() => {
                  pageLoadedRef.current = true
                  if (canUseTransition.current) {
                    ;(document as any)?.startViewTransition(
                      () => {
                        flushSync(() => {
                          setFilter(
                            selectedFilter !== filter
                              ? filter
                              : 'All',
                          )
                        })
                      },
                    )
                  } else {
                    setFilter(
                      selectedFilter !== filter
                        ? filter
                        : 'All',
                    )
                  }
                }}
              >
                {filter.replace(/-/g, ' ')}
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </S.Filter>
  )
}

export default Filter;