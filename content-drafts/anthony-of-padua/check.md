# Check: St. Anthony of Padua (tier A)

Checked 2026-10-01 against raw text: Rigauld/CTS 1904 (archive.org LifeOfStAntonyOfPadua), the Acta Sanctorum Latin Life (actasanctorum23unse, pp. 196-210), Coleridge 1883 (MN5128ucmf_2), Woodcock 1911 (StAntonyMiracleWorker), Kerval 1904, Badius 1521 sermons, Baring-Gould vol. 6 (local), Catholic Encyclopedia (New Advent), Benedict XVI audience, Basilica "Expositions", CNA/CWR, Alkofer. Originals kept as `*.before-check`.

## Fixes: biography.html

1. **Canonization dream (A Saint Within a Year; also miracle d05).** The draft gave the dream to the pope and said "a later chronicle" gave it to a cardinal. In the Latin Life (p. 204), Rigauld and Coleridge, an objector (a cardinal in Rigauld and Coleridge) has the dream. Rewritten; d05 status now says the sources agree on the dreamer.
2. **Anointing words.** The draft said "in one later telling" and the source note called them a later source. They are in the early Latin Life (p. 202). Fixed in the text, source note, quote source field and gaps.
3. **War-horse.** "Both early Lives" use the war-horse and elephant pair. The Latin Life has only the elephant; the war-horse is Rigauld's. Fixed.
4. **"Patarines."** "The ones the early Lives call Patarines" is not in either early Life. Removed.
5. **Francis's letter.** "Known only from" the Liber miraculorum overstated Kerval, who says the Liber is the first to give it. Now "first appears."
6. **Francis at the 1221 chapter.** "Alive and present in the Order" could suggest attendance. The Bollandist note says only that Francis was alive and Elias was vicar. Now "still alive, though Elias was governing the Order." No meeting with Francis is narrated anywhere (confirmed: no source read says one occurred; Celano, Bartholomew and Rigauld give only the Arles vision).
7. **Celano.** He names Brother Antony ("whose mind the Lord opened"), not "a friar"; the 1228 date is not in a source read, so "written in Anthony's lifetime."
8. **Canon at Coimbra.** Rigauld: "who loved him greatly... in the bitterness of his heart." Added; "jeer" now sits beside that.
9. **Stolen book (Finder of Lost Things; miracle l13).** "A psalter, by his 1911 biographer" was wrong: Woodcock and Coleridge say a manuscript of notes; "glossed psalter" is the 1367 Liber (Kerval p. 259). The Liber's figure on the bridge is a devil with an axe; Coleridge's is a man with a drawn sword. All stated and attributed.
10. **Infant Jesus.** Coleridge (pp. 96-97) sets Tiso's vision in Tiso's house at Padua; CE gives Camposampiero or Chateauneuf (Limousin); Baring-Gould a Limousin house. Added the Padua version to the text, source note and l14.
11. **Vercelli appearance.** "The old Lives record" is wrong: it is not in the Latin Life or Rigauld, only Coleridge and CE. Now "later writers add"; d02 status fixed and Coleridge pp. 178-179 added.
12. **Brive "and a hermitage near it."** Only in the Wadding extract (late). Removed.
13. **Nature scenes.** "He walked the vineyards... He watched a spider... watched the cranes... watched the doves" were invented actions (Woodcock's inference). Recast as what the sermons say. Same fix in the teachings entry.
14. **Other additions removed.** "Everyone around that grave knew"; "in the dust lay" the tongue; "thin" and "a foreigner"; "whom everyone knew as the friar who worked in the kitchen" (now Julian's: his learning was unsuspected, and he said he was fitter for washing pots); "ten years" of memory; "hiding in plain sight under another man's name"; "women who had lived by selling themselves" (now "public sin"); "Podesta locked up" (Julian: bound them to go home); "Arcella stood in the quarter" (Rigauld: near it); "Within weeks" (now three months); "he would not come off [the roads] for the rest of his life"; "the safest place in the world"; "getting ready for the largest crowds"; "must have made some listeners very uncomfortable."
15. **Dates.** The 15 March 1231 law is near the end of Lent (5 Feb to 23 March), not "the middle." Mule "Bonvillo" quote is only in Coleridge's version; now says so.
16. **Robber story.** Rigauld does not place the old man in Lent 1231 at Padua; the "sixty years after that Lent" link is removed, and the quote now follows Rigauld's punctuation ("... profession," he said, "I belonged...").
17. **Absolutes softened.** "No one wrote down the day"; "never refused to preach"; "the envoys came from everyone"; "no one who called on him that day" (now the chronicle's claim, attributed); "travellers took him as patron" (Baring-Gould: invoked by travellers); "little ass" (Woodcock says Francis styled his own body so).
18. **Source note.** Ezzelino was grouped with Surius/Wadding stories; it is not (Liber miraculorum; CE calls it an apocryphal legend). "Tony, Tony" rhyme "is not his" now "no source we read traces it to him." "Spaniard" claim tied to the Latin Life's "in Hispaniis." Cardinal of Ostia identified as Alexander IV only per the Bollandists.
19. **Research note.** "24 sources read" now "23 sources, a few read only in part" (list has 23; Rieti, Neale, Franciscan Archive and Wikipedia were not read in full); "nine details" now "several" (candles were counted twice).
20. **Polish.** Dropped the moralizing "Where the river ran" paragraph (source discussion; now in the note). Split sentences and varied openers so the lint shows no run-of-"the" lines.

## Fixes: entry.json and summary.txt

- biography synced to biography.html; summary: "was left standing" (invented image) became "was passed over"; summary.txt synced.
- c02 status: Latin Life p. 204 lists the woman in the water, the sparrows and the shipwreck among the miracles "solenniter approbata," so "approved" is supported. Only c01 and c02 carry "approved."
- l13, l14, l15 (Rigauld p. 59 has the devil's attack too), d02, d04, d05 corrected as above.
- Quote 21 (the anointing) source field now cites the Latin Life and Rigauld; all 22 quote source fields are 253 characters or fewer; related arrays are 1, 1 and 22.
- Teachings: vineyard sentence and "bishops' faces" fixed. Share kit: "killed at Marrakesh" became "in Morocco" (not in the sources read). Gaps and field_review updated.

## Confirmed without change

- All 12 block quotes and the inline quotes match the raw text: Coleridge p. 198 (Bonaventure); Rigauld pp. 36, 38, 46, 55-56, 65, 66, 67-68, 68, 71, 74-75, 79-83; Woodcock pp. 77-84; Bartholomew of Trent (Latin, p. 196, "ipse vidi et cognovi"); Baring-Gould "no doubt an addition." Vine and purple Latin found in Badius 1521 (fol. 88 and 85).
- Birth: Bollandist computation (note C, "diem natalem nusquam invenio"); birth_year null. Death Friday 13 June 1231 (Latin Life "sexta feria"). Canonization 30 May 1232 at Spoleto, Pentecost (11 months 17 days). 1263 and 1981: Basilica (8 April; fir chest, three compartments, 650,000), CNA (18 Feb), Coleridge. Fish: Padua (Rigauld), Rimini (Coleridge, Baring-Gould), Brenta (CE). Horse/mule: Rigauld, Coleridge (Rimini), Baring-Gould (Toulouse), CE (Bruges and others). Si quaeris: CE and EWTN say Julian of Speyer; Coleridge says Bonaventure; the entry reports both and includes no prayer. Patronage: CE (lost things), Baring-Gould (travellers, Padua, Flemish).
- Miracles: 38 entries in four groups (2 approved, 20 in life, 1 late, 15 after death).
- Benedict XVI also says "about 1195"; birth_year stays null as instructed.

## Open items (not fixable from the sources read)

- Word count is about 7,500 of prose (about 8,000 with block quotes), at the low edge of tier A; the gaps note says so.
- The Assidua, Benignitas, Dialogus, Peckham, Fioretti, the bull Cum dicat Dominus and the list of 45 miracles were not read.
- Basilica "Saint Anthony's Miracles" titles (miser in Tuscany, infant who spoke, etc.) rest on titles and openings only.

Lint: no MUST FIX (3 long-sentence notes, all quotations). validate.cjs passes on the packet; `node --test scripts/directus-saint-drafts/test.cjs` passes 8 of 8.

Ready.
