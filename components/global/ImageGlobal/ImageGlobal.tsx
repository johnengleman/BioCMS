import { useState } from 'react'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './styles.module.scss'

const ImageGlobal = ({
  src,
  height,
  width,
  fill,
  alt = '',
  priority = false,
  whiteBorder = false,
}: {
  src: string
  height?: number
  width?: number
  fill: boolean
  alt?: string
  priority?: boolean
  whiteBorder?: boolean
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      className={`${styles.imageGlobal} ${
        whiteBorder ? styles.whiteBorder : ''
      }`}
      style={{
        position: 'relative',
        height: fill ? '100%' : `${height}px`,
        width: fill ? '100%' : `${width}px`,
        minWidth: fill ? '100%' : `${width}px`,
      }}
    >
      <Skeleton
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: imageLoaded ? -1 : 1,
        }}
      />
      {fill ? (
        <Image
          src={src}
          fill={true}
          alt={alt}
          onLoad={() => setImageLoaded(true)}
          priority={priority}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      ) : (
        <Image
          src={src}
          fill={fill}
          width={width}
          height={height}
          alt={alt}
          priority={priority}
          onLoad={() => setImageLoaded(true)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
    </div>
  )
}

export default ImageGlobal
