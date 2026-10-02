'use client'

import { useEffect } from 'react'
import { useTradition } from '../../../hooks/useTradition'
import type { Church } from '../../../utils/site'
import styles from './styles.module.scss'

const CHOICES: { value: Church; label: string }[] = [
  { value: 'catholic', label: 'Catholic' },
  { value: 'orthodox', label: 'Orthodox' },
  { value: 'all', label: 'Both traditions' },
]

// Asks a first-time visitor which tradition they want. It is a small
// panel at the bottom of the screen, not a blocking pop-up: the page
// stays readable, search engines see the page, and nothing moves when
// it appears. Closing it keeps "Both traditions". It is not on saint
// pages, where a visitor from a search came for one saint.
const TraditionWelcome = () => {
  const { asked, setChurch, dismiss } = useTradition()

  useEffect(() => {
    if (asked) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [asked, dismiss])

  // `asked` is true on the server, so this is not in the built HTML.
  if (asked) return null

  return (
    <section
      className={styles.welcome}
      role="dialog"
      aria-modal="false"
      aria-labelledby="tradition-welcome-title"
    >
      <button
        type="button"
        className={styles.close}
        onClick={dismiss}
        aria-label="Close and show both traditions"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <h2 id="tradition-welcome-title">
        Which tradition would you like to explore?
      </h2>
      <p>
        Choose Catholic saints, Orthodox saints, or both. You can
        change this at any time in the footer.
      </p>
      <div className={styles.choices}>
        {CHOICES.map((choice) => (
          <button
            key={choice.value}
            type="button"
            className={
              choice.value === 'all' ? styles.quiet : undefined
            }
            onClick={() => setChurch(choice.value)}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </section>
  )
}

export default TraditionWelcome
