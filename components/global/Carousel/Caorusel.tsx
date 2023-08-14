import React, {
  useCallback,
  useState,
  useEffect,
} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import * as S from './styles'

const Carousel = ({ children, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
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
    <S.carousel>
      <div className="embla">
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
    </S.carousel>
  )
}

export default Carousel
