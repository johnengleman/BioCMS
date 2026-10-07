module.exports = function result(data) {
  const stripAudit = value => Array.isArray(value) ? value.map(stripAudit) : value && typeof value === 'object'
    ? Object.fromEntries(Object.entries(value).filter(([k]) => !['_user','_date'].includes(k)).map(([k,v]) => [k,stripAudit(v)])) : value;
  const canonical = value => Array.isArray(value) ? value.map(canonical) : value && typeof value === 'object'
    ? Object.fromEntries(Object.keys(value).sort().map(k => [k, canonical(value[k])])) : value;
  if (!Array.isArray(data.read_back) || data.read_back.length > 1000) throw Error('Incomplete readback');
  const entries = data.plan_writes.expected.map(expected => {
    const item = expected.item ?? null;
    const matches = data.read_back.filter(v => item !== null
      ? v.item !== null && String(v.item) === item
      : v.item === null && (v.delta?.slug === expected.slug || (expected.id && v.id === expected.id)));
    if (matches.length > 1) throw Error('Duplicate drafts found on readback');
    const version = matches[0];
    if (!version) {
      if (data.plan_writes.action === 'save') throw Error('Saved draft missing');
      return { slug: expected.slug, version_id: null, expected_revision: null, item_id: item, delta: null };
    }
    if (version.collection !== 'saints' || version.key !== 'draft') throw Error('Readback is not a saint draft');
    const delta = stripAudit(version.delta);
    if (expected.delta && JSON.stringify(canonical(delta)) !== JSON.stringify(canonical(expected.delta))) throw Error('Saved content failed exact readback');
    return { slug: expected.slug, version_id: version.id, expected_revision: version.date_updated ?? version.date_created, state: 'draft', item_id: item, delta,
      cms_url: 'https://directus-production-2664.up.railway.app/admin/content/saints/' + (item ?? '+') + '?version=draft&versionId=' + version.id };
  });
  return { action: data.plan_writes.action, created: data.plan_writes.creates.length, updated: data.plan_writes.updates.length, entries };
};
