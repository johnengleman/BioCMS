// Fails if any page was not built ahead of time.
//
// Every page must be static: no cookies(), headers() or searchParams,
// because the site is cached at the edge. Run it after `next build`
// (npm run build does). It reads the build's own route lists, so it
// works on any host. API routes may be dynamic.
import { readFileSync } from 'node:fs'

const read = (file) => JSON.parse(readFileSync(file, 'utf8'))

const pages = Object.entries(read('.next/app-path-routes-manifest.json'))
  .filter(([key]) => key.endsWith('/page'))
  .map(([, route]) => route)

const prerender = read('.next/prerender-manifest.json')
const built = new Set([
  ...Object.keys(prerender.routes),
  ...Object.keys(prerender.dynamicRoutes),
])

const dynamicPages = pages.filter((route) => !built.has(route))

if (dynamicPages.length) {
  console.error(
    `\nThese pages are rendered on every request (not static):\n  ${dynamicPages.join('\n  ')}\n\n` +
      'Remove cookies(), headers(), searchParams or connection() from them.\n',
  )
  process.exit(1)
}
console.log(`check-static: all ${pages.length} pages are static.`)
