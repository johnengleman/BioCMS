# Check of the reverence pass (2026-10-05): biography.html, miracles.html, teachings.html

Backups: `*.before-check-rev`. Sources read as raw text this session: Michael's Life (Sanidopoulos page, all sections), the Praxis de stratelatis (Sanidopoulos, Jones), Nicephorus (St. Nicholas Center page), the Greek account (Fordham), the St. Nicholas Center slap page, OCA life for 6 December.

Note: the reverence writer was resumed during this check and edited all three files (18 "real actor" rewrites, table in `reverence-notes.md`). I re-read all three files from disk at the end. My fixes are all present, and none of those 18 rewrites broke a fact. I checked each of them.

## 1. Restored prayers, thanks, and acts of God, checked against the raw source

Confirmed with no change: the young man's prayer and God as his father (Michael 9); the father's tears and thanks, his belief the gold came from God, his prayer "show me your angel among men", and "The Lord has saved us through you" (13, 15, 17); "God sent him" and the bishops' glory to God (23); the power of God driving out the demons (29); grace to help the far-away (32, 33); the sailors, "by God's order", "with God's help", "quick to hear" (34); the thank-offerings (35); the famine praise of God (38, 39); the death, the angels, "ceaselessly interceding", "to the glory of Christ" (41); the demon flask thanks (48); the Praxis prayers with tears, the intercession plea, the alms with tears and the Trinity doxology (Praxis); the "righteous are bold as a lion" line, the blessing at the meal (Praxis); Nicephorus: clang, praise of God, "God's paradise", singing praises, tears of unworthiness, "God himself taught them through the elements", Mass and quiet winds, "deep devotion", "by the wish of the Omnipotent Lord", the bird and "Almighty God"; the Greek account: sacred oil, glowing relics, Matthew kissing them, "will of God and of the saint acquiesced", "conversion and salvation of soul"; the slap page: chains, Jesus and Mary in the night, "Because of my love for you".

Fixes:
- biography, "God heard them" (after the officers' prayer) and "and God hears them" (para 3): no source says it. Now: "he comes to their rescue", and "Michael says God had given Saint Nicholas the grace to help people far away who called on him in faith, and he counts these three officers among them" (Michael 32-33).
- biography, "He begged God to take his life and all he owned": Michael 9 has Nicholas surrender his own life and goods. Now "to let him give up his life and all he owned". "to store it up in heaven" is now "storing it up in heaven".
- biography, "He prayed with them and blessed them": Praxis gives "asked him to pray for them, and received his benediction". Now "He prayed for them and blessed them".
- biography, "the demons ... idols and all" at the temple of Artemis: Michael 29 does not say idols for that temple. "idols and all" cut.
- biography and miracles, "a fair wind filled the sails": Nicephorus has "quieted winds and becalmed seaswell ... swollen sails". Both now read "the winds fell and the sea grew calm", with the ships under full sails.
- Christ "gives him back the Gospel book" / "bishop's stole" (biography, miracles): the Center says Jesus gave the Book of the Gospels and Mary gave an omophorion "so Nicholas would again be dressed as a bishop". Now "gives him the Book of the Gospels ... a bishop's vestment, so that he is dressed as a bishop again" in both.
- teachings, "Michael says he was right, because it was God's gift": Michael 13 and 16 only say the father believed it came from God and shared in "the gifts of God through his servant Nicholas". Now "Michael says the gifts were God's, given through his servant Nicholas."
- teachings opening, "It calls him the Wonderworker": the troparion does not say that word (the OCA life does). Now "The Orthodox Church calls Saint Nicholas of Myra the Wonderworker."
- miracles, "Michael says that Saint Nicholas reposed in the Lord": Michael's words are "left his mortal life and went to his eternal rest". Now "Saint Nicholas reposed in the Lord. Michael says he went to his eternal rest ...".

Left as the pass wrote them: "forty-seven people whom God healed" (Nicephorus has "restored to health", the pass's rule 1 for God's work); "God and his saint were willing to let him go" (Greek account, "the will of God and of the saint acquiesced"); "stood in paradise" (Nicephorus: "everyone thought himself to be standing in God's paradise").

## 2. No accidental change of fact

Compared each file with its `.before-reverence` copy. No date, number, name, place, or quotation changed except as listed. The Nepotianus-and-Ablabius sentence moved from the miracle list to the closing note (Cioffari). Quotation marks and block quotes are untouched.

## 3. Nicaea prison scene (biography)

Now opens "The most famous story of the council came last, and later tradition tells it. The St. Nicholas Center tells it as a story more than five hundred years old." The Center is the one named teller (the page: "This legend is over 500 years old"). The scene follows in a trusting tone. The scholar's note stays in "A Note on the Sources". Miracles page: "The St. Nicholas Center tells the later tradition that ..." replaces "Popular retellings add".

## 4. Real actor as subject (fixed in my pass, plus a check of the reverence writer's 18)

- "A sermon ... lets the three officers tell" became "In a sermon handed down under the name of Saint Proclus, the three officers tell the emperor"; "The same sermon ... gives his words" became "In the same sermon, Saint Nicholas speaks to the prefect"; "The sermon tells ... it tells it differently" and "The sermon shows a yearly feast" now have the preacher as actor; "the old account quotes a proverb" now "The writer of the old account adds a line from Proverbs" (biography and miracles).
- "Their injustice and greed called down God's correction" now has God correcting them (biography, teachings).
- "kingdom of Naples and the city of Moscow took him", "Greece, Russia ..." now name the people; teachings: "The preacher of the sermon ... calls him".

## 5. Tone, titles, doubts

Tone meets reverence-pass.md. No "reportedly", "allegedly", "is said to", or status labels remain. "(credited)" in the Source link texts of miracles.html now reads "Encomium on Saint Nicholas, under the name of Saint Proclus" and "Encomium, under the name of Saint Andrew of Crete" (three links). Title rule holds in the lines I added. Doubts sit only in the three closing notes.

## Check script

- biography.html (`--summary summary.txt`): no MUST FIX. CHECK: one 9-word h2 (unchanged).
- miracles.html (`--kind miracles`): no MUST FIX. CHECK: reading grade 7.2.
- teachings.html (`--kind teachings`): no MUST FIX. CHECK: grade 7.8 and one 9-word h2 (as before).

## Open points for the owner

1. entry.json was not touched. It still carries older text of these three files, so it needs a sync.

## Verdict

Ready, after the entry.json sync.
