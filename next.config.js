/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    NEXT_PUBLIC_DOMAINs: ['saints-cms.onrender.com'],
  },
  images: {
    unoptimized: true,
  },
  pageExtensions: [
    'page.tsx',
    'page.ts',
    'page.jsx',
    'page.js',
  ],
}

module.exports = nextConfig
