'use client'

import type { ReactNode } from 'react'
import { useTradition } from '../../../hooks/useTradition'
import { CHURCH_LABELS, asChurch } from '../../../utils/site'

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

// "Showing Catholic saints · Change"
export const TraditionShowing = ({
  prefix = 'Showing',
}: {
  prefix?: string
}) => {
  const { church } = useTradition()
  return (
    <>
      {prefix} {CHURCH_LABELS[asChurch(church)]} ·{' '}
      <a href="#site-footer">Change</a>
    </>
  )
}

export default TraditionText
