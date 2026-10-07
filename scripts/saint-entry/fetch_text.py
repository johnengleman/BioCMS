#!/usr/bin/env python3
"""Fetch a web page or archive.org text and print clean text.

Usage:
  fetch_text.py URL                      # clean text, first 3,000 words
  fetch_text.py URL --grep "Nektarios"   # only the passages around each match
  fetch_text.py URL --max-words 8000
  fetch_text.py archive:<identifier> --grep "..."   # archive.org OCR text
  fetch_text.py URL --save content-drafts/<slug>/sources/S7-life.txt --grep "..."
      # keeps the full clean text on disk; later calls with the same --save path
      # read the file and do not fetch again

Why: agents lose many turns working out how to read each site. This script
uses a browser User-Agent (vatican.va needs it), falls back to a direct IP
when the sandbox cannot resolve a name (azbyka.ru), keeps only the post body on
Blogger sites (Sanidopoulos), and strips HTML. --grep ignores case and accents,
so "therese" finds "Thérèse". Copy quotations and dates from this raw text,
never from a WebFetch summary.
"""
import argparse
import html
import os
import re
import subprocess
import sys
import unicodedata

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/605.1.15 "
      "(KHTML, like Gecko) Version/17.0 Safari/605.1.15")


def curl(url, resolve=None):
    cmd = ["curl", "-sL", "--compressed", "-A", UA, "--max-time", "60", url]
    if resolve:
        cmd[1:1] = ["--resolve", resolve]
    return subprocess.run(cmd, capture_output=True)


# Domains that changed owners or are traps. The value is the correct replacement.
MOVED = {
    "archives-carmel-lisieux.fr": "archives.carmeldelisieux.fr (the real Lisieux Carmel archive; the old domain is now a casino site)",
    "ephrem.org": "no replacement (the domain is now a gambling site)",
}


def fetch(url):
    host = (re.match(r"https?://([^/:]+)", url) or [None, ""])[1].lower()
    for bad, fix in MOVED.items():
        if host == bad or host.endswith("." + bad):
            sys.exit(f"do not use {bad}: use {fix}")
    r = curl(url)
    if r.returncode == 6:  # could not resolve host: look it up and connect by IP
        host = re.match(r"https?://([^/:]+)", url).group(1)
        ns = subprocess.run(["nslookup", host], capture_output=True, text=True).stdout
        ips = re.findall(r"^Address:\s*([0-9.]+)\s*$", ns, re.M)
        if ips:
            port = "80" if url.startswith("http://") else "443"
            r = curl(url, f"{host}:{port}:{ips[-1]}")
    if r.returncode != 0:
        sys.exit(f"fetch failed (curl exit {r.returncode}): {url}")
    return r.stdout.decode("utf-8", errors="replace")


def clean(page):
    body = page
    m = re.search(r"""(?s)<div[^>]*class=['"][^'"]*post-body[^'"]*['"][^>]*>(.*?)<div[^>]*class=['"][^'"]*post-footer""", page)
    if m:
        body = m.group(1)
    else:
        m = re.search(r"(?is)<(article|main)\b[^>]*>(.*?)</\1>", page)
        if m and len(m.group(2)) > 2000:
            body = m.group(2)
    body = re.sub(r"(?is)<(script|style|nav|header|footer|noscript)\b.*?</\1>", " ", body)
    body = re.sub(r"(?i)<br\s*/?>|</(p|div|h\d|li|tr|blockquote)>", "\n", body)
    text = html.unescape(re.sub(r"<[^>]+>", " ", body))
    text = re.sub(r"[ \t\xa0]+", " ", text)
    return re.sub(r"\n\s*\n+", "\n\n", text).strip()


def fold(s):
    return "".join(c for c in unicodedata.normalize("NFKD", s) if not unicodedata.combining(c)).lower()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--grep", help='show only passages around this term; several terms: "a|b|c"')
    ap.add_argument("--context", type=int, default=600, help="characters around each match")
    ap.add_argument("--max-words", type=int, default=3000)
    ap.add_argument("--save", help="file for the full clean text; if it exists, read it instead of fetching")
    a = ap.parse_args()

    if a.save and os.path.exists(a.save):
        text = open(a.save, encoding="utf-8").read()
    else:
        if a.url.startswith("archive:"):
            ident = a.url.split(":", 1)[1]
            text = fetch(f"https://archive.org/download/{ident}/{ident}_djvu.txt")
        else:
            page = fetch(a.url)
            # Plain text (an archive.org _djvu.txt, a .txt file) is not HTML: cleaning it as HTML
            # would delete everything between stray "<" and ">" characters in the OCR.
            text = clean(page) if re.search(r"(?i)<(html|body|div|p|article)\b", page[:20000]) else page.strip()
        if a.save:
            os.makedirs(os.path.dirname(a.save) or ".", exist_ok=True)
            with open(a.save, "w", encoding="utf-8") as f:
                f.write(f"Source: {a.url}\n\n{text}")

    if a.grep:
        flat = re.sub(r"\s+", " ", text)
        folded = fold(flat)
        pat = re.compile("|".join(re.escape(fold(t.strip())).replace(r"\ ", r"\s+") for t in a.grep.split("|") if t.strip()))
        spans = []
        for m in pat.finditer(folded):
            s, e = max(0, m.start() - a.context), m.end() + a.context
            if spans and s <= spans[-1][1]:
                spans[-1][1] = e
            else:
                spans.append([s, e])
        if not spans:
            sys.exit(f"no match for '{a.grep}' ({len(flat.split())} words on page)")
        text = "\n\n".join(f"[{i + 1}] …{flat[s:e]}…" for i, (s, e) in enumerate(spans))

    words = text.split(" ")
    if len(words) > a.max_words:
        text = " ".join(words[: a.max_words]) + f"\n\n[cut at {a.max_words} of {len(words)} words; use --grep or --max-words]"
    print(text)


if __name__ == "__main__":
    main()
