'use client'

import Masonry from 'react-masonry-css'
import useBreakpoints from '../../../hooks/useBreakPoints'

const MasonryClient = ({ children }) => {
  const {
    isMobileS,
    isMobileM,
    isMobileL,
    isTablet,
    isLaptop,
  } = useBreakpoints()

  const getColumnsToRender = () => {
    if (isMobileS || isMobileM) {
      return 1
    }
    if (isMobileL) {
      return 1
    }
    if (isTablet) {
      return 3
    }
    if (isLaptop) {
      return 4
    }
    return 5
  }

  return (
    <Masonry
      breakpointCols={getColumnsToRender()}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {children}
    </Masonry>
  )
}

export default MasonryClient
