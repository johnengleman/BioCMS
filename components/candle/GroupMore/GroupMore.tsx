'use client'

import { useState } from 'react'
import styles from './styles.module.scss'

// "Show all 69 accounts": opens a long miracle group. Until then the
// group shows its first accounts only (CSS hides the rest; a search
// shows every match).
const GroupMore = ({ total }: { total: number }) => {
  const [open, setOpen] = useState(false)
  if (open) return null
  return (
    <button
      type="button"
      className={styles.more}
      onClick={(event) => {
        event.currentTarget
          .closest('[data-group]')
          ?.setAttribute('data-open', '')
        setOpen(true)
      }}
    >
      Show all {total.toLocaleString('en-US')} accounts
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  )
}

export default GroupMore
