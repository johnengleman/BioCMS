# Standard-mode rewrite of the saved biographies (started 2026-10-04)

Owner's decision: rewrite every saved Directus draft in standard mode (outline → scene research → Fable writer → fact check), then replace only the biography and summary in the Directus draft. Never publish.

Each saint works in `content-drafts/<slug>-standard/` with a copy of the old research notes. The old folder stays untouched. After the check says ready:

```bash
cd /Users/nicholas/Desktop/saints-website/BioCMS
python3 scripts/saint-entry/swap_bio.py content-drafts/<slug> content-drafts/<slug>-standard
node scripts/directus-saint-drafts/upload.mjs content-drafts/<slug>-standard/entry.json --read
node scripts/directus-saint-drafts/upload.mjs content-drafts/<slug>-standard/entry.json
```

Run three saints at a time. If the usage cap stops an agent, resume it from the files on disk.

| Saint | Tier | Outline | Scenes | Write | Check | Uploaded |
|---|---|---|---|---|---|---|
| francis-of-assisi | A | done | done | done | done | 2026-10-04 |
| seraphim-of-sarov | A | done | done | done | done | 2026-10-04 |
| benedict-of-nursia | A | done | done | done | done | 2026-10-04 |
| augustine-of-hippo | A | done | done | done | done | 2026-10-04 |
| nicholas-of-myra | B | done | done | done | done | 2026-10-04 |
| anthony-of-padua | A | done | done | done | done | 2026-10-04 |
| thomas-aquinas | A | done | done | done | done | 2026-10-04 |
| sergius-of-radonezh | B | done | done | done | done | 2026-10-04 |
| padre-pio | A | done | done | done | done | 2026-10-04 |
| teresa-of-avila | A | done | done | done | done | 2026-10-04 |
| joan-of-arc | A | done | done | done | done | 2026-10-04 |
| john-maximovitch | B | done (research done first: notes.md) | done | done | done | NOT UPLOADED: published item 4; the draft flow only writes item-less drafts. Owner decides. |
