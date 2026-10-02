const test = require('node:test');
const assert = require('node:assert/strict');
const validate = require('./validate.cjs');
const plan = require('./plan.cjs');
const result = require('./result.cjs');
const id = '9340121e-5c8b-4c99-a4d3-e2251939c950';
const user = { admin: true, user: 'f71933b3-3929-4e5f-a521-332e14e5d2c6' };
const entry = () => ({ slug: 'john-maximovitch', version_id: id, expected_revision: null, delta: { slug: 'john-maximovitch', name: 'St. John', miracles: [{ miracles: '<p>Sourced account</p>', time_period: ['modern_era'] }] } });
const input = entries => ({ $accountability: user, $trigger: { body: { collection: 'saints', action: 'save', entries } } });
const run = (entries = [entry()], drafts = [], published = []) => plan({ $accountability: user, validate_request: validate(input(entries)), read_drafts: drafts, read_published: published });
test('creates only item-less draft with staged children', () => { const p = run(); assert.equal(p.creates[0].item, null); assert.equal(p.creates[0].key, 'draft'); assert.equal(p.creates[0].delta.miracles.create.length, 1); assert.equal(p.updates.length, 0); });
test('rejects non-admin, publish, wrong collection, >50 entries', () => { const i = input([entry()]); assert.throws(() => validate({ ...i, $accountability: { user: 'x' } })); for (const body of [{...i.$trigger.body,action:'publish'},{...i.$trigger.body,collection:'users'},{...i.$trigger.body,entries:Array(51).fill(entry())}]) assert.throws(() => validate({...i,$trigger:{body}})); });
test('rejects arbitrary fields, child IDs and unsafe HTML', () => { for (const delta of [{...entry().delta,status:'published'},{...entry().delta,miracles:[{id:1,miracles:'x'}]},{...entry().delta,biography:'<script>x</script>'}]) assert.throws(() => run([{...entry(),delta}])); });
test('rejects duplicates and existing published slug', () => { assert.throws(() => run([entry(),entry()])); assert.throws(() => run([entry()],[],[{id:1,slug:entry().slug}])); });
test('rejects stale revision and another saint version', () => { const draft = {id,key:'draft',collection:'saints',item:null,date_created:'2026-09-01',delta:{slug:entry().slug,name:'Old'}}; assert.throws(() => run([entry()],[draft])); assert.throws(() => run([{...entry(),expected_revision:'2026-09-01'}],[{...draft,delta:{slug:'other'}}])); });
test('read makes no writes and preserves absent draft', () => { const i=input([{slug:'john-maximovitch'}]); i.$trigger.body.action='read'; const p=plan({$accountability:user,validate_request:validate(i),read_drafts:[],read_published:[]}); assert.deepEqual(p.creates,[]); assert.deepEqual(p.updates,[]); assert.equal(result({plan_writes:p,read_back:[]}).entries[0].version_id,null); });
test('readback verifies exact content, supports idempotent retry', () => { const p=run(); const draft={...p.creates[0],date_created:'2026-09-01'}; assert.equal(result({plan_writes:p,read_back:[draft]}).entries[0].state,'draft'); const retry=run([entry()],[draft]); assert.equal(retry.updates.length,0); assert.throws(() => result({plan_writes:p,read_back:[{...draft,delta:{name:'wrong'}}]})); });
test('preserves omitted draft fields and supports 50 distinct saints', () => { const draft={id,key:'draft',collection:'saints',item:null,date_created:'2026-09-01',delta:{slug:entry().slug,name:'Old',patron:'Existing'}}; const p=run([{...entry(),expected_revision:'2026-09-01'}],[draft]); assert.equal(p.updates[0].delta.patron,'Existing'); const entries=Array.from({length:50},(_,i)=>({...entry(),slug:'saint-'+i,version_id:'9340121e-5c8b-4c99-a4d3-'+String(i).padStart(12,'0'),delta:{name:'Saint '+i,slug:'saint-'+i}})); assert.equal(run(entries).creates.length,50); });

test('accepts prayers, books and other_images; rejects bad shapes', () => {
  const file = '3f2b8f4e-1c0d-4b9a-8e7f-123456789abc';
  const delta = { ...entry().delta, other_images: [file], prayers: [{ prayer_title: 'Novena', prayer_slug: 'john-novena', prayers: [{ prayer_section: '<p>Day one</p>' }], topics: ['peace'], prayer_image: null }], books: [{ title: 'Life', author: 'A. Author', year: 1900, genre: ['biography'] }] };
  const p = run([{ ...entry(), delta }]);
  assert.equal(p.creates[0].delta.prayers.create.length, 1);
  assert.equal(p.creates[0].delta.books.create[0].year, 1900);
  assert.deepEqual(p.creates[0].delta.other_images.create.map(r => r.directus_files_id), [file]);
  for (const bad of [{ other_images: ['not-a-uuid'] }, { prayers: [{ prayer_title: 'x', prayer_slug: 'Bad Slug', prayers: [{ prayer_section: 'x' }] }] }, { prayers: [{ prayer_title: 'x', prayer_slug: 'ok', prayers: [{ foo: 'x' }] }] }, { prayers: [{ prayer_title: 'x', prayer_slug: 'ok', prayers: [{ prayer_section: 'x' }], topics: ['nope'] }] }, { books: [{ title: 'x', year: 'abc' }] }, { books: [{ author: 'no title' }] }]) assert.throws(() => run([{ ...entry(), delta: { ...entry().delta, ...bad } }]));
});
