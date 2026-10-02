'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type Photo = {
  src: string
  srcSmall: string
  alt: string
  position: string
}

// The hero photo. When the tradition changes, the new photo fades in
// over the old one instead of replacing it at once.
const HeroPhoto = ({ photo }: { photo: Photo }) => {
  const [shown, setShown] = useState(photo)
  const [previous, setPrevious] = useState<Photo | null>(null)

  useEffect(() => {
    if (photo.src === shown.src) return
    setPrevious(shown)
    setShown(photo)
    const timer = window.setTimeout(() => setPrevious(null), 900)
    return () => window.clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photo.src])

  const image = (p: Photo, className: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={p.src}
      className={className}
      src={p.src}
      srcSet={`${p.srcSmall} 1200w, ${p.src} 2400w`}
      sizes="100vw"
      alt={p.alt}
      style={{ objectPosition: p.position }}
      fetchPriority="high"
    />
  )

  return (
    <div className={styles.photo}>
      {previous && image(previous, styles.previous)}
      {image(shown, previous ? styles.fadeIn : '')}
    </div>
  )
}

export default HeroPhoto
