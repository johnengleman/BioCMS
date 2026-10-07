# Check of the reverence pass (2026-10-05)

Originals before this check: `biography.html.before-check-rev`, `miracles.html.before-check-rev`. `entry.json` not touched (it must be synced). Quotations and restored details were read in the raw source text (Elagin ch. 1, 4, 10; Sergius 1841; Chichagov 1903 on azbyka.ru; Malleev-Pokrovsky on orthochristian.com/147491.html).

## Confirmed as the reviser wrote them

- Bio ch. 4: "He thanked the Lord that he had been found worthy to take wounds for Him". Elagin ch. 4: "поблагодарил Господа, что сподобился ради Его понести раны безвинно".
- Bio ch. 4 and m06: healed through the prayers of the Mother of God. Sergius: "предстательством Божией Матери … получил … исцеление", as he told one brother.
- Bio ch. 2 and m05: the Lord Jesus Christ appeared to him on Holy Thursday with the heavenly hosts. The Georgy-Life essay on azbyka.ru says Georgy gave "a story in Saint Seraphim's own person of the glorious vision of the Lord Jesus Christ surrounded by heavenly powers at the Liturgy on Great Thursday".
- m07 restored words "Give thanks to the Lord Almighty and to His Most Pure Mother!" Chichagov: "Господу Всемогущему, да Пречистой Его Матери даждь благодарение!" The same words were already in the biography.
- m38: "healed by Blessed Seraphim's prayers" is in Malleev-Pokrovsky.
- Architect (ch. 1): Chichagov names Rastrelli.
- Bear story in the note: the archive note and Isaiah's letter are in notes-witnesses line 126.

## Fixes

1. Bio ch. 1, the line the task flagged. "So the Most Holy Mother of God came to the sick boy in his own yard, through her wonderworking icon" is not in Sergius. Sergius gives the healing and the thanks to the "Intercessor and Healer". It is in Elagin ch. 1: "Так исполнилось обещание Царицы Небесной посетить отрока и исцелить его" (the promise of the Queen of Heaven to visit and heal him was thus fulfilled). The line rewritten to match: "So the Most Holy Mother of God kept her promise. Her wonderworking icon of the Sign was carried into the sick boy's own yard, and she came to him there." The promise is in the dream sentence just above.
2. Bio ch. 11 (flagged fact). "an officer … a sore wrist" now follows Elagin ch. 10: "a man named Ladyzhensky … on his way to China with a Church mission, and a wound in his hand from the Turkish war had begun to hurt again. Saint Seraphim gripped the sore hand so hard that the man almost cried out, and the pain was gone." Elagin (left hand, Turkish campaign, accompanying the spiritual mission, "so hard I almost cried out from shame") confirms each detail. It agrees with miracles m23.
3. Bio ch. 11 death line. "reposed in the Lord at prayer, in the early hours of 2 January 1833" gave a time of death no source gives (no one saw him die; he was found about 6 a.m.). Now: "Saint Seraphim had reposed in the Lord on 2 January 1833, kneeling at his place of prayer." (Elagin: "at his usual place of prayer … on his knees".)
4. Bio ch. 1: "The Life says that a famous architect drew the plans" named no Life. Now "A later Life says". The architect is in Chichagov (1903), a later Life.
5. Bio ch. 12 and miracles m31, m34, m38, m40. The reviser had written "God healed her" (m31), "God gave her back her sight" (m34, m40, bio ch. 12), and "God had healed him" (m38). Malleev-Pokrovsky's journal says only "was healed" (m31, m34), "healed by Blessed Seraphim's prayers" (m38), and "the blindness fell away from her eyes like scales" (m40). These now say what the source says. Bio ch. 12 "God kept healing people there through his prayers" is now "people kept receiving healings there through his prayers" (Synod Act: help received through his prayers). Kept, because the source frames the whole summer as "Divine grace-filled healing" and "Glorified is God in the deeds of His Saints": the opening sentences "the healings God worked at Sarov that summer" and the section leads.
6. m03. "at that moment the Mother of God healed him completely" put a statement of the Mother of God's act into the narrator's voice. Sergius says "the boy received a wonderful and complete healing" at that moment, and mother and son thanked "the Intercessor and Healer". Now: "the Life of 1841 says he received a complete healing at that moment. Mother and son gave thanks to the Mother of God, their Intercessor and Healer." The heading "The Mother of God heals Saint Seraphim" stays, since Elagin states that her promise was fulfilled.
7. m44. Added the woman's own cry from Malleev-Pokrovsky: "Look, look! The Lord has given him his sight!" It restores a thanksgiving in her words.
8. Bio "A Note on the Sources", bear story. "she took it back" was stronger than the notes ("on her deathbed said Ioasaf taught her to say she had seen it"). Now "before she died she said she had been taught to tell it" (the wording of the version before the pass).
9. Mechanics. A bent-sentence line in the ch. 1 sentence was fixed by rewriting it as two straight sentences.

## Comparison with the .before-reverence copies

Every difference is listed in `reverence-notes.md`. No date, number, name, or quotation changed, other than the fixes above. Quotations are unchanged, including words inside quotation marks. The removal of "Kursk" from the m03 heading and of "by chance" from m54 drops a detail already in the body or not in the source; nothing is added.

## Tone and title rule

- Reverence: God and the Mother of God are named as the actors where the source gives it. No "attributed to", "reportedly", "is said to", "claims", "legend", or "doubted" in either body. The status lines name the teller with trust.
- Scholars' doubts sit only in the closing notes of each file (biography "A Note on the Sources"; miracles "A Note on the Sources"), and the wording is calm. Biography ch. 1 and m02 give the two Lives' bell-tower and garden/wood differences as differences between the Lives, not as doubts about the story.
- Title rule: "Saint" before every saint's name in the changed lines; none inside a quotation.

## Check script

- `biography.html --summary summary.txt`: no MUST FIX, no CHECK.
- `miracles.html --kind miracles`: no MUST FIX. Two CHECK lines remain: the quoted "I, poor Seraphim, will pray" (the saint's words, kept as spoken) and reading grade 7.5.

## "The real actor is the subject" (new owner rule, applied after the first check)

I read every sentence of both files. Rewritten so that a person or God is the subject:

- Bio ch. 1 icon scene: the narrator line is now "The clergy had carried her wonderworking icon of the Sign into the sick boy's own yard, and she came to him there." The Sergius block quote already has the clergy carry the icon, and the rain and mud only as the reason they changed their road. Miracles m03 now reads: "heavy rain made mud that blocked the street. So the clergy changed their road and carried the wonderworking Kursk icon ... through the Moshnin yard".
- Bio opening: "Their whole conversation lay on a little tray" became "The two of them talked only by a little tray ... A scrap of bread or a little cabbage left on it showed what the brother should carry out next time."
- "An old beating had bent him" became "Robbers had beaten him years before, and he was bent for life."
- "Sarov later built its hospital" became "The monks of Sarov later built their hospital".
- "silence brings tenderness ... It brings a person close to God and makes him like an angel" became "a person who keeps silence gains tenderness ... Such a person comes close to God and becomes like an angel on earth."
- "his rule began to loosen" became "Saint Seraphim began to relax his rule."
- "The mill rose first" became "The sisters began with the mill."
- "The phrase is gentle, but it covered a good deal" became "... but the trouble was real."
- "The gift came with a charge:" cut; the sentence before it now ends "why he had been shown all this:".
- "A chapel went up over the grave" became "A chapel was built over the grave".
- "Saint Seraphim's country had taken him to its heart. It would not keep him for long." became "The people of Russia had taken Saint Seraphim to their hearts. Their joy would not last long."
- "Russia had turned against its Church" became "the Russian state had turned against the Church"; "Sarov itself vanished from the maps as a secret city" became "Sarov itself became a secret city ... and it vanished from the maps."
- Miracles: "her teeth went quiet" became "her toothache stopped"; "the cases leave no doubt at all" became "no one could doubt the validity of the investigated cases"; heading "Two mockers are struck down" became "Two mockers collapse" (the body says one fell dead and one lost consciousness).
- Left as they are because a natural force or the source's own wording does the action: "the fever left him" kind of lines (illness left her at once, m10 cough), the tree that "lay uprooted", the sleigh fastening that broke, "the blindness fell away from her eyes" (Malleev-Pokrovsky's words), and "the hand opened by itself" (Chichagov's account).

The check script was run again after these edits: biography has no MUST FIX and no CHECK; miracles has no MUST FIX and the same two CHECK lines as before.

Verdict: ready, after `entry.json` is synced from the two files.
