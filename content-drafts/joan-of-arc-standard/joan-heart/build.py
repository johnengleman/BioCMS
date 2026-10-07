#!/usr/bin/env python3
"""Join part-*.html in order, turn {{n: note text}} markers into numbered notes,
and append the Sources list and the Notes list. Writes ../biography.html."""
import glob, os, re

here = os.path.dirname(os.path.abspath(__file__))
parts = sorted(glob.glob(os.path.join(here, "part-*.html")))
body = "\n\n".join(open(p, encoding="utf-8").read().strip() for p in parts)
sources = open(os.path.join(here, "sources-list.html"), encoding="utf-8").read().strip()

notes = []
def repl(m):
    notes.append(m.group(1).strip())
    n = len(notes)
    return f'<sup><a href="#note-{n}" id="ref-{n}">{n}</a></sup>'

body = re.sub(r"\s*\{\{n:\s*(.*?)\}\}", repl, body, flags=re.S)
items = "\n".join(f'  <li id="note-{i}">{t} <a href="#ref-{i}">↑</a></li>' for i, t in enumerate(notes, 1))
out = f'{body}\n\n{sources}\n\n<h2 id="notes">Sources: Notes</h2>\n<ol>\n{items}\n</ol>\n'
open(os.path.join(here, "..", "biography.html"), "w", encoding="utf-8").write(out)
print(f"{len(parts)} parts, {len(notes)} notes")
