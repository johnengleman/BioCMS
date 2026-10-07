#!/usr/bin/env python3
"""Mechanical checks for a Find a Saint biography.

Usage: lint_biography.py content-drafts/<slug>/biography.html [--summary summary.txt]
       lint_biography.py content-drafts/<slug>/teachings.html --kind teachings
       lint_biography.py content-drafts/<slug>/miracles.html --kind miracles

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

ALLOWED_TAGS = {"p", "h2", "h3", "blockquote", "cite", "em", "strong", "ul", "ol", "li", "a", "br", "sup"}
# Back matter where paragraphs need no note.
NO_NOTE_SECTIONS = ("a-note-on-the-sources", "how-this-was-researched", "image-credit")

# Praise and AI-tell words. The prompt explains the principle; this list enforces it.
GLOW = [  # praise words: always flagged (case-insensitive)
    r"\bsaintly\b", r"\bextraordinar\w*", r"\bremarkabl\w*", r"\binspir(ing|ational)\b",
    r"\bprofound\w*", r"\btruly\b", r"\bradiant\w*", r"\bangelic\b", r"\bexceptional\w*",
    r"\bunwavering\b", r"\bsteadfast\w*", r"\bbeacon\b", r"\btapestry\b", r"\bindelible\b",
    r"\btestament to\b", r"\bdelve\w*", r"\blittle did\b", r"\bleft an? (lasting )?(mark|legacy)\b",
    r"\bshining example\b", r"\bhumble servant\b", r"\bvirtuous\b", r"\bselfless\w*", r"\bsaintliness\b",
]
GLOW_CASE = [r"\bholy (?!relics?\b|water\b|oil\b|icons?\b|places?\b|things\b|mysteries\b|cross\b|gifts\b|bread\b|sepulchre\b|land\b|week\b|days?\b|scripture\b|name\b|spirit\b|martyrs?\b|apostles?\b|angels?\b|prophets?\b|fathers\b|innocents\b|virgin\b|mother of god\b|earth\b|ground\b|sacrifice\b|eucharist\b|gospels?\b|church\b|baptism\b|sacraments?\b|mass\b|liturgy\b|communion\b|orders\b|rule\b|office\b|see\b|souls\b|oils\b|chrism\b|altar\b|table\b|mountain\b|city\b|temple\b)"]  # praise of people; "holy relics" and other holy things pass, and "Holy Communion" passes by case
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
HEDGE_META = [r"\ballegedly\b", r"\breportedly\b", r"\bsupposedly\b", r"\bscientific proof\b", r"\bdoes not dismiss\b", r"\bpeople have attributed\b", r"\bmade up\b", r"\bnot true\b", r"\bonly a legend\b", r"\blate legend\b", r"\bcannot be (shown|proved|proven)\b", r"\bscholars (doubt|date)\b", r"\bnothing (in his|in her) own hand\b", r"\bhistorians (debate|disagree)\b", r"\bthis biography\b", r"\bin this (article|section)\b",
              r"\bas we (shall|will) see\b", r"\bsources suggest\b"]


class Collector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack, self.problems = [], []
        self.blocks = []            # (tag, text, in_sources)
        self.headings = []          # (tag, id, text)
        self.links_in_body = 0
        self.link_blocks = []       # text of body blocks that hold a link
        self._link_here = False
        self.blockquotes = 0
        self.in_sources = False
        self._text, self._tag, self._id = [], None, None
        self.section = None         # id of the current h2
        self.refs = []              # note numbers of the markers, in order
        self.notes = []             # note numbers of the notes list, in order
        self.bad_refs = []
        self._ref_here = False
        self.unnoted = []           # body paragraphs of 25+ words with no note

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag not in ALLOWED_TAGS:
            self.problems.append(f"disallowed tag <{tag}>")
        for bad in ("class", "style"):
            if bad in a:
                self.problems.append(f"attribute {bad}= on <{tag}>")
        if any(k.startswith("on") for k in a):
            self.problems.append(f"event handler on <{tag}>")
        if tag == "a" and a.get("href", "").startswith(("#note-", "#ref-")):
            href = a["href"]
            if href.startswith("#note-"):
                m = re.fullmatch(r"#note-(\d+)", href)
                if "sup" not in self.stack or not m or a.get("id") != f"ref-{m.group(1)}":
                    self.bad_refs.append(href)
                else:
                    self.refs.append(int(m.group(1)))
                    self._ref_here = True
        elif tag == "a":
            href = a.get("href", "")
            if not href.startswith("https://"):
                self.problems.append(f"non-HTTPS link: {href[:60]}")
            if not self.in_sources:
                self.links_in_body += 1
                self._link_here = True
        if tag == "blockquote":
            self.blockquotes += 1
        if tag == "li" and re.fullmatch(r"note-\d+", a.get("id") or ""):
            self.notes.append(int(a["id"].split("-")[1]))
        if tag == "h2":
            self.section = a.get("id")
        if tag in ("h2", "h3", "p", "li"):
            self._text, self._tag, self._id = [], tag, a.get("id")
            self._link_here = False
            self._ref_here = False
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
                if (tag == "p" and not self.in_sources and "blockquote" not in self.stack and not self._ref_here
                        and self.section not in NO_NOTE_SECTIONS and len(text.split()) >= 25):
                    self.unnoted.append(text)
                if self._link_here and not self.in_sources:
                    self.link_blocks.append(text)
            self._tag = None

    def handle_data(self, data):
        if self._tag and "sup" not in self.stack:  # note numbers are not prose
            self._text.append(data)


def sentences(text):
    text = re.sub(r"\b(St|Sr|Fr|Mt|Dr|Mme|Mgr|Mr|Mrs|No|vol|p|pp|ch)\.", r"\1", text)
    parts = re.split(r"(?<=[.!?…])[\"”’)]*\s+(?=[A-Z“\"‘(])", text)
    return [s for s in (p.strip() for p in parts) if len(s.split()) >= 2]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("biography")
    ap.add_argument("--summary")
    ap.add_argument("--kind", choices=("biography", "teachings", "miracles"), default="biography")
    ap.add_argument("--relaxed", action="store_true", help="kept for old commands; the relaxed sentence rules are now the default")
    ap.add_argument("--strict", action="store_true", help="the old long-prompt sentence counts (before 2026-10-06)")
    ap.add_argument("--legacy", action="store_true", help="text written before numbered notes (2026-10-06): skip the note rules")
    args = ap.parse_args()

    raw = open(args.biography, encoding="utf-8").read()
    c = Collector()
    c.feed(raw)
    hard, soft = list(c.problems), []

    # miracles: each account ends with its own "Source: …" line, which may hold a link
    is_source_line = lambda x: args.kind == "miracles" and x.startswith("Source")
    body = [(t, x) for t, x, src, bq in c.blocks if not src and not bq and not is_source_line(x)]
    prose = " ".join(x for _, x in body)
    words = len(prose.split())
    sents = [s for _, x in body for s in sentences(x)]
    avg = sum(len(s.split()) for s in sents) / max(1, len(sents))

    bad_links = [t for t in c.link_blocks if not is_source_line(t)] if args.kind == "miracles" else c.link_blocks
    if bad_links:
        where = "in the \"Source:\" line of each account" if args.kind == "miracles" else "only in the sources list"
        hard.append(f"{len(bad_links)} block(s) with a link in the text; links belong {where}")
    if re.search(r"\[\d+\]|\(\s*(see|cf\.)", raw, re.I):
        hard.append("bracket or parenthetical citation in the text; use numbered notes (citations.md)")
    if args.kind != "miracles" and not args.legacy:
        if not c.refs:
            hard.append("no numbered notes: add a note after every quotation and story paragraph (citations.md)")
        else:
            if c.refs != list(range(1, len(c.refs) + 1)):
                hard.append("note markers must run 1, 2, 3 … in order, each used once")
            if sorted(c.notes) != sorted(c.refs) or len(set(c.notes)) != len(c.notes):
                hard.append(f"note markers and notes list do not match (markers {len(c.refs)}, notes {len(c.notes)})")
            if not any(h[1] == "notes" for h in c.headings):
                hard.append('missing <h2 id="notes">Sources: Notes</h2> after the sources list')
            if c.unnoted:
                hard.append(f"{len(c.unnoted)} paragraph(s) of 25+ words with no note, e.g.: {c.unnoted[0][:90]}…")
        if c.bad_refs:
            hard.append(f"note marker not in the form <sup><a href=\"#note-N\" id=\"ref-N\">N</a></sup>: {c.bad_refs[:3]}")
    if args.kind != "miracles" and not any(h[1] == "sources" for h in c.headings):
        hard.append('missing <h2 id="sources">')
    if avg > 20:
        hard.append(f"average sentence length {avg:.1f} words (limit 20)")
    if avg < 13:
        soft.append(f"average sentence length {avg:.1f} words: the prose may read as a choppy list of facts (aim for about 14–18, with real variety)")
    starts = [re.match(r"[\"“‘(]*(\w+)", s) for s in sents]
    starts = [m.group(1).lower() if m else "" for m in starts]
    run = 1
    for i in range(1, len(starts)):
        run = run + 1 if starts[i] == starts[i - 1] and starts[i] in ("she", "he", "they", "the", "her", "his", "it") else 1
        if run == 3:
            soft.append(f"three sentences in a row start with \"{starts[i]}\": …{sents[i][:80]}…")
    for s in sents:
        if len(s.split()) > 30:
            soft.append(f"long sentence ({len(s.split())} words; split it): {s[:90]}…")

    # bent sentences: commas and interruptions (counted outside quotation marks)
    def bare(s):
        s = re.sub(r"[“\"][^”\"]*[”\"]", "Q", s)
        return re.sub(r"[“\"][^”\"]*$", "Q", s)  # a quotation still open at the end of the sentence
    def is_list(s):
        return bool(re.search(r"\w+, (?:[\w’'-]+ ){0,3}[\w’'-]+,? (?:and|or) ", s)) and s.count(",") <= 4
    nb = [bare(s) for s in sents]
    many = [s for s, b in zip(sents, nb) if b.count(",") >= 3 and not is_list(b)]
    stacked = [s for s, b in zip(sents, nb) if re.match(r"^[^,]{1,45},\s[^,]{1,70},\s", b) and not is_list(b)]
    middle = [s for s, b in zip(sents, nb) if re.search(r", (?:[\w’'.-]+ ){1,4}(?:says|said|wrote|writes|remembered|recalled|tells|told us|records|recorded|reports|reported), ", b)]
    cut = [s for s, b in zip(sents, nb) if re.search(r"^(?:The |His |Her |Their |A |An )?[\w’' -]{2,40}, [^,]{3,70}, (?:was|were|is|are|had|has|did|came|went|stood|said|wrote|told|took|gave|made|became|began|lived|died)\b", b)]
    n_s = max(1, len(sents))
    rules = (("3 or more commas", many, 0.03), ("two phrases stacked before the subject", stacked, 0.03),
             ("source named in the middle of the sentence", middle, 0.01), ("words between the subject and its verb", cut, 0.01))
    if not args.strict:  # slim prompt (2026-10-06): only heavy commas and stacked phrases fail
        rules = (("3 or more commas", many, 0.08), ("two phrases stacked before the subject", stacked, 0.05),
                 ("source named in the middle of the sentence", middle, 1.0), ("words between the subject and its verb", cut, 1.0))
    for label, items, limit in rules:
        if len(items) / n_s > limit:
            hard.append(f"bent sentences: {len(items)} with {label} ({len(items) * 100 // n_s}% of sentences; limit {int(limit * 100)}%). Make them run straight; see 'Straight sentences'.")
        for s in items:
            soft.append(f"bent sentence ({label}): {s[:110]}…")

    # reading level of the narrator's prose (Flesch-Kincaid grade)
    def syl(w):
        w = re.sub(r"[^a-z]", "", w.lower())
        n = len(re.findall(r"[aeiouy]+", w))
        if w.endswith("e") and not w.endswith(("le", "ee")) and n > 1:
            n -= 1
        return max(1, n)
    pw = re.findall(r"[A-Za-z’'-]+", prose)
    if pw and sents:
        fk = 0.39 * len(pw) / len(sents) + 11.8 * sum(syl(w) for w in pw) / len(pw) - 15.59
        if fk > 8.0:
            hard.append(f"reading grade {fk:.1f} (limit 8.0, aim 6–7): use shorter sentences and plainer words")
        elif fk > 7.0:
            soft.append(f"reading grade {fk:.1f} (aim 6–7)")

    # old-fashioned English, in the narrator's prose and in block quotes
    everything = " ".join(x for _, x, src, _ in c.blocks if not src)
    old = sorted({m.group(0).lower() for m in re.finditer(
        r"\b(thee|thou|thy|thine|ye|hath|doth|dost|art thou|bade|wont|wherein|whereof|whereby|whence|thereof|therein|thereby|"
        r"brethren|unto|spake|saith|sayeth|behold|verily|lest|wherefore|henceforth|hither|thither|"
        r"\w+eth)\b", everything, re.I)} - {"seth", "beth", "kenneth", "elizabeth", "nazareth", "teeth", "twentieth", "thirtieth", "fortieth", "fiftieth", "sixtieth", "seventieth", "eightieth", "ninetieth"})
    if old:
        hard.append("old-fashioned English (put quotations into plain modern English, translated from the original): " + ", ".join(old))

    for tag, hid, text in c.headings:
        n = len(text.split())
        if tag == "h2" and hid not in ("sources", "notes") and not 3 <= n <= 8:
            soft.append(f"h2 has {n} words (aim 3–8, plain words that say what it is about): {text}")
        if tag == "h3" and not 3 <= n <= 9:
            soft.append(f"h3 has {n} words (aim 4–8): {text}")

    for label, patterns, bucket, flags in (("glow word", GLOW, hard, re.I), ("glow word", GLOW_CASE, hard, 0),
                                           ('"not X, but Y"', NOT_BUT, hard, re.I),
                                           ("possible AI tell", TELLS, soft, re.I),
                                           ("meta-commentary", HEDGE_META, soft, re.I)):
        # praise words are judged in the narrator's words only: quoted words keep their source's wording
        text_ = re.sub(r"[“\"][^”\"]*[”\"]", "Q", prose) if label == "glow word" else prose
        for p in patterns:
            for m in re.finditer(p, text_, flags):
                a = max(0, m.start() - 50)
                bucket.append(f"{label}: …{text_[a:m.end() + 40]}…")

    # sentences copied from the Thérèse opening in voice-examples.md
    for p in (r"How did that happen\?", r"How (?:did|does|could|can) (?:a|an|the) [^.?!]{0,160}\b(?:become|became|end (?:his|her) life)\b[^.?!]*\?",
              r"The answer is the whole of (?:his|her) life", r"By the world[’']s measure"):
        for m in re.finditer(p, prose, re.I):
            hard.append(f"copied from the Thérèse example (find this life's own words): …{prose[max(0, m.start() - 20):m.end() + 20]}…")

    dashes = prose.count("—")
    if words and dashes / words * 1000 > 6:
        soft.append(f"em dashes: {dashes} ({dashes / words * 1000:.1f} per 1,000 words; aim under 6)")
    if args.kind == "biography" and not 3 <= c.blockquotes <= 10:
        soft.append(f"{c.blockquotes} block quotes (aim 3–10 for a full biography)")

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
