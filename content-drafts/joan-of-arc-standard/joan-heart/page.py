#!/usr/bin/env python3
"""page.py FILE PATTERN [CONTEXT]: print each match with the printed page number
(from the nearest running head above it: a line that is mostly caps with a number)."""
import re, sys, unicodedata

def fold(s):
    s = s.replace("œ", "oe").replace("æ", "ae")
    s = "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn").lower()
    return re.sub(r"\s+", " ", s)

path, pat = sys.argv[1], sys.argv[2]
ctx = int(sys.argv[3]) if len(sys.argv) > 3 else 6
lines = open(path, encoding="utf-8", errors="replace").read().split("\n")
head = re.compile(r"^\s*(\d{1,3})\s+[A-ZÉÈÀÇ'’ .,-]{8,}\.?\s*$|^\s*[A-ZÉÈÀÇ'’ .,-]{8,}\.?\s+(\d{1,3})\s*$")
page = [None] * len(lines)
cur = None
for i, l in enumerate(lines):
    m = head.match(l)
    if m:
        cur = m.group(1) or m.group(2)
    page[i] = cur
rx = re.compile(fold(pat))
for i, l in enumerate(lines):
    if rx.search(fold(l)):
        a, b = max(0, i - ctx), min(len(lines), i + ctx + 1)
        print(f"=== line {i+1}  page {page[i]}")
        print("\n".join(x for x in lines[a:b] if x.strip()))
