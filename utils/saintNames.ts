// Small helpers for saint names and feast days. No dependencies, so
// client components can use them.

// "St. John Maximovitch of Shanghai and San Francisco" ->
// title "St. John Maximovitch", subtitle "of Shanghai and San Francisco"
export const splitSaintName = (name = '') => {
  const index = name.indexOf(' of ')
  if (index < 0) return { title: name, subtitle: '' }
  return {
    title: name.slice(0, index),
    subtitle: name.slice(index + 1),
  }
}

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// Reads "2000-07-02" as text so the day never shifts with time zones.
export const formatFeast = (date?: string | null) => {
  const match = date?.match(/^\d{4}-(\d{2})-(\d{2})/)
  if (!match) return ''
  return `${MONTHS[Number(match[1]) - 1]} ${Number(match[2])}`
}
