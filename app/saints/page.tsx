import type { Metadata } from 'next'
import SaintsPage from '../../components/candle/pages/SaintsPage'

// Built ahead of time and refreshed every four minutes.
export const revalidate = 240

export const metadata: Metadata = {
  title:
    'Catholic & Orthodox Saints: Lives, Miracles, Prayers',
  description:
    'Lives, miracles and prayers of the Catholic and Orthodox saints.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/saints`,
  },
}

const Saints = () => <SaintsPage />

export default Saints
