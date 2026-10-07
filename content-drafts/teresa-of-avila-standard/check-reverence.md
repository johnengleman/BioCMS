# Check of the reverence pass, Saint Teresa of Ávila (standard)

Date: 2026-10-05. Backups: `biography.html.before-check-rev`, `miracles.html.before-check-rev`. `summary.txt`, `entry.json`, and the teachings files were not touched.

Raw texts read for this check: Lewis's *Life* (archive.org `lifeofstteresaof00tereuoft`, chs. 5, 6, 7, 9, 32, 36), Lewis's *Foundations* (`bookfoundations00teregoog`, chs. 15, 17, 19, 25 and notes), Ribera (djvu text, pp. 335-336 and the p. 336 note), Procesos vol. 1 (pp. 83, 90, 170), Procesos vol. 3 (Rótulo art. 108; María de San Francisco's Dicho), the Stanbrook *Interior Castle* introduction (Yepes), and the Stanbrook letters vol. 4 (letter of 19 Nov 1581).

## Confirmed in the source (no change)

- Coma, *Life* ch. 5 §18-20: "pleased our Lord I should come to myself", confession, "I communicated with many tears". Anointing and the Creed also confirmed.
- Saint Joseph, *Life* ch. 6 §8-9, §13: "took for my patron and lord", the guardian of Jesus, "so now in heaven He performs all his petitions", and "He made me able to rise and walk". "He gave it back" is a fair plain form of that line.
- Hell, *Life* ch. 32 §1-2, §6-7: every detail of the new paragraph is exact (the Lord's will that she see the place, the furnace-like passage, mud and vermin, the hollow in the wall, one moment, "one of the grandest mercies of our Lord", fear of trouble destroyed, thanks to "our Lord, who has been my Deliverer"). Kept.
- Wounded Christ, ch. 9 §3 ("I have grown better ever since"); parlour, ch. 7 §11 (she was with a person; no place is named, so the cut is right).
- Devil fled, ch. 36 §9: "I promised before the most Holy Sacrament... the devil fled in a moment, and left me calm and peaceful".
- Firewood, *Foundations* ch. 15 §13: "somebody, I know not who he was, moved by our Lord, laid a faggot in the church".
- Seville, *Foundations* ch. 25 §10-11: "The archbishop carried the Most Holy Sacrament"; 3 June 1576 in the editor's note.
- Prioress at Pastrana, *Foundations* ch. 17 note: "The princess a nun? I give up the monastery for lost."
- Crystal castle: Yepes, quoted in the Stanbrook introduction: "He showed her a most beautiful globe of crystal, in the shape of a castle, with seven rooms... occupied by the King of glory."
- m36: Mariana de Jesús, Procesos I p. 83: "¡Oh, Señor y Esposo mío; ya es llegada la hora de mí tan deseada; hora es ya, Dios mío, que nos juntemos". The English words, including "my God", match.
- Te Deum before thanks to Pedro de Castro: letter CCCCVII, "I said a Te Deum laudamus to our Lord".
- Isabel de Montoya, Rótulo art. 108: a nun advised her to ask for Saint Teresa's favour and touch the relic to her eyes; she walked to the Blessed Sacrament without a guide; the nuns sang the Te Deum.
- Monterrey child (m32) and the Segovia nuns (m33): both confirmed in the notes of *Foundations* chs. 19 and 17.
- María de San Francisco as the Alba witness: Ribera's editor writes "Sería sin duda esta hermana la Madre María de San Francisco, la cual declara en los procesos... Todo esto vi." He ascribes the quoted deposition to her by name. Procesos III also holds her own Dicho, in which she was present at the death. Naming her in the body is supported. The closing note keeps the editor's inference.

## Fixes

1. **biography.html, death at Alba.** "Blessed Ana asked Him to take her at once" read as if Blessed Ana asked to die. Procesos I p. 170 and m37 say she asked the Lord to take Saint Teresa ("se la llevase luego"). Now "to take Saint Teresa at once". Also "at that moment" became "just before Saint Teresa died" ("antes que acabase de expirar"). The rest of the vision paragraph (great light, many saints and angels, waiting to take the soul to glory, seen with the eyes of the soul, never again grief) matches p. 170. Kept.
2. **biography.html, end of the visions chapter.** "God had done all this in her inside that large easy house" was a broken sentence. Now "God had given her all these graces in that large easy house."
3. **biography.html, hell.** "found herself in hell" now "found herself, in a moment, plunged into hell", closer to her "in a moment... plunged apparently into hell". Placement: her book tells hell (ch. 32) after the angel (ch. 29); the biography and miracle list put it first by the editors' date of 1558 or 1559. The order stays. A sentence in "A Note on the Sources" now says so.
4. **biography.html, choir raptures.** "the Lord's raptures came upon her" was odd. Now "the Lord gave her raptures even in front of others".
5. **biography.html, firewood.** "She never knew who it was" claimed more than the source. Now "She wrote that she did not know who it was, and that the Lord had moved him to do it."
6. **biography.html, Pastrana.** The prioress's cry was in the night when a friar brought word, not when the Princess arrived. Added "Word had come ahead of her". The quoted words now follow the source: "The Princess a nun? I give the house up for lost."
7. **miracles.html, m02 source line.** "ch. 5 and annals" became "chs. 5-6 and annals", because the Joseph passage is in ch. 6.

## Fact comparison with the .before-reverence copies

No fact was changed by accident. Every difference in the diff is listed in `reverence-notes.md` and was checked above. The small alignments:
- "swore the nuns to silence" became "ordered the nuns to keep silence" (Procesos I pp. 101-102, 171). Correct.
- Wounded Christ and parlour wording (ch. 9 §3, ch. 7 §11). Correct; the unsupported "in the parlour" is gone.
- Seville: "made up her mind" became "decided... and she felt very little regret". Same fact.
- Dropped from the body and now in the closing notes only: Ribera's doubt about the talk of future convents, the cherub or seraph question, the editor's identification of María de San Francisco, and "no account is marked as approved".

## Reverence, actors, titles

- No "reportedly", "is said to", "claims", or "attributed" remains in the body. Disputes sit in the closing notes.
- Real actor as the subject: the dangling "The large easy convent had made her" and "the Sacrament came through the door" are gone. No thing acts as a person.
- God is named as actor only where the source names God: the Lord's bringing her back (ch. 5), the firewood (ch. 15), the castle (Yepes), hell (ch. 32), the Lord at the bed (Procesos I p. 170). The Montoya cure is told in the article's form, without "God healed".
- "Saint" or "Blessed" stands before every saint's or blessed's name. The check script reports no title problem.

## Check script

`lint_biography.py biography.html --summary summary.txt`: no MUST FIX. `lint_biography.py miracles.html --kind miracles`: no MUST FIX.

## Verdict

Ready.
