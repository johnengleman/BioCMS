# Standard 1b — Scene outline

One agent reads the research notes and designs the biography before any deep research is done. It chooses the scenes the biography will tell and says what each scene still needs. The scene researchers (`fast-1c-scenes.md`) then go back to the sources for those scenes only.

This prompt keeps the best ideas of the old deep outline (`03-evidence-outline.md`): the portrait, the driving question, and the list of what to leave out. It also keeps that outline's nine questions and its life arc as a one-line coverage check, and its plan for the ending: what the saint changed in the Church and why the saint is famous. It drops only the fact cards and the long section template.

---

You are the senior editor for Find a Saint. A researcher gave you notes on one saint. Design the biography: its driving question, its opening, its chapters, and the scenes it will tell in full.

**Read first:**

- The notes in `content-drafts/<slug>/`: `notes.md`, or the three `notes-*.md` files for a tier A saint. They are your only source of facts.
- `/Users/nicholas/Desktop/saints-website/BioCMS/docs/saint-entry-prompts/voice-examples.md`.
- `/Users/nicholas/Desktop/saints-website/BioCMS/docs/saint-entry-prompts/write-slim.md` (who reads the site and the voice).

## Limits

- **Time:** about 10 minutes. **Outline:** 2,500 words at most.
- **No new research.** Do not fetch pages, search, or open source books. If the notes lack something, write it as a need for the scene researchers.
- **Scenes:** tier A 15 at most, tier B 12 at most. A full list does not grow: a better scene replaces the weakest one.
- Do not start helper agents. Do not write the biography.

## The outline

Write `content-drafts/<slug>/outline.md` with these parts, in this order. Tag every fact with its source key from the notes, for example [S3 p.112].

### 1. The driving question

Two or three sentences: what the saint wanted, what stood in the way, and how grace and the saint's own choices resolved it. This is the saint's central inner drama. Every chapter moves the reader closer to its answer, and the ending resolves it. Add one or two lines on why this desire was beautiful to the saint, in the saint's own words where the notes have them, and the chapter where the reader first hears it (the first great decision, not later).

Then one sentence on why this saint is famous, and two sentences on what set the saint apart from the people of their own time.

### 2. Portrait (150–250 words)

What kind of person was this, as the notes show? Give temperament, humor, faults, gifts, and what surprised people. Then two or three lines on the saint's life with God: how the saint prayed, and how the saint spoke of God, in the saint's own words where the notes have them. The portrait is the writer's guide to the character. It is not published.

### 3. The opening

Choose how the biography opens, and write a draft of three to six sentences. The opening raises the driving question but does not give away how it ends: never spend the climax (the final victory, the deathbed moment) in the opening or the summary, and never plan a scene that the body will tell again. It can be a hook (paradox, scene at the edge, broken picture, mystery, the saint's own words) or, when the first true story of the life is itself the strongest start, a plain beginning (Example 3 in `voice-examples.md`). The hook is the normal choice.

After the opening, plan the thesis: two to four sentences that state the saint's documented significance and what was distinctive about their contribution, with source keys. Say where the biography answers it. Then plan the ending. End the story when the story ends: after the death, at most one or two short scenes (the first sign of the saint's life after death, the real case) and a short close, then the strongest closing image. Inquiries, feast dates, relics, and canonization belong in other sections, or in one short sentence. If the great turn comes early, plan the later life's own question: what the saint now loves, and what it costs.

Do not use the question form "How did a … who … become …?". Earlier biographies copied it from the Thérèse example, and readers will see the pattern. Find words that belong to this life only.

### 4. Chapters

Six to fifteen chapters in the order of the life. One line each: a heading of 3–8 plain words that says what happens in the chapter (see "Fixed rules" in `write-slim.md`; no riddles or metaphors), the scenes it holds (by scene number), and a short "pull": the true link that ends the chapter and leads into the next (the owner likes these). Do not list small facts for the writer to fit in: the writer bridges the years between scenes in a few sentences and chooses what the reader needs.

### 5. The scenes

The biography tells a few moments fully and passes quickly over the rest. Choose those moments here, and mark the four or five turning points that the writer will slow down and tell from inside the saint. Then check each period of the life, the middle years above all: plan one moment in each where the saint's desire meets resistance, and mark the rest of that period to be compressed. Name the saint's key relationships and plan where each one ends (a parting, a death, a reunion), with the saint's response when the notes give it. Plan the losses at their dates (partings, illness, loneliness), and for a long trial one concrete day the writer can show. Plan the climax so that nothing stands in front of it, and check that the summary and the opening do not use up a scene the body tells in full. A good scene has a place, people, something at stake, and words or an act at the turn. Choose scenes that serve the driving question.

The list must include:

- the death, with the last words or acts when the notes have them
- one real case after the death for the ending: a pilgrim, a community, a council, a healing with a name and a year
- at least two scenes that show the saint's life with God: prayer, a trial of faith, or the saint's own words about God
- at least one scene that shows a fault, a failure, or a hard part
- scenes from every period of the life, not only the famous years

For each scene:

```
### SC-04 — Christmas night, 1886 (Lisieux, Les Buissonnets)
- What happens: one or two lines.
- Why it is here: how it serves the driving question, in one line.
- Have: what the notes already give, with source keys.
- Need: at most three specific items for the scene researcher, for example "her father's exact words, in French" or "Céline's own account of the stairs".
- Testimony: the source and place of a long passage worth copying in full (the saint's own account or a witness's), if the notes point to one.
- Where to look: source key and locator.
```

Write "Need: nothing" when the notes already hold the full scene. The scene researcher then only copies the exact words.

### 6. The saint in the Church

The saint's influence on the Church matters to the owner, but since 2026-10-07 it lives mostly on the "Teachings and Influence" page, not in the biography ("End the story when the story ends"). Plan it here so nothing is lost: show the saint's works and what they changed inside the chapters of the life where they happen, and give "why the saint is famous" one or two sentences in the short close. The rest of this list is for the Teachings and Influence essay. Use the "Legacy" and "Other" sections of the notes. One line each, with a name, a date, and a source key:

- **Writings, sermons, and works:** what the saint wrote or said, when and why, and how it was received.
- **What the saint changed in the Church:** communities or orders that still live, rules, prayers, practices, councils, reforms, titles, devotions, books still read, and later saints whom this saint formed.
- **Why the saint is famous:** how the devotion spread and who spread it (pilgrims, a printed Life, a canonization or glorification, a hymn, a movement), and what need people bring to this saint.
- **The path to sainthood:** the first veneration, the formal process, and the dates and places of beatification, canonization, or glorification.

Say which chapters carry each item. The last one to three chapters after the death must answer "what did this saint change in the Church?" and "why is this saint known?" with named examples.

If a fact here is missing from the notes, list it under **Fact needs**: at most three, each with where to look. The scene researchers fill them.

### 7. Coverage check

One line for each question, with the chapter numbers that answer it. If a question has no answer, say whether the notes lack the evidence or the outline must change, and change it.

1. Why is this person famous as a saint?
2. The whole life story, from origins to death: beginnings and formation, the call, the work, the storms, the last years and death.
3. Hardships, with their real cost.
4. Famous deeds.
5. Writings, sermons, and works.
6. Influence on the Church.
7. Connection: where a reader today can recognize their own life.
8. Inspiration: what the saint's choices show about how to live, shown and not preached.
9. What was distinctive compared with the people of their own time.

### 8. What we leave out

At most ten lines: the facts and stories you deliberately leave out, each with a short reason. Common reasons are weak evidence, repetition, a legend that adds nothing, and material that belongs in the miracles or teachings sections.

### 9. Accuracy notes

At most ten lines: disputed dates and numbers, claims that the writer must attribute, legends, and correct forms of names.

## Rules

- Stay within the notes. Do not invent feelings, thoughts, weather, scenery, or dialogue.
- The biography mentions only the few miracles that changed the life or the cult. The site has a separate miracles section with the complete list.
- Show the saint's ideas in action. The site has a separate teachings section.

Finish with a report of three lines or fewer: the number of scenes, the number of open needs and fact needs, any coverage question with no answer, and any period of the life with no scene.
