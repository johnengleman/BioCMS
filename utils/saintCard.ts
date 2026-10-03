import parseList from './parseList'

// Small labels for the saint story cards (components/saint/SaintSummary).

// "2000-10-01" → { month: 10, day: 1 }. Read as text, so the day never
// shifts with time zones.
export const feastParts = (date?: string | null) => {
  const match = date?.match(/^\d{4}-(\d{2})-(\d{2})/)
  return match
    ? { month: Number(match[1]), day: Number(match[2]) }
    : null
}

// Plural category names as a short singular role ("Nuns" → "Nun").
const ROLES: Record<string, string> = {
  ascetics: 'Ascetic',
  bishops: 'Bishop',
  confessors: 'Confessor',
  converts: 'Convert',
  'fathers of the church': 'Church Father',
  'fools for christ': 'Fool for Christ',
  hermits: 'Hermit',
  'holy women': 'Holy woman',
  married: 'Married',
  martyrs: 'Martyr',
  'miracle workers': 'Miracle worker',
  missionaries: 'Missionary',
  monastics: 'Monastic',
  mothers: 'Mother',
  nuns: 'Nun',
  warriors: 'Warrior',
}

// The first category that names a role. "Patron Saints" is not a role.
export const roleLabel = (categories?: unknown) => {
  for (const raw of parseList(categories)) {
    const key = String(raw).replace(/_/g, ' ').trim().toLowerCase()
    if (ROLES[key]) return ROLES[key]
  }
  return ''
}

// The country of a place: "Lisieux, Normandy, France" → "France".
// Text in parentheses is dropped.
export const countryOf = (place?: string | null) => {
  if (!place) return ''
  const parts = place
    .replace(/\([^)]*\)/g, '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  return parts[parts.length - 1] || ''
}

export const placeLabel = (saint: {
  death_location?: string | null
  birth_location?: string | null
}) => countryOf(saint.death_location) || countryOf(saint.birth_location)

// "roman-catholic" → Catholic, "orthodox" → Orthodox, both → Both.
export const churchLabel = (venerated?: unknown) => {
  const list = parseList(venerated).map((item) =>
    String(item).toLowerCase(),
  )
  const catholic = list.some((item) => item.includes('catholic'))
  const orthodox = list.some((item) => item.includes('orthodox'))
  if (catholic && orthodox) return 'Both'
  if (catholic) return 'Catholic'
  if (orthodox) return 'Orthodox'
  return ''
}

// "1873–1897". One-sided dates read "d. 1966" or "b. 1873", and negative
// years read as BC, so a pill never shows a "?".
const yearText = (year: number) => (year < 0 ? `${-year} BC` : String(year))

export const yearsLabel = (birth?: number | null, death?: number | null) => {
  if (birth && death) {
    if (birth < 0 && death < 0) return `${-birth}–${yearText(death)}`
    if (birth < 0) return `${yearText(birth)}–AD ${death}`
    return `${yearText(birth)}–${yearText(death)}`
  }
  if (death) return `d. ${yearText(death)}`
  if (birth) return `b. ${yearText(birth)}`
  return ''
}
