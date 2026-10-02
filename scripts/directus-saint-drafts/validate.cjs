// Runs in Directus's isolated Flow script operation; no network or credentials.
module.exports = function validate(data) {
  if (!data.$accountability?.admin || !data.$accountability?.user) throw Error('Administrator sign-in required');
  const body = data.$trigger?.body;
  if (!body || !['read', 'save'].includes(body.action)) throw Error('Use read or save');
  if (body.collection !== 'saints') throw Error('Only saints are supported');
  if (!Array.isArray(body.entries) || body.entries.length < 1 || body.entries.length > 50) throw Error('Supply 1–50 entries');
  const seen = new Set();
  const ids = new Set();
  const textFields = ['name', 'summary', 'biography', 'birth_location', 'death_location', 'patron', 'relic_description', 'relic_location'];
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const tags = {
    categories: ['Ascetics','Bishops','Confessors','Converts','Fathers_of_the_Church','Fools_for_Christ','Hermits','Holy_Women','Married','Martyrs','Miracle_Workers','Missionaries','Monastics','Mothers','Nuns','Warriors','Patron Saints'],
    venerated_in: ['roman-catholic', 'orthodox'],
  };
  const children = {
    miracles: ['miracles','time_period'], teachings: ['teachings','time_period'], quotes: ['text','topics','source'],
    prayers: ['prayer_title','prayer_slug','prayers','topics','prayer_image'],
    books: ['title','author','store_link','pages','type','description','amazon_book_cover','genre','best_sellers_rank','year','publisher'],
  };
  const required = { miracles: 'miracles', teachings: 'teachings', quotes: 'text', prayers: 'prayer_title', books: 'title' };
  const prayerTopics = ['healing','family','finance','peace','guidance','protection','hope','grief','love','strength','wisdom','forgiveness'];
  const intFields = ['pages','best_sellers_rank','year'];
  const shortText = ['source','prayer_title','prayer_slug','author','store_link','type','amazon_book_cover','publisher','title'];
  function safeString(value) {
    if (typeof value !== 'string' || value.length > 200000) throw Error('Invalid text');
    if (/<\s*(script|iframe|object|embed)\b|\bon\w+\s*=|javascript\s*:/i.test(value)) throw Error('Unsafe HTML');
  }
  function tagArray(value, allowed) {
    if (!Array.isArray(value) || value.length > 30 || value.some(v => typeof v !== 'string' || (allowed && !allowed.includes(v)))) throw Error('Invalid tags');
  }
  for (const entry of body.entries) {
    if (!entry || typeof entry.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug) || entry.slug.length > 200) throw Error('Invalid slug');
    if (seen.has(entry.slug)) throw Error('Duplicate slug in request');
    seen.add(entry.slug);
    if (entry.version_id != null) {
      if (!uuid.test(entry.version_id) || ids.has(entry.version_id)) throw Error('Invalid or duplicate version ID');
      ids.add(entry.version_id);
    }
    if (body.action === 'read') continue;
    if (!entry.version_id) throw Error('Save requires a stable version_id for retry safety');
    if (!Object.hasOwn(entry, 'expected_revision')) throw Error('Read first and supply expected_revision (null for new drafts)');
    const delta = entry.delta;
    if (!delta || Array.isArray(delta) || delta.slug !== entry.slug || typeof delta.name !== 'string' || !delta.name.trim()) throw Error('Name and matching slug are required');
    for (const [key, value] of Object.entries(delta)) {
      if (key === 'slug') continue;
      if (textFields.includes(key)) {
        if (value !== null) safeString(value);
        if (['name','birth_location','death_location','relic_location'].includes(key) && value?.length > 255) throw Error('Text exceeds field length');
      } else if (['birth_year','death_year'].includes(key)) {
        if (value !== null && (!Number.isInteger(value) || value < -5000 || value > 3000)) throw Error('Invalid year');
      } else if (['feast_day_orthodox','feast_day_catholic'].includes(key)) {
        if (value !== null && (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0,10) !== value)) throw Error('Invalid feast date');
      } else if (Object.hasOwn(tags, key)) {
        tagArray(value, tags[key]);
      } else if (['profile_image','relic_image'].includes(key)) {
        if (value !== null && !uuid.test(value)) throw Error('Invalid file ID');
      } else if (key === 'other_images') {
        if (!Array.isArray(value) || value.length > 20 || value.some(f => typeof f !== 'string' || !uuid.test(f)) || new Set(value).size !== value.length) throw Error('other_images must be a list of distinct file IDs');
      } else if (Object.hasOwn(children, key)) {
        if (!Array.isArray(value) || value.length > 50) throw Error('Child content must be an array');
        for (const row of value) {
          if (!row || Array.isArray(row)) throw Error('Invalid child record');
          const contentKey = required[key];
          if (typeof row[contentKey] !== 'string' || !row[contentKey].trim()) throw Error('Missing child content');
          for (const [field, fieldValue] of Object.entries(row)) {
            if (!children[key].includes(field)) throw Error('Child field not allowed: ' + field);
            if (field === 'time_period') tagArray(fieldValue, ['apostolic_era','patristic_age','medieval_period','renaissance','modern_era']);
            else if (field === 'topics') tagArray(fieldValue, key === 'prayers' ? prayerTopics : null);
            else if (field === 'genre') tagArray(fieldValue, null);
            else if (field === 'prayers') {
              if (!Array.isArray(fieldValue) || fieldValue.length < 1 || fieldValue.length > 50) throw Error('Prayer sections must be a list of 1-50');
              for (const sec of fieldValue) { if (!sec || Array.isArray(sec) || typeof sec !== 'object' || Object.keys(sec).some(k => k !== 'prayer_section')) throw Error('Prayer section must be {prayer_section}'); safeString(sec.prayer_section); }
            } else if (field === 'prayer_image') { if (fieldValue !== null && !uuid.test(fieldValue)) throw Error('Invalid file ID'); }
            else if (intFields.includes(field)) { if (fieldValue !== null && !Number.isInteger(fieldValue)) throw Error('Invalid number: ' + field); }
            else { safeString(fieldValue); if (shortText.includes(field) && fieldValue.length > 255) throw Error('Text too long: ' + field); if (field === 'prayer_slug' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fieldValue)) throw Error('Invalid prayer slug'); }
          }
        }
      } else throw Error('Field not supported by draft action: ' + key);
    }
  }
  return { action: body.action, entries: body.entries, slugs: [...seen] };
};
