// Site-wide settings for the "Travel" design (docs/redesign-plan.md).

// The prayer app. Replace with the App Store / Google Play page when it
// is public.
export const APP_URL = '/about#app'

export type Church = 'all' | 'catholic' | 'orthodox'

export const CHURCH_LABELS: Record<Church, string> = {
  all: 'Catholic and Orthodox saints',
  catholic: 'Catholic saints',
  orthodox: 'Orthodox saints',
}

// The photo behind the top of list pages follows the visitor's
// tradition. CC BY and CC BY-SA require the credit line, so it is shown
// on the photo.
export const HERO_PHOTOS: Record<
  Church,
  {
    src: string
    srcSmall: string
    alt: string
    position: string
    place: string
    author: string
    license: string
    licenseUrl: string
    sourceUrl: string
  }
> = {
  all: {
    src: '/images/hero/galilee.webp',
    srcSmall: '/images/hero/galilee-1200.webp',
    alt: 'Sunrise over the Sea of Galilee, with a fishing boat',
    position: 'center 70%',
    place: 'Sea of Galilee',
    author: 'Grant Barclay',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Israel_Sunrise_over_Sea_of_Galilee_(16037234180).jpg',
  },
  catholic: {
    src: '/images/hero/assisi.webp',
    srcSmall: '/images/hero/assisi-1200.webp',
    alt: 'Assisi and the Basilica of St. Francis at sunset',
    position: 'center 55%',
    place: 'Assisi, Italy',
    author: 'Roberto Berti © FAI',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Il_Bosco_di_San_Francesco,_Bene_FAI_ad_Assisi_(PG)_al_tramonto.jpg',
  },
  orthodox: {
    src: '/images/hero/meteora.webp',
    srcSmall: '/images/hero/meteora-1200.webp',
    alt: 'The monasteries of Meteora at sunset',
    position: 'center 62%',
    place: 'Meteora, Greece',
    author: 'Dimitris9444',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Meteora_Sunset.jpg',
  },
}

export const asChurch = (value?: string): Church =>
  value === 'catholic' || value === 'orthodox' ? value : 'all'
