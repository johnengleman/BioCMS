// Straight quotes to curly ones (“ ” ‘ ’) in HTML or plain text. Only
// the text between tags changes, so attributes keep their quotes.

const OPENS_AFTER = /[\s([{—–-]/

const curl = (text: string) => {
  let out = ''
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const before = i === 0 ? ' ' : text[i - 1]
    if (char === '"') {
      out += OPENS_AFTER.test(before) ? '“' : '”'
    } else if (char === "'") {
      // An apostrophe inside a word ("didn't") or after one ("saints'").
      out += OPENS_AFTER.test(before) ? '‘' : '’'
    } else {
      out += char
    }
  }
  return out
}

const smartQuotes = (html = '') =>
  html
    .split(/(<[^>]*>)/)
    .map((part) =>
      part.startsWith('<')
        ? part
        : curl(part.replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")),
    )
    .join('')

export default smartQuotes
