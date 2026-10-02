import { LuBadgeCheck, LuFileText, LuScale } from 'react-icons/lu'
import { statusKind } from '../../../utils/saintContent'
import styles from './styles.module.scss'

const ICONS = {
  approved: LuBadgeCheck,
  sworn: LuScale,
  reported: LuFileText,
}

// The status of a miracle account, as a small colored label:
// wine = approved by the Church, gold = sworn at a Church process,
// grey = a report.
const StatusPill = ({
  status,
  short,
}: {
  status: string
  short?: boolean
}) => {
  const kind = statusKind(status)
  const Icon = ICONS[kind]
  const text = short
    ? { approved: 'Approved', sworn: 'Sworn', reported: 'Reported' }[kind]
    : status.charAt(0).toUpperCase() + status.slice(1).replace(/\.$/, '')
  return (
    <span className={`${styles.pill} ${styles[kind]}`}>
      <Icon aria-hidden="true" />
      {text}
    </span>
  )
}

export default StatusPill
