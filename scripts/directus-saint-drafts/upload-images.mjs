// Uploads a saint's prepared images to Directus and records the file IDs in the entry packet.
// Usage: node scripts/directus-saint-drafts/upload-images.mjs <slug>
// Reads content-drafts/<slug>/images/{profile,relic,other-N}.json (+ the image file named in "file").
// Writes the Directus file ID back into each json ("directus_id") and into entry.json:
//   saint.profile_image, saint.relic_image, saint.other_images.
// Safe to re-run: files that already have a directus_id are skipped.
// The token is read from DIRECTUS_TOKEN or ~/.config/saints/directus.env and is never printed.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const BASE = 'https://directus-production-2664.up.railway.app';
const slug = process.argv[2];
if (!slug) throw Error('Usage: upload-images.mjs <slug>');
const dir = new URL(`../../content-drafts/${slug}/`, import.meta.url).pathname;
const imgDir = join(dir, 'images');
if (!existsSync(imgDir)) throw Error('No images folder for ' + slug);

function token() {
  if (process.env.DIRECTUS_TOKEN) return process.env.DIRECTUS_TOKEN;
  const file = join(homedir(), '.config/saints/directus.env');
  const line = readFileSync(file, 'utf8').split('\n').find(l => l.startsWith('DIRECTUS_TOKEN='));
  if (!line) throw Error('DIRECTUS_TOKEN missing in ' + file);
  return line.slice('DIRECTUS_TOKEN='.length).trim();
}
const auth = { Authorization: `Bearer ${token()}` };
const ALLOWED = /public domain|cc0|cc[- ]by(?![- ]nc)(?![- ]nd)/i;
const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', tif: 'image/tiff', tiff: 'image/tiff' };

const names = readdirSync(imgDir).filter(f => /^(profile|relic|other-\d+)\.json$/.test(f)).map(f => f.replace('.json', ''))
  .sort((a, b) => (a === 'profile' ? -1 : b === 'profile' ? 1 : a.localeCompare(b)));
if (!names.includes('profile')) throw Error('No profile.json for ' + slug);

const packetPath = join(dir, 'entry.json');
const rawPacket = readFileSync(packetPath, 'utf8');
const packet = JSON.parse(rawPacket);
packet.saint ??= {};

for (const name of names) {
  const jpath = join(imgDir, name + '.json');
  const meta = JSON.parse(readFileSync(jpath, 'utf8'));
  if (!meta.directus_id) {
    const m = meta.metadata ?? {};
    for (const k of ['attribution', 'license', 'license_url', 'source_url', 'rights_checked']) if (!m[k]) throw Error(`${name}: metadata.${k} missing`);
    if (!ALLOWED.test(m.license)) throw Error(`${name}: license "${m.license}" is not public domain, CC0, or CC BY / CC BY-SA`);
    const fpath = join(imgDir, meta.file);
    const ext = meta.file.split('.').pop().toLowerCase();
    const form = new FormData();
    form.append('title', meta.title);
    form.append('description', meta.description);
    form.append('filename_download', `${slug}-${name}.${ext}`);
    form.append('file', new Blob([readFileSync(fpath)], { type: MIME[ext] ?? 'application/octet-stream' }), `${slug}-${name}.${ext}`);
    const up = await fetch(`${BASE}/files`, { method: 'POST', headers: auth, body: form });
    const upJson = await up.json();
    if (!up.ok) throw Error(`${name}: upload failed ${up.status} ${JSON.stringify(upJson).slice(0, 300)}`);
    const id = upJson.data.id;
    const patch = await fetch(`${BASE}/files/${id}`, { method: 'PATCH', headers: { ...auth, 'Content-Type': 'application/json' }, body: JSON.stringify({ metadata: m }) });
    if (!patch.ok) throw Error(`${name}: metadata failed ${patch.status} ${(await patch.text()).slice(0, 300)}`);
    meta.directus_id = id;
    writeFileSync(jpath, JSON.stringify(meta, null, 2) + '\n');
    console.log(`Uploaded ${name}: ${id} (${m.license})`);
  } else console.log(`Skipped ${name}: already uploaded ${meta.directus_id}`);
}

const idOf = n => JSON.parse(readFileSync(join(imgDir, n + '.json'), 'utf8')).directus_id;
packet.saint.profile_image = idOf('profile');
if (names.includes('relic')) packet.saint.relic_image = idOf('relic');
const others = names.filter(n => n.startsWith('other-')).map(idOf);
if (others.length) packet.saint.other_images = others;
packet.images = names.map(n => { const j = JSON.parse(readFileSync(join(imgDir, n + '.json'), 'utf8')); return { role: n, directus_id: j.directus_id, title: j.title, license: j.metadata.license, attribution: j.metadata.attribution, source_url: j.metadata.source_url }; });
writeFileSync(packetPath, JSON.stringify(packet, null, 1) + (rawPacket.endsWith('\n') ? '\n' : ''));
console.log('entry.json updated: profile_image' + (packet.saint.relic_image ? ', relic_image' : '') + (others.length ? `, other_images (${others.length})` : ''));
