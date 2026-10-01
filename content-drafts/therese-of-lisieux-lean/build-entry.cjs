const fs=require('fs');
const R=f=>fs.readFileSync(f,'utf8');
const C='https://archives.carmeldelisieux.fr/';
const MA=C+'archive/manuscrit-a/',MB=C+'archive/manuscrit-b/',MC=C+'archive/manuscrit-c/',CJ=C+'archive/cj-juillet-1897/';
const eng='';
const q=(text,topics,source)=>({text,topics,source});
const quotes=[
q('My vocation, I’ve found it at last: my vocation is love!',['love','devotion'],'Thérèse, Manuscript B, 3v, 8 Sep 1896.'+eng+' '+MB),
q('I choose everything!',['courage','devotion'],'Thérèse, Manuscript A, 10r–10v (age about three, taking Léonie’s basket of doll clothes).'+eng+' '+MA),
q('I feel I am going to enter into rest… But above all I feel that my mission is going to begin, my mission of making the good God loved as I love Him, of giving my little way to souls.',['love','charity'],'Thérèse, 17 Jul 1897, Yellow Notebook (CJ 17.7) (Mère Agnès).'+eng+' '+CJ),
q('Oh! I love Him!… My God… I love You!',['love','devotion'],'Thérèse’s last words, 30 Sep 1897, Yellow Notebook (CJ 30.9) (Mère Agnès).'+eng+' '+CJ),
q('I’m made so that fear makes me back away; with love I don’t just go forward, I fly.',['love','courage'],'Thérèse, Manuscript A, 80v.'+eng+' '+MA),
q('We live in an age of inventions… the lift that must raise me to Heaven is your arms, O Jesus!',['humility','faith'],'Thérèse, Manuscript C, 2v–3r, June 1897.'+eng+' '+MC),
q('Yes, I want to spend my Heaven doing good on earth. It is not impossible, since even in the very bosom of the beatific vision the Angels watch over us.',['love','saints'],'Thérèse, 17 Jul 1897, Yellow Notebook (CJ 17.7) (Mère Agnès).'+eng+' '+CJ),
q('Oh no, you’ll see, it’ll be like a shower of roses.',['hope','saints'],'Thérèse to Sister Marie of the Sacred Heart, 9 Jun 1897, Yellow Notebook (CJ 9.6.3) (Mère Agnès).'+eng+' '+C),
q('I left without drum or trumpet.',['humility'],'Thérèse, Manuscript C, 15r (leaving a quarrel over the keys).'+eng+' '+MC),
q('I’m coughing! I’m coughing! It’s like a railway engine pulling into the station.',['joy','suffering'],'Thérèse, 7 May 1897, Yellow Notebook (CJ 7.5.3) (Mère Agnès).'+eng+' '+C),
q('What do I care about taking snail syrup, as long as I don’t see the horns!',['joy','patience'],'Thérèse, 6 Jun 1897, Yellow Notebook (CJ 6.6.6) (Mère Agnès).'+eng+' '+C),
q('That’s the kind of hole I’m in, body and soul. Ah yes, what darkness! But I’m at peace there.',['faith','peace','suffering'],'Thérèse, 28 Aug 1897, Yellow Notebook (CJ 28.8.3) (Mère Agnès).'+eng+' '+C),
q('You dream of light… Go on, go on, rejoice in death, which will give you not what you hope for but a night deeper still, the night of nothingness.',['faith','suffering'],'Thérèse, Manuscript C, 6v (the voice of the darkness in her trial of faith).'+eng+' '+MC),
q('It’s no longer a veil for me; it’s a wall that reaches to the heavens and hides the starry sky.',['faith','suffering'],'Thérèse, Manuscript C, 7v.'+eng+' '+MC),
q('It’s very easy to write fine things about suffering, but writing is nothing, nothing! You have to be in it to know!',['suffering','truth'],'Thérèse, 25 Sep 1897, Yellow Notebook (CJ 25.9.2) (Mère Agnès).'+eng+' '+C),
q('Don’t think I’m swimming in consolations; oh no! My consolation is to have none on earth.',['suffering','faith'],'Thérèse, Manuscript B, 1r, Sep 1896.'+eng+' '+MB),
q('This little glass is the image of my life… my life was not bitter, because I knew how to make my joy and my sweetness from all bitterness.',['joy','suffering'],'Thérèse, 30 Jul 1897, Yellow Notebook (CJ 30.7.9) (Mère Agnès).'+eng+' '+C),
q('I will be a little thief; I will take whatever pleases me…',['hope','joy'],'Thérèse, 31 Jul 1897, Yellow Notebook (CJ 31.7.5) (Mère Agnès).'+eng+' '+C),
q('I love only simplicity; I loathe pretending.',['truth','humility'],'Thérèse, 7 Jul 1897, Yellow Notebook (CJ 7.7.4) (Mère Agnès).'+eng+' '+C),
q('Don’t think that when I’m in Heaven I’ll drop roast larks into your mouths.',['humility','joy'],'Thérèse, 13 Jul 1897, Yellow Notebook (CJ 13.7.16) (Mère Agnès).'+eng+' '+C),
q('They show her as out of reach; they should show her as someone you can imitate.',['mary'],'Thérèse on how preachers speak of the Virgin, 21 Aug 1897, Yellow Notebook (CJ 21.8.3) (Mère Agnès).'+eng+' '+C),
q('How can he say I’m patient? It’s a lie!',['humility','patience','truth'],'Thérèse, 20 Sep 1897, Yellow Notebook (CJ 20.9.1) (Mère Agnès), after the doctor praised her patience.'+eng+' '+C),
q('I am a little seed; no one yet knows what will come out of it.',['humility','hope'],'Thérèse, 19 Jul 1897, Yellow Notebook (CJ 19.7.1) (Mère Agnès).'+eng+' '+C),
q('What offends Jesus, what wounds his heart, is lack of trust!',['faith','mercy'],'Thérèse to Marie Guérin, letter LT 92, 30 May 1889.'+eng+' '+C+'correspondance/lt-92-a-marie-guerin-30-mai-1889/'),
q('It is confidence and nothing but confidence that must lead us to Love.',['faith','love'],'Thérèse to Sister Marie of the Sacred Heart, letter LT 197, 17 Sep 1896.'+eng+' '+C+'correspondance/lt-197-a-soeur-marie-du-sacre-coeur-17-septembre-1896/'),
q('I think about God, about life… about eternity; I just think!',['prayer'],'Thérèse, Manuscript A, 33v (to a teacher who asked what she did behind her bed curtain).'+eng+' '+MA),
q('I play at the bank of Love… I play for high stakes.',['love','devotion'],'Thérèse, as reported by Céline, Conseils et souvenirs, section III.'+eng+' '+C),
q('I say nothing to Him — I love Him!',['love','prayer'],'Thérèse on a sleepless night, as sworn by Céline, Apostolic Process, PA 8, [791], session 38.'+eng+' '+C+'naissance-dune-sainte/les-proces-la-sainte-de-therese/le-proces-apostolique/les-temoignages-du-proces-apostolique/'),
q('I have come to Carmel to save souls, and more especially to pray for priests.',['charity','prayer'],'Thérèse at her canonical examination before profession, in Laveille, St Thérèse of the Child Jesus (Benziger, 1928), p. 229 (English).'+' '+'https://archive.org/search?query=Laveille+Therese+Child+Jesus+1928'),
];
const bio=R('biography-v3.html'), summary=R('summary-v3.txt');
const miracles=R('miracles-v3.html'), teachings=R('teachings.html');
const saint={
 name:'St. Thérèse of Lisieux', slug:'therese-of-lisieux', summary, biography:bio,
 birth_year:1873, death_year:1897,
 birth_location:'Alençon, Normandy, France',
 death_location:'Carmel of Lisieux, Lisieux, Normandy, France',
 feast_day_catholic:'2000-10-01', feast_day_orthodox:null,
 categories:['Nuns','Holy_Women','Monastics','Miracle_Workers','Patron Saints'],
 venerated_in:['roman-catholic'],
 patron:'Missions (with Francis Xavier, named by Pius XI, 14 December 1927); France (with Joan of Arc, named by Pius XII, 3 May 1944)',
 relic_description:'<p>Thérèse was buried in the town cemetery of Lisieux on 4 October 1897. The coffin was opened on 6 September 1910, when only bones remained, and again on 10 August 1917. Her remains were carried to the Carmel of Lisieux on 26 March 1923 and rest in the Carmel chapel, in a reliquary and an effigy (gisant). Relics have also travelled to many countries since 1994. The Carmel and the shrine at Lisieux keep the principal remains, and distributed relics are smaller.</p>',
 relic_location:'Carmel of Lisieux, Lisieux, France',
};
const related={
 miracles:[{miracles,time_period:['modern_era']}],
 teachings:[{teachings,time_period:['modern_era']}],
 quotes,
 prayers:[],
 books:[],
 prayers_note:'None saved. The Act of Oblation to Merciful Love (Pri 6, 9 June 1895) is authentic and public domain, but its full text was not checked in this pass and the draft flow cannot write prayers yet.'
};
const share_kit={
 tagline:'The nun who did nothing worth speaking about, and the little way she left.',
 did_you_know:[
  {fact:'At about three she took a whole basket of doll clothes, saying, “I choose everything!”',card:'biography-v3, summary; MQ-001 (Ms A 10r–10v)'},
  {fact:'On her last evening the prioress sent the sisters away, then had the bell rung to call them back.',card:'biography-v3, “My God, I Love You”'},
  {fact:'In 1925 Taylor reports that applause broke out in St Peter’s after the canonization formula.',card:'check-v3 (confirmed); Taylor 1927, pp. 7–9'},
  {fact:'Her cousin Marie Guérin held a candle close to her eyes after her last gaze, and by Pauline’s account the lids did not move.',card:'biography-v3; miracles M-128'},
  {fact:'The book she wrote in cheap notebooks went out in place of the customary obituary letter.',card:'biography-v3, “A Book Instead of an Obituary”'}
 ],
 quote_cards:[
  {text:'I’m made so that fear makes me back away; with love I don’t just go forward, I fly.',attribution:'Thérèse of Lisieux, Manuscript A, 80v (our translation)'},
  {text:'My vocation, I’ve found it at last: my vocation is love!',attribution:'Thérèse of Lisieux, Manuscript B, 3v (our translation)'},
  {text:'I am a little seed; no one yet knows what will come out of it.',attribution:'Thérèse of Lisieux, 19 July 1897, Yellow Notebook, as recorded by Mère Agnès (our translation)'}
 ],
 share_moments:[
  {moment:'Christmas night 1886 and the shoes',section_id:'i-cried-for-having-cried'},
  {moment:'Kneeling before Pope Leo XIII',section_id:'a-fourteen-year-old-before-the-pope'},
  {moment:'The last evening, the bell, and the last words',section_id:'my-god-i-love-you'}
 ],
 for_someone_who:[
  'For anyone who cries too easily and is ashamed of it',
  'For anyone who cannot do great things and wonders if small ones count',
  'For anyone whose faith feels like fog'
 ],
 read_next:[
  {slug:'joan-of-arc',sentence:'Pius XII named Thérèse co-patron of France with Joan of Arc in 1944.',on_site:'unchecked'},
  {slug:'teresa-of-avila',sentence:'Thérèse took the Carmelite life from the order Teresa of Ávila reformed and named her a model.',on_site:'unchecked'},
  {slug:'francis-xavier',sentence:'Pius XI named Thérèse patron of the missions with Francis Xavier in 1927.',on_site:'unchecked'}
 ]
};
const images=[{
 role:'profile_image candidate',
 title:'Communion card, 1916: “Schwester Theresia vom Kinde Jesu” (print)',
 file_page:'https://commons.wikimedia.org/wiki/File:Kommunionbildchen_1916_Schwester_Theresia_vom_Kinde_Jesu.jpg',
 rights_page:'https://commons.wikimedia.org/wiki/File:Kommunionbildchen_1916_Schwester_Theresia_vom_Kinde_Jesu.jpg',
 creator:'Druck der Waisen-Lehrlinge Obergriningen (printer; no named artist)',
 date:'10 June 1916',
 license:'Public domain: published before 1 January 1931 (US) and, per the Commons page, anonymous work of a legal entity, 70 years elapsed (Germany, §134 UrhG)',
 attribution_needed:false,
 alt_text:'Printed communion holy card of 1916 showing Sister Thérèse of the Child Jesus',
 local_file:null, directus_file_id:null, downloaded:false,
 cautions:['The card may be based on a photograph of Thérèse. Her photographs are not free to use (Office Central de Lisieux), so check what the print copies and whether the crop looks too photographic before upload.','Its 834 × 1,300 px size is small for the 900 × 1,200 profile preset.','Rights read on the Commons file page on 2026-09-30; verify again before upload. Nothing was downloaded.'],
 fallback_candidates:['Ferdinand Roybet, painting of Thérèse (1917; Roybet died 1920) is listed on the Carmel iconography page but no free file page was found','Céline’s paintings (1911–1929) are held by the Archives of the Carmel of Lisieux; Céline died in 1959, so they are not cleared']
}];
const sources=[
 {title:'Miracles dossier (merged)',path:'content-drafts/therese-of-lisieux/02-dossier/miracles.md',use:'related.miracles (322 entries)'},
 {title:'Quotations dossier (top 40 and merged list)',path:'content-drafts/therese-of-lisieux/02-dossier/quotations.md',use:'related.quotes, related.teachings'},
 {title:'notes-church-miracles.md, notes-own-words.md, notes-witnesses.md, check-v3.md',path:'content-drafts/therese-of-lisieux-lean/',use:'saint fields'},
 {title:'Taylor, Sœur Thérèse of Lisieux (1924)',url:'https://archive.org/details/sceurthereseofli0000tnta',use:'miracles'},
 {title:'Taylor, Saint Thérèse of Lisieux (1927 text)',url:'https://archive.org/details/bwb_Y0-BYN-997',use:'miracles, canonization'},
 {title:'Laveille, St Thérèse of the Child Jesus (Benziger, 1928)',use:'miracles'},
 {title:'de Teil, Cause of Beatification (1913)',use:'miracles'},
 {title:'Acta Apostolicae Sedis 13, 15, 17, 20, 36',url:'https://www.vatican.va/archive/AAS/index_it.htm',use:'approved miracles, patronage'},
 {title:'Process depositions, Archives du Carmel de Lisieux',url:C+'naissance-dune-sainte/les-proces-la-sainte-de-therese/',use:'miracles, quotes'},
 {title:'Wikimedia Commons file page, 1916 communion card',url:images[0].file_page,use:'image rights'}
];
const gaps=[
 'Quote and teaching texts are our English translation of her French; the Yellow Notebook sayings of 1897 were written down by Mère Agnès (Pauline), and four versions of them exist.',
 'The miracles HTML is built from the dossier’s merged list. About 100 of more than 3,200 published accounts of the Pluie de roses are included; the Guise thesis and the Pluie de roses volumes were not read.',
 'Short Taylor entries (about 60) are summaries of a letter with little detail; the dossier holds no more.',
 'Several statuses and dates conflict between sources; each entry notes the conflict where the dossier recorded it.',
 'Source lines give scan page numbers for Taylor, Laveille and de Teil, and folio numbers for the depositions. Links for Laveille, de Teil, Dolan and the Foundation go to an archive.org search because no stable item ID was verified.',
 'Patron: only papal patronage (missions 1927, France 1944) is stored. Reference works also list florists, aviators, the sick and others; these were not sourced to a primary text. The Russian Catholic co-patronage is unchecked.',
 'The relic description cites the translation of 26 March 1923 from Laveille and the Carmel. The notes file gives 25 March; the 26th is used here. Relic counts and the Darien shrine were not verified.',
 'Beatification and canonization decree texts were read for the four approved cures; the full depositions of the five main witnesses were not read.',
 'Prayers: none saved. Pius XI’s 1925 patronage and the Doctor of the Church texts (1997) were not stored as teachings.',
 'Image: nothing downloaded or uploaded. See images for the candidate and cautions.',
 'Miracles HTML is about 175,000 characters, under the 200,000 limit for one field. It has 322 h3 headings; the page table of contents will be long.'
];
const fr=(s,r)=>[s,r];
const field_review={
 name:fr('supported','Standard name.'),slug:fr('supported','Given by the caller.'),
 summary:fr('supported','summary-v3.txt, checked.'),biography:fr('supported','biography-v3.html, checked (check-v3.md).'),
 birth_year:fr('supported','2 January 1873.'),death_year:fr('supported','30 September 1897.'),
 birth_location:fr('supported','Alençon.'),death_location:fr('supported','Carmel of Lisieux.'),
 feast_day_catholic:fr('supported','1 October since 1969 (3 October from 1927); stored as 2000-10-01 with 2000 as the storage-only anchor year.'),
 feast_day_orthodox:fr('not_applicable','No Orthodox feast found.'),
 categories:fr('supported','Nuns, Holy_Women, Monastics, Miracle_Workers, Patron Saints. Missionaries was left out: she never served as a missionary, and her patronage is covered by Patron Saints.'),
 venerated_in:fr('supported','roman-catholic only.'),
 patron:fr('supported','Papal acts: AAS 20 (1928), AAS 36 (1944).'),
 relic_description:fr('traditional','Provenance from Taylor, Laveille and the Carmel; scent reports are in the miracles list, not here.'),
 relic_location:fr('supported','Carmel chapel, Lisieux.'),
 profile_image:fr('blocked','Candidate found; not downloaded; rights to be rechecked.'),
 miracles:fr('supported','322 entries; labels as in the dossier.'),teachings:fr('supported','Own words; checked against the quotations dossier.'),
 quotes:fr('supported',quotes.length+' records; none from the re-check list.'),prayers:fr('unknown','Not saved.')
};
const entry={
 identity:{requested_name:'St. Thérèse of Lisieux',resolved_name:'Thérèse of Lisieux (Thérèse Martin; Sister Thérèse of the Child Jesus and the Holy Face)',aliases:['The Little Flower','Saint Thérèse of the Child Jesus','Thérèse Martin']},
 saint,related,share_kit,images,sources,gaps,field_review,
 save_result:{state:'prepared',item_id:null,version_id:null,cms_url:null}
};
fs.writeFileSync('entry-v3.json',JSON.stringify(entry,null,1));
console.log('quotes',quotes.length,'size',fs.statSync('entry-v3.json').size);
