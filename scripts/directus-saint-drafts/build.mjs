import { readFileSync } from 'node:fs';
const code = name => readFileSync(new URL(name + '.cjs', import.meta.url), 'utf8');
const draftQuery = { fields: ['id','key','name','collection','item','delta','date_created','date_updated'], filter: { collection: { _eq: 'saints' }, key: { _eq: 'draft' } }, limit: 1001 };
export const flow = {
  name: 'Saint drafts — MCP read and save', status: 'inactive', trigger: 'manual', accountability: 'all', icon: 'edit_note',
  description: 'Authenticated admin-only MCP action for 1–50 saint drafts. New saints: item-less drafts. Published saints: the existing draft version linked to the item (created with POST /versions). Never writes a saints item, never promotes or deletes; staged row changes apply only if someone promotes the draft. Read before save; reuse version IDs and expected_revision; serial calls.',
  options: { collections: ['saints'], location: 'collection', requireSelection: false, requireConfirmation: false, async: false, return: 'verified_result', fields: [] },
};
export const operations = [
  { key: 'validate_request', type: 'exec', options: { code: code('validate') } },
  { key: 'read_drafts', type: 'item-read', options: { collection: 'directus_versions', permissions: '$trigger', query: draftQuery } },
  { key: 'read_published', type: 'item-read', options: { collection: 'saints', permissions: '$trigger', query: { fields: ['id','slug','miracles','teachings','quotes'], filter: { slug: { _in: '{{validate_request.slugs}}' } }, limit: 51 } } },
  { key: 'plan_writes', type: 'exec', options: { code: code('plan') } },
  { key: 'create_drafts', type: 'item-create', options: { collection: 'directus_versions', permissions: '$trigger', emitEvents: false, payload: '{{plan_writes.creates}}' } },
  { key: 'update_drafts', type: 'item-update', options: { collection: 'directus_versions', permissions: '$trigger', emitEvents: false, payload: '{{plan_writes.updates}}' } },
  { key: 'read_back', type: 'item-read', options: { collection: 'directus_versions', permissions: '$trigger', query: draftQuery } },
  { key: 'verified_result', type: 'exec', options: { code: code('result') } },
].map((op, i) => ({ ...op, name: op.key.replaceAll('_',' '), position_x: 19 + i * 18, position_y: 1, resolve: null, reject: null }));
if (process.argv[1] === new URL(import.meta.url).pathname) console.log(JSON.stringify({ flow, operations }));
