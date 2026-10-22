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

// 4 -> "IV". Chapter and section numerals read as inscriptions.
const ROMAN: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

export const toRoman = (n: number) => {
  if (!Number.isInteger(n) || n < 1) return String(n)
  let rest = n
  let out = ''
  for (const [value, glyph] of ROMAN) {
    while (rest >= value) {
      out += glyph
      rest -= value
    }
  }
  return out
}

// "Holy Virgin Cathedral, Joy of All Who Sorrow, 6210 Geary …" ->
// "Holy Virgin Cathedral". The first part of a place, for a fact cell.
export const firstPart = (text?: string | null) =>
  (text || '').split(',')[0].trim()
