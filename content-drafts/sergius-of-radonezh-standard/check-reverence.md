# Check of the reverence pass: Saint Sergius of Radonezh

Files checked: `biography.html`, `miracles.html`, `summary.txt` (unchanged, byte-identical to `summary.txt.before-reverence`). Copies before this check: `*.before-check-rev`. `entry.json` and the teachings files were not touched.

Raw S1 text (azbyka.ru, whole book fetched with `fetch_text.py --max-words 200000`) was read for chs. 2, 3, 6, 7, 10, 12, 13, 14, 26, 32, 33, 47, 51, 52, 63, 74, 75, the book introduction, and notes 92, 93, 135, 136. The Dimitry text (Sanidopoulos) was read for the relics lines. No quotation came from a summary.

## 1. Restored prayers, thanks, words, and acts of God: all in S1

Confirmed word for word against the Russian: the bread at the gate and the gatekeeper's words (ch. 10), the service of thanks before eating, the blessing of the loaves, the warm bread, the brothers who never learned the giver (ch. 10); the spring (ch. 12: Saint Sergius's answer, the one monk, the prayer, the sign of the Cross, the full spring, the healings of the sick who came with faith, his anger at the name); "Holy Sergius, cover us and help us!" with the gates opening and closing, the tears, and "all glorified God and His saint" (ch. 47); the soldier of 1632 (ch. 75); the Cossacks of 1622 with vow, cups, prayer, and "the Lord showed them His mercy" (ch. 74); the nobleman (ch. 14); the dead child (ch. 13); the mute man and the Ryazan boy (chs. 51, 52); the siege chapter (ch. 63, title and Andrei's closing words); the death, fragrance, and relics lines (chs. 32, 33); the thanks after the first demon attack and "the power of God" in the second (ch. 7); the fragrance and holy bread at the tonsure (ch. 6); the holy bread, tears, and praise of God in ch. 3. Dates in the status lines match the book introduction: Epiphanius 1417-18, Pachomius at Trinity 1440-59, Simon Azarin 1646 (chs. 54-88 are his; chs. 1-53 are Pachomius's revision of Epiphanius).

Fixes where the text said "God did it" and S1 does not (source framing restored):
- `miracles.html` m09 (spring): "God healed many sick people through its water" became "Many sick people were healed by its water when they came to it with faith, and the Life says this went on in its own day." S1: "от воды ... случались многочисленные исцеления ... если болящие приходили с верой ... бывают они и в наши дни". (Biography ch. 5 already had the passive form and stays.)
- `miracles.html` m18 and `biography.html` ch. 11 (relics): "the sick who came to them with faith were healed" became "the relics rest in the shrine to this day and give healing to the sick who come to them with faith" (S1 ch. 33: "где они пребывают и доныне... неоскудно подают исцеление приходящим с верою"). "God glorified His servant" stays: S1 says "Господь Бог захотел еще больше прославить Своего угодника".
- `miracles.html` m19: "God worked many healings through the holy relics" became "many healings were given through the holy relics ... healings still flowed from the shrine in his own day" (Dimitry: "numerous healings were bestowed... healings gush forth from his holy reliquary").
- m03 and biography ch. 1: "believed that God had sent them an angel" became "believed that the old man was an angel, sent to give the boy the knowledge of letters" (S1 ch. 3 has "Ангел, посланный", no named sender).
- Biography ch. 4: the gatekeeper "did not open the gate" now says "in his joy he did not stop to open the gate" (S1: "от радости не отпер").
- m10 status: "would not call it a miracle" was more than S1 says. Now: "The Life's chapter title calls it a raising from the dead, and Saint Sergius himself said that the boy was only cold" (S1 ch. 13 title and his words).
- Miracles introduction: "as the oldest witnesses told them" overclaimed (the list reaches 1646). Now "as the Life of Saint Sergius tells them".

Left as written because S1 says it: the praise of God in ch. 10, 13, 14, 47, 74, 75; "by the grace of Christ and the prayers of the saint" (chs. 14, 75); "Господь ... не оставит этого места" framing; chapter 63's title "по молитвам преподобного Бог подал победу".

## 2. The glorification sentence

Notes.md supports only: Jona's letter of 1449-50 calls him "prepodobny"; encyclopedias date the glorification 1452; veneration came before written rules; no single document. The pass wrote "glorified him as a saint in those years", which could read as exactly 1449-50. It now reads "The Russian Church glorified him as a saint around that time", followed by the unchanged lines on the people's earlier veneration, the missing document, and 1452. (The S1 introduction itself gives 1452 for the canonization.) The miracles introduction says "in the fifteenth century" and stays.

## 3. No fact changed by accident

Compared both files with `.before-reverence`. Every difference is in `reverence-notes.md` or listed above. Kept as facts: all dates, names, numbers, Source lines (byte-identical), all block quotes. Two small shifts noted and accepted: "Saint Epiphanius thought... though he was not sure" became "places" (the Life's "I think" is a source note, no new claim); "the Church gives no single date" became "no single document gives the date" (same fact, notes.md).
- Tale of Mamai: the body now tells it as the Church's memory ("The Church keeps that memory in the Life and in the Tale... In the Tale, Saint Sergius sprinkles..."). The dating of the Tale ("most likely early fifteenth century") was source commentary in the body. It moved to "A Note on the Sources" ("the edition's editors say the Tale was most likely written in the first quarter of the fifteenth century", scenes-3.md). The Note also holds the "not in the Life" lines for Peresvet, Oslyabya, and the holy water.
- Siege paragraph: "The Life took one chapter from him" gave a book an act only a person does. S1 note 135 says ch. 63 is a fragment of Palitsyn's Tale, and the introduction says Simon Azarin wrote the 1646 part. Now: "Simon Azarin took one passage from his story for the Life in 1646. The chapter says that God gave the monastery victory..."

## 4. Tone, actor, titles

- Tone meets `reverence-pass.md`: no "doubted", "legend", "claims", or "is said to" in either body; Maxim the Greek's question is only in the Note; the closing "Note on the Sources" of the miracles list holds the Kuchkin, 1422/1423, and chapter-coverage lines.
- Actors: checked every sentence the pass changed. Real actors are the subject (the gatekeeper, Saint Sergius, the brothers, the council, God where S1 says so). No thing acts as a person except "The Life says/tells", the book's usual voice.
- Titles: "Saint" before every saint's name in body, headings, cite lines, and status lines; none inside quotations. Birth name "Bartholomew" appears once in the biography (ch. 1, as a fact) and once in the miracles list (m02, as the baptismal name). Names left plain as in the titles pass (Stefan, Petr, Pachomius, Mitrofan, Daniil, Isaac, Makarii, Simon, Michael, Symeon, Kronid, and others) were not changed.

## Check script

- `biography.html --summary summary.txt`: no MUST FIX, no CHECK (7352 words, average sentence 15.1).
- `miracles.html --kind miracles`: no MUST FIX, no CHECK (3629 words, average sentence 15.6).

## Open, low risk

- The layer labels (Epiphanius for chs. 2-13, 21, 25, 26, 31, 32; "chapters Pachomius revised" for chs. 14, 22, 47, 51, 52) follow notes.md strength tags A and B. S1's introduction says all of chs. 1-53 are Epiphanius's text in Pachomius's revision, so the label "Epiphanius" for the earlier chapters rests on notes.md, not on the edition.
- m18 says Pachomius first told the finding of the relics and Simon Azarin wrote the chapter in its present form (note 92 and the introduction disagree on the layer; the line states both).
- `entry.json` must still be synced from these files.

Verdict: ready.
