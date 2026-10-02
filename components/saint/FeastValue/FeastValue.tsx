'use client'

import { useTradition } from '../../../hooks/useTradition'

// The feast day in the visitor's tradition, else the other calendar.
// The static page has the Catholic date first; the browser swaps in
// the Orthodox date for an Orthodox visitor.
const FeastValue = ({
  catholic,
  orthodox,
}: {
  catholic?: string
  orthodox?: string
}) => {
  const { church } = useTradition()
  return (
    <>
      {church === 'orthodox'
        ? orthodox || catholic
        : catholic || orthodox}
    </>
  )
}

export default FeastValue
