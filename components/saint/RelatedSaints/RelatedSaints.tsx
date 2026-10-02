'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useTradition } from '../../../hooks/useTradition'
import { fetchRelated } from '../../../utils/api'
import SaintSummary from '../SaintSummary/SaintSummary'

// Three related saints in the visitor's tradition. They load in the
// browser from the cached /api/related, because the saint page itself
// is the same for every tradition. Shows nothing until saints arrive,
// so a saint with no related saints has no empty section.
const RelatedSaints = ({
  slug,
  categories,
  className,
  gridClassName,
  labelledBy,
  children,
}: {
  slug: string
  categories: string[]
  className?: string
  gridClassName?: string
  labelledBy?: string
  children: ReactNode
}) => {
  const { church } = useTradition()
  const [result, setResult] = useState<{
    key: string
    saints: any[]
  } | null>(null)
  const key = `${church}|${slug}`

  useEffect(() => {
    let current = true
    fetchRelated({
      slug,
      categories: categories.join(),
      church,
    })
      .then((saints) => {
        if (!current) return
        // Shuffled here so each visitor sees a different three.
        const shuffled = [...saints].sort(() => Math.random() - 0.5)
        setResult({ key, saints: shuffled.slice(0, 3) })
      })
      .catch(() => {})
    return () => {
      current = false
    }
    // `categories` is a new array each render; `key` stands for it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const saints = result?.key === key ? result.saints : []
  if (!saints.length) return null

  return (
    <section
      className={className}
      aria-labelledby={labelledBy}
    >
      {children}
      <div className={gridClassName}>
        {saints.map((saint) => (
          <SaintSummary
            key={saint.slug}
            data={saint}
          />
        ))}
      </div>
    </section>
  )
}

export default RelatedSaints
