# Check of the reverence pass (2026-10-05)

Copies before this check: `<file>.before-check-rev` (biography.html, miracles.html, teachings.html, summary.txt). `entry.json` not touched.

Sources read as raw text: City of God XXII.8 (Dods, newadvent.org; Latin, la.wikisource.org, "Liber XXII"); Possidius (Weiskotten, tertullian.org; Latin, la.wikisource.org, "Vita Sancti Augustini episcopi auctore Possidio"); Confessions III.11 and IX.4 (Pusey, Gutenberg); Sermon 324 (augustinus.it Latin); Sciberras (agostinjani.org); Boodts (medievalists.net); Butler vol. 8 (local).

## Result of the checks

1. **Restored prayers, thanks, and "God acted" lines.** Checked against the source text. All the restored prayers and thanksgivings are in the source: Possidius 12, 15, 29, 31; Confessions III.11, IX.4; XXII.8 (Innocentius, Innocentia, Hesperius, Victoriana, Florentius, Martial, Paulus and Palladia, Petronia); Sermon 324. The five lines the caller named hold:
   - Deathbed: Possidius 29 (Latin "illum infirmum continuo Dominus sanum ... discedere fecit"; Weiskotten "God caused the sick man to depart healed"). "God healed him at once" stays.
   - "God saves Saint Augustine from an ambush": Possidius 12 has "Dei quidem providentia" and "liberatori Deo gratias egisset". Stays.
   - "God converts a merchant": Possidius 15 has "by the mercy of God ... converted" and "the profound plan of God for the salvation of souls". Stays.
   - "The Holy Sacrifice was offered": Possidius 31 Latin is "sacrificium Deo oblatum est" (Weiskotten renders it "a service"). Confessions IX.12 has "sacrificium pretii nostri". Stays.
   - Hesperius: Latin "obtulit ibi sacrificium corporis Christi" and "Deo protinus miserante cessavit". Stays.
2. **Source framing where the source does not say "God".** Fixed (miracles.html), to keep the source's own words:
   - Demoniacs: "God drove the demons out" became "the demons left the men" (Possidius 29). Also "People brought" became "People asked Saint Augustine to pray for" (the source says "asked to pray"). Same fix in biography ch. 13.
   - Milan blind man: "God gave a blind man his sight" became "a blind man was restored to sight"; "God showed them to Saint Ambrose" became "They were made known to the bishop Saint Ambrose in a dream" (source: "made known ... in a dream").
   - Doctor with gout: "God freed" became "was freed ... at his baptism" (source: "relieved in the very act of baptism").
   - Oil and tears: "God freed her" became "the devil left her at once". Unseen young man: "God freed" became "was cured on the spot".
   - Lucillus: "God healed it" became "It was suddenly healed by the mere carrying of that sacred burden".
   - Petronia: "God worked many wonders" and "God worked such wonders through him" became "many wonders were worked ... through Saint Stephen" and "such wonders were done through him" (source: "per eum", martyr's means). The intro states plainly that Saint Augustine gives the glory to God.
   - Kept as the source says: "God punished them" (Latin "divinitus"), "God wanted to show her true heart" (Sermon 324 "Deus"), "through God's mercy", "the Lord did not deprive His servant".
3. **Rebuilt miracle accounts (3,400 to 5,300 words).** Every rebuilt detail was compared with XXII.8 and Sermon 324. Nothing is invented. The fixes were:
   - Paulus and Palladia: "Two days later" is now "On the third day after Easter" (the source's words). Siege: "fourteen months" now "almost fourteen months" (Possidius 28). The Uzalis mother's prayer now has the full sentences of Sermon 324 where the writer had cut a sentence without an ellipsis.
   - "Painters have shown the scene ever since" (the child at the seashore) was stronger than Boodts ("several times in late medieval and early modern art"). Now "more than once in the later Middle Ages". "Dominican church" now "church of the Black Friars, the Dominicans" (Boodts: "black friars"). Caxton "wrote" and "added" became "the translator of the English Golden Legend that William Caxton published in 1483" (Boodts: "The translator mentions he saw it depicted"). Same fix in the closing note.
4. **No fact changed by accident.** Compared each file with its `.before-reverence` copy sentence by sentence, and compared every number. No number, date, name, or place was lost or changed. Two body claims were stronger than the source and were fixed: "He never thought the power was his own" is back to "Saint Augustine did not claim such power for himself" (biography ch. 13), and the sermon quote "We and our sermons are in his hand" now follows Possidius ("We and all our words are in his hands", biography ch. 11). The claim that people honored him as a saint "from his death" is now "long before the Church had rules for canonization" (the notes say "popular acclaim" and a feast kept by the sixth century, not "from his death"); fixed in biography ch. 15, miracles intro, and miracles closing note.
5. **"Holy earth" restored.** Latin "terram sanctam", Dods "some holy earth". Restored twice (Hesperius, and the paralysed young man's account). The check script passes it.
6. **Real actor.** "Grief darkened his heart" (biography ch. 3) became "His heart went dark with grief". The other changed lines ("The book changed his heart", "They climbed higher as they talked", and similar) have a person as the subject. No new "thing acts" sentence was found in the changed lines.
7. **Tone and doubts.** Reverence points 1 to 9 hold in the changed lines. Source doubts (Butler alone on the Vandals sparing the body, Sciberras on the move to Sardinia, the seashore story, the Oxford database, no formal ruling) are only in the closing notes. Teachings: removed the clinical sentence "He gives this as his own judgment" after the Romanides sentence (the line before it already names him).
8. **Title rule.** "Saint" holds before every saint named in the changed lines. Open point, not changed: Saint Evodius is called "Saint" in teachings.html and plain "Evodius" in biography.html and miracles.html (the titles pass left him plain). The owner or the titles pass should decide, and all three files should then agree.

## Lint

- biography.html (with --summary summary.txt): no MUST FIX, no CHECK.
- miracles.html (--kind miracles): no MUST FIX, no CHECK, after the edit to the closing note.
- teachings.html (--kind teachings): no MUST FIX, no CHECK.

## Verdict

Ready, after these fixes. One open point for the owner: the title for Saint Evodius.
