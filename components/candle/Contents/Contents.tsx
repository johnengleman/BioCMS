'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type Item = {
  id: string
  title: string
  numbered?: boolean
}

// The contents of a long page. Marks the section being read: the last
// heading above the upper third of the screen.
const Contents = ({
  title = 'Contents',
  items,
}: {
  title?: string
  items: Item[]
}) => {
  const [active, setActive] = useState(items[0]?.id)

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

  let number = 0
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
                <span>{item.title}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Contents
