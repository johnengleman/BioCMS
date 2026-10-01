#!/usr/bin/env python3
"""Mechanical checks for a Find a Saint biography.

Usage: lint_biography.py content-drafts/<slug>/04-biography.html [--summary 04-summary.txt]

The writer's prompt covers story and voice. This script covers the rules a
program can check exactly: HTML, citations, sentence length, heading length,
glow words, "not X, but Y" sentences, and quotation counts. It prints a
report and exits with 1 when a hard rule fails.
"""
import argparse
import html
import re
import sys
from html.parser import HTMLParser

ALLOWED_TAGS = {"p", "h2", "h3", "blockquote", "cite", "em", "strong", "ul", "ol", "li", "a", "br"}

# Praise and AI-tell words. The prompt explains the principle; this list enforces it.
GLOW = [  # praise words: always flagged (case-insensitive)
    r"\bsaintly\b", r"\bextraordinar\w*", r"\bremarkabl\w*", r"\binspir(ing|ational)\b",
    r"\bprofound\w*", r"\btruly\b", r"\bradiant\w*", r"\bangelic\b", r"\bexceptional\w*",
    r"\bunwavering\b", r"\bsteadfast\w*", r"\bbeacon\b", r"\btapestry\b", r"\bindelible\b",
    r"\btestament to\b", r"\bdelve\w*", r"\blittle did\b", r"\bleft an? (lasting )?(mark|legacy)\b",
    r"\bshining example\b", r"\bhumble servant\b", r"\bvirtuous\b", r"\bselfless\w*", r"\bsaintliness\b",
]
GLOW_CASE = [r"\bholy\b"]  # lowercase only, so "Holy Communion" and "Holy Virgin Cathedral" pass
TELLS = [  # often AI tells, sometimes literal: flagged for review
    r"\bjourney\b", r"\bdeeply\b", r"\bin a world where\b", r"\bwould go on to\b", r"\bpious\b",
    r"\bnestled\b", r"\bvibrant\b", r"\bpivotal\b", r"\bpoignant\w*", r"\bresonat\w*",
]
# "not X, but Y" and its cousins.
NOT_BUT = [
    r"\b(is|was|were|are|be|been)\s+not\s+[^.;:!?]{1,80}?,\s*but\b",
    r"\bnot\s+(just|only|merely|simply)\s+[^.;:!?]{1,80}?\bbut\b",
    r"\b(is|was|were|are)\s+not\s+[^.!?]{1,80}[.!?]\s+(It|This|That|He|She|They)\s+(is|was|were|are)\b",
    r"\bit was(n't| not)\s+[^.;:!?]{1,60}?\s(that|which)\b[^.;:!?]{0,60}?,\s*(but|it was)\b",
]
HEDGE_META = [r"\bhistorians (debate|disagree)\b", r"\bthis biography\b", r"\bin this (article|section)\b",
              r"\bas we (shall|will) see\b", r"\bsources suggest\b"]


class Collector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack, self.problems = [], []
        self.blocks = []            # (tag, text, in_sources)
        self.headings = []          # (tag, id, text)
        self.links_in_body = 0
        self.blockquotes = 0
        self.in_sources = False
        self._text, self._tag, self._id = [], None, None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in ALLOWED_TAGS:
            self.problems.append(f"disallowed tag <{tag}>")
        for bad in ("class", "style"):
            if bad in a:
                self.problems.append(f"attribute {bad}= on <{tag}>")
        if any(k.startswith("on") for k in a):
            self.problems.append(f"event handler on <{tag}>")
        if tag == "a":
            href = a.get("href", "")
            if not href.startswith("https://"):
                self.problems.append(f"non-HTTPS link: {href[:60]}")
            if not self.in_sources:
                self.links_in_body += 1
        if tag == "blockquote":
            self.blockquotes += 1
        if tag in ("h2", "h3", "p", "li"):
            self._text, self._tag, self._id = [], tag, a.get("id")
            if tag in ("h2", "h3") and not a.get("id"):
                self.problems.append(f"<{tag}> without id")
        self.stack.append(tag)

    def handle_endtag(self, tag):
        if self.stack and self.stack[-1] == tag:
            self.stack.pop()
        if tag == self._tag:
            text = re.sub(r"\s+", " ", "".join(self._text)).strip()
            if tag in ("h2", "h3"):
                self.headings.append((tag, self._id, text))
                if tag == "h2" and (self._id == "sources" or text.lower().startswith("sources")):
                    self.in_sources = True
            else:
                self.blocks.append((tag, text, self.in_sources, "blockquote" in self.stack))
            self._tag = None

    def handle_data(self, data):
        if self._tag:
            self._text.append(data)


def sentences(text):
    text = re.sub(r"\b(St|Sr|Fr|Mt|Dr|Mme|Mgr|Mr|Mrs|No|vol|p|pp|ch)\.", r"\1", text)
    parts = re.split(r"(?<=[.!?…])[\"”’)]*\s+(?=[A-Z“\"‘(])", text)
    return [s for s in (p.strip() for p in parts) if len(s.split()) >= 2]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("biography")
    ap.add_argument("--summary")
    args = ap.parse_args()

    raw = open(args.biography, encoding="utf-8").read()
    c = Collector()
    c.feed(raw)
    hard, soft = list(c.problems), []

    body = [(t, x) for t, x, src, bq in c.blocks if not src and not bq]
    prose = " ".join(x for _, x in body)
    words = len(prose.split())
    sents = [s for _, x in body for s in sentences(x)]
    avg = sum(len(s.split()) for s in sents) / max(1, len(sents))

    if c.links_in_body:
        hard.append(f"{c.links_in_body} link(s) in the body; links belong only in the sources list")
    if re.search(r"\[\d+\]|\(\s*(see|cf\.)|<sup", raw, re.I):
        hard.append("citation marker or footnote in the text")
    if not any(h[1] == "sources" for h in c.headings):
        hard.append('missing <h2 id="sources">')
    if avg > 20:
        hard.append(f"average sentence length {avg:.1f} words (limit 20)")
    if avg < 15:
        soft.append(f"average sentence length {avg:.1f} words: the prose may read as a choppy list of facts (aim for about 16–20, with real variety)")
    starts = [re.match(r"[\"“‘(]*(\w+)", s) for s in sents]
    starts = [m.group(1).lower() if m else "" for m in starts]
    run = 1
    for i in range(1, len(starts)):
        run = run + 1 if starts[i] == starts[i - 1] and starts[i] in ("she", "he", "they", "the", "her", "his", "it") else 1
        if run == 3:
            soft.append(f"three sentences in a row start with \"{starts[i]}\": …{sents[i][:80]}…")
    for s in sents:
        if len(s.split()) > 35:
            soft.append(f"long sentence ({len(s.split())} words): {s[:90]}…")

    for tag, hid, text in c.headings:
        n = len(text.split())
        if tag == "h2" and hid != "sources" and not 3 <= n <= 7:
            soft.append(f"h2 has {n} words (aim 4–6): {text}")
        if tag == "h3" and not 3 <= n <= 9:
            soft.append(f"h3 has {n} words (aim 4–8): {text}")

    for label, patterns, bucket, flags in (("glow word", GLOW, hard, re.I), ("glow word", GLOW_CASE, hard, 0),
                                           ('"not X, but Y"', NOT_BUT, hard, re.I),
                                           ("possible AI tell", TELLS, soft, re.I),
                                           ("meta-commentary", HEDGE_META, soft, re.I)):
        for p in patterns:
            for m in re.finditer(p, prose, flags):
                a = max(0, m.start() - 50)
                bucket.append(f"{label}: …{prose[a:m.end() + 40]}…")

    dashes = prose.count("—")
    if words and dashes / words * 1000 > 6:
        soft.append(f"em dashes: {dashes} ({dashes / words * 1000:.1f} per 1,000 words; aim under 6)")
    if not 6 <= c.blockquotes <= 12:
        soft.append(f"{c.blockquotes} block quotes (aim 6–12 for a full biography)")

    if args.summary:
        sw = len(open(args.summary, encoding="utf-8").read().split())
        if not 70 <= sw <= 120:
            hard.append(f"summary has {sw} words (70–120)")

    print(f"words: {words}  sentences: {len(sents)}  avg sentence: {avg:.1f}  "
          f"h2: {sum(1 for h in c.headings if h[0] == 'h2')}  h3: {sum(1 for h in c.headings if h[0] == 'h3')}  "
          f"block quotes: {c.blockquotes}")
    for title, items in (("MUST FIX", hard), ("CHECK", soft)):
        if items:
            print(f"\n{title} ({len(items)})")
            for i in items:
                print(" -", html.unescape(i))
    sys.exit(1 if hard else 0)


if __name__ == "__main__":
    main()
