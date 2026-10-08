// Artboards for W3: page screenshot (exact width) + 40 gap with numbered dots + 280 legend, on #EDEDED.
// The page pixels are the untouched screenshots from shoot.sh; nothing is drawn on the page.
// Run after shoot.sh:  node board.mjs
import { chromium } from '/tmp/claude-0/-home-user-BioCMS/b24ffc38-5532-532d-b028-dcbe71e5024a/scratchpad/pw/node_modules/playwright-core/index.mjs'
import fs from 'node:fs'

const W3 = '/home/user/BioCMS/prototypes/wireframes/w3'
const S = '/home/user/BioCMS/prototypes/shots/round1'
const NOTES = {
  'home-d': {
    1: 'Header on the photo, no fill: logo, 6 links, Get the app. After scroll: 56 px glass bar with search 360 and Browse ▾.',
    2: 'Search pill 560×48, centred. Placeholder only, no label.',
    3: 'Photo credit on the photo, linked, 11.5 px white 85 %.',
    4: 'Index tile = item 1 of column 1, not sticky: October · 3, categories, feast months, sort.',
    5: 'Card: fixed crop 256×104, kicker, name, full summary, meta row 30.',
    6: 'Feasts differ: "Feast Aug 28 · Orth. Jun 15"; the place drops.',
    7: 'Footer: Catholic · Orthodox · Both. Both is active.',
  },
  'home-m': {
    1: 'Header 52: mark, name, menu. After scroll, the search moves into it.',
    2: 'Search pill 343×44 on the photo.',
    3: 'Photo credit on the photo.',
    4: 'Plain rows: kicker, name, crop 343×96, full summary, meta. Hairlines.',
    5: 'Fixed bar 56: Saints · Feasts · Categories · Sort. Each opens a sheet.',
    6: 'Footer: tradition switch, nav.',
  },
  'saint-d': {
    1: 'Name 48, full width, the largest text. After scroll the 56 px header shows the name and Life · Teachings · Relics.',
    2: 'Summary in full, 17.5/1.6, measure 680.',
    3: 'Infobox 320: portrait whole, 154×240 on #F5F5F5, caption.',
    4: 'Facts stick at 72. One button: Pray in the app.',
    5: 'Life: 12 chapters, 2 columns, 38 h rows. "Read the full life →" ends the H2 row.',
    6: 'Words and teachings: 6 themes + 2 quotes at 20/1.4.',
    7: 'Relics: place + 2 sentences.',
    8: 'Miracles: one quiet row, last. No tab.',
    9: 'Footer: Catholic · Orthodox · Both.',
    10: 'Photo credit on the photo.',
  },
  'saint-m': {
    1: 'Header 52: mark, search, menu. No photo on the phone saint page.',
    2: 'Name 36 with the whole portrait 96×150 and caption.',
    3: 'Facts as plain rows before the story. Feast first.',
    4: 'Life: one column of chapter rows.',
    5: 'Miracles: one quiet row, last.',
    6: 'Bottom bar: Life · Teachings · Relics + Pray (88). No feast, so nothing repeats.',
    7: 'Footer: tradition switch, nav.',
  },
}
const TITLES = { home: 'Home', saint: 'Saint page' }

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--allow-file-access-from-files'], proxy: { server: process.env.HTTPS_PROXY } })

async function measure(page, w, h) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } })
  const p = await ctx.newPage()
  await p.goto('file://' + `${W3}/${page}.html`, { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500)
  const attr = w > 700 ? 'data-d' : 'data-m'
  const pts = await p.evaluate((attr) => [...document.querySelectorAll(`[${attr}]`)].map(el => {
    const r = el.getBoundingClientRect(); const cs = getComputedStyle(el)
    if (!r.width || cs.display === 'none') return null
    return { n: +el.getAttribute(attr), y: r.top + scrollY + Math.min(r.height / 2, 14) }
  }).filter(Boolean), attr)
  const sh = await p.evaluate(() => document.documentElement.scrollHeight)
  await ctx.close()
  return { pts, sh }
}

async function board(page, w, full) {
  const vh = w > 700 ? 900 : 812
  const key = `${page}-${w > 700 ? 'd' : 'm'}`
  let { pts, sh } = await measure(page, w, vh)
  if (full && w <= 700) pts = (await measure(page, w, sh)).pts   // phone full shot uses a page-tall viewport
  const img = `${S}/w3-${page}-${w}${full ? '-full' : ''}.png`
  const H = full ? sh : vh
  if (!full) pts = pts.filter(p => p.y < vh - 8)
  pts.sort((a, b) => a.y - b.y)
  let last = -99; for (const p of pts) { if (p.y < last + 26) p.y = last + 26; last = p.y }
  // display numbers follow the reading order on this board
  const order = [...new Set(pts.map(p => p.n))]; const num = n => order.indexOf(n) + 1
  const dots = pts.map(p => `<i style="top:${p.y - 11}px">${num(p.n)}</i>`).join('')
  const legend = order.map(n => `<li><b>${num(n)}</b><span>${NOTES[key][n]}</span></li>`).join('')
  const html = `<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"><style>
  body{margin:0;background:#EDEDED;font-family:Inter,sans-serif;color:#111}
  .ab{display:flex;padding:40px;gap:0;align-items:flex-start}
  .pg{width:${w}px;height:${H}px;flex:none;box-shadow:0 0 0 1px #D6D6D6;background:url('file://${img}') 0 0/${w}px auto no-repeat}
  .gap{position:relative;width:40px;height:${H}px;flex:none}
  .gap i{position:absolute;left:9px;width:22px;height:22px;border-radius:50%;background:#111;color:#fff;font:600 11.5px/22px Inter;text-align:center;font-style:normal}
  .lg{width:280px;flex:none;box-sizing:border-box;padding-left:24px;border-left:1px solid #D6D6D6}
  h1{font-size:15px;font-weight:700;margin:0 0 2px}
  .sub{font-size:12.5px;color:#555;margin:0 0 18px}
  ol{list-style:none;margin:0;padding:0}
  li{display:flex;gap:10px;font-size:13px;line-height:1.45;margin-bottom:12px}
  li b{flex:none;width:22px;height:22px;border-radius:50%;background:#111;color:#fff;font-size:11.5px;line-height:22px;text-align:center}
  </style></head><body><div class="ab"><div class="pg"></div><div class="gap">${dots}</div><div class="lg">
  <h1>W3 Photo search · ${TITLES[page]}</h1><p class="sub">${w} × ${vh}${full ? ' · full page' : ' · first screen'} · Both · Galilee</p><ol>${legend}</ol></div></div></body></html>`
  const f = `${W3}/.board-tmp.html`; fs.writeFileSync(f, html)
  const ctx = await b.newContext({ viewport: { width: 40 + w + 40 + 280 + 40, height: H + 80 } })
  const p = await ctx.newPage(); await p.goto('file://' + f, { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300)
  const out = `${S}/w3-${page}-${w}${full ? '-full' : ''}-board.png`
  await p.screenshot({ path: out, fullPage: true }); await ctx.close(); fs.unlinkSync(f)
  console.log('board', out, pts.map(p => p.n).join(','))
}

for (const page of ['home', 'saint']) for (const w of [1440, 375]) for (const full of [false, true]) await board(page, w, full)
await b.close()
