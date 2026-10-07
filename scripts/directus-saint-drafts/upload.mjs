// Saves a local entry packet as a saint draft through the installed draft flow.
// A new saint gets an item-less draft. A published saint gets a draft linked to its item; the live page
// changes only if someone promotes that draft in Directus.
// Usage: node scripts/directus-saint-drafts/upload.mjs <entry.json> [--read] [--skip=teachings,quotes]
// The token is read from DIRECTUS_TOKEN or ~/.config/saints/directus.env and is never printed.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { homedir } from 'node:os';
import { join } from 'node:path';

const BASE = 'https://directus-production-2664.up.railway.app';
const FLOW = '78272fa0-8ae9-46fe-8675-bc8085c47315';
const SAINT_FIELDS = ['name','slug','summary','biography','birth_location','death_location','patron','relic_description','relic_location',
  'birth_year','death_year','feast_day_orthodox','feast_day_catholic','categories','venerated_in','profile_image','relic_image','other_images'];
const RELATED = ['miracles','teachings','quotes','prayers','books'];

const [packetPath, ...flags] = process.argv.slice(2);
if (!packetPath) throw Error('Usage: upload.mjs <entry.json> [--read]');
const readOnly = flags.includes('--read');
const skip = (flags.find(f => f.startsWith('--skip=')) ?? '--skip=').slice(7).split(',').filter(Boolean);

function token() {
  if (process.env.DIRECTUS_TOKEN) return process.env.DIRECTUS_TOKEN;
  const file = join(homedir(), '.config/saints/directus.env');
  if (!existsSync(file)) throw Error('No token: set DIRECTUS_TOKEN or create ' + file);
  const line = readFileSync(file, 'utf8').split('\n').find(l => l.startsWith('DIRECTUS_TOKEN='));
  if (!line) throw Error('DIRECTUS_TOKEN missing in ' + file);
  return line.slice('DIRECTUS_TOKEN='.length).trim();
}

async function trigger(body) {
  const res = await fetch(`${BASE}/flows/trigger/${FLOW}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ collection: 'saints', keys: [], ...body }),
  });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { throw Error(`HTTP ${res.status}: ${text.slice(0, 300)}`); }
  if (!res.ok || json.errors) throw Error(`HTTP ${res.status}: ${JSON.stringify(json.errors ?? json).slice(0, 500)}`);
  const data = json.data ?? json;
  if (!Array.isArray(data?.entries)) throw Error(`Flow returned no entries (a flow step failed): ${JSON.stringify(data).slice(0, 500)}`);
  return data;
}

const canonical = v => Array.isArray(v) ? v.map(canonical) : v && typeof v === 'object'
  ? Object.fromEntries(Object.keys(v).sort().map(k => [k, canonical(v[k])])) : v;
const same = (a, b) => JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));

const raw = readFileSync(packetPath, 'utf8');
const packet = JSON.parse(raw);
const savePacket = () => writeFileSync(packetPath, JSON.stringify(packet, null, 1) + (raw.endsWith('\n') ? '\n' : ''));
const slug = packet.saint?.slug;
if (!slug) throw Error('Packet has no saint.slug');

// The image is never uploaded here; a profile_image is sent only if the packet already holds a Directus file ID.
const delta = Object.fromEntries(SAINT_FIELDS.filter(k => packet.saint[k] !== undefined && !(k.endsWith('_image') && !packet.saint[k]) && !(k === 'other_images' && !packet.saint[k]?.length)).map(k => [k, packet.saint[k]]));
for (const k of RELATED) {
  if (skip.includes(k)) continue;
  let rows = packet.related?.[k];
  if (!Array.isArray(rows)) continue;
  // Prayers must match the Directus shape; notes or excerpts stay in the packet only.
  if (k === 'prayers') {
    const keep = ['prayer_title','prayer_slug','prayers','topics','prayer_image'];
    const ok = rows.filter(r => r?.upload !== false && r?.prayer_title && r?.prayer_slug && Array.isArray(r?.prayers)).map(r => Object.fromEntries(Object.entries(r).filter(([key]) => keep.includes(key))));
    if (ok.length < rows.length) console.log(`Skipping ${rows.length - ok.length} prayer item(s): not in the Directus shape (prayer_title, prayer_slug, prayers[]) or marked upload:false.`);
    rows = ok;
  }
  if (rows.length) delta[k] = rows;
}

let read = (await trigger({ action: 'read', entries: [{ slug }] })).entries[0];
const where = read.item_id ? `published item ${read.item_id}` : 'not published';
console.log(`Read ${slug} (${where}): ${read.version_id ? `existing draft ${read.version_id} (revision ${read.expected_revision})` : 'no draft'}`);
if (readOnly) process.exit(0);

// A published saint's draft must be created by Directus itself, which records the live item's hash.
// It starts empty; the flow below fills it. Nothing is written to the live item.
if (read.item_id && !read.version_id) {
  const res = await fetch(`${BASE}/versions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token()}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ key: 'draft', name: 'Draft', collection: 'saints', item: read.item_id }),
  });
  if (!res.ok) throw Error(`Could not create the draft version: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  read = (await trigger({ action: 'read', entries: [{ slug }] })).entries[0];
  if (!read.version_id) throw Error('Draft version not found after creation');
  console.log(`Created empty draft ${read.version_id} on published item ${read.item_id}`);
}

const kept = packet.save_result?.version_id;
if (read.version_id && kept && kept !== read.version_id && !read.item_id) throw Error(`Packet version ${kept} differs from live draft ${read.version_id}; stop and check`);
const version_id = read.version_id ?? kept ?? randomUUID();
packet.save_result = { ...packet.save_result, state: packet.save_result?.state === 'draft' ? 'draft' : 'prepared', version_id };
savePacket(); // keep the ID on disk before the write, for retry safety

const saved = (await trigger({ action: 'save', entries: [{ slug, version_id, expected_revision: read.expected_revision, delta }] })).entries[0];

// Independent check: the stored draft must equal the packet, field by field.
const problems = [];
for (const [k, want] of Object.entries(delta)) {
  const staged = saved.delta?.[k];
  const got = RELATED.includes(k) ? [...(staged?.update ?? []).map(({ id, ...row }) => row), ...(staged?.create ?? [])] : k === 'other_images' ? saved.delta?.[k]?.create?.map(r => r.directus_files_id) : saved.delta?.[k];
  if (!same(got, want)) problems.push(k);
}
if (problems.length) throw Error('Readback differs from packet in: ' + problems.join(', '));

const deletes = RELATED.flatMap(k => (saved.delta?.[k]?.delete ?? []).map(id => `${k} ${id}`));
if (deletes.length) console.log(`On promote, these live rows would be removed: ${deletes.join(', ')}`);
packet.save_result = { state: 'draft', item_id: saved.item_id ?? null, version_id: saved.version_id, expected_revision: saved.expected_revision, cms_url: saved.cms_url };
savePacket();
const counts = RELATED.filter(k => delta[k]).map(k => `${k} ${delta[k].length}`).join(', ');
console.log(`Saved draft ${saved.version_id} (revision ${saved.expected_revision})${saved.item_id ? ` on published item ${saved.item_id}; the live page is unchanged until the draft is promoted` : ''}; ${Object.keys(delta).length} fields match the packet${counts ? ` (${counts})` : ''}.`);
console.log(saved.cms_url);
