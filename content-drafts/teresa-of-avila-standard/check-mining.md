# Fact check (mining additions): Saint Teresa of Ávila, miracles.html

Date: 2026-10-06. Checker: not the writer, not the copy editor (the copy edit came first, so these are the last changes).
Scope: new accounts m69–m128, the 27 merged accounts (m11, m17, m19, m22, m25, m32, m34, m38, m39, m43–m50, m53, m55, m56, m59, m60, m61, m64, m66, m67, m68), the intro, the closing note, and the copy editor's list in `copy-edit-mining.md`.
Backup: `miracles.html.before-check-mining`. Check script (`--kind miracles`): no MUST FIX and no CHECK lines after the edits.

## How it was checked

Every new and changed account was read against the raw OCR of the Procesos (BMC 18, 19, 20), the Rótulo (arts. 40, 41, 46, 73, 82, 83, 85, 86, 88–93, 97–114), and Ribera, in `sources/`. Quotations were compared with the Spanish. Person, place, date, event, who swore, and the "Source:" page were checked for each account.

Source note. `fetch_text.py --save` kept only about half of vol. 1 and vol. 3 (its cleaning step dropped whole pages, so Quiteria Dávila's deposition and Vallejo's deposition looked missing). The files in `sources/` are therefore the full raw text from archive.org (`procesos1.txt`, `procesos2.txt`, `procesos3.txt`, `ribera.txt`). The script should be fixed or not trusted for big scans.
Page numbers. The OCR page headers are sometimes misread (for example "21" for 24, "210" for 240). Pages were set by the header sequence and by the content. A few other citations may still be one page off; no citation was changed unless it was clearly wrong.

## Errors of fact fixed

Wrong person, role, or number:
- **Intro.** "the sworn testimony of people who knew her": many witnesses did not know her (for example Margarita Lasso, Antonio Tamayo). Now says many knew her and others tell what they saw or heard after her death. "the hearings at Salamanca" now names Salamanca, Alba, Ávila, Madrid, and other cities (the 1609–10 hearings were held in all of them). The count (18 articles, 4 + 14) is right: art. 97 (m25), 98 (m40), 100 (m39), 101 (m26) are told under "After"; arts. 99, 102–114 under "Put forward". m124–m128 come from Ávila witnesses, not from articles, and the section intro already says so.
- **m66.** The Count (not his confessor) gave the large alms and made the Friday promise (Anne of Jesus, p. 483). The relic Doña Margarita threw into the sea was a relic of Saint Teresa that she carried (Beatriz de Jesús, p. 179).
- **m61.** Juan Carrillo was secretary of Bishop Álvaro de Mendoza (his own words); the editor calls him treasurer of the Cardinal-Archduke, not of the cathedral. "Treasurer of the cathedral" removed.
- **m113 and m19 (Godoy).** Godoy had been the bishop's judge (provisor) of Salamanca, but when he met Father Baeza he was "no longer judge or provisor" and lived at Alba for two and a half years, confessing many of the nuns (p. 457). m113 said "the judge at Alba"; m19 said "confessor of the lay sisters". Both fixed. He confessed the unnamed lay sister all that time.
- **m125.** Five witnesses (Inés de Jesús, Ana de los Ángeles, Vaquero, Amador, Mena), not four. Inés was not prioress in 1609; she asked the prioress for leave. Mena is a priest, chaplain and confessor of the nuns. Pages for Inés were pp. 549–550, not 550–552; Ana de los Ángeles is pp. 570–571.
- **m124.** A small blow made Ana very ill; a harder blow made her bark. Inés (not Ana) said Ana's health was better than in all her 22 years. Inés's pages are 547–548.
- **m128.** Inés's page is 550, not 552.
- **m103.** Saint Teresa had accepted her as a nun; she gave her word to Father Baltasar Álvarez (not "promised Saint Teresa and Álvarez").
- **m102.** Gil González de Villalba is a councillor (regidor) of Ávila. Don Rodrigo is the knight.
- **m108.** Magdalena de Toledo was the abbess only when the witnesses testified in 1592, so "noblewoman" is removed from the heading and text. The cross is the one in which Saint Teresa (not Magdalena) often saw Our Lord.
- **m109.** "his only son" removed: Vallejo's deposition says "a son named Alonso".
- **m110.** Antonio de Ledesma brought the sheet in the morning (the same day as the request), not "the next morning"; Vallejo (not Ledesma) wrapped the boy. María González is the wife of a secretary of the Duke's council.
- **m92.** Saint Dominic did penance there "in his life", not "as a young man".
- **m88.** Isabel de Santo Domingo's account is on p. 95. Orozco Covarrubias is the archdeacon of Cuéllar (cathedral of Segovia).
- **m89.** María de la Asunción's account is on pp. 524–525, not 526–527. The churchman who gave no answer is "a rich churchman", not "a rich priest". "Sixty" are measures of wheat, not people.
- **m67.** Tablares's account is on pp. 240–241, not 242–243. He is the archdeacon who judged the first inquiry at Ávila.
- **m64.** Ana de la Madre de Dios, pp. 549–550.
- **m72.** The nuns said Quiteria told it "many times", not "for years". Only two of the four (Coronel, Antonia de Guzmán) give "Go on, daughter, give thanks to God and ask no more"; Mencía Roberto and María del Castillo give "ask the Lord". Quiteria's own p. 237 deposition was read in the raw text and agrees.
- **m73.** Checked against Quiteria (p. 237), Anne of Jesus (pp. 480–481), and Tablares (p. 238): no change.
- **m117, m106, m49, m50.** Glosses added (see below). In m50, "almost a year", the pain, and the morning belong to Ana de la Encarnación (p. 24), not to Juana de Jesús (p. 62, who says "a long time").
- **m75.** "graceful scorn" is "gracioso desdén" (playful scorn); now "in a playful, scornful way".
- **m70.** The Spanish idiom "that day they were born" is now glossed as people say who escaped death.

Added or changed fact, or a detail the source does not give:
- **m22.** Gracián stepped aside to read the letters, then tried to hide what he had learned (Isabel de Santo Domingo), not "turned away to hide the news".
- **m32.** Saint Teresa asked Báñez to arrange the cure in secret so nothing would be known of her. Báñez told it to comfort the two countesses (the child's mother and grandmother), so it became known. Spelling "Arteaga" is the spelling of Anne of Jesus's own words (Ana de la Encarnación writes "Artiaga").
- **m39.** Jerónima had been told (not "the nuns told her") that the belt sweated blood.
- **m48.** The earth came from Saint Teresa's body, not "feet" (no source says feet).
- **m55.** The doctors said she needed the air of her native place, not "another climate".
- **m56.** "struck" now says the plague had struck her.
- **m11.** Saint Teresa let Guiomar's words stand, which she did not usually do (art. 85).
- **m17.** The 1592 deposition does not say whose fingers touched the eyes; the articles say Saint Teresa's hands touched head and eyes. Both stated.
- **m74.** The Segovia nuns said she lay as if dead and did not answer them; Saint Teresa laughed and said they invented strange things.
- **m78.** The tempted friar hid it from his master of novices. The quotation now matches the Spanish: "Is this not your temptation and your affliction?"
- **m79.** Ana wrote a letter in imitation of the two lines (not "copied them"). Catalina de la Concepción tells it a little differently: Saint Teresa gave Ana a letter in her own hand.
- **m80.** Ana went with Christ to the cell.
- **m81.** "twice saw her face in a special light" overstated what Ana said; "inflamed" now "aglow".
- **m84.** Inés de Quesada said neither Saint Teresa nor anyone else warned or urged the novice; Saint Teresa gave only her blessing.
- **m93.** In the articles the Lord said the house would give Him great service; in Elvira's reading Catalina de Cardona said it. Both are now told with their tellers. The place is Our Lady of Socorro at La Roda. "Treasures" kept as in the source.
- **m95.** The messenger brought letters from the bishop and "the nuns" (not "the nuns at Valladolid").
- **m96.** "to keep it" now says "to keep their way of life".
- **m99.** The source speaks of "these duchesses" in the plural; kept as plural.
- **m105.** The candle let him see the figure.
- **m106.** "walked well" is "was up and well" (the injury was the hand and arm).
- **m114.** The order now follows the source. Isabel de San Jerónimo (not both Isabels) says the cure was complete after Saint Teresa's death.
- **m76.** Heading changed to avoid the hard word; the cautery and erysipelas are explained.

## Hard words (standard meanings only)

erysipelas (m76), cautery (m76, then m50 says "hot iron"), fistulous (m106), quartan fever (m117), double tertian (m49), fanega (m89), donados (m98), water of Saint Albert (m106), the Calenda (m48), hermitage (m124).

## Checked and left unchanged

m25, m34, m38, m43, m44, m45, m46, m47, m53, m59, m60, m68, m77, m82, m83, m85, m86, m87, m90, m91, m94, m97, m98, m100, m101, m104, m107, m111, m112, m115, m116, m118, m119, m120, m121, m122, m123, m126, m127: every person, place, date, event, and page agreed with the source. m120: "a great fire came out through the palm of the hand" is the Spanish, "as if flames were dammed up in the arm"; kept.

## Verdict

Ready for upload. No error of fact remains that I could find in the new and merged accounts. The one limit: the OCR page headers are noisy, so a page number may be one off in a few "Source:" lines.
