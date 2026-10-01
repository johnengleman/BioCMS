// Builds entry.json for John Chrysostom from biography.html, summary.txt, and the sections below.
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const bio = fs.readFileSync(path.join(dir, 'biography.html'), 'utf8');
const summary = fs.readFileSync(path.join(dir, 'summary.txt'), 'utf8').trim();
const crypto = require('crypto');

const NA = 'https://www.newadvent.org/fathers/';
const PALL = 'https://tertullian.org/fathers/palladius_dialogus_02_text.htm';
const OCA = 'https://www.oca.org/saints/lives/2018/01/27/100327-translation-of-the-relics-of-saint-john-chrysostom-archbishop-of';

const miracles = `<p>This list gathers the wonders told about St. John Chrysostom, with their sources and their status. No miracle connected with John has been formally approved through a canonization process, as far as the sources show. He was honored as a saint long before such processes existed: within a generation of his death his name was restored to the lists read at the altar, and in 438 his body was brought back to Constantinople with great honor. The earliest accounts below come from his friend Palladius and the fifth-century historians. The best-known wonders, those of the return of his relics, come from a later Orthodox liturgical Life. The list makes no claim of scientific proof, and it does not dismiss any account. Where a story is late, legendary, or contested, the entry says so.</p>

<h2 id="during-johns-life">During John's life</h2>

<h3 id="bread-turned-to-stone-constantinople">Bread turned to stone, Constantinople</h3>
<p>Sozomen tells of a man of the Macedonian sect who was won over by John's preaching on the divine nature and told his wife she must share his faith or leave his house. She pretended to agree. At Communion she held back what she received and bowed her head as if in prayer, and her maid, standing behind her, slipped her a piece of ordinary bread. When she put it between her teeth, Sozomen writes, it turned to stone. Frightened, she ran to John, confessed, and showed him the stone with the marks of her teeth, and she kept her husband's faith ever after.</p>
<p>Status: reported by Sozomen (about 443–450), who says the stone was still kept in the treasury of the church of Constantinople in his day. No formal Church judgment.</p>
<p>Source: Sozomen, <em>Ecclesiastical History</em> VIII.5, NPNF2 vol. 2, <a href="${NA}26028.htm">${NA}26028.htm</a></p>

<h3 id="the-parting-words-of-two-bishops-403">The parting words of two bishops, 403</h3>
<p>When Epiphanius of Cyprus left Constantinople after his quarrel with John, a story went round that the two bishops had foretold each other's end. In Sozomen's version Epiphanius said, "I hope you will not die a bishop," and John answered that he hoped Epiphanius would never return to his see; Socrates gives John's words as "Expect not to arrive at your own country." Epiphanius died at sea on the way home, and John died deposed and in exile.</p>
<p>Status: popular report. Both historians give it as hearsay, and Socrates says he cannot be sure his informants spoke the truth.</p>
<p>Source: Sozomen, <em>Ecclesiastical History</em> VIII.15, <a href="${NA}26028.htm">${NA}26028.htm</a>; Socrates, <em>Ecclesiastical History</em> VI.14, <a href="${NA}26016.htm">${NA}26016.htm</a></p>

<h3 id="earthquake-after-the-first-exile-403">An earthquake after his first exile, Constantinople, 403</h3>
<p>In 403 the Synod of the Oak deposed John, and he gave himself up and was taken out of the city. Theodoret writes that in the night there was a great earthquake and the empress Eudoxia was struck with terror. Couriers crowded the Bosphorus, and John was called back. Palladius says only that "a catastrophe occurred in the royal palace." Both writers tell it as the event that brought him home.</p>
<p>Status: reported by early historians (Palladius, about 408; Theodoret, about 450). No formal Church judgment.</p>
<p>Source: Theodoret, <em>Ecclesiastical History</em> V.34, NPNF2 vol. 3, <a href="${NA}27025.htm">${NA}27025.htm</a>; Palladius, <em>Dialogue</em> ch. 9, tr. Moore (1921), <a href="${PALL}">${PALL}</a></p>

<h3 id="the-fire-of-404">The fire in the great church, 20 June 404</h3>
<p>On 20 June 404, around the time John was taken into his second exile, fire broke out in the great church of Constantinople and spread to the senate house. A chapter heading in Sozomen's history speaks of fire from heaven, but his text, like Socrates, reports that each party blamed the other. The cause was never settled, and John's friends, Olympias among them, were accused of setting it.</p>
<p>Status: disputed. The early sources do not agree on the cause.</p>
<p>Source: Sozomen, <em>Ecclesiastical History</em> VIII.22, NPNF2 vol. 2, <a href="${NA}26028.htm">${NA}26028.htm</a>; Socrates, <em>Ecclesiastical History</em> VI.18, NPNF2 vol. 2, <a href="${NA}26016.htm">${NA}26016.htm</a></p>

<h3 id="hail-and-the-death-of-the-empress-404">Hail, and the death of the empress, autumn 404</h3>
<p>On 30 September 404, a few months after John's second exile, a violent hailstorm fell on Constantinople and its suburbs, and four days later the empress Eudoxia died. Many people took both as signs of God's anger at John's unjust deposition. Socrates, who records the talk, refuses to decide: "God only knows," he writes.</p>
<p>Status: popular judgment of the time, reported by Socrates, who declines to call it divine.</p>
<p>Source: Socrates, <em>Ecclesiastical History</em> VI.19, NPNF2 vol. 2, <a href="${NA}26016.htm">${NA}26016.htm</a></p>

<h3 id="the-feet-of-cyrinus-of-chalcedon">The feet of Cyrinus of Chalcedon, 403 to 404</h3>
<p>Cyrinus, bishop of Chalcedon, denounced John before the Synod of the Oak as "the impious," "the haughty," "the inexorable." Before the synod, Maruthas, a bishop from Mesopotamia, trod on Cyrinus's foot by accident. The injury grew worse, and in the end Cyrinus lost both feet. Many said it was a judgment on him for what he had said against John.</p>
<p>Status: popular judgment of the time, reported by Socrates, who declines to decide. Sozomen tells the same story of the foot.</p>
<p>Source: Socrates, <em>Ecclesiastical History</em> VI.15 and VI.19, NPNF2 vol. 2, <a href="${NA}26016.htm">${NA}26016.htm</a>; Sozomen, <em>Ecclesiastical History</em> VIII.16, <a href="${NA}26028.htm">${NA}26028.htm</a></p>

<h3 id="the-fate-of-his-persecutors">The fate of his persecutors, as Palladius told it</h3>
<p>Palladius writes that the monk Ammonius had foretold a great persecution and schism in the Churches, and a disgraceful end for those who caused it. He then lists the sufferings of bishops and laymen who had acted against John: fevers, swellings, a leg broken in a fall from a horse, a man who lost his voice for eight months, and one whose tongue swelled so badly that he wrote his confession on a tablet.</p>
<p>Status: partisan report. Palladius was John's friend and wrote within a few years of the events; he names none of the sufferers, and no other source read confirms the list.</p>
<p>Source: Palladius, <em>Dialogue</em> ch. 17, tr. Moore (1921), <a href="${PALL}">${PALL}</a></p>

<h3 id="the-apostle-paul-at-his-ear">The apostle Paul at his ear (Orthodox tradition)</h3>
<p>A later Orthodox story says that Proclus, who would one day bring John's body home, watched John at work for three nights and saw a balding old man bending over him as he wrote and whispering in his ear. The old man looked like the icon of the apostle Paul. The story is told in Orthodox preaching as a sign of John's gift for interpreting Paul.</p>
<p>Status: devout tradition. It was read here only in a modern Orthodox retelling, and its oldest source was not found.</p>
<p>Source: John Sanidopoulos, "St. John Chrysostom, Greatest Interpreter" (2010), <a href="https://www.johnsanidopoulos.com/2010/11/st-john-chrysostom-greatest-interpreter.html">https://www.johnsanidopoulos.com/2010/11/st-john-chrysostom-greatest-interpreter.html</a></p>

<h2 id="at-his-death">At his death</h2>

<h3 id="the-martyr-basiliscus-comana-407">The martyr Basiliscus, Comana, September 407</h3>
<p>On the forced march toward Pityus, John's guards lodged him at the shrine of the martyr Basiliscus, five or six miles outside Comana in Pontus. That night, Palladius writes, the martyr stood beside him and said, "Be of good cheer, brother; to-morrow we shall be together." In the morning John begged to stay until eleven o'clock. The guards refused, but after about thirty furlongs he became so ill that they brought him back. He put on white clothes, gave away the rest, received Communion, said "Glory to God for all things," and died. Theodoret adds that he was buried beside Basiliscus, "for so the martyr had ordained in a dream."</p>
<p>Status: reported by Palladius, John's friend, writing about a year later, and confirmed in outline by Theodoret. Sozomen also says that Basiliscus appeared to John at Comana and told him the day of his death, though he has John die in the town itself. No formal Church judgment.</p>
<p>Source: Palladius, <em>Dialogue</em> ch. 11, tr. Moore (1921), <a href="${PALL}">${PALL}</a>; Theodoret, <em>Ecclesiastical History</em> V.34, <a href="${NA}27025.htm">${NA}27025.htm</a>; Sozomen, <em>Ecclesiastical History</em> VIII.28, <a href="${NA}26028.htm">${NA}26028.htm</a></p>

<h2 id="after-johns-death">After John's death</h2>

<h3 id="the-return-of-his-body-438">The return of his body to Constantinople, 27 January 438</h3>
<p>Socrates writes that Bishop Proclus, with the emperor's permission, brought John's body from Comana in the thirty-fifth year after his deposition, carried it in solemn procession through the city, and laid it in the Church of the Apostles on 27 January, in the sixteenth consulship of Theodosius. Theodoret credits the emperor Theodosius II and adds that the crowd covered the mouth of the Bosphorus with boats and torches, and that the emperor laid his head against the bier and "prayed for his parents and for pardon on them who had ignorantly sinned." Neither historian reports a miracle.</p>
<p>Status: a historical event reported by early historians. No miracle is claimed in these accounts.</p>
<p>Source: Socrates, <em>Ecclesiastical History</em> VII.45, <a href="${NA}26017.htm">${NA}26017.htm</a>; Theodoret, <em>Ecclesiastical History</em> V.36, <a href="${NA}27025.htm">${NA}27025.htm</a></p>

<h3 id="the-coffin-that-could-not-be-lifted">The coffin that could not be lifted (Orthodox tradition)</h3>
<p>The later Orthodox Life of the translation says that when the bearers came to Comana they could not lift John's coffin. Only after the emperor wrote a letter to John asking his pardon, and the letter was read at the grave, was the coffin lifted easily. The same Life has Proclus preach that "place does not hinder the miracles of the saint."</p>
<p>Status: legendary, late tradition from the liturgical Life. It does not appear in Socrates or Theodoret.</p>
<p>Source: Orthodox Church in America, "Translation of the Relics of Saint John Chrysostom," <a href="${OCA}">${OCA}</a></p>

<h3 id="the-body-found-incorrupt-438">The body found incorrupt, 438 (Orthodox tradition)</h3>
<p>The same Life says that when the coffin reached Constantinople, it was placed first in the church of Hagia Eirene, and that the body was found incorrupt. In 2019 the abbot of Vatopedi on Mount Athos also spoke of the incorruptibility of a relic of John's ear kept there.</p>
<p>Status: legendary, late tradition (the 438 account); recorded by the monastery (the Vatopedi relic). The fifth-century historians do not mention it.</p>
<p>Source: Orthodox Church in America, <a href="${OCA}">${OCA}</a>; Orthodoxia News Agency, 12 November 2019, <a href="https://www.orthodoxianewsagency.gr/foreignnews/holy-relic-of-st-john-chrysostom-conveyed-holy-great-monastery-of-vatopedi-to-thessaloniki/">https://www.orthodoxianewsagency.gr/foreignnews/holy-relic-of-st-john-chrysostom-conveyed-holy-great-monastery-of-vatopedi-to-thessaloniki/</a></p>

<h3 id="peace-be-to-all">"Peace be to all," 438 (Orthodox tradition)</h3>
<p>According to the Life, the people cried out, "Father, take up your throne," and Proclus and the clergy saw John open his mouth and say, "Peace be to all." The same Life says the emperor wept for his mother.</p>
<p>Status: legendary, late tradition from the liturgical Life.</p>
<p>Source: Orthodox Church in America, <a href="${OCA}">${OCA}</a></p>

<h3 id="healings-at-his-tomb">Healings at his tomb (Orthodox tradition)</h3>
<p>The Life ends by saying that many sick people were healed at John's tomb after his relics came home. It names no person, place, or date.</p>
<p>Status: late tradition; a general claim with no named cases.</p>
<p>Source: Orthodox Church in America, <a href="${OCA}">${OCA}</a></p>

<h3 id="the-three-hierarchs-appear-to-john-mauropous">The Three Hierarchs appear to John Mauropous, 11th century</h3>
<p>Under the emperor Alexios Komnenos (1081–1118), Christians in Constantinople quarreled over which of three teachers was greatest: Basil the Great, Gregory the Theologian, or John Chrysostom. According to the Orthodox liturgical tradition, the three appeared to John Mauropous, metropolitan of Euchaita, first one by one and then together, and said, "We three are one." He set their common feast on 30 January.</p>
<p>Status: Church-recognized liturgical tradition. The quarrel is historical; the vision is known from the synaxarion. Mauropous's own writings were not read.</p>
<p>Source: John Fountoulis, "The Three Hierarchs in the Orthodox Church" (2019), <a href="https://www.johnsanidopoulos.com/2019/01/the-three-hierarchs-in-orthodox-church.html">https://www.johnsanidopoulos.com/2019/01/the-three-hierarchs-in-orthodox-church.html</a></p>

<h3 id="the-skull-preserved-vatopedi-1821">The skull preserved, Vatopedi, 1821</h3>
<p>The Monastery of Vatopedi on Mount Athos keeps a skull venerated as John's. Its tradition says that in 1821 the skull was miraculously preserved when the monks carrying it from Athos to Crete were martyred. Abbot Ephraim spoke of it in 2019, when the relic was brought to Thessaloniki. A head of John brought from Vatopedi to Russia in the seventeenth century is also venerated in Moscow, so the two claims are unresolved.</p>
<p>Status: recorded by the monastery.</p>
<p>Source: Orthodoxia News Agency, 12 November 2019, <a href="https://www.orthodoxianewsagency.gr/foreignnews/holy-relic-of-st-john-chrysostom-conveyed-holy-great-monastery-of-vatopedi-to-thessaloniki/">https://www.orthodoxianewsagency.gr/foreignnews/holy-relic-of-st-john-chrysostom-conveyed-holy-great-monastery-of-vatopedi-to-thessaloniki/</a></p>

<p>No source read for this list supports an incorrupt hand of St. John Chrysostom. The relics the sources name are a skull and an ear at Vatopedi, a head in Moscow, and the portions kept in Rome and at the Phanar in Constantinople.</p>`;

const teachings = `<p>John left more sermons than almost any other early Christian writer, and most of what he taught he taught from the pulpit, in plain words to crowds. The themes below come from the works read for this entry: the dialogue <em>On the Priesthood</em>, sermons on Matthew, Acts, Second Corinthians, Eutropius, and the Statues, the letters he wrote to Olympias and other friends from exile, and his letter to Pope Innocent. His homilies on Romans, First Corinthians, and Genesis were not read for this entry, and his homilies on John were searched but not read in full.</p>

<h2 id="a-school-not-a-theater">A school, not a theater</h2>
<p>John wanted his hearers to change their lives, not to admire his sermons. When a congregation applauded him, he told them to stop.</p>
<blockquote>
  <p>"Did ye give praise to what has been said? Nay, I want not applause, nor tumults, nor noise. One thing only do I wish, that quietly and intelligently listening, you should do what is said. This is the applause, this the panegyric for me."</p>
  <p><cite>— John Chrysostom, Homilies on Matthew, Homily 17</cite></p>
</blockquote>
<p>"This place is a spiritual school," he said in the same sermon, not a theater where people sit "gazing on actors." He did not ask lay people to leave their homes for the mountains, but he grieved that "the houses were churches, but now the church has become a house." His rivals were the horse races and the stage, and he told his people he would keep sharpening the knife until he had "scattered the theatre of the devil."</p>

<h2 id="christ-in-the-poor">Christ in the poor</h2>
<p>John taught that the poor are the body of Christ, and that a Christian who decorates the church while ignoring the hungry has honored the wrong altar.</p>
<blockquote>
  <p>"Would you do honor to Christ's body? Neglect Him not when naked; do not while here you honor Him with silken garments, neglect Him perishing without of cold and nakedness."</p>
  <p><cite>— John Chrysostom, Homilies on Matthew, Homily 50, 4</cite></p>
</blockquote>
<p>In the same sermon he said, "God has no need at all of golden vessels, but of golden souls." In a sermon on Second Corinthians he went further and called the poor man an altar: "This altar is composed of the very members of Christ, and the body of the Lord is made your altar."</p>
<p>He lived it. As archbishop of Constantinople he cut the spending of his own household and gave the money to the hospital, built more hospitals with priests, doctors, and cooks, and in exile at Cucusus fed the poor of Armenia during a famine.</p>

<h2 id="the-danger-of-the-priesthood">The danger of the priesthood</h2>
<p>John held the priesthood in awe and feared it for the same reason. At the altar, he wrote, heaven itself is present. But the office also exposes a man to every passion, and above all to vainglory.</p>
<blockquote>
  <p>"Do you ask what those wild beasts are? They are wrath, despondency, envy, strife, slanders, accusations, falsehood, hypocrisy, intrigues … love of praise, desire of honor (which indeed most of all drives the human soul headlong to perdition) … contempt of the poor, paying court to the rich."</p>
  <p><cite>— John Chrysostom, On the Priesthood, Book III, 9</cite></p>
</blockquote>
<p>He wrote this in a dialogue with his friend Basil, explaining why he had hidden when the two of them were to be made bishops. Later, speaking on the Acts of the Apostles to men who wanted the office, he said: "I do not think there are many among Bishops that will be saved, but many more that perish: and the reason is, that it is an affair that requires a great mind." The often-quoted line about the road to hell being "paved with the skulls of bishops" is not his; it is a later embellishment of this passage.</p>
<p>His sense of the altar was as strong as his fear of the office: "At such a time angels stand by the Priest; and the whole sanctuary, and the space round about the altar, is filled with the powers of heaven, in honor of Him who lies thereon."</p>

<h2 id="affliction-that-purifies">Affliction that purifies</h2>
<p>In exile, sick and in danger, John wrote to his friend Olympias that suffering, rightly borne, makes a soul stronger. He did not call affliction pleasant. He called it useful.</p>
<blockquote>
  <p>"And as the fire makes the piece of gold, when it is applied to it, of better proof: so also affliction when it visits golden characters renders them purer and more proven."</p>
  <p><cite>— John Chrysostom, Letter to Olympias, from exile</cite></p>
</blockquote>
<p>He wrote it to a friend sunk in despondency, and he also sent her his treatise <em>No One Can Harm the Man Who Does Not Injure Himself</em>. In another letter he put the whole idea in one line: "sin is the only thing which is really distressing; and that all other things are but dust and smoke." He lived it on the road: after being driven out of Caesarea at night and thrown from his litter, he asked her "to rejoice at these things, to be glad, and leap for joy, and to glorify God who has counted me worthy to suffer such things." His last words, by his friend Palladius's account, were his customary prayer: "Glory to God for all things."</p>

<h2 id="mercy-for-the-repentant">Mercy for the repentant</h2>
<p>For all his severity with clergy, John preached mercy to sinners. Socrates records a sentence from his preaching that shocked some of his own friends.</p>
<blockquote>
  <p>"Approach, although you may have repented a thousand times."</p>
  <p><cite>— John Chrysostom, as quoted by Socrates, Ecclesiastical History, Book VI, 21</cite></p>
</blockquote>
<p>Sisinnius, bishop of the Novatians, wrote a book against it. John lived the same mercy when Eutropius, the minister who had abolished the right of sanctuary, fled to the altar of John's church, and the Church received him.</p>

<h2 id="the-vanity-of-power">The vanity of power</h2>
<p>John told the powerful the truth to their faces, and he told them that their power would pass. He preached it over Eutropius as the fallen consul lay under the altar.</p>
<blockquote>
  <p>"'Vanity of vanities, all is vanity'—it is always seasonable to utter this but more especially at the present time."</p>
  <p><cite>— John Chrysostom, Homily I on Eutropius, 1</cite></p>
</blockquote>
<p>"My wounds work health," he told Eutropius, "but their kisses have produced an incurable disease." He refused the emperor Arcadius a church for the Arian general Gainas, and he refused to leave his church in 404 unless he was thrown out by force: "I have received this Church … from God our Saviour, for the care of the salvation of the people, and I cannot desert it."</p>

<h2 id="the-sermons-against-the-judaizers">A hard legacy: the sermons against the Judaizers</h2>
<p>In 386 and 387, as a priest in Antioch, John preached eight sermons aimed at Christians of his city who were taking part in Jewish feasts and fasts. Their target was those Christians, but their language fell on the Jews themselves: he called the synagogue a place worse than a brothel and a dwelling of demons, and he held the Jews responsible for the death of Christ. Some scholars read the sermons as an example of a set form of ancient rhetorical blame; others count them among the most violent attacks on Jews in Christian writing. They are not quoted here, because the only modern English translation is under copyright, and they were described for this entry from secondary sources.</p>

<h2 id="a-note-on-what-bears-his-name">A note on what bears his name</h2>
<p>The Divine Liturgy of St. John Chrysostom, used in Orthodox and Byzantine Catholic churches, was not composed by him as it stands. The eighth-century Barberini manuscript ascribes only two of its prayers to him, the prayer for the catechumens and the prayer behind the ambo, and the whole Liturgy is first ascribed to him in manuscripts of the eleventh century. The Paschal (Catechetical) homily read in Orthodox churches at Pascha under his name is not his by scholarly judgment; its earliest attribution to him comes from Theodore of Stoudios in the ninth century. Two popular sayings, about "the hottest places in hell" and "the Church is a hospital," were not found in his works.</p>`;

const q = (text, topics, source) => ({ text, topics, source });
const quotes = [
  q('Glory to God for all things.', ['gratitude', 'suffering'], `His customary prayer and last words, in Palladius, Dialogue ch. 11, tr. Moore (1921). ${PALL}`),
  q("Would you do honor to Christ's body? Neglect Him not when naked; do not while here you honor Him with silken garments, neglect Him perishing without of cold and nakedness.", ['charity', 'devotion'], `John Chrysostom, Homilies on Matthew, Hom. 50.4, NPNF1 vol. 10. ${NA}200150.htm`),
  q('God has no need at all of golden vessels, but of golden souls.', ['charity', 'devotion'], `John Chrysostom, Homilies on Matthew, Hom. 50.4, NPNF1 vol. 10. ${NA}200150.htm`),
  q('For the church is not a gold foundry nor a workshop for silver, but an assembly of angels.', ['charity', 'devotion'], `John Chrysostom, Homilies on Matthew, Hom. 50.4, NPNF1 vol. 10. ${NA}200150.htm`),
  q('This altar is composed of the very members of Christ, and the body of the Lord is made your altar.', ['charity'], `John Chrysostom, Homilies on Second Corinthians, Hom. 20.3, NPNF1 vol. 12. ${NA}220220.htm`),
  q("But you honor indeed this altar, because it receives Christ's body; but him that is himself the body of Christ you treat with contumely, and when perishing, neglectest.", ['charity', 'justice'], `John Chrysostom, Homilies on Second Corinthians, Hom. 20.3, NPNF1 vol. 12. ${NA}220220.htm`),
  q('Do you ask what those wild beasts are? They are wrath, despondency, envy, strife, slanders, accusations, falsehood, hypocrisy, intrigues … love of praise, desire of honor (which indeed most of all drives the human soul headlong to perdition) … contempt of the poor, paying court to the rich.', ['passions', 'humility', 'sin'], `John Chrysostom, On the Priesthood III.9, NPNF1 vol. 9. ${NA}19223.htm`),
  q('At such a time angels stand by the Priest; and the whole sanctuary, and the space round about the altar, is filled with the powers of heaven, in honor of Him who lies thereon.', ['prayer', 'devotion'], `John Chrysostom, On the Priesthood VI.4, NPNF1 vol. 9. ${NA}19226.htm`),
  q('I do not think there are many among Bishops that will be saved, but many more that perish: and the reason is, that it is an affair that requires a great mind.', ['humility', 'sin'], `John Chrysostom, Homilies on Acts, Hom. 3 (section not confirmed), NPNF1 vol. 11. ${NA}210103.htm`),
  q('I will now try and unveil to you the storm of my soul', ['humility', 'truth'], `John Chrysostom, On the Priesthood, Book VI, NPNF1 vol. 9 (section not confirmed). ${NA}19226.htm`),
  q('I had many genuine and true friends, men who understood the laws of friendship, and faithfully observed them', ['love'], `John Chrysostom, On the Priesthood I.1, NPNF1 vol. 9. ${NA}19221.htm`),
  q('The present season is one for tears, and not for words; for lamentation, not for discourse; for prayer, not for preaching.', ['prayer', 'suffering'], `John Chrysostom, Homilies on the Statues, Hom. 2.1 (Antioch, 387), NPNF1 vol. 9. ${NA}190102.htm`),
  q("'Vanity of vanities, all is vanity'—it is always seasonable to utter this but more especially at the present time.", ['wisdom', 'humility'], 'John Chrysostom, Homily I on Eutropius, sec. 1, NPNF1 vol. 9. https://www.ccel.org/ccel/schaff/npnf109.xv.iii.html'),
  q('My wounds work health, but their kisses have produced an incurable disease.', ['truth', 'love'], 'John Chrysostom, Homily I on Eutropius, sec. 1, NPNF1 vol. 9. https://www.ccel.org/ccel/schaff/npnf109.xv.iii.html'),
  q('And the Church which you treated as an enemy has opened her bosom and received thee into it', ['mercy', 'forgiveness'], 'John Chrysostom, Homily I on Eutropius, sec. 1, NPNF1 vol. 9. https://www.ccel.org/ccel/schaff/npnf109.xv.iii.html'),
  q('And as the fire makes the piece of gold, when it is applied to it, of better proof: so also affliction when it visits golden characters renders them purer and more proven.', ['suffering', 'patience'], `John Chrysostom, Letter to Olympias (exile, 404–407), NPNF1 vol. 9. ${NA}1916.htm`),
  q('Why do you lament? Why do you belabour yourself, and demand of yourself a punishment which your enemies were not able to demand from you, having thus abandoned your soul to the tyranny of dejection?', ['hope', 'peace'], `John Chrysostom, Letter to Olympias (from Cucusus), NPNF1 vol. 9. ${NA}1916.htm`),
  q('For perhaps it seemed good to God that I should be set to run the longer double course, in order that the garland of victory might be rendered more glorious.', ['courage', 'patience'], `John Chrysostom, Letter to Olympias (from Cucusus), NPNF1 vol. 9. ${NA}1916.htm`),
  q('Wherefore also I beseech your Honour to rejoice at these things, to be glad, and leap for joy, and to glorify God who has counted me worthy to suffer such things.', ['joy', 'suffering'], `John Chrysostom, Letter to Olympias (after Caesarea, 404), NPNF1 vol. 9. ${NA}1916.htm`),
  q('Come now let me relieve the wound of your despondency', ['hope'], `John Chrysostom, Letter to Olympias (exile), opening, NPNF1 vol. 9. ${NA}1916.htm`),
  q('Do not be anxious on my behalf, nor rack yourself with solicitude, on account of the severity of the winter, and the weakness of my digestion, and the incursions of the Isaurians.', ['peace', 'love'], `John Chrysostom, Letter to Olympias (from Cucusus), NPNF1 vol. 9. ${NA}1916.htm`),
  q('during the last two months I have been no better than one dead, nay worse.', ['suffering'], `John Chrysostom, Letter to Olympias (from Cucusus), NPNF1 vol. 9. ${NA}1916.htm`),
  q('Approach, although you may have repented a thousand times.', ['mercy', 'forgiveness'], `John Chrysostom, as quoted by Socrates, Ecclesiastical History VI.21, NPNF2 vol. 2. ${NA}26016.htm`),
  q('Attempt, sir, no such promise, nor order what is holy to be given to the dogs.', ['courage', 'truth'], `John Chrysostom to the emperor Arcadius, in Theodoret, Ecclesiastical History V.32, NPNF2 vol. 3. ${NA}27025.htm`),
  q('I have received this Church … from God our Saviour, for the care of the salvation of the people, and I cannot desert it', ['courage'], `John Chrysostom to the emperor, Lent 404, in Palladius, Dialogue ch. 9, tr. Moore (1921). ${PALL}`),
  q('Did ye give praise to what has been said? Nay, I want not applause, nor tumults, nor noise. One thing only do I wish, that quietly and intelligently listening, you should do what is said. This is the applause, this the panegyric for me.', ['humility', 'truth'], `John Chrysostom, Homilies on Matthew, Hom. 17, NPNF1 vol. 10. ${NA}200117.htm`),
  q('This place is a spiritual school.', ['wisdom', 'devotion'], `John Chrysostom, Homilies on Matthew, Hom. 17, NPNF1 vol. 10. ${NA}200117.htm`),
  q('Then the houses were churches, but now the church has become a house.', ['devotion'], `John Chrysostom, Homilies on Matthew, Hom. 32, NPNF1 vol. 10. ${NA}200132.htm`),
  q('When I look on that throne, deserted and bereft of our teacher, I rejoice and weep at the same time.', ['love', 'suffering'], `John Chrysostom, Homilies on the Statues, Hom. 3.1 (Antioch, 387), NPNF1 vol. 9. ${NA}190103.htm`),
  q('our city has become all at once a monastery.', ['devotion', 'courage'], `John Chrysostom, Homilies on the Statues, Hom. 17.8 (Antioch, 387), on the monks who came down from the mountains, NPNF1 vol. 9. ${NA}190117.htm`),
  q('I saw the swords and I meditated on Heaven; I expected death, and I bethought me of the resurrection.', ['courage', 'faith'], 'John Chrysostom, Homily II on Eutropius, sec. 2, NPNF1 vol. 9. https://www.ccel.org/ccel/schaff/npnf109.xv.iv.html'),
  q("I fear not an enemy's plots: one thing only do I fear, which is sin.", ['sin', 'courage'], 'John Chrysostom, Homily II on Eutropius, sec. 4, NPNF1 vol. 9. https://www.ccel.org/ccel/schaff/npnf109.xv.iv.html'),
  q('Was I not continually telling thee that wealth was a runaway?', ['wisdom'], 'John Chrysostom, Homily I on Eutropius, NPNF1 vol. 9. https://www.ccel.org/ccel/schaff/npnf109.xv.iii.html'),
  q('sin is the only thing which is really distressing; and that all other things are but dust and smoke.', ['sin', 'peace'], 'John Chrysostom, Letter to Olympias (exile, 404), NPNF1 vol. 9. https://www.ccel.org/ccel/schaff/npnf109.xvii.vi.html'),
  q('Is it the desolation of this place which grieves you? Yet what can be pleasanter than my sojourn here?', ['joy', 'suffering'], 'John Chrysostom, Letter to Olympias (exile, 404), NPNF1 vol. 9. https://www.ccel.org/ccel/schaff/npnf109.xvii.vi.html'),
  q('Do not then now desire death, nor neglect the means of cure.', ['hope', 'love'], `John Chrysostom, Letter to Olympias (from Cucusus), NPNF1 vol. 9. ${NA}1916.htm`),
  q('I am not surprised that you call my long letter a short one. For this is just the way with lovers', ['love'], 'John Chrysostom, Letter to Castus, Valerius, Diophantus, Cyriacus and others (exile), NPNF1 vol. 9. https://www.ccel.org/ccel/schaff/npnf109.xvii.viii.html'),
  q('Scythians and Sarmatians would never have decided a case after hearing one side only', ['justice', 'truth'], `John Chrysostom to Pope Innocent I (404), preserved only in Palladius, Dialogue ch. 2, tr. Moore (1921). ${PALL}`),
  q('When day came, the whole city moved outside the walls, and kept the feast under trees and thickets, like sheep scattered abroad.', ['suffering', 'devotion'], `John Chrysostom to Pope Innocent I, on Easter 404, preserved only in Palladius, Dialogue ch. 2, tr. Moore (1921). ${PALL}`),
  q('Every one will expel his neighbour, and be expelled in turn.', ['justice', 'unity'], `John Chrysostom to Pope Innocent I (404), preserved only in Palladius, Dialogue ch. 2, tr. Moore (1921). ${PALL}`),
];

const relic_description = `<p>John died at the shrine of the martyr Basiliscus near Comana in Pontus in 407 and was buried there beside the martyr. On 27 January 438 his body was brought to Constantinople and laid in the Church of the Apostles (Socrates VII.45; Theodoret V.36), where from the tenth century it lay beside the relics of Gregory the Theologian. Orthodox accounts say that after the sack of Constantinople in 1204 the relics were taken to Rome and placed in old St. Peter's, and in 1626 moved to an altar in the Choir Chapel. In November 2004 Pope John Paul II returned a portion to the Ecumenical Patriarch; it rests in the patriarchal church of St. George at the Phanar. A skull and an ear venerated as John's are kept at Vatopedi on Mount Athos, and a head brought from Vatopedi in the seventeenth century is venerated in the Cathedral of Christ the Saviour in Moscow; these claims are unresolved. No source read supports an incorrupt hand.</p>`;

const S = (key, title, author, url, evidence, rights, used_for) => ({ key, title, author, url, accessed: '2026-10-01', evidence, rights, used_for });
const sources = [
  S('PRIEST', 'On the Priesthood (NPNF1 vol. 9, tr. Stephens)', 'John Chrysostom', `${NA}19221.htm`, 'Primary, own words', 'public-domain', 'Anthusa, Basil, wild beasts, angels at the altar'),
  S('PRIEST-GR', 'De sacerdotio libri sex (1825)', 'John Chrysostom', 'https://archive.org/details/desacerdotiolib00john', 'Primary, Greek OCR', 'public-domain', 'Greek of Priesthood III.9 (checked, not quoted)'),
  S('OLYMP', 'Letters to Olympias and to Castus and others (NPNF1 vol. 9, tr. Stephens)', 'John Chrysostom', `${NA}1916.htm`, 'Primary, own words', 'public-domain', 'exile, Caesarea in full (CCEL xvii.vi), Cucusus, illness, Goths, letter to friends'),
  S('EUTROP', 'Two Homilies on Eutropius (NPNF1 vol. 9)', 'John Chrysostom', 'https://www.ccel.org/ccel/schaff/npnf109.xv.iii.html', 'Primary, own words', 'public-domain', 'Eutropius scene; Hom. II at https://www.ccel.org/ccel/schaff/npnf109.xv.iv.html (soldiers, palace, swords)'),
  S('STATUES', 'Homilies on the Statues (NPNF1 vol. 9)', 'John Chrysostom', `${NA}1901.htm`, 'Primary, own words', 'public-domain', 'Antioch 387: Hom. 1, 2, 3, 13, 17, 21 (empty forum, Flavian, the court, the monks, Easter)'),
  S('MATT', 'Homilies on Matthew (NPNF1 vol. 10, tr. Prevost, rev. Riddle)', 'John Chrysostom', `${NA}2001.htm`, 'Primary, own words', 'public-domain', 'Hom. 50 (Christ in the poor); Hom. 4, 7, 17, 32 (theater, applause, houses as churches)'),
  S('ACTS3', 'Homilies on Acts, Homily 3 (NPNF1 vol. 11)', 'John Chrysostom', `${NA}210103.htm`, 'Primary, own words', 'public-domain', 'few bishops saved'),
  S('2COR20', 'Homilies on Second Corinthians, Homily 20 (NPNF1 vol. 12)', 'John Chrysostom', `${NA}220220.htm`, 'Primary, own words', 'public-domain', 'altar of the poor'),
  S('PALL', 'Dialogue on the Life of St. John Chrysostom (tr. Moore, SPCK 1921)', 'Palladius', PALL, 'Contemporary witness, partisan friend (c. 408)', 'public-domain', 'youth, cave, summons, reforms, letter to Innocent (ch. 2), Innocent (ch. 3), Ephesus (ch. 13-15), Olympias (ch. 17), nicknames (ch. 19), exiles (ch. 20), Easter 404, death'),
  S('SOCR', 'Ecclesiastical History VI–VII (NPNF2 vol. 2, tr. Zenos)', 'Socrates Scholasticus', `${NA}26016.htm`, 'Early historian (c. 440)', 'public-domain', 'clergy, Serapion, Oak, recall, Herodias, 404, death date, 438'),
  S('SOZ', 'Ecclesiastical History VIII (NPNF2 vol. 2, tr. Hartranft)', 'Sozomen', `${NA}26028.htm`, 'Early historian (c. 443–450)', 'public-domain', 'Libanius, Asterius, readers platform, hymns, Epiphanius, Eudoxia, Oak, recall, Easter 404, Olympias before the prefect, Innocent letters, ransomed captives; VIII.10-13 not read'),
  S('THDT', 'Ecclesiastical History V (NPNF2 vol. 3, tr. Jackson)', 'Theodoret', `${NA}27025.htm`, 'Early historian (c. 449–450)', 'public-domain', 'Gainas, earthquake, diptychs, 438 (V.19, 28-36 read)'),
  S('PHOTIUS', 'Bibliotheca, codices 59 and 86 (tr. Freese, SPCK 1920)', 'Photius', 'https://www.tertullian.org/fathers/photius_03bibliotheca.htm', 'Ninth-century summary of the acts of the Synod of the Oak', 'public-domain', 'Oak charges (29 by the deacon John, 18 by Isaac), presidents, witnesses, 45 voters'),
  S('WIKI-ADVJ', 'Adversus Judaeos', 'Wikipedia', 'https://en.wikipedia.org/wiki/Adversus_Judaeos', 'Tertiary, citing Wilken and others', 'facts-only', 'context of the sermons against the Judaizers (Harkins translation not quoted: copyright)'),
  S('SCHAFF', 'Prolegomena: Life and Work of St. John Chrysostom (NPNF1 vol. 9, 1889)', 'Philip Schaff', 'https://www.ccel.org/ccel/schaff/npnf109.iii.iv.html', 'Secondary, 19th century', 'public-domain', 'letters count, appearance, judgment, Liturgy authorship'),
  S('SMITH', 'Dictionary of Greek and Roman Biography, "Chrysostomus, Joannes" (1870)', 'William Smith (ed.)', 'https://cts.perseids.org/read/pdlrefwk/viaf88890045/003/perseus-eng1/C.chrysostomus_joannes_1', 'Secondary reference', 'public-domain', 'epithet gloss, birth year estimates'),
  S('CE', 'St. John Chrysostom, Catholic Encyclopedia (1910)', '', 'https://www.newadvent.org/cathen/08452b.htm', 'Secondary reference', 'public-domain', 'burial with Eudoxia in the Apostles, death details, baptism estimate, epithet first found in Vigilius 553 (Constitutum not read)'),
  S('BUTLER', 'Life of Saint John Chrysostom (Butler, reposted by Sanidopoulos)', 'Alban Butler', 'https://www.johnsanidopoulos.com/2021/11/life-of-saint-john-chrysostom.html', 'Secondary, 18th century, via repost', 'public-domain', 'death scene summary'),
  S('HUGGINS', 'Reception of John Chrysostom in the Middle Byzantine Period (PhD thesis, Edinburgh 2021)', 'M. P. Huggins', 'https://era.ed.ac.uk/handle/1842/38102', 'Modern scholarship (abstract)', 'facts-only', 'Paschal homily authorship'),
  S('PEARSE', 'Chrysostom on corrupt priests, part 2 (2009)', 'Roger Pearse', 'https://roger-pearse.com/weblog/2009/10/08/chrysostom-on-corrupt-priests-part-2', 'Modern blog citing Notes and Queries 1852', 'facts-only', 'skulls-of-bishops misattribution'),
  S('ARCHPITT', 'Divine Liturgy of St. John Chrysostom according to Byzantine Rite Tradition', 'Byzantine Catholic Archeparchy of Pittsburgh', 'https://archpitt.org/the-divine-liturgy-of-our-father-st-john-chrysostom-according-to-byzantine-rite-tradition/', 'Modern secondary', 'facts-only', 'Liturgy authorship, Barberini'),
  S('BARB', 'Barberini gr. 336', 'Saint Dominic\'s Media', 'https://www.saintdominicsmedia.com/documents/barberini-gr-336/', 'Modern secondary (cites Parenti-Velkovska 2000)', 'facts-only', 'Barberini manuscript'),
  S('OCA-TR', 'Translation of the Relics of Saint John Chrysostom', 'Orthodox Church in America', OCA, 'Orthodox liturgical Life (late tradition)', 'facts-only', '438 legends, feast of the translation'),
  S('FOUNT', 'The Three Hierarchs in the Orthodox Church (2019)', 'John Fountoulis', 'https://www.johnsanidopoulos.com/2019/01/the-three-hierarchs-in-orthodox-church.html', 'Orthodox liturgical scholarship', 'facts-only', 'Three Hierarchs, feast dates'),
  S('SANID', 'St. John Chrysostom, Greatest Interpreter (2010)', 'John Sanidopoulos', 'https://www.johnsanidopoulos.com/2010/11/st-john-chrysostom-greatest-interpreter.html', 'Modern Orthodox retelling', 'facts-only', 'Paul at his ear tradition'),
  S('VAT2004', 'Letter and address on the return of relics, Nov. 2004', 'John Paul II; Bartholomew I', 'https://www.vatican.va/content/john-paul-ii/en/letters/2004/documents/hf_jp-ii_let_20041127_consegna-reliquie.html', 'Official documents', 'facts-only', '2004 return, short quotations'),
  S('APOST', 'Return of the Relics', 'Apostolic Pilgrimage', 'https://apostolicpilgrimage.org/return-of-the-relics.html', 'Modern Orthodox record', 'facts-only', '1204, 1626, 2004 ceremony'),
  S('OCA-HEAD', 'Head of St. John Chrysostom to be brought from Moscow to New York (2010)', 'Orthodox Church in America', 'https://www.oca.org/news/archived/head-of-st.-john-chrysostom-to-be-brought-from-moscow-to-new-york', 'News', 'facts-only', 'Moscow head history'),
  S('ORTHNEWS', 'Holy relic of St John Chrysostom conveyed from Vatopedi to Thessaloniki (2019)', 'Orthodoxia News Agency', 'https://www.orthodoxianewsagency.gr/foreignnews/holy-relic-of-st-john-chrysostom-conveyed-holy-great-monastery-of-vatopedi-to-thessaloniki/', 'News', 'facts-only', 'Vatopedi skull, 1821, ear'),
  S('NLM', 'The Feast of St John Chrysostom and … (2015)', 'New Liturgical Movement', 'https://www.newliturgicalmovement.org/2015/01/the-feast-of-st-john-chrysostom-and.html', 'Modern secondary', 'facts-only', 'Western feast dates, Mozart'),
  S('WIKI-DOC', 'Doctor of the Church', 'Wikipedia', 'https://en.wikipedia.org/wiki/Doctor_of_the_Church', 'Tertiary', 'facts-only', 'Doctor status, feast date'),
];

const entry = {
  identity: {
    requested_name: 'St. John Chrysostom',
    resolved_name: 'John Chrysostom, Archbishop of Constantinople',
    aliases: ['John of Antioch', 'Joannes Chrysostomus', 'John the Golden-Mouthed', 'Ioannes Chrysostomos'],
    tier: 'A',
    tradition: 'Orthodox (one of the Three Hierarchs) and Catholic (Doctor of the Church)',
  },
  saint: {
    name: 'St. John Chrysostom',
    slug: 'john-chrysostom',
    summary,
    biography: bio,
    birth_year: 347,
    death_year: 407,
    birth_location: 'Antioch, Syria (Roman Empire)',
    death_location: 'Shrine of the martyr Basiliscus, near Comana in Pontus, on the way to exile',
    feast_day_catholic: '2000-09-13',
    feast_day_orthodox: '2000-11-13',
    categories: ['Bishops', 'Fathers_of_the_Church', 'Ascetics', 'Hermits'],
    venerated_in: ['roman-catholic', 'orthodox'],
    patron: 'Preachers and orators (a popular attribution found only on modern Catholic websites; no official or older source was read)',
    relic_description,
    relic_location: 'Church of St. George, Phanar, Constantinople (portion returned 2004); Rome (portion); Vatopedi Monastery, Mount Athos (skull, ear); Cathedral of Christ the Saviour, Moscow (head)',
  },
  related: {
    miracles: [{ miracles, time_period: ['patristic_age', 'medieval_period', 'modern_era'] }],
    teachings: [{ teachings, time_period: ['patristic_age'] }],
    quotes,
    prayers: [],
    books: [],
    prayers_note: 'None saved. The notes hold no prayer text by or to John checked against a source. The Barberini manuscript ascribes two prayers of the Liturgy to him (for the catechumens; behind the ambo), but their texts were not copied. The Paschal homily is not his and is not a prayer.',
    books_note: 'None saved. On the Priesthood and the Letters to Olympias (NPNF1 vol. 9, public domain) are candidates.',
  },
  share_kit: {
    tagline: 'He hid from becoming a bishop. Soldiers kidnapped him to make him one.',
    did_you_know: [
      { fact: 'At Caesarea in 404 imperial soldiers begged the exiled John to save them from a mob of monks: "deliver us from these wild beasts."', card: 'notes-extra-exile I (Letter to Olympias, CCEL npnf109.xvii.vi)' },
      { fact: 'A fallen consul who had abolished the right of sanctuary in churches hid under the altar of John\'s church while John preached over him.', card: 'notes-witnesses S1 VI.5; notes-own-words Q1' },
      { fact: 'Two years in a mountain cave, mostly without sleep, ruined John\'s stomach so badly that as a bishop he ate alone, and the Synod of the Oak charged him with eating alone "like a Cyclops."', card: 'notes-witnesses S3 ch. 5 and 12; notes-extra-exile L (Photius cod. 59)' },
      { fact: 'In John\'s own day another preacher, Antiochus of Ptolemais, was called Chrysostom by some, and he later sat among John\'s judges at the Oak.', card: 'notes-extra-exile Q (Sozomen VIII.10) and L (Photius cod. 59)' },
      { fact: 'Mozart was named for John\'s old Western feast day, 27 January.', card: 'notes-church-miracles S11' },
    ],
    quote_cards: [
      { text: 'Glory to God for all things.', attribution: 'St. John Chrysostom, his last words (Palladius, Dialogue ch. 11, tr. Moore 1921)' },
      { text: 'God has no need at all of golden vessels, but of golden souls.', attribution: 'St. John Chrysostom, Homilies on Matthew 50.4 (NPNF)' },
      { text: 'This altar is composed of the very members of Christ, and the body of the Lord is made your altar.', attribution: 'St. John Chrysostom, Homilies on Second Corinthians 20.3 (NPNF)' },
    ],
    share_moments: [
      { moment: 'John hides, and his dearest friend Basil is seized for the bishop\'s office alone', section_id: 'the-friend-who-was-caught' },
      { moment: 'Driven from his sickbed by monks, John flees by night; the mule carrying his litter falls in the dark', section_id: 'a-mule-fell-in-the-dark' },
      { moment: 'At Comana the dying prisoner asks for white clothes, gives the rest away, and says "Glory to God for all things"', section_id: 'tomorrow-we-shall-be-together' },
    ],
    for_someone_who: [
      'For anyone who has lost nearly everything and is trying to give thanks anyway',
      'For anyone who told powerful people the truth and paid for it',
      'For anyone trying to comfort a friend in despair from far away',
    ],
    read_next: [
      { slug: 'basil-the-great', sentence: 'Basil the Great is honored with John and Gregory the Theologian in the Orthodox feast of the Three Hierarchs on 30 January.', on_site: false },
      { slug: 'gregory-the-theologian', sentence: 'Gregory\'s relics lay beside John\'s in the Church of the Apostles from the tenth century, and both were returned from Rome to the Phanar in 2004.', on_site: false },
      { slug: 'olympias', sentence: 'The deaconess Olympias was John\'s closest friend, and his letters to her from exile are the best record of his last years.', on_site: false },
    ],
    read_next_check: 'Slugs basil-the-great, gregory-the-theologian, gregory-nazianzen, olympias, and olympias-the-deaconess returned 404 on www.findasaint.com/saints/ on 2026-10-01.',
  },
  images: [
    { role: 'profile_image', title: 'Icon of St. John Chrysostom or of the Three Hierarchs', note: 'Named as a candidate in notes-church-miracles; no specific file found or rights checked.', state: 'candidate_unverified', rights_page: null, directus_file_id: null },
  ],
  sources,
  gaps: [
    'Revision (pass 2, 2026-10-01): rewritten from all four notes files, including notes-extra-exile.md (sections A-V). Length is about 9,860 words by the lint count (tier A 8,000-10,000), 17 chapters, 12 block quotes. Lint: no MUST FIX lines; the CHECK lines are long sentences kept as narrative rhythm (most carry a quotation) and "pious" inside an Olympias quotation.',
    'Quotations were checked on 2026-10-01 against the local copies of the linked New Advent, CCEL, and Tertullian.org pages. New Advent modernizes some NPNF wording ("you" for "thee"), so On the Priesthood is quoted as New Advent prints it; the Eutropius homilies and the Caesarea letter follow CCEL ("thee", "hath").',
    'Letter to Innocent (404): its full text survives only in Palladius, Dialogue ch. 2; Innocent\'s replies are in Sozomen VIII.26. Both are single-source texts and are attributed as such.',
    'Synod of the Oak: Photius cod. 59 lists 29 charges by the deacon John and 18 by Isaac. Photius never states a total, so the popular "47 charges" is not used. Judges: 45 voters per Photius, 36 names per the minutes Palladius cites (ch. 3); the biography gives no number in the narrative.',
    'Bishops deposed in Asia: 6 (Palladius, with records signed by 22 and 70 bishops), 13 (Sozomen VIII.6), 16 (Theophilus, as quoted by Palladius). The biography tells Palladius\'s six against Theophilus\'s sixteen; Sozomen\'s thirteen is in the source note.',
    'The arrest of 403: Socrates VI.15 and Sozomen VIII.18 say John gave himself up at noon without the crowd\'s knowledge; his own letter to Innocent describes an arrest by the governor\'s agent late one evening. The narrative follows his letter; the conflict is in the source note.',
    'Easter 404: the letter to Innocent places the raid in "the Church"; Palladius ch. 8 places the vigil in baths "of Constans"; Sozomen VIII.21 names baths of Constantius (for the next day), Socrates VI.18 baths of Constantine. The narrative names no building for the raid.',
    'Epithet "Chrysostom": Sozomen VIII.10 says Antiochus of Ptolemais was surnamed Chrysostom; the Catholic Encyclopedia says John\'s surname first occurs in Pope Vigilius\'s Constitutum (553). The Constitutum and the Greek of Socrates and Theodoret were not read, so who first used it of John is left unresolved.',
    'Herodias sermon: the words are only reported by Socrates VI.18 and Sozomen VIII.20; Schaff (NPNF1 vol. 9 Prolegomena, n. 18) says the surviving homily is spurious (Tillemont, Savile, Montfaucon).',
    'Homilies against the Judaizers (386-387): the only modern English translation (Harkins, FOTC 68, 1979) is under copyright and was not quoted; the paragraph uses secondary sources only (Wikipedia, Adversus Judaeos, and its cited scholars).',
    'Baptism: no ancient source gives a year; modern estimates c. 368-373 (Catholic Encyclopedia; Wikipedia). The biography says "in his early twenties". Birth year 347 is Smith\'s "most probable" estimate; 344 and 354 are also given.',
    'Libanius\'s deathbed remark is from Sozomen VIII.2 only and is told as Sozomen\'s story. Libanius\'s own orations were not read.',
    'Matthew homilies: Antioch, about 390, is standard scholarship but was not verified in the text; the biography places the preaching chapter in his Antioch years without dating single sermons. Section numbers for Matthew Hom. 17 and 32 are not confirmed.',
    'Who ordained him priest (Flavian per Palladius, Evagrius per Socrates), the place of the first exile (Praenetus per Socrates and Sozomen, Hieron per Theodoret), and Proclus or Theodosius II for 438 are in the source note.',
    'Theodosius II as Eudoxia\'s son is not stated in the notes, so the biography does not say it; the "pity your own children" echo rests on Theodoret\'s "prayed for his parents". Socrates VI.11 (read in the local copy but not in the notes) says Eudoxia once set the infant Theodosius at John\'s knees; a later research pass could add it.',
    'Misattributions handled: the skulls-of-bishops line (bogus; Acts Hom. 3 used), the Paschal homily (not his; earliest attribution Theodore of Stoudios; Huggins 2021), the Liturgy (bears his name, not composed as it stands). "Hottest places in hell" and "the Church is a hospital" are named only as not found.',
    'The 438 translation is told from Socrates VII.45 and Theodoret V.36 with no miracle; the unliftable coffin, incorruption, "Peace be to all", and healings are marked as the later liturgical Life. No incorrupt hand is claimed; the relics named are a skull and an ear at Vatopedi and a head in Moscow.',
    'Patronage (preachers, orators) rests only on modern Catholic websites and is attributed in the field.',
    'Not read: Libanius\'s orations; Vigilius\'s Constitutum; the Greek of Socrates and Theodoret; Theodoret V beyond V.19 and V.28-36; Sozomen VIII.10-13 and VII.23; Palladius ch. 4-12 only in part; the Homilies on Romans, 1 Corinthians, and Genesis; Baring-Gould; Butler in its own edition; Migne.',
    'Image: no file chosen; needs a public-domain icon with a verified rights page and the owner\'s approval before upload.',
  ],
  field_review: {
    name: ['supported', 'Common English name with title.'],
    slug: ['supported', 'john-chrysostom; returned 404 on the public site on 2026-10-01, so no published duplicate.'],
    summary: ['supported', 'From summary.txt; facts from the notes.'],
    biography: ['supported', 'biography.html, revised 2026-10-01 with the second research pass; quotations checked against local copies of the linked public-domain pages; lint has no MUST FIX lines.'],
    birth_year: ['traditional', '347 is Smith\'s Dictionary\'s most probable date; 344 and 354 are also given.'],
    death_year: ['supported', '407; Socrates VI.21 gives 14 September; Palladius gives the place and manner.'],
    birth_location: ['supported', 'Antioch (Socrates VI.3; Palladius ch. 5).'],
    death_location: ['supported', 'Shrine of Basiliscus, five or six miles from Comana in Pontus (Palladius ch. 11; Theodoret V.34).'],
    feast_day_catholic: ['traditional', '13 September per New Liturgical Movement and Wikipedia; the Roman calendar text was not read. 2000 is a storage-only anchor year.'],
    feast_day_orthodox: ['supported', '13 November per Fountoulis (moved because 14 September is the Exaltation of the Cross); also 27 January (translation) and 30 January (Three Hierarchs). 2000 is a storage-only anchor year.'],
    categories: ['supported', 'Archbishop of Constantinople (Bishops); Father and Doctor (Fathers_of_the_Church); six years with Syrus and alone in a cave (Ascetics, Hermits).'],
    venerated_in: ['supported', 'Orthodox (Three Hierarchs, feasts) and Catholic (Doctor of the Church, feast, 2004 return).'],
    patron: ['traditional', 'Preachers and orators: modern Catholic websites only, attributed in the field.'],
    relic_description: ['supported', 'Socrates VII.45, Theodoret V.36, Apostolic Pilgrimage, Vatican 2004, OCA 2010, Orthodoxia News 2019; contested claims marked.'],
    relic_location: ['supported', 'Phanar (2004), Rome portion, Vatopedi skull and ear, Moscow head; the Vatopedi and Moscow head claims conflict.'],
    profile_image: ['unknown', 'No image chosen or rights-checked.'],
    miracles: ['supported', '16 accounts plus a closing note on the incorrupt-hand claim, each with status and source.'],
    teachings: ['supported', 'Eight themes from the works read, including an honest note on the sermons against the Judaizers (no quotation: copyright).'],
    quotes: ['supported', `${quotes.length} quotations, each with work, locator, and link.`],
    prayers: ['unknown', 'No authentic prayer text in the notes.'],
    books: ['not_applicable', 'No books saved; candidates noted.'],
  },
  save_result: { state: 'not_saved', item_id: null, version_id: null, expected_revision: null, cms_url: null },
};

// Keep a stable version_id across rebuilds.
const out = path.join(dir, 'entry.json');
if (fs.existsSync(out)) {
  try { const old = JSON.parse(fs.readFileSync(out, 'utf8')); if (old.save_result?.version_id) entry.save_result.version_id = old.save_result.version_id; } catch {}
}
if (!entry.save_result.version_id) entry.save_result.version_id = crypto.randomUUID();
fs.writeFileSync(out, JSON.stringify(entry, null, 2) + '\n');
console.log('wrote', out, 'quotes', quotes.length, 'max source', Math.max(...quotes.map(x => x.source.length)));
