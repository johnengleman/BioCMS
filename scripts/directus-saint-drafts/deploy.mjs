// Updates the installed draft flow's operations and description from build.mjs.
// Backup of the live flow before the 2026-10-05 change:
// /Users/nicholas/Desktop/saints-website/backups/directus-flow-2026-10-05/flow-before.json
// Usage (from BioCMS): node scripts/directus-saint-drafts/deploy.mjs
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { flow, operations } from './build.mjs';

const BASE = 'https://directus-production-2664.up.railway.app';
const FLOW = '78272fa0-8ae9-46fe-8675-bc8085c47315';
const token = process.env.DIRECTUS_TOKEN ?? readFileSync(homedir() + '/.config/saints/directus.env', 'utf8')
  .split('\n').find(l => l.startsWith('DIRECTUS_TOKEN=')).slice('DIRECTUS_TOKEN='.length).trim();
const call = async (method, path, body) => {
  const res = await fetch(BASE + path, { method, headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }, body: body && JSON.stringify(body) });
  if (!res.ok) throw Error(`${method} ${path}: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).data;
};

const live = await call('GET', `/flows/${FLOW}?fields=id,operations.id,operations.key`);
for (const def of operations) {
  const op = live.operations.find(o => o.key === def.key);
  if (!op) throw Error('Live flow has no operation ' + def.key);
  await call('PATCH', '/operations/' + op.id, { options: def.options });
  console.log('updated', def.key);
}
await call('PATCH', '/flows/' + FLOW, { description: flow.description });
console.log('updated flow description');
