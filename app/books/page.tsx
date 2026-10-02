import type { Metadata } from 'next'
import BooksPage from '../../components/candle/pages/BooksPage'

// Built ahead of time and refreshed every five minutes.
export const revalidate = 300

export const metadata: Metadata = {
  title: 'Books on the Saints: Lives, Teachings & Devotions',
  description:
    'Discover books on Catholic and Orthodox saints: theology, spiritual writings, history and devotions.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/books`,
  },
}

const Books = () => <BooksPage />

export default Books
