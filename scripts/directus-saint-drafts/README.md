# Saint drafts in Directus

Flow: [Saint drafts — MCP read and save](https://directus-production-2664.up.railway.app/admin/settings/flows/78272fa0-8ae9-46fe-8675-bc8085c47315)

ID: `78272fa0-8ae9-46fe-8675-bc8085c47315`

Research and attribution follow the `saint-entry` skill. Saving drafts is authorized; publishing is not.

## Upload a packet (use this)

From `BioCMS`:

```sh
node scripts/directus-saint-drafts/upload.mjs content-drafts/<saint>/entry.json          # read, save, verify
node scripts/directus-saint-drafts/upload.mjs content-drafts/<saint>/entry.json --read   # read only
```

`upload.mjs` reads the packet from disk and calls this same flow through `POST /flows/trigger/<id>`, so every safeguard below still applies. It sends `saint` fields and `related` miracles, teachings, and quotes. It reads first, keeps the draft's `version_id` in the packet before saving, compares the readback with the packet field by field, and writes `save_result` (version, revision, CMS link) back to the packet. A full entry takes about a second.

The token belongs to the dedicated admin user "Claude uploader". It lives in `~/.config/saints/directus.env` as `DIRECTUS_TOKEN=…` (mode 600), or in the `DIRECTUS_TOKEN` environment variable. The script never prints it. A 401 means the token was not saved on the user or the user is not active.

Images: upload the file to `POST /files` with the same token, set `metadata` (attribution, license, license_url, source_url, changes, alt_text), put the file UUID in `saint.profile_image`, and add a visible "Image credit" section at the end of the biography. Then run `upload.mjs`.

Do not pass large entries through the MCP `trigger_flow` tool: the content must then be typed inline, which is slow and error-prone. The MCP route below remains for small edits and inspection.

## Read, then save (MCP)

Before executing, inspect the live flow and its operations through the MCP `flows` tool. Read this flow by `query.filter.id._eq` and request `fields: ["*", "operations.*"]`. Use `trigger_flow` with the flow ID, `collection: "saints"`, and `keys: []`.

Read request in `data`:

```json
{
  "action": "read",
  "entries": [{ "slug": "john-maximovitch" }]
}
```

The response includes the draft's `version_id`, `expected_revision`, `delta`, and `cms_url`. Reuse the existing version ID and revision. For a new saint, generate and retain a stable UUID for retry safety and use `expected_revision: null`.

Save request in `data`:

```json
{
  "action": "save",
  "entries": [{
    "slug": "example-saint",
    "version_id": "RETAINED-DRAFT-UUID",
    "expected_revision": null,
    "delta": {
      "slug": "example-saint",
      "name": "Example Saint",
      "summary": "Original, researched summary.",
      "biography": "<p>Source-backed biography.</p>",
      "miracles": [{ "miracles": "<p>Attributed account.</p>", "time_period": ["modern_era"] }],
      "teachings": [{ "teachings": "<p>Sourced teaching.</p>", "time_period": ["modern_era"] }],
      "quotes": [{ "text": "Verified quotation", "topics": ["faith"], "source": "Source URL and location" }]
    }
  }]
}
```

Related content is supplied as arrays, then staged inside the draft; do not pass back the returned `create/update/delete` objects as input. Omitted fields are preserved. Name and slug are required even for partial updates. Import a rights-cleared image through MCP `files`, then save its UUID as `profile_image`. Include visible credit and license in the content, not only file metadata. See `validate.cjs` for the exact supported fields; books, prayers, and other images are not currently writable through this flow.

## Safeguards and limits

- Admin-only; operations run with the caller's permissions.
- Only item-less saint drafts in `directus_versions` are writable. No published-item writes or deletion.
- Duplicate slugs/IDs, existing published slugs, stale revisions, unsupported fields, and unsafe HTML are rejected.
- Supports 1–50 entries per request. Send requests serially: revision checks are not atomic concurrency locks.
- Mixed creates and updates use separate operations, not a single all-or-nothing transaction.
- Stops if the existing draft inventory exceeds 1,000 entries.
- Final readback verifies saved fields. Preserve returned revisions and links in each local content packet.

This uses standard Flow operations against Directus 12.3.1 draft storage, not a native MCP draft-write endpoint. Recheck compatibility when upgrading Directus. The existing St. John draft update, related content, image attachment, and readback were verified live. New-draft creation and `upload.mjs` updates were verified live with St. Thérèse of Lisieux (2026-09-30). 50-entry batches are covered by local tests but have not yet been exercised as a live batch.

## Local verification and recovery definitions

```sh
node --test scripts/directus-saint-drafts/test.cjs
node scripts/directus-saint-drafts/build.mjs
```

The builder prints flow/operation definitions only; it does not modify the server. Reuse the installed flow rather than creating duplicates.
