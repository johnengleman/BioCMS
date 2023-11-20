function capitalize(str) {
  return str
    .replace('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
}
export default capitalize
