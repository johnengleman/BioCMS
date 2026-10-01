# Stage 5 check: Thérèse of Lisieux (round 1)

Checked: `04-biography.html`, `04-summary.txt`, against `03-outline.md`, `04-notes.md`, and `02-dossier/`.
Date of check: 30 September 2026. Checker: a new agent that did not write the text.

## Check script output

```
words: 9609  sentences: 742  avg sentence: 13.0  h2: 19  h3: 3  block quotes: 10
```

The script printed no "MUST FIX" line and no "CHECK" line. The script passes.

## 1. Verdict

**Ready after small fixes.** A second round is required.

The story works. The hook, the loops, and the ending are sound. The facts are mostly sound. Every problem is local to one sentence or one paragraph. No section needs a new structure.

There are **28 must-fix items**. Five of them are errors against a primary text (M4, M13, M16, M17, M10). Four are hard-topic items that state one side only (M12, M21, M24, M25). Three are numbers or claims in "How This Life Was Researched" (M1, M2, M3).

## 2. Answers to the specific checks

### 2.1 The ten block quotes

I compared each block quote with the card and with the raw Carmel page. I read the raw JSON of Manuscripts A, B, and C, LT 36, and the Yellow Notebook pages for July and September 1897.

| # | Block quote | Result |
|---|---|---|
| 1 | "I choose everything!" (S3) | The words match. The frame is wrong. See M4. |
| 2 | "Well, thank goodness it's the last year!" (S5) | Pass. Ms A 44v–45r matches. |
| 3 | The letter of 20 Nov 1887, LT 36 (S6) | Pass. Both parts are in LT 36. The ellipses are fair. |
| 4 | The veiling quote (S8) | The words are real. The order is reversed, and the second sentence is cut short. See M13. |
| 5 | "I'm made so that fear makes me back away…" (S9) | Pass. Ms A 80v matches. |
| 6 | "My vocation, I've found it at last…" (S11) | Pass. Ms B matches. The lead-in has an error nearby (M16). |
| 7 | 17 July, "spend my Heaven doing good on earth" (S13) | Pass. It matches the Yellow Notebook for 17 July. |
| 8 | 30 July, the glass (S13) | Pass. It matches the Yellow Notebook for 30 July. |
| 9 | Sr Thérèse de Jésus, 9 Nov 1907 (S16) | Pass. It matches F-EW-1833 and F-EW-1835. The Carmel prints extracts only. |
| 10 | Last words, 30 Sept 1897 (S14) | Pass. It matches MQ-060 and the Yellow Notebook. |

All ten block quotes have an introduction in the text before them. All ten have a `<cite>` line with speaker and work. Each is under 50 words. All sources are public domain in substance. No block quote comes from a `facts-only` source.

I also checked the 147 inline quoted strings against all dossier files. 142 matched the dossier text. I checked the other five by hand. Two are wording problems (M27). One is the veiling sentence (M13). One is the 22 September line, which I checked against the Carmel page and which is correct. One is "How heavy the Cross is!", which is our own translation of a French phrase on a card, and is fine.

### 2.2 The veiling quote

The sentence "on the day of my wedding I was truly an orphan" rests on one card, F-OW-108. I checked it on the Carmel's Ms A page.

- The French is: « le jour de mes noces je fus vraiment orpheline, n'ayant plus de Père sur la terre mais pouvant regarder le Ciel avec confiance et dire en toute vérité : "Notre Père qui êtes aux Cieux." »
- It stands on Ms A 75r–75v. The sentence follows Céline's plan to bring Louis to the grille on the veiling day.
- The sentence about tears ("Ce jour-là Jésus permit que je ne puisse retenir mes larmes…") comes later, on Ms A 77r. The biography prints it first.
- The 1911 edition drops the "orphan" sentence. The notes say this, and the search of the 1911 text agrees.
- The biography cuts the sentence at "orphan". The rest of the sentence says she looked to Heaven with confidence. The cut changes the tone. See M13.

### 2.3 The numbers in "How This Life Was Researched"

| Number in text | What the files show | Verdict |
|---|---|---|
| 3,661 numbered fact cards | The four `facts.md` files hold 3,661 cards (585 + 270 + 136 + 2,670). No card ID repeats. Six cards have no Source line (F-OM-132 to F-OM-136, F-EW-2097). They are cross-reference cards. | The count is correct. "each tied to a named source" is not true for six cards. Should-fix F24. |
| 2,243 "new to English" | The count of cards with "New to English readers: yes" is 2,243 (335 + 181 + 92 + 1,635). The tests differ by part, and the count overstates. | **Overstates.** See M1. |
| 33 depositions, 1910–1911 | `sources.md` W1: "Fully read (all 33 depositions)". The Carmel page prints 33 of 48 witnesses heard. | Correct as written. |
| 26 depositions, 1915–1917 | `sources.md` W2: "Fully read (26 depositions)". This is 25 witnesses plus Godefroy Madelaine. | Correct. |
| All 266 letters | `sources.md` row 4: LT 1–266 all read. *Divini amoris scientia* §6 also says "the 266 Lettres we possess". | Correct. Should-fix F24 (write "surviving"). |
| More than 190 web pages | The note counts 197 address strings in `sources.md`. That count includes 3 marked FAILED, template strings (`lt-NNN`, `<slug>`), search-API endpoints, a bare domain, and pages read as summaries only. The 270 letter pages are counted as one address. | The wording is weakly based. See M2. |

Why the 2,243 figure overstates:

1. The own-writings part tests against the stage 1 baseline and against Taylor 1912 and *Novissima Verba*. The life-family and official-miracles parts test only against the baseline. The eyewitness part writes no test.
2. The eyewitness part is "not de-duplicated on purpose (one speaker per card)". Several cards can carry one event. This inflates the count.
3. Many "yes" cards rest only on an English book already in print. 95 of 181 life-family "yes" cards cite only Laveille (English, 1928). About 46 of 92 official-miracles "yes" cards cite only De Teil, Taylor, Dolan, or Laveille. In the eyewitness part, 28 cite only Laveille and 59 cite only De Teil, Taylor, Dolan, or the 1913 Carmel book. The biography's own "sister at her feet" story (F-EW-1707) is tagged "yes", but its source is Taylor 1924.
4. Some "yes" tags mean "absent from the 1911 French edition". That is not the same as "new to English".

### 2.4 The ending

Paul VI's baptism on 30 September 1897 is in the dossier. It is card F-OM-093 (Francis, *C'est la confiance*, §6, note 10). It is also in E-P7-116. I read the Vatican page. The sentence says: "Saint Paul VI liked to recall that he was baptized on 30 September 1897, the day of her death." The card is correct and the biography follows it.

Problem: the Sources list does not include *C'est la confiance*. See M28.

### 2.5 The crowd figure and the dates of the process

Crowd of "about fifty thousand" at the translation of 26 March 1923. Two English books give the number: Laveille (p. 408: "fifty thousand pilgrims arrived in the town") and Taylor 1930 ("fifty thousand pilgrims escorted" the coffin). F-OM-055 gives 50,000 without naming the source. The dossier finds no other figure for that day. Laveille and Taylor use different verbs. The biography says "Reports put the crowd at about fifty thousand people." That is fair. Should-fix F17 asks for a named source.

Dates that I checked and found correct: cause and inquiry at Bayeux in 1910; virtues declared heroic 14 August 1921; mayor's refusal in January 1922 and consent on 8 March 1923; translation on Monday 26 March 1923; beatification 29 April 1923; canonization 17 May 1925; golden rose 30 September 1925; patron of missions 14 December 1927; basilica blessed 11 July 1937; patron of France 3 May 1944; Doctor of the Church 19 October 1997; imprimatur 7 March 1898; funeral 4 October 1897. Taylor's 25 March date is wrong, and the biography correctly uses 26 March.

The count of "four cures, two before each step" is correct (M-001 to M-004).

### 2.6 Hard topics

| Topic | Result |
|---|---|
| Pauline's edits (S15) | Fair. The sentence "changes of little importance" is her own sworn word, with the court's reaction. "Modern editions show that the changes were larger" has no named source. Should-fix F8. |
| The sisters shaping testimony (S16) | The narrator states "The sisters were also shaping the portrait" as fact. The cards give a letter and two sworn statements. See M25. |
| The prioress and the doctor (S13) | One-sided. See M21. |
| The prioress and Père Alexis (S9) | Both witnesses are named in the cards, but the text gives no attribution. Should-fix F8. |
| Louis in the asylum (S8) | Mostly fair and sourced to Céline and Pauline. One claim is too strong (M12). |
| The trial of faith (S11, S12) | Fair. TSA's blunt words are attributed. The 22 September line has its first half. One added gloss is not on the card (M22). |
| The lay sister (S13, S15) | Fair. The identification is not attributed. Should-fix F8. |

## 3. Must fix

Each item gives location, problem, and exact fix. "S" numbers follow the outline (S1 = "The Nun Nobody Could Write About", and so on).

**M1. S17 "How This Life Was Researched", sentence 4.**
Problem: "The researchers marked 2,243 of the cards as new to English readers." See 2.3. The number mixes tests, counts duplicates, and includes cards that rest on English books.
Fix: replace the sentence with: "The researchers compared the cards with five popular English-language accounts and found hundreds of facts that those accounts leave out." (The own-writings part alone has 335 "yes" cards under the strictest test.)

**M2. Same paragraph, sentence 3.**
Problem: "more than 190 web pages" comes from a count of address strings. The true number of pages fetched is higher (270 letter pages alone), but the recorded basis is weak.
Fix: change to "hundreds of web pages".

**M3. Same paragraph, last sentence.**
Problem: "Where witnesses disagree, the text says so." The text omits a disagreement in at least four places (M11, M21, M24, and the onset of the 1883 illness in S4).
Fix: fix M11, M21, and M24, and then keep the sentence. If the writer does not fix them, change to "Where witnesses disagree, the text usually says so."

**M4. S3, block quote "I choose everything!" and the line before it.**
Problem: The second sentence ("My God, I choose everything. I don't want to be a saint by halves.") is not the child's. Ms A says: "plus tard lorsque la perfection m'est apparue… Alors comme aux jours de ma petite enfance, je me suis écriée." The cite says "about a scene of 1876 or 1877". A reader thinks a three-year-old said both sentences.
Fix: after "In her memoir she called the moment the summary of her whole life." add "Later, she wrote, when she saw what holiness asks, she cried the same words to God." Change the cite to: "— Thérèse, Manuscript A, written 1895: the child's cry of 1876 or 1877, then her cry as a young woman".

**M5. S3, first paragraph.**
Problem: "she wrote to her two eldest daughters at boarding school". Cards F-LF-062 and F-LF-063 say the letter of 5 December 1875 went to Pauline (CF 147).
Fix: "she wrote to Pauline, at boarding school, about the youngest."

**M6. S3, paragraph on the diagnosis.**
Problem: (a) "He told her … that an operation would only shorten her life." Card E-P1-076 says Zélie said this and the doctor agreed. (b) "and never took them out again" is not on any card. F-LF-092 says he "put his lines away in the attic".
Fix: "He told her she had a fibrous tumour. She said an operation would only shorten her life, and he agreed." and "Louis gave up fishing and put his lines away in the attic."

**M7. S4, paragraph on the veiled man.**
Problem: "Thérèse did not know what she had seen, but she never forgot it." Card F-EW-157 says she was sure it was prophetic. F-OW-028 says she called it a "prophetic vision". "She never forgot it" is not on a card.
Fix: "Thérèse did not know what it meant. She called it a prophetic vision."

**M8. S4, school paragraph.**
Problem: (a) "she came first" — card F-OW-031 says she was "often first". (b) "in a hundred small ways" — Ms A says "in a thousand ways".
Fix: "and she was often first. One jealous girl made her pay in a thousand ways for her small successes."

**M9. S4, paragraph on the doctor.**
Problem: "The doctor, Alexandre Notta". The Carmel's own page is titled "NOTTA Alphonse-Henri, Docteur". Card F-EW-286 gives a different name (Alexandre-Damase). Dr Alexandre de Cornière is another doctor.
Fix: "The family doctor, Dr Notta,".

**M10. S4, last paragraph.**
Problem: "She told no one about either fear." Ms A 28v says of the second fear: "Je le dis à Marie qui me rassura… je le dis à confesse." Card F-OW-042 agrees.
Fix: "She told Marie and her confessor that she feared she had feigned the illness. Both tried to calm her, but the doubt stayed until she entered Carmel. The first fear lasted four years."

**M11. S5, first paragraph, and its place.**
Problem: The text puts the prayer request after "By thirteen" (1886). Card F-EW-305 dates it about 1884, around her First Communion, when she was eleven. The text also gives only Marie's version. Card F-EW-308 says Céline remembered that Marie allowed a quarter of an hour.
Fix: move the prayer sentences before the scruples paragraph (May 1885). Write: "Around her First Communion, in 1884, she asked Marie, who now ran the house, for half an hour of prayer a day, then for a quarter of an hour. Marie later swore she refused both, because she feared God would take the child too soon. Céline remembered that Marie allowed the quarter of an hour. On half-holidays, Marie said, Thérèse hid behind her bed curtains and 'thought' about God and about eternity." Then continue with the scruples, and put "By thirteen she cried at almost everything" after them.

**M12. S8, paragraph on the recreation talk, and the next paragraph.**
Problem: (a) "No other source supports that claim." Cards F-LF-201 and F-LF-265 say only "no source found in the passages read". Céline's 1909 pages were read in part. (b) "Thérèse, sixteen, did not seek comfort from Marie or Pauline. They came to her for it." This is Pauline's 1915 word (F-EW-649), and it has no attribution.
Fix: "In the passages the researchers read, no other witness repeats that claim. Céline speaks only of hurtful remarks." and "Pauline said that Thérèse, sixteen, did not seek comfort from Marie or Pauline; they came to her for it."

**M13. S8, the veiling block quote.**
Problem: See 2.2. The order is reversed. The first sentence is cut before "having no more Father on earth but able to look to Heaven with confidence".
Fix: use this block:
```html
<blockquote>
  <p>“On the day of my wedding I was truly an orphan, having no Father on earth any more but able to look to Heaven with confidence and say in all truth: ‘Our Father who art in Heaven.’” … “That day Jesus let me be unable to hold back my tears, and my tears were not understood.”</p>
  <p><cite>— Thérèse, Manuscript A, 75v and 77r, about her veiling, 24 September 1890</cite></p>
</blockquote>
```

**M14. S9, paragraph on Pauline's election.**
Problem: "Thérèse used it to tell the truth to people who could hurt her. On 8 December 1892 she had taken a young nun, Marthe…" The Marthe scene is before Pauline's election of February 1893, so the task did not cause it. The card does not say that Thérèse "used" the task for this.
Fix: "Even before she had that task, she told the truth to people who could hurt her. On 8 December 1892, while Gonzague was still prioress, she took a young nun, Marthe, laid Marthe's head on her own heart, and told her that her love for the prioress was 'a poison.'"

**M15. S9, last sentence.**
Problem: "That is why, today, we can see Thérèse's face." False. Card F-LF-074 records a photograph session in July 1876. Cards E-P4-113 and F-EW-884 say only that Céline photographed her in Carmel from 1894 to 1897.
Fix: "Over the next three years she photographed Thérèse in the cloister." The section then ends on the camera, which is a fair pull to S10.

**M16. S11, paragraph "On 8 September 1896".**
Problem: "to murmur Marie's name at the stake, like Joan of Arc." Ms B says: "je voudrais sur le bûcher murmurer ton nom, ô Jésus". The name is Jesus. Card F-OW-217 mistranslates "ton nom" as "your name" without saying whose. The writer read it as Marie's.
Fix: "and to murmur the name of Jesus at the stake, like Joan of Arc."

**M17. S11, paragraph on the first blood.**
Problem: "In her own account she thought she was going to die, and 'my heart was thrilled with joy.'" The words come from Laveille's English of the edited text (F-LF-222). Ms C 4v–5r says: "je pensais que peut-être j'allais mourir et mon âme était inondée de joie."
Fix: "In her own account she thought she might be dying, and 'my soul was flooded with joy.'" (our translation of Ms C).

**M18. S12, Taxil paragraph.**
Problem: "Pauline and Céline would say afterward that she had distrusted her all along." Card F-EW-992 (Pauline): she first took an interest, then judged it not credible because "Diana" spoke against a bishop. Card F-EW-1005 (Céline): she enjoyed the book, then rejected it when she learned the author spoke against a bishop.
Fix: "Pauline and Céline would say afterward that she had dropped the writings when she learned that the author spoke against a bishop."

**M19. S12, paragraph on the letter of 9 January 1897.**
Problem: "who had cried at the sight of her". Card F-OW-470 says the letter does not give the cause of Pauline's tears.
Fix: "who had been in tears."

**M20. S12, paragraph on the Yellow Notebook.**
Problem: "Where the sayings appear here, they come from Pauline's record." Not true. The Bon-Sauveur joke and the last hours also come from Céline's notes (MQ-046, F-EW-1673). The black-door words come from Thérèse de Saint-Augustin (F-OW-220). Marie's notes are used too.
Fix: "Most of the sayings here come from Pauline's record. A few come from notes by Céline, Marie, and Thérèse de Saint-Augustin."

**M21. S13, paragraph on the month without a doctor.**
Problem: The text states as fact that Gonzague refused Dr La Néele for "about a month", and that "the prioress did not allow" injections. The cards give one side. (a) Marie (F-EW-1591) and Céline (F-EW-1595) say a month without a doctor. (b) Pauline (F-EW-1514, F-EW-1573, F-EW-1574) says Gonzague let La Néele in three times in five weeks, that no doctor came from 17 to 30 August, and that the sisters telegraphed La Néele on 30 August. (c) The Yellow Notebook for 5 September records a visit from La Néele. (d) The injection refusal comes from Pauline (1915) and Céline. (e) The editors warn that claims about Gonzague should be checked against Guy Gaucher (F-EW-508, F-EW-1575).
Fix: replace the paragraph with: "In August the community doctor, Dr de Cornière, went on holiday. Marie and Céline testified that the sisters asked Gonzague to let their cousin by marriage, Dr La Néele, see Thérèse in his place, and that she refused. Marie called those weeks 'the cruellest tortures.' When the sisters complained, Marie said, Thérèse told them, 'My little sisters, you must not grumble against God's will.' Pauline gave a different count. She said Gonzague let La Néele in only three times in five weeks. When de Cornière came back in September, Pauline said, he spoke of morphine injections, and the prioress did not allow them. Céline said the sisters gave small doses of morphine syrup by stratagem, because Gonzague thought such relief shameful for a Carmelite. Marie des Anges wrote instead that God allowed the doctor not to think of painkillers. The Carmel's editors warn that the sisters' charges against Gonzague should be checked against the historian Guy Gaucher."

**M22. S13, 22 September paragraph.**
Problem: "She said it as a fact about the dark, and about what held her." No card says this. It is the writer's reading of a very sensitive line. Card F-OW-321 asks only for the line with its context.
Fix: delete the sentence. The quote already has its first half, and the reader can judge.

**M23. S14, second paragraph.**
Problem: "The prioress said yes, and that God was glad." The Yellow Notebook (29 September, 4) says the prioress answered "Yes, my little girl", and then "one of us" said God was joyful today.
Fix: "The prioress said yes. One of the sisters added that God was glad. 'Me too!' Thérèse said."

**M24. S15, paragraph on the funeral.**
Problem: "The procession to the town cemetery was small and quiet." Céline (F-EW-1732) and Laveille say small. Marie (F-EW-1730) and Aimée (F-EW-1735) remember a large crowd. Domin saw nothing extraordinary. The outline flagged this as disputed.
Fix: "Céline called the procession to the town cemetery very small. Marie and Aimée remembered a large crowd."

**M25. S16, paragraph beginning "The sisters were also shaping the portrait."**
Problem: The narrator states the conclusion as fact. The cards give a letter of Marie (quoted by editors, from Piat's book), Marie's oath, and Céline's oath. The card's note "shaping the testimony" is the extractor's reading.
Fix: replace the first sentence with "Marie's letters show that the sisters meant to correct Rome's portrait of her." Keep the rest, which is attributed.

**M26. S17, first sentence.**
Problem: "Thérèse travelled once, on the pilgrimage of 1887." False. Ms A tells of a trip to Trouville at six or seven, a train trip to Le Mans, and a trip to Alençon after the 1883 cure. No card supports "once".
Fix: "Her one long journey was the pilgrimage of 1887." Or cut the sentence.

**M27. Quotations that do not use the dossier translation.**
Problem: (a) S15: "What will anyone find to say about Sister Thérèse after her death?" is the Claim paraphrase of F-EW-1708, which has no quote marks. The card's Translation is "Whatever will they be able to say about Sr Thérèse after her death?" (b) S7: "I sleep, but my heart is awake." Card F-OW-080 gives "I sleep but my heart watches".
Fix: use the card wording in both places: "Whatever will they be able to say about Sister Thérèse after her death?" and "I sleep but my heart watches."

**M28. Sources list is incomplete.**
Problem: The text relies on documents that the list does not name. Add these entries (use the URLs in the cards):
- Francis. *C'est la confiance*. Apostolic exhortation, 15 Oct. 2023. Vatican, https://www.vatican.va/content/francesco/en/apost_exhortations/documents/20231015-santateresa-delbambinogesu.html. Accessed 30 Sept. 2026. (Paul VI ending.)
- Piat, Stéphane-Joseph. Biography of Sœur Marie de l'Eucharistie (Marie Guérin). Office Central de Lisieux, 1967. Text on *Archives du Carmel de Lisieux*, https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/soeur-marie-de-leucharistie/biographie-de-soeur-marie-de-leucharistie/. (Milk-cup scene, F-EW-2622.)
- Agnès de Jésus. "Circulaire de Sœur Marie des Anges et du Sacré-Cœur." 25 Dec. 1924. *Archives du Carmel de Lisieux*, https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/soeur-marie-des-anges/circulaire-de-soeur-marie-des-anges/. (Stomach ache; "heart tightening".)
- Agnès de Jésus. "Circulaire de Sœur Thérèse de Saint-Augustin." 8 Sept. 1929. *Archives du Carmel de Lisieux*, https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/soeur-therese-de-st-augustin/circulaire-de-soeur-therese-de-st-augustin/. (Black-door dream, F-EW-2551.)
- Agnès de Jésus. "Circulaire de Sœur Aimée de Jésus." 17 Jan. 1930. *Archives du Carmel de Lisieux*, https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/sr-aimee-de-jesus/circulaire-sr-aimee-de-jesus/. (The bell.)
- Carmel de Lisieux. "Mère Marie de Gonzague et Thérèse." *Archives du Carmel de Lisieux*, https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/mere-marie-de-gonzague/mere-marie-de-gonzague-et-therese/. (Gonzague's letter of May 1888; the soup joke.)
- Thérèse de Saint-Augustin biography page on Sister Saint-Vincent de Paul, with the URL in card F-EW-1438. (Meat juice, and the name of the sister.)

## 4. Should fix

### Facts (small, and attribution)

**F1. S6, the audience with Leo XIII.** Almost every detail in the first paragraph ("Speak!", the plea, "Oh Holy Father…", "stressing each syllable") comes from Ms A (1895). Only the guards are marked "in her later account". The same-evening letter says Révérony spoke for her and the Pope said only "If the good God wills, you will enter." Start the paragraph with "In the account she wrote in 1895,". Change the guards sentence to "In the same account, two guards…".

**F2. S2, paragraph on the starved baby.** "blamed herself for years": the card says "blamed herself". Delete "for years".

**F3. S3, the coffin.** "found the coffin standing in the corridor. She stood a long time in front of the lid": Laveille says corridor. Ms A says lid. Card E-P2-020 lists this as a conflict. Write "Later she stood a long time in front of her mother's coffin. In her memoir, the lid seemed very big."

**F4. S3, Zélie's death.** Louis's "Your little Mother is gone!" follows the death (12:30 a.m.) in the text. Marie put it at about eleven o'clock (F-EW-140). Add "Marie remembered it as about eleven."

**F5. S3, "The child thought it over."** No card. Delete. Also "She was afraid of being alone" comes from the stairs card (F-LF-067). Write "She would not climb the stairs alone without calling 'Mama!' at every step."

**F6. S3 and S4, flash-forwards.** S3 has "Twenty years later…", "Years later she told Céline why", and "Five years later, Pauline would close a convent door". The rule is one per section. Keep the Pauline one. Turn the other two into attribution ("In her memoir she copied both passages"; "She told Céline later").

**F7. S4, school paragraph.** Add what the teacher also said in 1911 (F-EW-228): one classmate did give Thérèse "a small persecution". The text now gives only the 1915 line, which reads as a denial.

**F8. Attribution of named people and testimony.**
- S9: "The prioress … was angry" and the ban on Père Alexis: add "Pauline testified" and "Marie des Anges wrote" (F-EW-741, F-EW-742).
- S10: "Pauline was in a hurry. She did not seem to understand" is Céline's impression (F-EW-1064). "without enthusiasm" is Pauline's own word (F-EW-1057). Write "Céline said Pauline was in a hurry … Pauline herself later said she agreed 'without enthusiasm.'" Also change "the two sisters knelt" to "Thérèse and Céline knelt".
- S13: name the meat-juice sister as "Sister Saint-Vincent de Paul, whom Thérèse de Saint-Augustin named".
- S15: "No one else claims to have seen the cure" becomes "No witness in the dossier claims to have seen the cure."
- S15: "Modern editions show that the changes were larger" needs a named source, for example "The Carmel's editors and later critical editions show".
- S15: Gonzague's last words. Add: "Pauline gave the words a little differently in 1915." (F-EW-1806 and F-EW-1821.)
- S15: Grant. "later kept her birthplace" should read "later became keeper of her birthplace house in Alençon". His last words come from an editors' note with no source (F-EW-1997). Write "The editors of the process record report that he murmured…".

**F10. Invented or stretched detail (small).**
- S3: "The house was already growing quiet." (no card). Delete or cut to "In December 1876 Zélie went to a doctor."
- S5: "Céline, with tears in her own eyes": Ms A says Thérèse had tears in her eyes, and Céline "eut aussi bien envie d'en verser" (felt like crying too). Write "Céline, who felt like crying herself".
- S5: "it stayed there for ten years": card F-OW-063 says only that it was still there when she wrote in 1895. Write "she still had it when she wrote about it in 1895."
- S5: "Now she wanted Carmel, and she wanted it soon." No card. Delete.
- S4: "One Thursday she said" — the card says "One day". Delete "Thursday".
- S7: "Louis heard every word." Card: Louis was present. Write "Louis stood there."
- S9: "Days later influenza struck the house." The card gives the last days of 1891. Write "At the end of December influenza struck the house."
- S14: "with a look her sisters could not forget." No card. Delete.
- S6: "The canon had a case, and it is fair to say so. He was responsible for the house … That left the decision to his judgment." This is a meta remark and an added gloss. Keep only: "The Carmel's rule set no minimum age. Laveille notes this."
- S1: "a simple road to holiness that needs no great deeds": "needs no great deeds" is a paraphrase with no card. Pius XI called the little way "an easy way for every soul" (E-P7-105). Use that.

**F11. S10, the date of the evening.** "One winter evening in 1894": Pauline says early 1895, the editors say December 1894. Write "One winter evening in 1894–1895".

**F12. S10 and S11, "Pauline's feast".** S10 gives 21 January 1895 (play) and 20 January 1896 (notebook). Both are called her feast. Write "on the eve of her feast, 20 January 1896" if the cards support it, or "around her feast".

**F13. S12, chronology.** The Yellow Notebook paragraph (6 April) comes after the 9 June saying. Move it to just before the 7 June scene, or to the first place in S12 where a saying appears.

**F14. S12, LT 216.** In the letter, the words "S'il y a un Ciel, il est pour moi" are in quotation marks. She quotes someone (F-OW-470). Add "The words are in quotation marks in the letter."

**F15. S8, "Her clothing was set for 10 January 1889."** The section opens with Louis, so "Her" has no owner. Write "Thérèse's clothing was set for 10 January 1889."

**F16. S7 and S8, repeated event.** S7 ends with Louis leaving on 23 June. S8 opens with the same event. Cut the S7 last line and let S8 open the scene, or change the S8 opening.

**F17. S16, the fifty thousand.** Write "Laveille says fifty thousand pilgrims arrived in the town that morning. Taylor says fifty thousand escorted the coffin."

**F18. S3, "Years later she told Céline why."** The card (F-EW-134) says "later". Delete "Years".

**F19. S8, the mock invitation ending.** "Louis was alive, and he could not come." reads as if he could not come to the wedding of Jesus. It is a muddle. Then "Would he ever come home?" is a rhetorical question. Cut both, or write "Louis was still at Caen."

**F20. S13, "Canon Maupas".** The Yellow Notebook says "Notre Père". The name comes from the editors. Add nothing, but keep the name only if you also keep the source in the list.

### Voice

**F21. Terms not explained on first use.**
- "the little way" (S13, S17): first use in the 17 July paragraph. Add one clause: "her little way, the plain road of trust and small acts that she taught to her novices."
- "clothing", "profession", "veiling" (S8): write "Her clothing, the ceremony in which she received the habit, was set for 10 January 1889." "made her vows (her profession)". "The public veiling, when she received the black veil, followed on 24 September."
- "postulant" (S4): add "a candidate".
- "the turn" (S4): "the turn, the revolving hatch at the door".
- "Visitation nun" (S2, S17): add "of the Visitation order".
- "Premonstratensian" (S15): write "a priest of the Premonstratensian order at Mondaye".
- "beatified" (S16): write "beatified her, the step before sainthood,".
- "Manuscript A", "Manuscript B" in the cites (S3, S8, S9, S11): the text never says that these are the three parts of her memoir. Add one sentence in S10 or in the first cite: "Manuscript A, the first part of her memoir".

**F22. Meta remark.** S12 "Where the sayings appear here, they come from…" is a note about the writing. After M20, keep it short.

**F23. Phrases that pass the script but weaken the voice.**
- S2 "Two refused vocations led to one marriage." Keep. It is short and dry.
- S17 last sentence before Paul VI ("A hundred years earlier, a sister in the kitchen…"): it closes the hook well. Keep.
- S12 "Yet it was no longer a veil…" in S11: from Ms C. Keep.

**F24. Research paragraph, small.** Write "all 266 of her surviving letters". Write "3,661 numbered fact cards" and drop "each tied to a named source", or add a Source line to the six cross-reference cards.

**F25. Sources list style.** Split entries that join two works: "Zélie Martin" and "Louis Martin"; "Thérèse et la Première Guerre mondiale" and "Supplique des soldats"; "Récréations pieuses" and poems; "Carnet jaune" and "Dernières paroles". Name the editors or the site as author for "Correspondance familiale". The rest is consistent MLA. All access dates are 29 Sept. 2026, which is right.

### Story and structure

- **Hook.** It works. The kitchen remark is specific and strange. It is answered in S15 (the book goes out in its place) and closed in S17. The thesis follows in three short sentences.
- **Where attention drops.**
  1. S9, paragraphs 5 to 9. The section moves through eight episodes (keys, election, Marthe, Louis's death, Céline's arrival) in about 650 words. Only the wreaths get a full scene. Fix: cut the keys paragraph, and give the Marthe scene room. It is the best evidence of what she did with novices.
  2. S16, paragraphs 6 to 8. The 1921 to 1925 steps read like a list of dates. Fix: use one picture from the cards. The 26 March 1923 procession (white hearse, four white horses, covered in cloth of gold, F-OM-055) is in the dossier and is not used.
  3. S17 is 283 words against a target of 400. Fix: add the basilica (first stone 30 September 1929; Pius XI wanted it "very big, very beautiful, and as quickly as possible", F-OM-090). Keep the ending on Paul VI.
- **Connection.** The loops work (L1 to L6 all close). S9 to S11 read a little like a list; see above.
- **Does the reader know the person?** Yes. The furies, the cords, the scruples, and the keys show faults. The trial of faith is told without comment. The text is a little thin on faults after 1890.
- **Ending.** It lands on a real, sourced fact. It is a coincidence, not an image. That is acceptable. If the writer wants more weight, end on Léonie and the radio and put Paul VI just before it.
- **Miracles.** Brief and where the outline puts them: the smile (S4), the sister at her feet (S15), and the four cures (S16). No other miracle appears. Pass.
- **Length.** 9,609 words of prose, inside tier A (8,000 to 10,000). Departures from the outline: S2 559 (target 450), S3 690, S4 718, S8 627, S17 283 (target 400), S10 422 (target 500). The notes explain them. No large departure.
- **Summary.** It is an invitation, not a timeline. The kitchen remark and the cords are a good pair of true details. It ends on a question. 96 words, inside 70–120. Pass. No change.
- **Structure.** Heading rules, links, and order pass the script. I do not repeat that work.

## 5. Coverage table

| # | Coverage question | Status | Where | Note |
|---|---|---|---|---|
| 1 | Why she is famous as a saint | Answered | S1 thesis, S11, S16, S17 | The thesis is short and clear. |
| 2 | The whole life story | Answered | S2–S14, S15–S17 | No gap. |
| 3 | Hardships | Answered | S3, S4, S5, S8, S9, S11, S13 | Poverty is thin, as the outline expected. |
| 4 | Famous deeds | Answered | S5 (Pranzini), S6, S7, S10 | |
| 5 | Writings and works | Answered, thin | S10, S11, S12, S15 | Term "Manuscript A/B/C" is never explained (F21). |
| 6 | Influence on the Church | Weak | S15, S16, S17 | Patronages and soldiers appear. The influence on later readers rests on one real case (Grant). S17 is short. |
| 7 | Connection with the reader | Answered | S3, S4, S8, S9, S11, S13 | |
| 8 | Inspiration through action | Answered | S9, S13, S14 | The Marthe scene needs more room. |
| 9 | What set her apart | Weak | S3, S5, S6, S11 | The "little way" is the answer, but the text never explains it (F21). |

## 6. New-to-English list

These facts are in the biography. The stage 1 English baseline (plan section 5) does not have them. There are far more than ten. The right column says whether an old English book (Laveille 1928, Taylor, De Teil, Dolan) also has the fact. A "yes" there means the fact is new against the baseline, not against all English books.

| # | Fact | Section | Cards | In an old English book? |
|---|---|---|---|---|
| 1 | Zélie's "coffin letter" about the aunt's vow | S2 | F-LF-042 | No. Laveille omits it. |
| 2 | Zélie's dawn walk to Semallé | S2 | F-LF-043 | Yes, Laveille p. 48. |
| 3 | Louis turned away at the St Bernard hospice for lack of Latin | S2 | E-P1-011 | Yes, Laveille. |
| 4 | Marie, ten, saw the baby starve at the wet nurse | S2 | F-EW-039 | No. |
| 5 | Zélie's letter on the "dreadful furies" and the cords at night | S3 | F-LF-063, F-OW-004, F-OW-005 | No. Pauline's edition cut it. |
| 6 | Marie chose not to draw the four-year-old out | S3 | F-EW-132 | No. |
| 7 | Thérèse chose Pauline "so Pauline would not be left out" | S3 | F-EW-134 | No (the book gives no motive). |
| 8 | Louis's real words on Christmas night 1886 | S5 | F-OW-059 | No. The book softens them. |
| 9 | Pranzini: the chaplain's correction (arms tied) | S5 | F-EW-415, F-EW-416 | No. |
| 10 | The same-evening letter of 20 Nov 1887 next to the memoir | S6 | F-OW-362 | No. |
| 11 | Pauline admits she also asked for the delay after the bishop said yes | S6, S7 | F-EW-617 | No. |
| 12 | Gonzague: "not a word to say to her" and "much prouder than you think" | S7 | F-EW-633, F-EW-471 | No. |
| 13 | The order to report every stomach ache | S7 | F-EW-610, F-EW-511 | No. |
| 14 | Louis's flight to Le Havre, June 1888 | S7, S8 | F-LF-197 | No. Laveille omits it. |
| 15 | Louis's committal: revolver, "le saint Patriarche", the signing of 8 June 1889 | S8 | F-LF-198, F-LF-199 | No. Laveille says only "a Home". |
| 16 | Straitjackets at recreation (Pauline, 1915) | S8 | F-EW-649 | No. |
| 17 | The 1911 edition dropped "humiliating", and cut Louis's title from the invitation | S8 | F-OW-087, F-OW-104 | No. |
| 18 | Gonzague bans a second talk with Père Alexis | S9 | F-EW-741, F-EW-742 | No. |
| 19 | Pauline and Céline on the Act: "without enthusiasm", a hurried yes | S10 | F-EW-1057, F-EW-1064 | No. |
| 20 | Pauline left Ms A unopened for two months | S10 | F-EW-1176, F-EW-1180 | Partly. |
| 21 | Thérèse's play of June 1896 praises "Diana Vaughan" | S11 | F-OW-572 | No. |
| 22 | The photograph shown at Taxil's press conference | S12 | F-OW-578, F-LF-226 | No. The Carmel's editors are the only source. |
| 23 | The line "If there is a Heaven, it is for me" was cut from the 1911 edition and later scratched out | S12 | F-OW-470 | No. |
| 24 | TSA's black-door dream and her blunt words | S12 | F-OW-220, F-EW-1131 | No. |
| 25 | A month with no doctor, and the morphine syrup | S13 | F-EW-1523, F-EW-1599 | No. |
| 26 | The meat-juice scene and "what joy" | S13 | F-EW-1227, F-EW-1438 | Partly. Laveille has a version. |
| 27 | "I don't know the trade!" and the milk cup | S13 | F-EW-1457, F-EW-2622 | Partly. |
| 28 | The candle held to her eyes | S14 | F-EW-1666, F-EW-1655 | No. |
| 29 | Aimée alone did not hear the bell | S14 | F-EW-1704 | No. |
| 30 | The patched sandals thrown on the fire ("filth") | S15 | F-EW-1709 | No. |
| 31 | Pauline's sworn "changes of little importance", and the court's order | S15 | F-EW-1897, F-EW-1754 | Partly. |
| 32 | Bishop Hugonin: "beware of the imagination of women" | S15 | E-P7-001 | No. |
| 33 | Sr Thérèse de Jésus's letter of 1907 | S16 | F-EW-1833, F-EW-1835 | No. |
| 34 | Marie's letter of 13 March 1915; Céline: "rather not beatified" | S16 | F-EW-1976, F-EW-1982 | No. |
| 35 | Twenty-six soldiers' petitions | S16 | F-OM-037 | No. |
| 36 | The cemetery keeper of 1909 | S16 | F-EW-1853 | No. |
| 37 | Léonie hears the radio homily forget her | S17 | F-EW-2001 | No. |
| 38 | Paul VI baptised on the day she died | S17 | F-OM-093 | No. The source is Francis, 2023. |

## 7. Next step

The writer fixes M1 to M28 and then the should-fix items. Then this check runs again (round 2). After round 2, report anything still open to the user.
