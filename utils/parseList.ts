// Directus returns text fields with the "tags" interface (such as
// saints.categories) as a raw JSON string, e.g. '["monastics"]'.
// Normalize them to an array so components can map over them.
function parseList(value: unknown): string[] {
  if (Array.isArray(value)) return value
  if (typeof value !== 'string' || !value.trim()) return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed) ? parsed : [String(parsed)]
  } catch {
    return value.split(',').map((item) => item.trim()).filter(Boolean)
  }
}

export const withParsedCategories = <T extends { categories?: unknown }>(
  saint: T,
): T & { categories: string[] } =>
  saint && { ...saint, categories: parseList(saint.categories) }

export default parseList
