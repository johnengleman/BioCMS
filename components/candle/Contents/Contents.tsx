'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

type Item = {
  id: string
  title: string
  numbered?: boolean
}

// "Cases examined by a Church inquiry (5)" → title and count.
const split = (title: string) => {
  const match = title.match(/^(.*)\s\((\d[\d,]*)\)$/)
  return match
    ? { text: match[1], count: match[2] }
    : { text: title, count: '' }
}

// The contents of a long page. Marks the section being read: the last
// heading above the upper third of the screen.
// `rail`: a list with numbers and counts. Reading progress is the line
// under the header (ReadingProgress), so the rail has no bar of its own.
// `chips`: a sideways row of chips for phones.
const Contents = ({
  title = 'Contents',
  items,
  variant = 'rail',
}: {
  title?: string
  items: Item[]
  variant?: 'rail' | 'chips'
}) => {
  const [active, setActive] = useState(items[0]?.id)
  const chipsRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]
    if (!targets.length) return
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight / 3
      let current = targets[0]
      for (const target of targets) {
        if (target.getBoundingClientRect().top > line) break
        current = target
      }
      setActive(current.id)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, {
      passive: true,
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [items])

  // Keep the active chip in view on phones.
  useEffect(() => {
    if (variant !== 'chips') return
    const chip = chipsRef.current?.querySelector<HTMLElement>(
      '[aria-current="true"]',
    )
    const row = chipsRef.current
    if (chip && row) {
      row.scrollTo({
        left: chip.offsetLeft - 16,
        behavior: 'smooth',
      })
    }
  }, [active, variant])

  let number = 0
  if (variant === 'chips') {
    return (
      <nav
        className={styles.chips}
        aria-label={title}
      >
        <ol ref={chipsRef}>
          {items.map((item) => {
            const { text, count } = split(item.title)
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={
                    active === item.id ? 'true' : undefined
                  }
                >
                  {text.split(/[,:]/)[0]}
                  {count && <em>{count}</em>}
                </a>
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  return (
    <nav
      className={styles.contents}
      aria-label={title}
    >
      <h2>{title}</h2>
      <ol>
        {items.map((item) => {
          const numbered = item.numbered !== false
          if (numbered) number++
          const { text, count } = split(item.title)
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={
                  active === item.id ? 'true' : undefined
                }
              >
                <span className={styles.number}>
                  {numbered ? number : ''}
                </span>
                <span>{text}</span>
                {count && <em>{count}</em>}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Contents
