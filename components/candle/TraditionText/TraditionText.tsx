'use client'

import type { ReactNode } from 'react'
import { useTradition } from '../../../hooks/useTradition'

// Text that depends on the visitor's tradition. The static page has
// the "Both traditions" text; the browser swaps it after it reads the
// saved choice.
const TraditionText = ({
  all,
  catholic,
  orthodox,
}: {
  all: ReactNode
  catholic: ReactNode
  orthodox: ReactNode
}) => {
  const { church } = useTradition()
  return (
    <>
      {church === 'orthodox'
        ? orthodox
        : church === 'catholic'
          ? catholic
          : all}
    </>
  )
}

export default TraditionText
