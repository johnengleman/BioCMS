// W2 artboards: page screenshot at its exact width + 40 gap with numbered dots + 280 legend, on #EDEDED.
// Also takes state shots (menu open, bottom bar, sticky rail/facts after scroll).
// usage: node board.mjs   (needs playwright-core from the committee pw folder)
import { chromium } from '/tmp/claude-0/-home-user-BioCMS/b24ffc38-5532-532d-b028-dcbe71e5024a/scratchpad/pw/node_modules/playwright-core/index.mjs'
import fs from 'fs'
import path from 'path'

const W2 = path.dirname(new URL(import.meta.url).pathname)
const OUT = path.resolve(W2, '../../shots/round1')
const TMP = '/tmp/claude-0/-home-user-BioCMS/b24ffc38-5532-532d-b028-dcbe71e5024a/scratchpad/t'
fs.mkdirSync(TMP, { recursive: true })

const NOTES = {
  home: {
    '1': ['Glass header 56: logo, 6 nav links, search 400×36, “Get the app”.', 'Header 52: “Discover the Saints” 16/700, search pill, menu. The menu sheet holds nav, Categories, months, Sort.'],
    '2': ['Side index, x 24, w 232, sticky at 68. 9 non-empty categories, counts right.'],
    '3': ['Feast month 4 × 3 (50×28). One click. Empty months muted; dot = October.'],
    '4': ['Sort: Feast date · A–Z (A–Z ignores “St.”).'],
    '5': ['Photo credit on the photo, sticky with the rail. Galilee = Both.'],
    '5m': ['Photo y 52–140, credit on the photo at y 120.'],
    '6': ['Masonry x 268–1416: 4 × 278, gap 12, top 68. saints.json order, shortest column first.', 'Sheet from y 124, radius 16. Plain rows, 20 padding, hairlines.'],
    '7': ['Card: image 278×124 (≤ 1/3), kicker role · years, name 20, full summary 14.5, meta row 30.', 'Row: crop 343×104, kicker, name 19, full summary 15, meta.'],
    '8': ['Feasts differ: “Feast Aug 28 · Orth. Jun 15”; the place drops.'],
    '9': ['Footer 64: Catholic · Orthodox · Both (Both active), nav right.', 'Footer: tradition switch (Both active), nav.'],
  },
  saint: {
    '1': ['Glass header 56 with search on every page.', 'Header 52: “Discover the Saints” 16/700, search pill, menu.'],
    '5m': ['Credit on the photo strip, horizontal, first screen.'],
    '2': ['Identity column 240: portrait whole 205×320, no frame, caption.'],
    '3': ['Facts card #F5F5F5, sticky at 72 when the portrait leaves. “Pray in the app” 38.', 'Facts as plain rows (label 96), before the story, Feast first.'],
    '4': ['Kicker, then the name 48 (largest text), full summary 17.5, measure 680.', 'Kicker, name 36 full width, portrait 104×162 floated in the summary.'],
    '5': ['Tabs Life · Teachings · Relics, 44, sticky at 56. No Miracles tab.', 'Underline tabs 40, sticky at 52.'],
    '6': ['H2 26 with hairline. “Read the full life →” ends the Life row. 12 chapters in 2 columns.'],
    '7': ['Miracles: one quiet row after Relics, 48 h, 15 px muted.'],
    '8': ['Footer 64: tradition switch (Both active), nav.', 'Footer: tradition switch (Both active), nav.'],
  },
}

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--allow-file-access-from-files'], proxy: { server: process.env.HTTPS_PROXY } })

async function open(file, w, h) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, ignoreHTTPSErrors: true })
  const p = await ctx.newPage()
  await p.goto('file://' + file, { waitUntil: 'networkidle', timeout: 60000 })
  await p.evaluate(() => document.fonts.ready)
  await p.waitForTimeout(500)
  return { p, ctx }
}

async function board(page, w, h) {
  const { p, ctx } = await open(`${W2}/${page}.html`, w, h)
  const marks = await p.evaluate(() => {
    const seen = {}
    for (const el of document.querySelectorAll('[data-n]')) {
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height || seen[el.dataset.n]) continue
      seen[el.dataset.n] = { n: el.dataset.n, y: r.top + window.scrollY, h: r.height }
    }
    return Object.values(seen)
  })
  const sh = await p.evaluate(() => document.documentElement.scrollHeight)
  for (const full of [false, true]) {
    const img = `${TMP}/w2b-${page}-${w}${full ? '-full' : ''}.png`
    await p.screenshot({ path: img, fullPage: full })
    const H = full ? sh : h
    const phone = w < 760
    const items = marks.filter(m => m.y < H - 10).sort((a, c) => a.y - c.y)
    const legend = items.map((m, i) => {
      const t = NOTES[page][m.n] || ['']
      return { i: i + 1, y: Math.min(m.y + Math.min(m.h / 2, 18), H - 12), text: phone && t[1] ? t[1] : t[0] }
    })
    const dots = legend.map(l => `<div class="dot" style="top:${40 + l.y - 11}px">${l.i}</div>`).join('')
    const leg = legend.map(l => `<li><span class="d">${l.i}</span><span>${l.text}</span></li>`).join('')
    const html = `<!doctype html><html><head><meta charset="utf-8"><style>
      body{margin:0;background:#EDEDED;font-family:Inter,system-ui,sans-serif;color:#111}
      .ab{position:relative;display:flex;padding:40px;gap:40px;width:${w + 400}px}
      .pg{width:${w}px;height:${H}px;box-shadow:0 1px 3px rgba(0,0,0,.12);background:#fff}
      .pg img{display:block;width:${w}px}
      .dot{position:absolute;left:${40 + w + 9}px;width:22px;height:22px;border-radius:50%;background:#111;color:#fff;font-size:11.5px;font-weight:600;display:flex;align-items:center;justify-content:center}
      .lg{width:280px;font-size:13px;line-height:1.45}
      .lg h1{margin:0 0 4px;font-size:15px;font-weight:700}
      .lg p{margin:0 0 18px;color:#555;font-size:12.5px}
      ol{margin:0;padding:0;list-style:none}
      li{display:flex;gap:10px;padding:10px 0;border-top:1px solid #D6D6D6}
      .d{flex:none;width:22px;height:22px;border-radius:50%;background:#111;color:#fff;font-size:11.5px;font-weight:600;display:flex;align-items:center;justify-content:center}
      </style></head><body><div class="ab"><div class="pg"><img src="file://${img}"></div>
      <div class="lg"><h1>W2 Side index · ${page === 'home' ? 'Home' : 'Saint'} · ${w}</h1><p>${full ? 'Full page' : 'First screen'} · ${w}×${H}</p><ol>${leg}</ol></div>${dots}</div></body></html>`
    const bf = `${TMP}/w2b-${page}-${w}${full ? '-full' : ''}.html`
    fs.writeFileSync(bf, html)
    const c2 = await b.newContext({ viewport: { width: w + 400, height: H + 80 } })
    const p2 = await c2.newPage()
    await p2.goto('file://' + bf)
    await p2.waitForTimeout(300)
    await p2.screenshot({ path: `${OUT}/w2-${page}-${w}${full ? '-full' : ''}-board.png`, fullPage: true })
    await c2.close()
  }
  await ctx.close()
}

for (const pg of ['home', 'saint']) {
  await board(pg, 1440, 900)
  await board(pg, 375, 812)
}

// state shots
{
  const { p, ctx } = await open(`${W2}/home.html#menu`, 375, 812)
  await p.screenshot({ path: `${OUT}/w2-home-375-menu.png` }); await ctx.close()
}
{
  const { p, ctx } = await open(`${W2}/home.html`, 1440, 900)
  await p.evaluate(() => scrollTo(0, 900)); await p.waitForTimeout(300)
  await p.screenshot({ path: `${OUT}/w2-home-1440-scrolled.png` }); await ctx.close()
}
{
  const { p, ctx } = await open(`${W2}/saint.html`, 1440, 900)
  await p.evaluate(() => scrollTo(0, document.querySelector('#teachings').offsetTop - 40)); await p.waitForTimeout(300)
  await p.screenshot({ path: `${OUT}/w2-saint-1440-scrolled.png` }); await ctx.close()
}
{
  const { p, ctx } = await open(`${W2}/saint.html`, 375, 812)
  await p.evaluate(() => { const r = document.querySelector('#life').getBoundingClientRect(); scrollTo(0, r.top + scrollY - 120) })
  await p.waitForTimeout(500)
  const bar = await p.evaluate(() => document.querySelector('.bbar').classList.contains('show'))
  console.log('bottom bar shown after facts scroll away:', bar)
  await p.screenshot({ path: `${OUT}/w2-saint-375-scrolled.png` }); await ctx.close()
}
await b.close()
console.log('boards + state shots written to', OUT)
