# Check: Nicholas of Myra (tier B)

Checked on 2026-10-01 against raw source text: Praxis de stratelatis (Jones), Michael's Life (Pearse PDF and Sanidopoulos page), Nicephorus, Greek Anonymous, Golden Legend, Proclus, Andrew of Crete, Metaphrastes, Catholic Encyclopedia, Butler (local vol12.txt), Cioffari, Pearse summary, Sanidopoulos pages, Wikipedia (tertiary, for flags only). Originals kept as `biography.html.before-check`, `entry.json.before-check`, `summary.txt.before-check`.

## Writer's tasks

1. **Michael quotations: rights are clear, so both are kept.** Both quotes come from sections 23 and 34. Those sections are in Bryson Sewell's translation (sections 12-52). Roger Pearse commissioned it and "released [it] into the public domain" (front matter of the PDF; his post of 9 March 2015). Only sections 1-11 (Quinn) are CC BY-NC-ND, and no quotation is taken from them. Wording was matched exactly to Pearse's PDF.
   - Fixed the attribution: the translators are Quinn (1-11) and Sewell (12-52), not "the Roger Pearse team". Changed in the Sources list (biography), `quotes[].source` (217 characters each, under 255), `quote_cards` attributions, `quotes_note`, `quote_cards_note`, `sources` S2, `gaps`, and `field_review`. Removed "rights to confirm".
   - Praxis is still told only in paraphrase (Jones 1978 is copyrighted). No quotation marks are used for it.
2. **Inference items.**
   - "Governor named Eudoxius and Simonides": the raw text states it (Eustathius says "the heads of state, Eudoxius and Simonides"). Kept, now told as the governor's own plea, and the entry's gap note is corrected.
   - "Came on behalf of the three men": not in the text. Replaced with what the text says (Nicholas orders the emperor to free the three men). Also fixed in teachings.
   - Bribe amounts: the text has two bribes. More than 200 pounds of silver goes to the governor Eustathius (Myra half). 1,700 pounds of gold is promised by the master of the forces to the prefect Ablabius (Constantinople half). The old text joined them as one bribe "at Byrra". Fixed in the biography (Byrra and emperor chapters), `share_kit` did_you_know, miracles m01 and m02, and "How This Life Was Researched". "Popular retellings" softened to "many popular retellings".
3. **Limits:** quote sources are 255 characters or fewer; related arrays are 50 or fewer (miracles 1, teachings 1, quotes 2).

## High-risk items

- **Roman Martyrology (biography, Emperor's Dream chapter; m01, m02).** The Martyrology text quoted in Jones's note 1 is about the appearance to Constantine, not the rescue at Byrra. The biography said Byrra, and m01 said "the one story named". Fixed both. The text now says the "older" Martyrology, since the quoted text is the pre-reform one.
- **Nicaea (biography, Council chapter).** The text said both "the first writer known to put Nicholas at Nicaea is Nicetas" and "Theodore (c.515) is the earliest source". Fixed to "the first of his biographers" (Nicetas, before 890). Theodore keeps "about 515" (Cioffari; Wikipedia 510-515; Pearse's summary says about 500, noted). Cioffari says Eustratios quoted the Life "in 583", not "after 583". Fixed. "May well have sat" was one-sided, so it became an open question. The list counts (about 200 and 300) come only from Wikipedia citing Adam English, so they are now "by one modern count" with a source note. The Anrich and Cioffari dispute is stated fairly.
- **Slap of Arius.** Kept as late legend. Cioffari calls it a popular development; the 14th-century date rests on one tertiary summary (the St Nicholas Center says "over 500 years old"). Wording is now attributed. "Stole" was changed to omophorion (Cioffari's word).
- **Praxis date.** "Late fourth to late sixth century" was unsupported. Anrich says 460-580; Cioffari says between Nicholas's death and the mid-5th century. Fixed in the biography, the Note on the Sources and m01. "A writer was quoting it after 583" became "a priest of Constantinople quoting a fragment of the story in the late sixth century" (Pearse's summary and Cioffari: Eustratios gives a fragment, a "hint"). "Oldest story" became "oldest known story" (the source says "earliest known account"; "may be the earliest incident").
- **Proclus.** "Perhaps preached around 440" was unsupported. Anrich says it is a late text not by Proclus; Cioffari says possibly authentic or 447-550. Now "attributed to Proclus ... scholars doubt that he wrote it".
- **Michael's date.** Anrich says 814-843; Cioffari says about 700. The dispute is now in the Note on the Sources; entry.json S2 date updated.
- **Pilgrimage storm and Sion.** Correctly assigned to Nicholas of Sion (Vita Compilata secs 11-22, 29, 45-51 are from the Sion Life). No change. Michael's sailors story is told as Michael's; Cioffari's Sion remark stays in the Note. Andrew of Crete's sermon is now "attributed" (Anrich questions authorship; the page notes Sion material).
- **Death year.** The Note now credits each source: Butler 342 (from the translation history), Golden Legend 343, CE and Sanidopoulos 345 or 352. Body text says "year not known". `death_year` stays null.
- **Bari cures.** Raw text: Greek Anonymous says 47 "that night and the following morning"; Nicephorus says 47 "that night and on Monday". Butler says 30 on the first day. "That first night" changed to "first night and the day that followed". m11 title changed. The young man possessed for five years was healed on the Thursday, not among the 47. Fixed in the biography and m12.
- **Persians or Turks.** Persians in the Greek Anonymous (the people of Myra fled 12 stadia), Turks in Nicephorus and the Golden Legend. Now in the Note. Also fixed: the body text said "most of the monks had withdrawn". The sources say the people of Myra fled; four keepers remained.
- **1087 narrative order and details (Bari chapters).** Both accounts put the vial BEFORE Matthew's sword and the monk's vision. The text had it after. Reordered. Added the scouting detail in Nicephorus about the keepers showing only the altar first. Fragrance reached the ships "nearly three miles", not "three miles". Perdikca: the ships were driven back by a north wind and tides; at Perdikca the sea was calm but the men had no strength. The text had "stuck in a calm". The Gospel oath came before the five confessed. The archbishop Ursus was away at Canosa and the abbot Elias held the relics first. The old text had a quarrel "at once", and Elias "for a time" afterward. Fighting killed men (Greek Anonymous says 3, Nicephorus says 2, so the text says "men died"). St Eustratius's church was torn down "some days later" (Nicephorus). Nicephorus's date: "within a week" (Jones), not "that same year". Lupus is named only in the Greek account; the Note says so.
- **1036 and 1100.** 1036 (Saracens forbade veneration) is one source (Sanidopoulos). The Venetian 1100 voyage rests on one later chronicle (Wikipedia, plus a note to the Greek Anonymous account). Now stated as single-source in the text and the Note.
- **Feast dates and cult claims (last chapter).**
  - "Both Churches keep 9 May" was not supported for the Catholic side; Sanidopoulos pages cover only the Orthodox. Fixed to "East and West keep 6 December; the Orthodox keep 9 May".
  - Nikodemos's service: written to be chanted on 10 May (S18); Greek lands keep 9, 10 or 20 May. Confirmed. S18 says "1081" for the translation; 1087 is correct in every other source. This is not used.
  - 29 July Russian feast of the Nativity, revived 2004 under Alexis II: confirmed (S17). "Calls him Nikolai the Wonderworker" dropped (unsourced).
  - Repin, "St Nicholas saving three innocents", 1888: confirmed (Fribourg caption; the Sanidopoulos page shows the painting).
  - "Each year on 9 May the clergy draw the manna": not in any source read (Sanidopoulos says only that the manna continues; Wikipedia says 6 December). Removed from the biography, relic_description and m13. The manna is now "one modern Orthodox account says".
  - The Orthodox ranking "above almost every saint except..." was stronger than the source (Sanidopoulos, a modern compilation: "after the Mother of God and St John the Baptist, the most venerated saint"). Now "Orthodox writers rank him...". The same softening is in summary.txt and entry.json.

## Other fixes

- **Invented or overstated drama and details:**
  - The father in the dowry story: Michael says the man was a once-well-off neighbor. The text said only "a man in his city". Fixed.
  - Election: Michael has a voice from God, not a dream, and calls Nicholas "child". "Young man" and "dream" removed. "Whole night in prayer" softened.
  - Sailors: Michael says they, who had not seen him before, recognized him "without any intermediary". The text had "at first did not know". Fixed.
  - Grain: it was a general shortage in Lycia; the captains objected that the grain was state property; Nicholas promised to answer to the treasury. The text now says this. "Fed Myra" became "fed the people who received it".
  - The baby's fast: Michael says he took milk once on those days (not "refused"). Fixed.
  - Temple: Michael says it surpassed every other building (not only temples) in height and ornament.
  - Governor "repented": the raw text has him fall to his knees and the officers plead for him. Fixed. "Pardoned once the charges were cleared" matches.
  - Cioffari's "hot temper true to everything else remembered" was an overstatement. It now says forceful dealing is in keeping with his character.
  - Praxis opening scene: Nicholas first goes to Andriake to quiet a riot. The old text said officers "were in Myra".
  - "In the morning" Constantine questioned the officers: the text says only that he woke.
  - Sion item: Metaphrastes "singing thanksgivings" changed to "giving thanks".
  - "Seven centuries" of pilgrims changed to "centuries".
  - Theodore of Kiev: his narrative was not read; now "Russian tradition names".
- **Dowry versions (biography Note, did_you_know, m03).** Cioffari: in the oldest, there are two girls and "the boy Nicholas" takes money from living parents. The text said "two daughters and a son", which reads as a different son. Fixed.
- **Grain story date.** "Probably told by the sixth century" is now "Cioffari notes (citing Jones)".
- **Butler's "about 430" for Justinian's church** is stated in the Note as impossible (Justinian reigned 527-565).
- **entry.json other:** relic_description (manna, 1100) softened; gaps and field_review updated; `relic_location` Italian name confirmed; the length gap now says about 5,000 words.

## Mechanics

- Lint: no MUST FIX. Two CHECK lines remain (the opening "He ... He ... He" list is intentional; one 37-word sentence in the Note on the Sources). 5,017 words, average sentence 17.6.
- `validate.cjs` (via a request built from entry.json): OK. `test.cjs`: 8 of 8 pass.
- Share moments: all three still appear word for word in the biography and their section ids exist.

## Notes for the caller

- `/private/tmp/.../scratchpad/build-nicholas.cjs` rebuilds the miracles and quotes text from the old wording. Do not rerun it, or it will undo these fixes.
- The checker's fresh fetches overwrote same-named scratch text files in the shared scratchpad (michael.txt, praxis.txt, s5.txt, s7.txt, s8.txt, s9.txt, s10.txt, and similar). They hold the same pages, re-fetched.

Ready.
