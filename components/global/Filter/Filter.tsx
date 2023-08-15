import { useEffect, useState, useRef, useMemo } from 'react'
import * as S from './styles'
import Carousel from '../Carousel/Caorusel'
import { flushSync } from 'react-dom'

const Filter = ({ setFilter, selectedFilter }) => {
  const [isSticky, setIsSticky] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const originalOffsetTop = useRef<number>(0)
  const pageLoadedRef = useRef<boolean>(false)
  const canUseTransition = useRef<boolean>(false);

  if(typeof window !== 'undefined') {
    canUseTransition.current = typeof (document as any)?.startViewTransition === 'function'
  }

  const filters = useMemo(
    () => [
      'All',
      'Martyrs',
      'Missionaries',
      'Fools-for-Christ',
      'Holy-Women',
      'Hermits',
      'Bishops',
      'Monastics',
      'Confessors',
      'Miracle Workers',
      'Patron Saints',
      'Converts',
      'Fathers of the Church',
      'Married',
      'Mothers',
      'Warriors',
    ],
    [],
  )

  useEffect(() => {
    const delayIncrement = 150 // Time in milliseconds. Adjust as necessary.

    filters.forEach((_, i) => {
      setTimeout(() => {
        const slide = document.querySelector(
          `.embla__slide:nth-child(${i + 1})`,
        )
        slide?.classList.add('visible')
      }, i * delayIncrement)
    })
  }, [filters])

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
              slidesToScroll: 3,
              align: 'start',
              loop: true,
            }}
          >
            {filters.map((filter, i) => (
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
                    (document as any)?.startViewTransition(() => {
                      flushSync(() => {
                        setFilter(
                          selectedFilter !== filter
                            ? filter
                            : 'All',
                        )
                      })
                    })
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

export default Filter
