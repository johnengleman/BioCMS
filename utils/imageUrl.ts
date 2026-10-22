// One place that builds image URLs. No dependencies, so client
// components can use it.
//
// With NEXT_PUBLIC_IMAGE_HOST set (the R2 bucket's custom domain, for
// example https://images.findasaint.com), images are served straight
// from Cloudflare: the original from the bucket, resized by Cloudflare
// Image Transformations at /cdn-cgi/image/<options>/<file>. Directus
// is then only the place files are uploaded. Without it, URLs go to
// the Directus /assets route as before.
//
// The object key in the bucket is the file's `filename_disk` (the id
// plus its extension), under NEXT_PUBLIC_IMAGE_ROOT if Directus has a
// STORAGE_<LOCATION>_ROOT. A file record without `filename_disk` falls
// back to Directus.

export type ImageFile = {
  id: string
  filename_disk?: string | null
  [key: string]: any
}

export type ImageOptions = {
  width?: number
  height?: number
  // Both services crop to fill with "cover".
  fit?: 'cover' | 'contain'
  quality?: number
  // "auto" lets Cloudflare pick AVIF or WebP; Directus gets WebP.
  // "jpg" is for images that other sites fetch (Open Graph).
  format?: 'auto' | 'jpg'
}

const host = (process.env.NEXT_PUBLIC_IMAGE_HOST || '').replace(/\/+$/, '')
const root = (process.env.NEXT_PUBLIC_IMAGE_ROOT || '').replace(
  /^\/+|\/+$/g,
  '',
)
const assets = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS

export const imageUrl = (
  file: ImageFile | null | undefined,
  { width, height, fit, quality = 80, format = 'auto' }: ImageOptions = {},
) => {
  if (!file?.id) return ''

  if (host && file.filename_disk) {
    const options = [
      width && `width=${width}`,
      height && `height=${height}`,
      fit && `fit=${fit}`,
      `quality=${quality}`,
      `format=${format === 'jpg' ? 'jpeg' : 'auto'}`,
    ].filter(Boolean)
    const path = root
      ? `${root}/${file.filename_disk}`
      : file.filename_disk
    return `${host}/cdn-cgi/image/${options.join(',')}/${path}`
  }

  const query = new URLSearchParams()
  if (width) query.set('width', String(width))
  if (height) query.set('height', String(height))
  if (fit) query.set('fit', fit)
  query.set('format', format === 'jpg' ? 'jpg' : 'webp')
  query.set('quality', String(quality))
  return `${assets}/assets/${file.id}?${query}`
}
