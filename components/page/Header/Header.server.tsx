import HeaderClient from './Header.client'
import { getNav } from '../../../queries/getNav'
import { getChurch } from '../../../hooks/getChurch'
import Search from '../Search/Search.server'

const Header = async ({ searchParams }) => {
  const church = await getChurch(searchParams)
  const navData = await getNav({ church })

  return (
    <HeaderClient
      navData={navData}
      searchComponent={
        <Search searchParams={searchParams} />
      }
    />
  )
}

export default Header
