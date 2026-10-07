#!/usr/bin/env python3
"""Make a clean reading copy of a biography for a blind review (blind-review.md).

Usage: review_copy.py content-drafts/<slug> OUT.md
Writes the summary and the story text (no note markers, no notes list, no Sources),
with headings as '##' and block quotes as '>'. Prints the word count.
"""
import html, re, sys
from pathlib import Path

d, out = Path(sys.argv[1]), Path(sys.argv[2])
s = (d / "biography.html").read_text(encoding="utf-8")
if '<h2 id="sources"' in s:
    s = s[: s.index('<h2 id="sources"')]
s = re.sub(r"<sup>.*?</sup>", "", s, flags=re.S)
s = re.sub(r"<h2[^>]*>(.*?)</h2>", lambda m: "\n## " + m.group(1) + "\n", s, flags=re.S)
s = re.sub(r"<blockquote>\s*<p>(.*?)</p>\s*<p><cite>(.*?)</cite></p>\s*</blockquote>",
           lambda m: "\n> " + m.group(1) + "\n> " + m.group(2) + "\n", s, flags=re.S)
s = re.sub(r"</p>", "\n", s)
s = html.unescape(re.sub(r"<[^>]+>", "", s))
s = re.sub(r"\n{3,}", "\n\n", s).strip()
summary = (d / "summary.txt").read_text(encoding="utf-8").strip()
out.write_text(f"Summary: {summary}\n\n{s}\n", encoding="utf-8")
print(len(s.split()))
