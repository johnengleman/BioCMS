import re, sys, os
S = '/private/tmp/claude-501/-Users-nicholas-Desktop-saints-website/e5f47d61-2316-4712-8219-d4c1aba2c8b7/scratchpad/ow'
O = '/Users/nicholas/Desktop/saints-website/BioCMS/content-drafts/therese-of-lisieux/02-dossier/parts/own-writings'
files = [os.path.join(S, f) for f in sys.argv[1:] if os.path.exists(os.path.join(S, f))]
cards = []
for fn in files:
    s = open(fn).read()
    s = re.split(r'\n#{2,3} (?:QUOTATIONS|MIRACLES|WORKS|SCENES|GAPS AND CONFLICTS)\b', s)[0]
    for m in re.finditer(r'<!-- sort: ([0-9-]+) -->\s*\n### (.*?)\n(.*?)(?=\n<!-- sort:|\Z)', s, re.S):
        cards.append((m.group(1), len(cards), m.group(2).strip(), m.group(3).strip()))
cards.sort()
out = ["# Fact cards — own writings (F-OW)\n",
       "Stage 2 dossier for St. Thérèse of Lisieux. Source family: her own writings (Ms A, B, C; letters LT; poems PN; plays RP; prayers Pri) and her last words as recorded by her sisters. Cards are in date order. See sources.md for the locator scheme, the rights labels and the \"new to English readers\" scheme.\n"]
if len(sys.argv) > 1 and os.environ.get('INTERIM'):
    out.append("INTERIM SAVE: more cards are still being added.\n")
for i, (d, _, t, b) in enumerate(cards, 1):
    t = re.sub(r'^F-OW-\d+\s*[—-]\s*', '', t)
    b = b.replace('give her heart to a mortel', 'give her heart to a mortal').replace('a mortel', 'a mortal')
    out.append(f"### F-OW-{i:03d} — {t}\n{b}\n")
open(os.path.join(O, 'facts.md'), 'w').write('\n'.join(out))
print(len(cards), 'cards from', [os.path.basename(f) for f in files])
