#!/usr/bin/env python3
"""Copy the checked text files of a saint folder into its entry.json.

Usage: sync_packet.py content-drafts/<slug> [--skip=teachings.html]

Each file that exists replaces its packet field; the rest of the packet stays as it is:
  biography.html -> saint.biography     summary.txt    -> saint.summary
  teachings.html -> related.teachings[0].teachings
  miracles.html  -> related.miracles[0].miracles
Run it after the fact checks, before upload.mjs. It skips teachings.html or miracles.html
until the matching check-teachings.md, check-miracles.md, or check-sections.md exists, so an unchecked draft never reaches Directus.
"""
import json, sys, pathlib
d = pathlib.Path(sys.argv[1])
skip = {a.split("=",1)[1] for a in sys.argv[2:] if a.startswith("--skip=")}  # e.g. --skip=teachings.html
e = json.loads((d / "entry.json").read_text())
done = []
def text(name):
    f = d / name
    return f.read_text().strip() if f.exists() else None
for name, setter in (
    ("biography.html", lambda t: e["saint"].__setitem__("biography", t)),
    ("summary.txt", lambda t: e["saint"].__setitem__("summary", t)),
    ("teachings.html", lambda t: e.setdefault("related", {}).setdefault("teachings", [{}]) and e["related"]["teachings"][0].__setitem__("teachings", t)),
    ("miracles.html", lambda t: e.setdefault("related", {}).setdefault("miracles", [{}]) and e["related"]["miracles"][0].__setitem__("miracles", t)),
):
    if name in skip:
        print(f"skipped {name}: --skip")
        continue
    t = text(name)
    if t and name in ("teachings.html", "miracles.html") and not ((d / f"check-{name.split('.')[0]}.md").exists() or (d / "check-sections.md").exists()):
        print(f"skipped {name}: no check-{name.split('.')[0]}.md yet, so it is not checked")
        continue
    if t:
        if name in ("teachings.html", "miracles.html"):
            key = name.split(".")[0]
            if not e["related"].get(key):
                e["related"][key] = [{}]
        setter(t)
        done.append(f"{name} ({len(t.split())} words)")
(d / "entry.json").write_text(json.dumps(e, ensure_ascii=False, indent=1) + "\n")
print("updated entry.json from: " + (", ".join(done) or "nothing"))
