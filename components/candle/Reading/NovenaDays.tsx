import styles from './novena.module.scss'

const WORDS = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
]

// The days of a novena, set like a prayer book: day links that stay
// in view, then one centered section per day.
const NovenaDays = ({ days }: { days: string[] }) => (
  <div className={styles.novena}>
    {days.length > 1 && (
      <nav
        className={styles.dayNav}
        aria-label="Days of the novena"
      >
        {days.map((_, i) => (
          <a
            key={i}
            href={`#day-${i + 1}`}
            aria-label={`Day ${i + 1}`}
          >
            {i + 1}
          </a>
        ))}
      </nav>
    )}
    {days.map((html, i) => (
      <section
        key={i}
        className={styles.day}
        aria-labelledby={`day-${i + 1}`}
      >
        <p className={styles.dayLabel}>Day</p>
        <h2 id={`day-${i + 1}`}>{WORDS[i] || i + 1}</h2>
        <div
          className={styles.prayer}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </section>
    ))}
  </div>
)

export default NovenaDays
