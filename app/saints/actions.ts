'use server'

import { getSaints } from '../../queries/getSaints'

// Loads the next saints for the waterfall on the server, so the
// browser never calls Directus directly (which CORS blocks).
export const loadMoreSaints = async (args: {
  church: string
  filter: string
  saintPreset?: string
  sort?: string
  offset: number
  limit: number
}) => (await getSaints(args)) || []
