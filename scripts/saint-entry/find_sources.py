#!/usr/bin/env python3
"""Find sources about a saint in one call.

Usage:
  find_sources.py blog "Nektarios"         # John Sanidopoulos's blog: matching saint labels + posts
  find_sources.py archive "Theresia Lisieux" [--before 1931]   # archive.org texts
  find_sources.py all "Kosmas Aitolos"     # both

Output is a short list of titles and URLs. Read a hit with fetch_text.py.
The local public-domain library has its own search:
  /Users/nicholas/Desktop/saints-website/source-library/find.py "<name>"
"""
import argparse
import json
import subprocess
import sys
import unicodedata
import urllib.parse

UA = "Mozilla/5.0"
BLOG = "https://www.johnsanidopoulos.com"


def get_json(url):
    r = subprocess.run(["curl", "-sL", "-A", UA, "--max-time", "60", url], capture_output=True)
    try:
        return json.loads(r.stdout.decode("utf-8", errors="replace"))
    except json.JSONDecodeError:
        return None


def fold(s):
    return "".join(c for c in unicodedata.normalize("NFKD", s) if not unicodedata.combining(c)).lower()


def blog(query, limit):
    words = [w for w in fold(query).split() if len(w) > 2]
    feed = get_json(f"{BLOG}/feeds/posts/summary?alt=json&max-results=0")
    labels = [c["term"] for c in (feed or {}).get("feed", {}).get("category", [])]
    hits = [l for l in labels if all(w in fold(l) for w in words)] or \
           [l for l in labels if any(w in fold(l) for w in words)]
    print(f"== Sanidopoulos: {len(hits)} matching labels")
    for lab in hits[:5]:
        url = f"{BLOG}/feeds/posts/summary/-/{urllib.parse.quote(lab)}?alt=json&max-results={limit}"
        f = (get_json(url) or {}).get("feed", {})
        entries = f.get("entry", [])
        print(f"\n[label] {lab}: {f.get('openSearch$totalResults', {}).get('$t', '?')} posts")
        for e in entries[:limit]:
            link = next(l["href"] for l in e["link"] if l["rel"] == "alternate")
            print(f"  - {e['title']['$t'][:90]} | {link}")
    if not hits:
        url = f"{BLOG}/feeds/posts/summary?q={urllib.parse.quote(query)}&alt=json&max-results={limit}"
        for e in (get_json(url) or {}).get("feed", {}).get("entry", [])[:limit]:
            link = next(l["href"] for l in e["link"] if l["rel"] == "alternate")
            print(f"  - {e['title']['$t'][:90]} | {link}")


def archive(query, before, limit):
    q = f"({query}) AND mediatype:texts"
    if before:
        q += f" AND date:[1500-01-01 TO {before}-12-31]"
    url = ("https://archive.org/advancedsearch.php?q=" + urllib.parse.quote(q) +
           f"&fl[]=identifier&fl[]=title&fl[]=date&fl[]=language&rows={limit}&output=json")
    docs = (get_json(url) or {}).get("response", {}).get("docs", [])
    print(f"\n== archive.org: {len(docs)} texts (read with: fetch_text.py archive:<identifier> --grep ...)")
    for d in docs:
        print(f"  - {str(d.get('date', ''))[:4]} | {str(d.get('title'))[:80]} | {d.get('language', '')} | {d['identifier']}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("where", choices=["blog", "archive", "all"])
    ap.add_argument("query")
    ap.add_argument("--before", type=int, help="archive: only works published up to this year")
    ap.add_argument("--limit", type=int, default=20)
    a = ap.parse_args()
    if a.where in ("blog", "all"):
        blog(a.query, a.limit)
    if a.where in ("archive", "all"):
        archive(a.query, a.before, a.limit)


if __name__ == "__main__":
    main()
