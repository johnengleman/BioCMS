# Check: St. Seraphim of Sarov

Originals kept as `biography.html.before-check`, `summary.txt.before-check`, `entry.json.before-check`. Quotations were confirmed against raw azbyka.ru Russian text (Sergius 1841, Elagin 1863 ch. 1, 4, 5, 7, 10, Chichagov 1903, Motovilov's Conversation, the chronicle, the memoirs page, the article on the early Lives), against the Synod Act of 1903 (English, raw), and against Russian Wikipedia (raw). All 9 block quotes and the inline quoted phrases were found and match the Russian (our translations). The lint shows no MUST FIX and no CHECK lines.

## Fixes in biography.html

1. Opening scene, paragraph 2. The writer had the peasants beat him "until he fell". Elagin and Sergius: one peasant struck him with the axe butt and he fell, then they dragged him and beat him, tied him, and left him in the entry. Reworded.
2. Opening scene, paragraph 3. Cut "on his hands and knees" (invented; the sources say he "came with great difficulty", having spent the night in his cell). "Teeth knocked out" changed to "several teeth" (Elagin, Sergius). "Five months" changed to "about five months" (Elagin: "около пяти месяцев"). Same softening in "Bent for the Rest of His Life" and in miracle m06.
3. Opening, paragraph 4, and ending. "He met every one of them" softened. "People came every day" changed to "day after day"; "visitors came every day now" changed to "nearly every day" (Sergius: "almost every day"). The last sentence of the ending keeps "bowed before every one of them", which Sergius supports ("всем кланялся до земли").
4. Kursk, icon procession. "Streets so deep in mud that the procession turned aside" overstated Elagin, who says the procession "probably" turned through the yard to shorten the way and avoid mud. Reworded.
5. Kursk, friends. "Three young merchants" changed to "several" (Elagin names three and says two more). "Read the Gospel and spiritual books" changed to "spiritual books" (Elagin). "Another such fool" was wrong: the chronicle says the Diveyevo tradition's fool is the same man Prokhor later knew. Reworded.
6. Kiev. Cut "on foot" (no source).
7. The 1780 vision. The "one account / another account" split was wrong: Chichagov has both the hand on the head and the staff on the thigh. Reworded.
8. Deacon years. "Every day" changed to "almost every day"; "whole days in church" changed to "often" (Sergius: "часто целые дни").
9. Forest years. "Fifteen years" changed to "some sixteen" (Sergius: about sixteen; 1794 to 1810). Snyt: the text said "about three years on nothing but snyt". Elagin gives "more than two and a half years" on snyt alone, from Seraphim's own words in 1832. Reworded. "Demons" changed to "the devil", in the night (Sergius).
10. Soldier story. "Reached its author secondhand" was unsupported. It is a manuscript copy of an early Life kept at the Lavra (Bekasova). Reworded.
11. Silence years. "Even through the winter snow" was invented. Elagin says the brother brought food on Sundays, "especially in winter". Reworded.
12. Manturov. "The first healing" softened to "one of the first". The dating of 1823 comes from Russian Wikipedia, and the own-words notes place it about 1827.
13. 25 November 1825. The text merged two accounts. Chichagov calls it a dream-vision with Sts. Clement and Peter of Alexandria that released him from the enclosure. Motovilov's note has him seeing her by the Sarovka (with Peter and John) and receiving the Diveyevo charge, the ditch, and eight sisters. Reworded and attributed. Miracle m08 matches.
14. Funeral and Lives. "Seraphim refused to let anyone take his portrait" contradicted the 1828 Serebryakov portrait mentioned earlier. Reworded.
15. Bear story. The writer said Pleshcheeva "kept the secret for eleven years under an oath" (no oath in Elagin; Seraphim told her to tell no one for eleven years after his death). Cut the editorial line "The stone, the robbers, and the silence need no help from it". The paragraph is now short and attributed; full source discussion moved to the Note on the Sources (RGB file in Philaret's papers; Isaiah's 1849 letter; we saw only the articles that cite the file).
16. 1883 proposal. "Pobedonostsev called the initiative improper" is not in Russian Wikipedia, which says only that he apparently received it unfavorably. Reworded. "First formal proposal" changed to "first surviving document proposing".
17. 11 January 1903. "Metropolitan Anthony" now says "of St. Petersburg", to avoid confusion with Anthony Medvedev.
18. 1990 find. "The proof that settled it" changed to "The chief evidence" (Russian Wikipedia: "главным основанием"; the commission also used the 1902 and 1920 acts).
19. Candle at Diveyevo. The candle's origin is the nuns' tradition, so it is now attributed.
20. Bulldozer story. In the source the driver sees an old man come from the forest who speaks to him; the text had "heard a voice". Fixed.
21. Death scene. Elagin has a copper crucifix at his neck; he does not say it was the Kursk cross, so the text no longer states that outright.
22. Ending. "Last seven years giving it away" changed to "last years" (his door opened in 1815).
23. A Note on the Sources: added the bear detail, the tonsure date conflict (13 Aug 1841 Life vs 18 Aug Synod Act), the return date conflict (9 May 1809 vs 8 May 1810, the latter used), and the 1825 vision conflict (Chichagov vs Motovilov). The bell tower note now names its source (Russian Wikipedia).

## Checked and kept (the focus items)

- **Birth year.** Both sides are stated in the story and the Note: 19 July 1759 (Lives of 1841, 1903 and the gravestone, 73 years) against the Kursk parish records of 1768 (age 14) and the Church's 1754. The story says age 78 "by the parish records" and 73 on the gravestone. `birth_year` stays null, as the writer decided.
- **Motovilov Conversation.** Introduced as Motovilov's account, published seventy years later, "the only record of it". The Note says Nilus published it in 1903 from papers given by Motovilov's widow, cut pages in 1905, and published the Protocols in the same year; Strizhev's view is given. All Conversation quotations (aim of life, capital of grace, light, bathhouse warmth, perfume, "for the whole world") match the Russian. Scene details match (Thursday, grey day, snow, freshly cut stump, crouching, "several fathoms", "more than an inch of snow"). The prophecies about Russia are not used.
- **Relics timeline.** 17 Dec 1920 opening report (cotton figure, amethyst slippers, bones, red hair) matches Russian Wikipedia; 1922 Donskoi; autumn 1990 Leningrad, no inventory number; 5 Dec 1990 commission (Eugene of Tambov, Arseny); 11 Jan 1991 handover; February procession to Epiphany; 28 July to 1 August 1991 Diveyevo. The 1926 "miraculous vanishing" is rejected in the Note and in `relic_description`.
- **1903 glorification.** Synod Act checked in raw English: commission 3 Feb 1892 to Aug 1894, 29 dioceses, 94 cases "the majority" confirmed by affidavits, hundreds of unrecorded letters; tsar's wish 19 July 1902; examination 11 Jan 1903; tsar's note of 26 Jan "true joy and profound compunction"; decision 29 Jan. Skeleton and Metropolitan Anthony's statement rest on Russian Wikipedia.
- **Quotations in other fields.** The 28 `quotes`, the teachings blocks, and the miracle quotes match the Russian. The "peaceful spirit" saying is correctly labeled as from a later collection of memories.
- **How This Life Was Researched.** 21 listed sources: counted, matches. "Fifteen details flagged": 15 "NEW" flags in the three notes files: matches.

## Fixes in entry.json

- `saint.biography` and `saint.summary` synced with the edited files. Summary: "from every passer-by" changed to "from passers-by".
- Miracles m04 (Chichagov: hand on head and staff on thigh), m06 ("about five months"), m08 (two accounts of 25 Nov 1825; status line rewritten), m17 (no oath), m56 (the driver sees an old man).
- Teachings: "wrote no books" softened; "met every visitor" softened; "left no saying on forgiveness" softened to the sources read; "three men came" changed to "the men"; "he said the same to the sick" replaced by what the sources show (he asked the sick whether they believed).
- Quote "My joy! Christ is risen!": source now points to the sources that give the greeting (the memoirs page gives it in this order).
- Miracle statuses and dates checked (m01 to m58). No other changes were needed. The 1903 healing reports match the OrthoChristian text for names, places, and dates.

## Not verified

- The Georgy, Ioasaf, and Avel Lives themselves (only Sergius, Elagin, Chichagov read in raw text). The Georgy "hands on head", Holy Thursday vision, and Ioasaf hollow come through the notes and the articles.
- The RGB file about Pleshcheeva: seen only through Russian Wikipedia and the Bekasova article.
- The 2007 patronage and the 1883 to 1902 politics rest on Russian Wikipedia only.

Ready.
