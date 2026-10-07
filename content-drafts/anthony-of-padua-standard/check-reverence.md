# Check of the reverence pass, Saint Anthony of Padua (2026-10-05)

Files checked: biography.html, miracles.html, summary.txt. Copies before this check: `*.before-check-rev`. entry.json not touched. Sources read as raw OCR text: Rigauld 1904 (LifeOfStAntonyOfPadua), Julian's Latin Life in the Acta Sanctorum (actasanctorum23unse), Coleridge 1883 (MN5128ucmf_2), Pius XII, Exulta Lusitania felix (vatican.va, Latin).

## Confirmed in the source (no change)

- Canon's answer at Coimbra: "When you hear that I am a saint, surely you will give thanks to God" (Rigauld p. 38, exact).
- Rain at the Creux des Arènes: "the Almighty... withheld the rain", the drenched ground and dry place, "they glorified the marvellous power of God, who is wonderful in His saints" (Rigauld pp. 71-72).
- Riot: friars "began to call upon God to allay the tumult. And God... Himself quieted the tumult, and so changed the dispositions of the citizens" (Rigauld pp. 82-83).
- Pope raised his hands and called on the Holy Trinity (Julian n. 43); "divina providentia pietatis" (Julian n. 42); Capo di Ponte people confessing their fault (Rigauld p. 84); Holy Communion as Viaticum, "the good Jesus... entered into the joy of his Lord" (Rigauld pp. 79-80); Virgin's protection in Lent (Rigauld p. 59); poison, "preserved him so marvellously" (Rigauld pp. 55-56); fish, horse and Real Presence (pp. 68-70); St Junien, Bourges, Arles (pp. 66-68); Limoges (p. 47); tunic (pp. 60-61); Cambius, Forlì lady, Bernardin, servant, eyes and tongue, Thomazino, parchment woman (pp. 90-101); Child Jesus, blank paper, foot, Gemona thanks (Coleridge pp. 92, 96-101); 1350 cardinal (Coleridge p. 201).
- No fact changed by accident: sentence-level comparison with both `.before-reverence` files shows only the changes listed in reverence-notes.md.
- Doubts in the closing Notes (Pius XII and Assisi, letter of Saint Francis, responsory's author, place of the Child Jesus, Bollandist portrait) are correct and sit only there.

## Fixes

biography.html
1. Gemona, Friday, cardinal, riot, tomb: the pass added "God" as the actor where the source has no actor. Restored the source's framing.
   - Friday (death): "God made him like Christ" became "on that day he was made like Christ in his suffering" (Rigauld p. 80: "being thus conformed to Christ suffering", no actor).
   - 1350 cardinal: "because God had saved his life through Saint Anthony's prayers" became "because his life had been saved through Saint Anthony's prayers" (Coleridge p. 201, passive).
   - Tomb: "God began to heal the sick at his tomb" became "Miracles began at his tomb that same day. The sick who could touch it were healed at once." (Rigauld p. 84; Julian n. 42).
   - Riot: "quieted the city" became "quieted the tumult" and "its people" became "the people" (exact to Rigauld p. 83). The line "God himself quieted..." stays: Rigauld says it.
2. Hill: "Both early Lives say he knew beforehand of his death and of the glory in heaven" was wrong for Julian, who says only that he foreknew his glorification (n. 29). Now: "Both early Lives say that he knew beforehand the glory that waited for him, and Rigauld adds that he knew of his death."
3. Pius XII: "saw Saint Francis there and knew him with great joy" became "came to Assisi and recognised Saint Francis there with great joy" (Latin: "Franciscum Patrem summa laetitia agnovit").
4. Gideon (old error, not from the pass): Rigauld says God wet Gideon's fleece with dew while the ground stayed dry. The text had it backwards. Now "Rigauld recalled how God once wet Gideon's fleece with dew while the ground around it stayed dry."
5. Removed "Later writers set the fish at Rimini." from the body; the Note already says the stories differ in place.
6. "Padua passed a law" (a city as actor) became "At his request the city passed a law", and the three same starts in the last paragraph were broken.
7. Three h2 headings shortened to 8 words or fewer (ids unchanged):
   - Saint Anthony Seeks Martyrdom in Morocco (id anthony-sails-to-morocco-to-die-for-christ)
   - Saint Anthony Preaches and Leads in France
   - Why People Ask Saint Anthony for Lost Things

miracles.html
1. x02 Gemona: Coleridge p. 92 says "he restored him to life". Restored: "made the sign of the cross over the young man and restored him to life". The added thanks to God (also p. 92) stays.
2. Tunic: "God made them known to Saint Anthony" became "Saint Anthony learned of them by revelation" (Rigauld: "made known to the Saint by revelation").
3. Tomb (d04): "God began to heal the sick" became "miracles began at Saint Anthony's tomb" (source framing).
4. Hill (l-hill): same fix as in the biography (Julian: glory; Rigauld: death and glory).
5. 1350 cardinal (d12): "God had preserved his life" became "his life had been saved" (Coleridge).
6. Shipwreck: the sentence "He was a sign of salvation..." had no clear subject. It is now Rigauld's quotation of the Office hymn, which "calls him a sign of salvation to shipwrecked sailors, whom he guided by a ray of light" (Rigauld p. 99).
7. Horse (l04): a fragment ("On the day Saint Anthony carried it...") was rewritten into two straight sentences (horse led into the square on the third day; Saint Anthony carries the Body of Christ in the ciborium; Rigauld pp. 69-70).
8. c01: "the reported cures" became "the cures" (clinical word, reverence-pass point 6).

summary.txt: no change. "God asked for it a day at a time" matches the early Life's "the King of kings decided otherwise".

## Left as they are

- "God held the rain back" (Rigauld: "the Almighty... withheld the rain") and the riot line are in the source.
- "Rigauld does not say where or when the man had heard Saint Anthony" and "one later writer pictures him" are plain attributions to the teller, not doubt. Left.
- In miracles, the closing Note keeps the Catholic Encyclopedia's view of Ezzelino; it is in the Note.

## Check script

biography.html with summary.txt: no MUST FIX, no CHECK lines. miracles.html: no MUST FIX; CHECK lines only for the average sentence length (12.6, list-style accounts) and two runs of "The" starts that were in the file before the pass.

Verdict: ready.
