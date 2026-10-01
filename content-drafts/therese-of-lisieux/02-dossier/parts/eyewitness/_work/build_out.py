import sys,re,glob,collections
sys.path.insert(0,'.')
import merge
D='/Users/nicholas/Desktop/saints-website/BioCMS/content-drafts/therese-of-lisieux/02-dossier/parts/eyewitness/'
F,M,S,Q,render,fix=merge.build(D)
batches={'A':'PO 1 Mère Agnès (Ordinary Process) — complete; addendum topics only partly carded',
'B':'PA 6 Mère Agnès (Apostolic Process) — PARTIAL (cards to folio ≈[531] of [552]; no addendum, no summary)',
'C':'PO 3 Marie du Sacré-Cœur + PO 4 Sr Geneviève (Ordinary) — PARTIAL (to f. ≈403r of 415v; no addendum)',
'D':'PA 7 Marie du Sacré-Cœur + PA 8 Sr Geneviève (Apostolic) — complete',
'E':'Novices: PO 17/PA 21 Marie de la Trinité, PO 18 Marie-Madeleine, PO 15/PA 18 Marthe, PA 17 Aimée de Jésus — nearly complete; addendum not applied',
'F':'PO 13/PA 9 Thérèse de Saint-Augustin, PO 14/PA 10 Marie des Anges, PO 16 Isabelle, PO 7/PA 11 Léonie — PARTIAL (PO 16 thin; no addendum)',
'G':'Family, teachers, priests (Jeanne Guérin, Benedictines, Pichon, Roulland, Dumaine, Valadier, Lemonnier, chaplains) — complete',
'H':'Cult and miracle witnesses (Taylor, Élie, Auriault, Weber, Madelaine, Grant, etc.) — PARTIAL (PO 33 Bishop Giannattasio not carded)',
'I':'Community notes préparatoires, témoignages, souvenirs, Gonzague pages, Léonie lecture — nearly complete; no summary',
'J':"Céline's Conseils et souvenirs; Marie's autobiographical memories — complete",
'K':'Gonzague biography; Aimée, Saint-Jean-Baptiste, Saint-Vincent de Paul biographies/circulars — PARTIAL',
'L':'Local public-domain books: De Teil 1913, Dolan 1926, Taylor 1924, Carmel Foundation 1913, Laveille 1928 (deposition quotes) — complete'}
head="""# Facts — eyewitness and process testimony (F-EW)

Cards are sorted by the date in their "When / where" line (year, month, day). Cards with no year there come last, under "Undated". Each card ends with its extraction ID (batch letter + number) so it can be traced to the working notes.

Locators: "PO n" = Ordinary Process 1910–11, witness n; "PA n" = Apostolic Process 1915–17, witness n; numbers in square brackets are folios/pages of the public copy as printed on the Archives du Carmel pages (sources.md W1–W2). Community pages = W3. Local books = L1–L5.

Rights: Carmel web text is facts-only; French quotations are short; every English rendering is ours. Public-domain English (L1–L5) is marked in its cards.

Batches merged:
""" + '\n'.join(f"- {k}: {v}" for k,v in batches.items()) + "\n\nMany events have several cards from different witnesses. They were NOT merged, because each speaker must stay separate. Search by date to find parallel accounts. The sort uses the first year in the When line, so a card about a period (e.g. 1888–1897) sits at its start year.\n\n"
out=[head,'## Dated cards\n'];und=False
for b in F:
    if b['k'][0]==1 and not und:
        out.append('\n## Undated (no year in the card)\n'); und=True
    out.append(render(b))
open(D+'facts.md','w').write('\n'.join(out))
open(D+'miracles.md','w').write("# Miracles and extraordinary events — eyewitness and process testimony (M-EW)\n\nEach entry is a report, not a finding. Sorted by the first year in its title or report; undated last. Status lines say whether the event was sworn at a process, listed in the vice-postulator's Articles (1910), or only reported. Approved miracles: beatification 1923 — Abbé Charles Anne, Sr Louise de Saint-Germain; canonization 1925 — Maria Pellemans, Sr Gabriella Trimusi (plan §8.1). Several entries describe the same event from different witnesses (e.g. Gallipoli, Aubry, Anne); they are kept apart.\n\n"+'\n'.join(render(b) for b in M))
open(D+'quotations.md','w').write("# Quotations — eyewitness and process testimony\n\nOriginal French under ~25 words (facts-only source) with our own English. Speaker is Thérèse unless stated. Public-domain English from the 1913–1926 books is marked PD in batch L entries at the end of works/scenes notes.\n\n"+'\n'.join(render(b) for b in Q))
g=["# Gaps and conflicts — eyewitness family\n\nCollected from each extraction batch. Card numbers are the final F-EW / M-EW numbers.\n"]
for f in sorted(glob.glob(merge.OUT+'*.md')):
    s=merge.sections(f,'Gaps')
    if s: g.append(f"## From batch {f[-4]}\n\n"+fix(s)+"\n")
open(D+'gaps-and-conflicts.md','w').write('\n'.join(g))
open(D+'_scene_candidates.md','w').write("# Scene candidates proposed by the extraction batches (unranked)\n\n"+'\n'.join(render(b) for b in S))
ne=collections.Counter()
for b in F:
    v=merge.field(b,'New to English').lower()
    ne['yes' if v.startswith('yes') else 'partial' if v.startswith('partial') else 'no' if v.startswith('no') else 'other']+=1
print(len(F),len(M),len(Q),len(S), 'undated',sum(1 for b in F if b['k'][0]==1), ne)
