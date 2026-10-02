// Only item-less saint draft versions are writable. Published saints are read-only.
module.exports = function plan(data) {
  const request = data.validate_request;
  const drafts = data.read_drafts;
  const published = data.read_published;
  if (!Array.isArray(drafts) || !Array.isArray(published) || drafts.length > 1000) throw Error('Draft inventory incomplete; stop and paginate');
  const creates = [], updates = [], expected = [];
  const stripAudit = value => Array.isArray(value) ? value.map(stripAudit) : value && typeof value === 'object'
    ? Object.fromEntries(Object.entries(value).filter(([k]) => !['_user','_date'].includes(k)).map(([k,v]) => [k,stripAudit(v)])) : value;
  const stamp = value => Array.isArray(value) ? value.map(stamp) : value && typeof value === 'object'
    ? { ...Object.fromEntries(Object.entries(value).map(([k,v]) => [k,stamp(v)])), _user: data.$accountability.user, _date: new Date().toISOString() } : value;
  for (const entry of request.entries) {
    const matches = drafts.filter(v => v.delta?.slug === entry.slug || (entry.version_id && v.id === entry.version_id));
    if (matches.length > 1) throw Error('Multiple drafts match ' + entry.slug);
    const version = matches[0];
    if (version && (version.collection !== 'saints' || version.key !== 'draft' || version.item !== null)) throw Error('Not an item-less saint draft');
    if (version?.delta?.slug && version.delta.slug !== entry.slug) throw Error('Version belongs to another saint');
    if (published.some(item => item.slug === entry.slug)) throw Error('A published saint already uses ' + entry.slug);
    if (request.action === 'read') { expected.push({ slug: entry.slug, id: version?.id ?? null }); continue; }
    if (version && version.id !== entry.version_id) throw Error('Reuse the existing draft version ID');
    const clean = JSON.parse(JSON.stringify(entry.delta));
    for (const key of ['miracles','teachings','quotes','prayers','books']) {
      if (Object.hasOwn(clean,key)) clean[key] = { create: clean[key], update: [], delete: [] };
    }
    if (Object.hasOwn(clean,'other_images')) clean.other_images = { create: clean.other_images.map(id => ({ directus_files_id: id })), update: [], delete: [] };
    const existing = stripAudit(version?.delta ?? {});
    const merged = { ...existing, ...clean };
    const unchanged = JSON.stringify(existing) === JSON.stringify(merged);
    const revision = version ? (version.date_updated ?? version.date_created) : null;
    if (!unchanged && entry.expected_revision !== revision) throw Error('Draft changed since read; reload ' + entry.slug);
    const delta = { ...(version?.delta ?? {}), ...stamp(clean) };
    if (!version) creates.push({ id: entry.version_id, key: 'draft', name: 'Draft', collection: 'saints', item: null, hash: null, delta });
    else if (!unchanged) updates.push({ id: version.id, delta });
    expected.push({ slug: entry.slug, id: entry.version_id, delta: merged });
  }
  return { creates, updates, expected, action: request.action };
};
