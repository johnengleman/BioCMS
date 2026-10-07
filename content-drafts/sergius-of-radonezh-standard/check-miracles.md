# Check of miracles.html — Sergius of Radonezh (standard mode)

Original kept as miracles.html.before-check. Lint (`--kind miracles`): no MUST FIX and no CHECK lines.

Checked against raw text, not summaries: S1 (azbyka.ru modern Russian Life, full text, chs. 2-7, 10-14, 21-22, 25-26, 31-33, 47, 51-52, 58-63, 74-75, 87-88, with notes 87, 92-95, 134-138 and the introduction); Dimitry of Rostov on ru.wikisource (Russian) and the English text on Sanidopoulos; the Old Russian Life (BLDR vol. 6, azbyka); ru.wikipedia (Kuchkin, 1919 opening); notes.md; the scene cards; check.md.

## The eight added accounts (S1 chs. 14, 47, 51, 52, 63, 74, 75, plus the birds in ch. 14)
All match the text of S1. Details confirmed: nobleman on the Volga, iron chains, ten men, the flames from the cross, the rainwater pool (ch. 14); Symeon, Isidore, Thomas of Tver, the iron gates that opened without a word (ch. 47); the mute young man of Yaroslavl (ch. 51); the boy of the Ryazan boyars who became a monk (ch. 52); Andrei, the river, the two old men, the siege dates 23.09.1608 to 12.01.1610 and Palitsyn as source (ch. 63 and notes 134-138); Radilov and seventy men, 1622 (ch. 74); the soldier, 1632 (ch. 75). The nobleman and the birds are also in the Old Russian text.

## Fixes
- m02: "named Bartholomew at birth" became "given the name Bartholomew at his baptism" (S1 ch. 2: named at baptism on the fortieth day).
- m03: "could not learn his letters" became "struggled to learn his letters" (S1: learned slowly and badly).
- m05: "Within about an hour" is the Life's own guess ("I think, in less than an hour"). Now "Saint Epiphanius thought ... in less than an hour".
- m08 status: "the brothers never learned the giver's name" was an absolute. Now "the Life does not name the giver".
- m10: the father "could not stay silent" dropped half the source ("did not dare to spread it, but could not keep silent"). Both halves now stated.
- m11: "the two men learned" became "the monks learned" (S1: the monks asked a man of the prince's retinue).
- m12: Michael was "a monk"; S1 and the Old Russian say archimandrite. Now "a senior abbot".
- m14: the Mother of God quotation joined two sentences and dropped words in the middle without an ellipsis. Now the full sentence "Do not grieve, for your prayer ... has been heard", an ellipsis, then "In your life and after you go to God, I will not leave this place" (S1: "this place", not "your monastery"). "A long hymn of praise" became "the akathist, a hymn of praise".
- m18: the relics were opened by "Nikon, the princes, and the clergy". S1 ch. 33: the princes and the Sacred Council gathered, and the council opened the grave. Also added that the water did not touch the body or the robe (S1 and Dimitry). Year note confirmed: note 93 gives 18 July 1423; note 92 says Simon Azarin from ch. 33; the introduction says Pachomius added the relics story; Dimitry gives 5 July 1422. The "most accounts give 1422 / the Russian edition gives 1423" wording is right.
- Layers (chs. 47, 51, 52 and 63, 74, 75): "a later layer" was vague. The edition's introduction says chs. 1-53 are Pachomius's revision of Epiphanius, and chs. 54-88 are Simon Azarin's own. Each status now says which.
- Ch. 47 status: "Dimitry of Rostov retells it in the 1690s". The 1690s date was unverified, and Dimitry's version (Sanidopoulos) has no fortress. Now "gave a shorter version of it, without the fortress".
- 1919 opening: added "with Church representatives present" (ru-wiki) and one sentence in the status line: "It is listed here only because it records what was found when the shrine was opened." The "not a miracle claim" label is now clear, so the entry stays.
- Wording fixes for lint (split long or bent sentences) in m12, m14, m18, m05, m10, and the ch. 47 status.

## Points confirmed as written
- Bear: bread laid on "a stump or log", never from his hand (S1 ch. 7, BLDR, Dimitry all say stump). Note: notes.md section 7 says "feeds from his hand"; that line is wrong, the page is right.
- Relics opened by the council with the princes: now stated that way.
- No "cell" at the death (m17); no "cell" anywhere except the source's own (m10, the Mother of God scene says "porch").
- Kulikovo appears only as "later writers place it at Kulikovo in 1380" (the Life names Mamai but no battle; Dimitry names Kulikovo).
- Kuchkin and the Vozha battle of 1378 match ru-wiki.
- Secrecy: the Life records it for chs. 13, 21, 31 only. The intro's "several of them" is right; the Mother of God vision has no order of silence, and none is claimed.
- Each "Source:" line names a source that has the account. The Dimitry (Sanidopoulos) links do contain m01-m03, m11-m16, the fortress and the later healings.
- "No Church inquiry examined it": kept as the pipeline's standard line (same wording in the Nicholas of Myra list). The sources read describe no inquiry.

## Title rule ("Saint" before every saint's name)
Applied to the intro, both h2 titles, every h3 and all body and status text: Saint Sergius, Saint Epiphanius, Saint Nikon, Saint Micah, Saint Alexis, Saint Dmitri (Grand Prince Saint Dmitri), Saint Dimitry of Rostov. This matches biography.html. Birth name Bartholomew is given once as a fact (m02). Not changed: the Source lines, the titles of works (the Life titles carry "Sergius"), the quotations, and "Saints Sergius and Bacchus". All h3 titles are 8 words or fewer.

Left plain because they are not saints or I was not sure: Pachomius the Serb (Logothetes), Simon Azarin, Stefan, Mitrofan, Daniil, Isaac the Silent, Makarii, Simon (ecclesiarch), Prince Vladimir, Michael, Symeon, Metropolitan Isidore, Thomas of Tver, Andrei the soldier, Epifan Radilov, Mamai, Kronid, Pavel Florensky, Yury Olsufiev, Avraamy Palitsyn, Kuchkin. The apostles are written "Saint Peter and Saint John" in m14.

## Not fixed (open, low risk)
- Order: the birds (ch. 14) come after the fire (ch. 31). Left as in the earlier list.
- Micah as a saint rests on the ru-wiki list of Radonezh saints (also noted in check.md).

Verdict: ready.
