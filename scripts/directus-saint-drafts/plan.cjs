// Saint drafts live in directus_versions with key "draft". A new saint's draft has no item.
// A published saint's draft is linked to its item; the live item is never written, and the
// draft changes the site only when someone promotes it in Directus.
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
  // On a published saint, the rows sent for a kind replace that kind's live rows when the draft is promoted:
  // live rows are updated in order, extra rows are created, and live rows beyond the new count are deleted.
  const stageRows = (pub, key, rows) => {
    if (!pub) return { create: rows, update: [], delete: [] };
    if (!['miracles','teachings','quotes'].includes(key)) throw Error(key + ' cannot be staged on a published saint');
    const ids = pub[key];
    if (!Array.isArray(ids)) throw Error('Live ' + key + ' IDs missing for ' + pub.slug);
    return { create: rows.slice(ids.length), update: rows.slice(0, ids.length).map((row, i) => ({ ...row, id: ids[i] })), delete: ids.slice(rows.length) };
  };
  for (const entry of request.entries) {
    const pub = published.find(item => item.slug === entry.slug);
    let version;
    if (pub) {
      const item = String(pub.id);
      if (drafts.some(v => v.item === null && v.delta?.slug === entry.slug)) throw Error('An item-less draft also uses ' + entry.slug + '; resolve it in Directus first');
      const linked = drafts.filter(v => v.item !== null && String(v.item) === item);
      if (linked.length > 1) throw Error('Multiple drafts match ' + entry.slug);
      version = linked[0];
      if (version && (version.collection !== 'saints' || version.key !== 'draft')) throw Error('Not a saint draft');
      if (entry.version_id && version && version.id !== entry.version_id) throw Error('Reuse the existing draft version ID');
      if (request.action === 'read') { expected.push({ slug: entry.slug, id: version?.id ?? null, item }); continue; }
      if (!version) throw Error('Published saint ' + entry.slug + ' has no draft version yet; create it first');
    } else {
      const matches = drafts.filter(v => v.delta?.slug === entry.slug || (entry.version_id && v.id === entry.version_id));
      if (matches.length > 1) throw Error('Multiple drafts match ' + entry.slug);
      version = matches[0];
      if (version && (version.collection !== 'saints' || version.key !== 'draft' || version.item !== null)) throw Error('Not an item-less saint draft');
      if (version?.delta?.slug && version.delta.slug !== entry.slug) throw Error('Version belongs to another saint');
      if (request.action === 'read') { expected.push({ slug: entry.slug, id: version?.id ?? null, item: null }); continue; }
      if (version && version.id !== entry.version_id) throw Error('Reuse the existing draft version ID');
    }
    const clean = JSON.parse(JSON.stringify(entry.delta));
    for (const key of ['miracles','teachings','quotes','prayers','books']) {
      if (Object.hasOwn(clean,key)) clean[key] = stageRows(pub, key, clean[key]);
    }
    if (Object.hasOwn(clean,'other_images')) {
      if (pub) throw Error('other_images cannot be staged on a published saint');
      clean.other_images = { create: clean.other_images.map(id => ({ directus_files_id: id })), update: [], delete: [] };
    }
    const existing = stripAudit(version?.delta ?? {});
    const merged = { ...existing, ...clean };
    const unchanged = JSON.stringify(existing) === JSON.stringify(merged);
    const revision = version ? (version.date_updated ?? version.date_created) : null;
    if (!unchanged && entry.expected_revision !== revision) throw Error('Draft changed since read; reload ' + entry.slug);
    const delta = { ...(version?.delta ?? {}), ...stamp(clean) };
    if (!version) creates.push({ id: entry.version_id, key: 'draft', name: 'Draft', collection: 'saints', item: null, hash: null, delta });
    else if (!unchanged) updates.push({ id: version.id, delta });
    expected.push({ slug: entry.slug, id: version?.id ?? entry.version_id, item: pub ? String(pub.id) : null, delta: merged });
  }
  return { creates, updates, expected, action: request.action };
};
