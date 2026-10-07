# Stage 6b — The teachings page

Use this prompt for the `teachings` record. Read the research notes (or the dossier's `own-words` and `quotations.md`), the checked biography, and `voice-examples.md`. Write only what the evidence supports. The result goes into `related.teachings[0].teachings` in `entry.json`.

It uses the same voice and the same reading rules as the biography: warm, reverent, alive, and easy to read. Read these parts of `04-write-biography.md` and follow them here: "Easy to read", "Straight sentences", and "Headings say plainly what happens". Read Examples 5 and 6 in `voice-examples.md`. The owner rejected text that was too advanced, with sentences full of commas and headings like riddles, so these rules matter as much on this page as in the biography. The message-style rules (Simplified Technical English) still do not apply: the prose runs straight, but it flows.

---

## Plan first (a short plan, not an outline stage)

Before you write, save `content-drafts/<slug>/teachings-plan.md` (about 300 words). Skip it only if the saint has no teachings to write. It holds:

- the central idea, in one sentence, and the opening's hook;
- the three levels of certainty for the sources (own writing, witnessed, attributed later);
- five to eight themes, in order. For each: the claim in one line, the exact quotation and its locator, the occasion, what it answered, and the life scene that proves it.
- any theme dropped for lack of a sourced quotation, with the reason.

Then write the page from the plan. Do not ask for approval.

## The purpose of the page

A reader comes to this page with one question: **"What did this saint actually believe, and does it matter to my life?"** The page answers in three steps:

1. **What the saint taught,** in words a stranger could repeat to a friend.
2. **Why it was new or needed,** meaning the question, error, or hunger of the saint's own time that the teaching answered.
3. **Proof it was real,** meaning the saint lived it, and what it asks of a reader today.

The biography tells the story of the life. This page tells the story of the **ideas**. Do not retell the biography. Take one moment from the life only when it proves a teaching.

## Voice

- The narrator stands inside the faith. God, grace, and prayer are real in the text, as the Church and the saint understood them. Say "the Church holds", not "the Church claims".
- Write for a modern reader who may never have opened a theology book. Use a plain word wherever one exists. When the teaching needs a technical term (grace, theosis, hesychasm, transubstantiation, the Trinity), explain it the first time in a short sentence of its own, never squeezed between commas. Use a picture or analogy when it makes an idea clear.
- Be exact and never glowing. No praise words such as "profound", "timeless", or "beloved". Let the idea and the saint's own words carry the weight.
- Tell each saint from within the Church that venerates them. Do not compare traditions or denominations. When you say what a teaching was new against, name the error or question of the saint's own time (for example Arianism, Pelagianism, iconoclasm), not another Church.
- If a saint taught something the Church has since set aside, or something that modern readers find hard, say it plainly in one or two sentences, inside the saint's own century. Do not apologize and do not comment. Say how the Church treats it now only when a source says so.

## What to include

### The opening (100–180 words, no heading)

- Start with the saint's central idea, in one clear sentence, and why it mattered. This is the hook. A question, a surprising claim, or one line of the saint's own words all work.
- Then say what survives of the saint's teaching and who recorded it: writings, letters, sermons, or sayings written down by listeners. Name the two to four works a reader should start with, in one short line each, so that they match the `books` records.
- Say how sure we are. Use three levels, in plain words: **the saint's own writing**, **recorded by someone who heard them**, and **attributed to them later**. Use block quotes only from the first two levels. Mention the third level only to say that it is doubtful, and say which sayings to be careful with.

### Five to eight teaching sections

Choose the themes in this order of priority:

1. The idea the saint is most known for.
2. What was distinctive: what only this saint taught, or taught first, or taught best.
3. The ideas a modern reader most needs, such as suffering, forgiveness, work, doubt, money, family, death.

Tier A saints get six to eight themes. Tier B get four to six. Tier C get three or four. Do not pad. Put the central teaching first, and end with the one that lands hardest.

Each teaching is an `<h2 id="kebab-case">` section of 150–300 words. A heading has 3–8 plain words and states the teaching itself, so that a reader who only skims the headings learns what the saint taught: "Only God Can Fill the Human Heart". Not "The Restless Heart", which is a riddle until you read the section, and not "Anthropology", which is a category. Name only the saint, God, Christ, and people every reader knows. Each section needs the five parts below, **but vary their order and their shape**. A section may open with the saint's own words, with a question people ask, with a scene, or with a surprising claim. Do not use the same order twice in a row.

1. **The idea in plain words.** The claim, and the reason the saint gave for it.
2. **The saint's own words** in one `<blockquote>` of 15–60 words, in plain modern English (see "Rules for words and sources"), with the work, the locator, and the date or place. A long sentence in the source becomes two or three straight sentences with the same meaning. Choose the sentence that carries the argument, not the most famous one. A second block quote is allowed only when it adds something. Do not repeat a quote from another section.
3. **The occasion.** Where, when, to whom, and why the saint said or wrote it. This is often the most vivid part: a letter to a grieving friend, a sermon preached in a famine, an answer to a heretic.
4. **What it answered.** The question, error, or need of that time. Say what was new or distinctive. Write this only if the sources support it.
5. **The proof.** One scene or fact from the saint's life that shows the saint lived it. Take it from the checked biography, with only the details the biography or the notes give. Add no feelings, gestures, crowds, sounds, or weather: the fact checks removed ten to thirty such additions from every biography. Do not use the closing phrase "He lived it by…" more than once on the page.

End a section on the idea or on a short line that a reader would remember. Add one sentence about what this asks of a reader today only where it is natural: an invitation, never a lecture or a list of rules.

### When there is nothing to teach

If the saint left no writings and no recorded sayings, write no `teachings` record. Mark `teachings` as `not_applicable` in `field_review`, with the reason. The site hides the teachings page and its link when the record is missing.

## Rules for words and sources

- **Exact meaning, in plain modern English.** Translate from the original language on the cards or in the notes, or put an old translation into modern English with the same meaning. Add nothing, and drop nothing without an ellipsis. No "thee", "thou", "hath", "bade", "brethren", or "wherein": the check script rejects them, in quotations too. Never put a paraphrase in quotation marks.
- **Record your translations.** In `teachings-plan.md`, list each quotation you translated or modernized, with the original wording or its location, so the checker can compare them. In the `<cite>`, name the work and the locator, and write "our translation" when it is ours. Do not name an old translator whose wording you changed.
- Do not use quotes from `facts-only` sources, except one short quote when no public-domain wording exists.
- The page shows the saint's `quotes` records separately, under "In their own words". Do not try to list every good quote here. Use each block quote to build an argument.
- No links, numbers, or footnotes inside the text. A short attribution that belongs to the sentence, such as "he wrote to a friend in 396", is welcome.
- Where a doctrine is disputed or a work is doubtful, say it in one sentence in the section or in the closing note. Do not let the story stop to footnote itself.

## HTML

Use only `<p>`, `<h2 id>`, `<blockquote>`, `<cite>`, `<em>`, `<strong>`, and `<ul>`. No H1, `<h3>`, classes, scripts, or styles. A `<blockquote>` has the quote in one `<p>` and the attribution in a second `<p><cite>— Speaker, <em>Work</em> locator, date (translator)</cite></p>`.

The site page reads the HTML in this way: the text before the first `<h2>` is the opening, each other `<h2>` is a numbered teaching, and the sections named `Sources`, `A Note on the Sources`, or `How this life was researched` are notes at the end. Finish with:

- `<h2 id="a-note-on-the-sources">A Note on the Sources</h2>`, only when there are real questions about authenticity or text (two to four sentences).
- `<h2 id="sources">Sources</h2>`, the works used, in MLA style, with HTTPS links where they exist.

## Example

The facts are the same in both versions. They come from the Augustine research notes: *Confessions* I.1.1 in Pusey's 1838 translation, written about 401, and his own account of his early years.

### Not like this (a template filled in)

> Augustine taught that people are made for God, and that nothing less than God can give them rest. Every other good thing, friendship, love, success, learning, is real and good, but it cannot carry the weight of a whole heart. These are the first lines of the *Confessions*, which Pusey's translation dates to about 401, when Augustine was already bishop of Hippo. He had learned it the hard way. As a young man he looked for rest in friends, in love, in rhetoric, and in the Manichees.

Why it fails: it states the doctrine before the reader cares. The quotation is a label ("these are the first lines"). The life is a list ("friends, love, rhetoric"). The reader learns what Augustine said but not why it is true or why it matters to them.

### Like this (the same facts, with a purpose)

> **Only God Can Fill the Human Heart**
>
> You get the thing you wanted, and within a week you want something else. Almost everyone knows the feeling. Augustine did not think it was a flaw to fix, because to him it was a clue. People are restless because God made them for himself, and nothing smaller can fill a whole heart.
>
> He had tried the smaller things. As a young man he looked for rest in friends and in love. He looked for it in his work as a teacher of public speaking, and for some years in a religious group called the Manichees. Then a close friend died. Augustine called him "half of my soul," and his own life became "a horror" to him.
>
> Years later he became the bishop of Hippo, a port town in North Africa. About the year 401 he began his *Confessions*, the story of his life told to God. Its first lines are a prayer:
>
> > "You made us for yourself, and our heart is restless until it rests in you."
> > — Augustine, *Confessions* I.1.1 (our translation)
>
> His Latin says *fecisti nos ad te*: "you made us toward yourself." The heart is like a compass needle that keeps moving until it points home. If success has never filled you, Augustine would say it was never meant to.

Why it works:

- **The heading states the teaching.** A reader who only skims the headings still learns what Augustine taught.
- **It opens with the reader's own experience,** so the idea has a reason to be heard.
- **The life is the proof,** told in a few strokes, and the friend's death carries the feeling.
- **The quotation lands at the turn,** with an introduction, and it is not a label. It is in plain modern English, translated from the Latin. An earlier version of this example used the 1838 wording, "For Thou madest us for Thyself", which stops a modern reader.
- **The sentences run straight.** Who acts comes first, and the explanations (the Manichees, Hippo, the *Confessions*) sit at the end of a sentence or in their own sentence.
- **One analogy** makes the Latin clear. It adds no new claim.
- **The ending asks something of the reader,** in a quiet voice, and does not lecture.

## Before you finish

Run the check script and fix every "MUST FIX" line, then every "bent sentence" and "long sentence" line that is not a false alarm:

```bash
python3 /Users/nicholas/Desktop/saints-website/BioCMS/scripts/saint-entry/lint_biography.py content-drafts/<slug>/teachings.html --kind teachings
```

Then check each item. Fix what fails.

- Does the opening make a stranger want to read on, and does it say what survives of the saint's teaching and how sure we are?
- Does every section answer "what, why then, and how lived"? Do the sections differ in shape, so the page does not read like a form?
- Does every quotation keep the exact meaning of the original, in plain modern English, and does every locator match the card? Is every block quote from the saint's own writing or from a witness?
- Do the headings, read alone, tell a stranger what the saint taught?
- Does every sentence run straight, so that a thirteen-year-old could read the page without stopping?
- Is the voice warm and inside the faith? Are there no praise words and no comparisons between traditions?
- Would a reader know, after the last section, what this saint teaches and how it might change one day of their life?
