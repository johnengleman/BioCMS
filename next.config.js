/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['saints-cms.onrender.com'],
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
}

module.exports = nextConfig
