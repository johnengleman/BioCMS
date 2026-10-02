import parseList from './parseList'

// Small labels for the saint story cards (components/saint/SaintSummary).

const MONTHS_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

// "2000-10-01" → { month: 10, day: 1 }. Read as text, so the day never
// shifts with time zones.
export const feastParts = (date?: string | null) => {
  const match = date?.match(/^\d{4}-(\d{2})-(\d{2})/)
  return match
    ? { month: Number(match[1]), day: Number(match[2]) }
    : null
}

// "Oct 1"
export const feastShort = (date?: string | null) => {
  const parts = feastParts(date)
  return parts ? `${MONTHS_SHORT[parts.month - 1]} ${parts.day}` : ''
}

// The feast in the visitor's tradition, else the other calendar.
export const feastFor = (
  saint: {
    feast_day_catholic?: string | null
    feast_day_orthodox?: string | null
  },
  church?: string,
) =>
  church === 'orthodox'
    ? saint.feast_day_orthodox || saint.feast_day_catholic
    : saint.feast_day_catholic || saint.feast_day_orthodox

// Days from today to the next feast (0 = today), in local time.
export const daysUntilFeast = (date?: string | null) => {
  const parts = feastParts(date)
  if (!parts) return null
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  let next = new Date(now.getFullYear(), parts.month - 1, parts.day)
  if (next < today) {
    next = new Date(now.getFullYear() + 1, parts.month - 1, parts.day)
  }
  return Math.round((next.getTime() - today.getTime()) / 86400000)
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

export const yearsLabel = (birth?: number | null, death?: number | null) =>
  birth || death ? `${birth || '?'}–${death || '?'}` : ''
