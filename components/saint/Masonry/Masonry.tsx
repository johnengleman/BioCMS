'use client'

import Masonry from 'react-masonry-css'
import useBreakpoints from '../../../hooks/useBreakPoints'

const MasonryClient = ({
  children,
  hasLeftRail = false,
}) => {
  const {
    isMobileS,
    isMobileM,
    isMobileL,
    isTablet,
    isLaptop,
  } = useBreakpoints()

  const getColumnsToRender = () => {
    if (hasLeftRail) {
      if (isMobileS || isMobileM || isMobileL) {
        return 1
      }
      if (isTablet || isLaptop) {
        return 2
      }
      return 3
    } else {
      if (isMobileS || isMobileM) {
        return 1
      }
      if (isMobileL) {
        return 2
      }
      if (isLaptop || isTablet) {
        return 3
      }
      return 4
    }
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
