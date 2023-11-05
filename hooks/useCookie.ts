import { useEffect } from "react"
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const useCookie = () => {
  const router = useRouter()
  let cookie = '';

  useEffect(() => {
    cookie = Cookies.get('findasaint.com')

    if (cookie) {
      try {
        const data = JSON.parse(cookie)

        const newQuery = {
          ...router.query,
          church: data.church,
        }
        router.push(
          {
            pathname: router.pathname,
            query: newQuery,
          },
          undefined,
          { shallow: true },
        )
      } catch (err) {
        console.error(err)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return [cookie];
}

export default useCookie;