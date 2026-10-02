/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  async redirects() {
    return [
      // The home page is the saints list.
      { source: '/', destination: '/saints', permanent: false },
    ]
  },
}

module.exports = nextConfig
