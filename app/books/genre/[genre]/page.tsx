import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BooksPage from '../../../../components/candle/pages/BooksPage'
import { genreLabel } from '../../../../components/candle/BookCard/BookCard'
import { properties } from '../../../../utils/properties'

// One page per genre, built ahead of time and refreshed every four
// minutes. Any other value is a 404.
export const revalidate = 240
export const dynamicParams = false
export const generateStaticParams = () =>
  properties.books.presets.map((genre: string) => ({ genre }))

type Props = { params: Promise<{ genre: string }> }

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { genre } = await params
  return {
    title: `${genreLabel(genre)}: Books on the Saints`,
    description:
      'Discover books on Catholic and Orthodox saints: theology, spiritual writings, history and devotions.',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/books/genre/${genre}`,
    },
  }
}

const Genre = async ({ params }: Props) => {
  const { genre } = await params
  if (!properties.books.presets.includes(genre)) notFound()
  return <BooksPage genre={genre} />
}

export default Genre
