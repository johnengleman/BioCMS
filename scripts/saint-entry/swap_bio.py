#!/usr/bin/env python3
"""Make <new>/entry.json from <old>/entry.json with the biography and summary of <new>.

Usage: swap_bio.py content-drafts/<old-slug> content-drafts/<old-slug>-standard
Keeps every other field and the save_result (draft version id), so upload.mjs updates the same Directus draft.
"""
import json, sys, pathlib
old, new = map(pathlib.Path, sys.argv[1:3])
e = json.loads((old / "entry.json").read_text())
e["saint"]["biography"] = (new / "biography.html").read_text().strip()
e["saint"]["summary"] = (new / "summary.txt").read_text().strip()
(new / "entry.json").write_text(json.dumps(e, ensure_ascii=False, indent=2) + "\n")
print(f"wrote {new / 'entry.json'}: biography {len(e['saint']['biography'].split())} words, summary {len(e['saint']['summary'].split())} words, draft {(e.get('save_result') or {}).get('version_id')}")
