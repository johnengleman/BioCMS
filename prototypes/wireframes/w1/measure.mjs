// W1 checks + geometry for the legend artboards.
// usage: node measure.mjs <out.json> <clipdir>
import { chromium } from '/tmp/claude-0/-home-user-BioCMS/b24ffc38-5532-532d-b028-dcbe71e5024a/scratchpad/pw/node_modules/playwright-core/index.mjs'
import { writeFileSync } from 'fs'
const DIR = new URL('.', import.meta.url).pathname
const [out, clipdir] = process.argv.slice(2)
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--no-sandbox', '--allow-file-access-from-files'], proxy: { server: process.env.HTTPS_PROXY } })
const NAMES = ['Thérèse', 'Teresa', 'Francis', 'Anthony', 'Augustine', 'Benedict', 'Thomas', 'Nicholas', 'Pio', 'Seraphim', 'Sergius', 'John', 'Joan']
const res = {}
for (const page of ['home', 'saint']) for (const [w, h] of [[1440, 900], [375, 812]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, ignoreHTTPSErrors: true })
  const p = await ctx.newPage()
  await p.goto('file://' + DIR + page + '.html', { waitUntil: 'networkidle', timeout: 60000 })
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500)
  const r = await p.evaluate(({ NAMES }) => {
    const box = e => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) } }
    const vis = e => { const s = getComputedStyle(e); return s.display !== 'none' && s.visibility !== 'hidden' && e.getClientRects().length }
    const notes = {}
    document.querySelectorAll('[data-n]').forEach(e => { if (vis(e)) notes[e.dataset.n] = box(e) })
    const cards = [...document.querySelectorAll('.card')].map(c => { const im = c.querySelector('.im'); return +(im.getBoundingClientRect().height / c.getBoundingClientRect().height).toFixed(3) })
    // "St." check on visible text and alt text
    const txt = (document.body.innerText + ' ' + [...document.images].map(i => i.alt).join(' ')).replace(/\s+/g, ' ')
    const bad = []
    for (const n of NAMES) { const re = new RegExp('\\b' + n + '\\b', 'g'); let m; while ((m = re.exec(txt))) { const before = txt.slice(Math.max(0, m.index - 7), m.index); if (!/(St\. |Saint )$/.test(before)) bad.push(txt.slice(Math.max(0, m.index - 20), m.index + n.length + 10)) } }
    const firstCard = document.querySelector('.card')
    const fs = s => { const e = document.querySelector(s); return e ? getComputedStyle(e).fontSize : null }
    const biggest = [...document.querySelectorAll('body *')].filter(e => e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && vis(e)).map(e => [parseFloat(getComputedStyle(e).fontSize), e.tagName + '.' + e.className]).sort((a, b) => b[0] - a[0]).slice(0, 2)
    const ad = []
    document.querySelectorAll('.chips .chip,.months a').forEach(e => ad.push(box(e)))
    const c2 = [...document.querySelectorAll('.card')].find(c => /Orth\./.test(c.innerText)); const ss = document.querySelector('.search span'); const lg = document.querySelector('.logo');
    const raw = document.body.innerText + ' ' + [...document.images].map(i => i.alt).join(' '); const plainSt = (raw.match(/(St\.|Saint) (?=\p{L})/gu) || []).length; const nbspSt = (raw.match(/(St\.|Saint)\u00a0/g) || []).length;
    return { plainSt, nbspSt, card2Y: c2 ? box(c2).y : null, searchClipped: ss.scrollWidth > ss.clientWidth, logo: lg ? { ...box(lg), lines: Math.round(lg.getBoundingClientRect().height / parseFloat(getComputedStyle(lg).lineHeight || 20)) , fs: getComputedStyle(lg).fontSize } : null, title: document.title, sw: document.documentElement.scrollWidth, sh: document.documentElement.scrollHeight, notes, cards, minRatioOK: cards.every(x => x <= 0.334), bad, firstCardY: firstCard ? box(firstCard).y : null, sizes: { h1: fs('h1'), lead: fs('.lead'), sum: fs('.card .sum'), h3: fs('.card h3'), tabs: fs('.tabs a'), dd: fs('.facts dd'), dt: fs('.facts dt'), h2: fs('h2'), mrow: fs('.mrow') }, biggest, facet: ad.length ? { chipsEnd: ad[6]?.x + ad[6]?.w, monthsX: ad[7]?.x, monthsEnd: ad[18]?.x + ad[18]?.w } : null }
  }, { NAMES })
  // credit contrast: hide the text, screenshot the box, Python measures brightest background pixel
  const cr = r.notes.credit
  if (cr) {
    await p.addStyleTag({ content: '.credit a{color:transparent!important}' })
    await p.screenshot({ path: `${clipdir}/credit-${page}-${w}.png`, clip: { x: cr.x, y: cr.y, width: cr.w, height: cr.h } })
    await p.addStyleTag({ content: '.credit a{color:rgb(255 255 255/.85)!important}' })
  }
  if (page === 'saint') {
    // sticky checks after scrolling
    await p.evaluate(() => window.scrollTo(0, 1400)); await p.waitForTimeout(300)
    r.afterScroll = await p.evaluate(() => {
      const q = s => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom) } }
      const bar = document.querySelector('.bbar'); return { facts: q('.facts'), tabs: q('.tabs'), bar: getComputedStyle(bar).visibility, activeTab: document.querySelector('.tabs a.on')?.textContent }
    })
  }
  res[`${page}-${w}`] = r
  await ctx.close()
}
writeFileSync(out, JSON.stringify(res, null, 1))
console.log(JSON.stringify(res, (k, v) => (k === 'cards' ? v.join(',') : v), 1))
await b.close()
