import React, {
  useCallback,
  useState,
  useEffect,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/pro-duotone-svg-icons'
import useEmblaCarousel from 'embla-carousel-react'
import styles from './styles.module.scss'

const Carousel = ({ children, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 'auto',
    align: 'start',
    skipSnaps: true,
    dragFree: true,
    ...options,
  })
  const [prevBtnDisabled, setPrevBtnDisabled] =
    useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] =
    useState(true)

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className={styles.carousel}>
      <div className={styles.embla}>
        <button
          className={`embla__prev ${
            prevBtnDisabled ? 'disabled' : ''
          }`}
          onClick={scrollPrev}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <div
          className="embla__viewport"
          ref={emblaRef}
        >
          <div className="embla__container">{children}</div>
        </div>
        <button
          className={`embla__next ${
            nextBtnDisabled ? 'disabled' : ''
          }`}
          onClick={scrollNext}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  )
}

export default Carousel
