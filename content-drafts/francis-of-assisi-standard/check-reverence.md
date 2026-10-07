# Check of the reverence pass (2026-10-05)

Copies before this check: `biography.html.before-check-rev`, `miracles.html.before-check-rev`, `summary.txt.before-check-rev`. `entry.json` not touched.

Method: I read Howell's Celano raw text (archive.org `livesofsfranciso00thom`, `_djvu.txt`) for every restored prayer, vow, thanksgiving, word of Saint Francis, and act of God. I compared each file with its `.before-reverence` copy.

## Fixes

1. miracles.html, m01 (girl's bent neck): removed "to the church" ("a girl was brought"). 1C §127 does not say where she was brought. The pass added it.
2. miracles.html, l06 (swallows of Alviano): restored the crowd's words as quoted speech: "Truly this man is a saint and a friend of the Most High." (1C §59: "Truly this man is a Saint, and a friend of the Most High"). Also restored "with the utmost devotion they hastened at least to touch his clothes" as "With great devotion they hurried at least to touch his clothes". The pass had paraphrased the people as calling him "a friend of the Most High".
3. miracles.html, d01 (star): restored Celano's words as a quotation: "his most holy soul was released from the flesh" and his body "fell asleep in the Lord" (1C §110). Corrected "a man of good name but does not give his name" to "a man of no small fame but chooses not to give his name" (1C §110: "a man of no small fame, whose name I think it right to suppress").
4. miracles.html, m21 (boy of Greccio): "God gave the boy back every sense he had lost" to "Through the favor of Saint Francis, God gave the boy every sense he had lacked". 1C §150 says he "lacked" the senses, and the favor is Saint Francis's.
5. miracles.html, s04 (Greccio wolves): "the Lord would bless them" to "the Lord would look on them and multiply them" (2C §35: "the Lord shall look upon you and multiply you"). Split the 31-word sentence this made, which the check script flagged.
6. miracles.html, l03 status: added the missing comma and "in" ("(1246), in Celano's Second Life, and by Saint Bonaventure").
7. biography.html, thesis paragraph: the added sentence said the Lord "had shown him the way". The Testament says the Most High "revealed to me that I should live according to the form of the holy Gospel" (notes-own-words.md item 24), and "The Lord gave me, Brother Francis, to begin to do penance" (item 21, quoted in the same chapter). It now reads "the Lord gave him the beginning of it and showed him how to live". I moved it before "The story begins in a prison", because "It begins" no longer pointed at the right thing.

## Confirmed against the source, no change needed

- Biography: the Spoleto vision and Saint Francis's reply "Lord, what wilt thou have me to do?" (2C §6); "God answered him" in the cave (2C §9, "said God to him in the spirit"); "I am hastening to the Lord... confidently going to my God" (1C §108); "the Lord hath glorified in heaven" in the decree, and the Pope "celebrated the Sacred Mysteries" at the tomb (1C §126); the miracles "listened to, received, verified, and approved" (1C §123); the girl "through the most holy man's merits" (1C §127); "praying to Christ" at the mice (2C §213). "Christ spoke to him from it" matches the Three Companions (§13: the Image of the Crucified spoke, and he understood it was said by Christ).
- Miracles m01 to m21: every vow, prayer, thanksgiving, and word restored by the pass is in 1C §127–150. This covers the sticks and the beggar boy (§128), the vows (§129, §136, §139–141, §146–150), Bartholomew's voice (§135), Bontadoso's words and vow (§142), the friar's vision and thanks (§145), Atto and his father (§146), Mark's vow and the boy's words (§147–148), and the woman's silent vow (§150).
- Other accounts: the wine at Sant' Urbano, "as indeed it was" (1C §61); the birds, blessing, and thanks to God (1C §58); the hands lifted to heaven at the rock and "Christ in mercy" (2C §46); Leo's paper and ink and "words of God and His praises" (2C §49); Elias's vision "the Lord will call him to Himself" (1C §109); the leper "said God to him in the spirit" (2C §9); the speech at Greccio and the people forgetting "God who had saved them" (2C §35–36); Silvester "bespeaking the favour of the Lord by praise" and the "prayers of a certain poor man" (2C §108); "joy and in safety" at Arezzo (1C §63); the Nicholas V letter chain (notes-extra-writings.md line 143).
- No fact changed by accident. The pass's changes in tone only (status lines, intros, group intros, removed labels) keep every fact. The dropped lines (Celano on delusion, "says nothing of a voice", "the bull does not mention the marks") are skeptical asides. Removing them from the body is allowed. The biography's Note on the Sources keeps the voice fact.
- Tone: no "allegedly", "reportedly", "is said to", "attributed", "claims no", or "only a legend" remains in either body text. The remaining uses of "doubt" belong to people in the stories. The title rule holds: "Saint" is outside quotations and inside them only where the source has it.

## Check script

- biography.html with `--summary summary.txt`: no MUST FIX. Two CHECK lines remain, both from before the reverence pass (a 9-word h2 and a "possible AI tell" in the Gospel-opening sentence).
- miracles.html with `--kind miracles`: no MUST FIX, no CHECK.

## Verdict

Ready.
