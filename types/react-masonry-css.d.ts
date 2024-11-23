// types/react-masonry-css.d.ts
declare module 'react-masonry-css' {
  import * as React from 'react'

  export interface MasonryProps {
    breakpointCols?: number | { [key: number]: number }
    className?: string
    columnClassName?: string
    children?: React.ReactNode
  }

  const Masonry: React.FC<MasonryProps>
  export default Masonry
}
