'use client'

import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

// A thin wine bar under the header that fills as the reader moves
// through the element with the given id.
const ReadingProgress = ({
  targetId,
}: {
  targetId: string
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const target = document.getElementById(targetId)
      if (!target) return
      const rect = target.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const read = Math.min(
        Math.max(-rect.top, 0),
        Math.max(total, 1),
      )
      setProgress(total > 0 ? read / total : 0)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, {
      passive: true,
    })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [targetId])

  return (
    <div
      className={styles.track}
      aria-hidden="true"
    >
      <div
        className={styles.bar}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

export default ReadingProgress
