#!/usr/bin/env python3
"""Sort all fact cards of a saint's dossier into life periods by year.

Usage: split_cards.py content-drafts/<slug>/02-dossier  PERIODS
PERIODS is a comma list of "label:start-end", e.g. "P1:1823-1876,P2:1877-1886".
Cards without a year go to "undated". Writes 02-dossier/_by-period/<label>.md.
"""
import pathlib, re, sys

dossier = pathlib.Path(sys.argv[1])
periods = [(l, int(a), int(b)) for l, r in (p.split(":") for p in sys.argv[2].split(",")) for a, b in [r.split("-")]]
out = {l: [] for l, _, _ in periods}
out["undated"] = []
YEAR = re.compile(r"\b(1[6-9]\d\d|20[0-2]\d)\b")

for facts in sorted(dossier.glob("parts/*/facts.md")):
    text = facts.read_text(encoding="utf-8")
    cards = re.split(r"(?m)^(?=### F-)", text)
    for card in cards:
        if not card.startswith("### F-"):
            continue
        when = re.search(r"(?mi)^\s*-\s*\**when[^:\n]*:\**\s*(.*)$", card)
        m = YEAR.search(when.group(1)) if when else None
        if not m:
            m = YEAR.search(card.split("\n", 2)[0] + "\n" + (re.search(r"(?mi)^\s*-\s*\**claim\**:.*$", card) or re.search("", "")).group(0))
        label = "undated"
        if m:
            y = int(m.group(1))
            for l, a, b in periods:
                if a <= y <= b:
                    label = l
                    break
        out[label].append(card.rstrip() + "\n")

dest = dossier / "_by-period"
dest.mkdir(exist_ok=True)
for label, cards in out.items():
    (dest / f"{label}.md").write_text("".join(cards), encoding="utf-8")
    words = sum(len(c.split()) for c in cards)
    print(f"{label:9} {len(cards):5} cards {words:7} words")
