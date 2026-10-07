# Check of the reverence pass, Saint Thomas Aquinas (standard), 2026-10-05

Copies before this check: `biography.html.before-check-rev`, `miracles.html.before-check-rev`, `summary.txt.before-check-rev`. `summary.txt` and `entry.json` not changed.

Latin checked against the OCR of Prümmer fasc. 1 (Tocco, Gui, Calo), Laurent fasc. 4 (Naples process), and the FSSPX English of the bull. Note: the line numbers in `reverence-notes.md` do not always match the OCR files, but every Latin phrase the notes quote was found in the cited place.

## Confirmed in the source (no change needed)

- Naples paragraph on Reginald's secret: Tocco c. XXX, pp. 104-105. Weeping, "my master forbade me", learning "not by human talent but by prayer", prayer before study, tears, "came back taught" all match.
- Entry to Fossanova: Tocco p. 130 (altar reverence, "the hand of the Lord came upon him"); Gui p. 204 ("premissa oratione coram altari").
- Last Holy Communion and the death ("recommending his spirit to his Creator" in Gui).
- Bull §9 to §18 additions: procession and Mass of a confessor (§9), praise of God (§10), "power of God twice" (§12), devotion (§13), "consecrated himself devoutly" (§14), vow (§15), "recommended herself devoutly" (§16), humble vow and "did not hide the miracle" (§17), God works wonders through his saints (§18).
- Rebuilt accounts: Tocco c. LXI (blind subprior, with the cry "Blessed be God"); Tocco catalogue nos. 3, 7, 8, 9, 22, 25, 36, 53; process no. 56 and Gui no. 15 (Margaret); Gui nos. 89, 98, 100. All restored prayers and thanks are in the text.
- Skeptical asides: none remain in the body of either file. The doubts sit in the Note on the Sources. "Adoro te devote ... attributed" stays.

## Fixes

### biography.html

1. Sea storm (chapter "A Pope Names Saint Thomas Among the Saints"). The paragraph said "Tocco tells", but "prayed to God" is Gui's wording (Tocco has the friars weeping and calling on the saints). Now "Tocco and Bernard Gui both tell what happened at sea." Both give "God worked a miracle" (Tocco: "praising God"; Gui: "miraculum a deo factum"), so the last sentence stays.
2. Sea storm: "turned the galley away from the rocks" had changed "mountain" to "rocks" in the first pass, and the first fix of it repeated "mountain". Now "turned the galley out to the open sea" (Tocco: "libero mari ... tradidit").
3. Naples paragraph on Reginald: the paragraph had no named teller. Added "Tocco tells what he said afterward."
4. San Severino: "almost three days" is Gui's ("per triduum fere"); Tocco says "a great space of time". Now "Tocco and Gui add what happened at his sister's castle."
5. The Mass of December 1273: "Saint Thomas never described what he had seen" was an absolute claim. Now "Saint Thomas did not say what he had seen."
6. Toulouse: the pass dropped "and the same writer" from the 150,000 crowd. Restored: "Alban Butler and the same Life tell". Split the 33-word sentence: "Louis the Duke of Anjou was at its head" is now its own sentence.
7. Real actor: "His own teaching set a harder limit than either" (a teaching cannot set a limit) became "He taught a harder limit than either".
8. Three h2 headings cut to 8 words or fewer, ids unchanged:
   - "Saint Thomas Is Sent to the Monks at Five" is now "Saint Thomas Goes to the Monks at Five".
   - "Saint Thomas Teaches in Italy and Refuses a Bishopric" is now "Saint Thomas Teaches in Italy and Refuses Honors".
   - "Saint Thomas Dines With Saint Louis, King of France" is now "Saint Thomas Dines With Saint Louis of France".

### miracles.html

1. m06 (fever): the pass wrote "God had freed him". The bull says only "he was entirely delivered" (passive, no agent). Now "he was entirely delivered from all his sickness", the source's framing.
2. m07 (deaf mother): "complete trust" was a loosening of the bull's "complete submission", and the vow clause was garbled. Now "she gave herself wholly to the saint of God, so that he would take away her deafness. She made that vow and fell asleep that night."
3. m05: "with all his heart" is stronger than the bull's "affectionately". Now "begged Saint Thomas earnestly for the favor".
4. Paralyzed girl (Gui no. 98): the father's prayer is "through the merits of Saint Thomas ... taken from this life or healed by God's mercy". It had said God would take her life or heal her. Corrected to follow Gui.
5. m42 (stillborn child): "appeared to come back to life" is now "was seen alive again" (Gui "apparuit redivivus"), which is faithful and not hedged.
6. m40 (sea storm): the text uses Gui's "prayed to God" and "God had worked a miracle", but the status named only Tocco. Status now reads "told by Tocco in the third person, and by Gui."

## Facts compared with the before-reverence copies

No fact was changed by accident. Every difference is in `reverence-notes.md` or listed above. Checked closely: the captivity length (moved to the Note, still given there), "Bartholomew swore to them" for the Mass words, the three days after Communion (Peter, process no. 49; Tocco's "next day" stays in the Note), Saint Thomas's death hour (Tocco c. LXV), and the Toulouse crowd and letter.

## Left as is

- Rainald prayer: "God answered him" follows the process (no. 78), where Saint Thomas asked God to reveal it and "had an answer". The biography already says God answered.
- "How This Life Was Researched" still says "the doubtful ones are marked". It is a method note and not a doubt about the tradition.
- The phrase "The case moved slowly" (about the canonization case) is untouched from before the pass.

## Check script

- `lint_biography.py biography.html --summary summary.txt`: no MUST FIX, no CHECK lines.
- `lint_biography.py miracles.html --kind miracles`: no MUST FIX, no CHECK lines.

## Verdict

Ready.
