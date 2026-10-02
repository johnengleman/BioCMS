import {
  LuBookOpen,
  LuCamera,
  LuChurch,
  LuCrown,
  LuFeather,
  LuFlame,
  LuFlower2,
  LuGlobe,
  LuHand,
  LuHeartHandshake,
  LuLayoutGrid,
  LuMountain,
  LuRepeat2,
  LuShield,
  LuSmile,
  LuSparkles,
  LuStar,
  LuSun,
  LuUsers,
} from 'react-icons/lu'

const ICONS = {
  all: LuLayoutGrid,
  '20th_century_saints': LuCamera,
  patron_saints: LuStar,
  ascetics: LuSun,
  bishops: LuCrown,
  confessors: LuHand,
  converts: LuRepeat2,
  fathers_of_the_church: LuBookOpen,
  fools_for_christ: LuSmile,
  hermits: LuMountain,
  holy_women: LuFlower2,
  married: LuHeartHandshake,
  martyrs: LuFlame,
  miracle_workers: LuSparkles,
  missionaries: LuGlobe,
  monastics: LuChurch,
  mothers: LuUsers,
  nuns: LuFeather,
  warriors: LuShield,
}

// A small line icon for a saint filter ("Martyrs", "Bishops" …).
const CategoryIcon = ({ name }: { name: string }) => {
  const key = name.toLowerCase().replace(/\s+/g, '_')
  const Icon = ICONS[key]
  return Icon ? <Icon /> : null
}

export default CategoryIcon
