import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SaintsPage from '../../../../components/candle/pages/SaintsPage'
import { SAINT_CATEGORIES } from '../../../../utils/listParams'
import { properties } from '../../../../utils/properties'

// One page per category, built ahead of time and refreshed every five
// minutes. Any other name is a 404.
export const revalidate = 300
export const dynamicParams = false
export const generateStaticParams = () =>
  SAINT_CATEGORIES.map((category) => ({ category }))

type Props = { params: Promise<{ category: string }> }

const titleOf = (category: string) =>
  properties.saints.title[category] || category

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { category } = await params
  const name = titleOf(category)
  return {
    title: `${name} Saints: Catholic & Orthodox Lives and Miracles`,
    description: `Lives, miracles and prayers of the ${name.toLowerCase()} saints of the Catholic and Orthodox churches.`,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/saints/category/${category}`,
    },
  }
}

const Category = async ({ params }: Props) => {
  const { category } = await params
  if (!SAINT_CATEGORIES.includes(category)) notFound()
  return <SaintsPage category={category} />
}

export default Category
