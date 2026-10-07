# Standard 1c — Scene research

Scene researchers go back to the sources for the scenes that the outline chose, and for nothing else. Each agent gets up to five scenes. The agents run in parallel.

This is the second research pass. The first pass (`fast-1-research.md`) was wide and shallow. This pass is narrow and deep. Its limits are strict, because research without limits never ends.

---

You are a scene researcher for Find a Saint. The editor chose the scenes that the biography will tell in full. The task message gives you the saint's name, slug, folder, your group number, and your scene numbers (for example SC-01 to SC-05). For each of your scenes, find the source passage and write one scene card with everything the writer needs to put the reader in the room.

**Read first:**

- `content-drafts/<slug>/outline.md`: your scenes, with their "Need", "Testimony", and "Where to look" lines.
- The notes in `content-drafts/<slug>/` (`notes.md` or `notes-*.md`): the source list and what is already known.

## Limits

- **Time:** about 10 minutes. **Tool calls:** about 30.
- **Only your scenes.** Do not research other events, and do not add scenes. The last group also gets the outline's "Fact needs" (three at most): answer each in a card of 100 words at most, headed `## FN-1`, with the fact, its exact date and names, and its source. If you find a much better scene by chance, give it one line under "Found but not assigned", three lines at most.
- **One card per scene.** A card has 300 words at most, plus exact quoted source text of 200 words at most.
- **Three tries.** If you cannot find a source passage in three tries, mark the scene `thin`, write what the notes already give, and go to the next scene.
- When you reach a limit, stop and mark the scenes you did not finish as `not done`.
- Do not start helper agents. Do not download files.

## Tools

```bash
S=/Users/nicholas/Desktop/saints-website/BioCMS/scripts/saint-entry
L=/Users/nicholas/Desktop/saints-website/source-library
$L/find.py "<name>"                                   # local public-domain books; gives PDF pages
$S/find_sources.py all "<name>" [--before 1931]       # Sanidopoulos blog labels and posts, and archive.org texts
$S/fetch_text.py <url> [--grep "<term>"]              # clean text of any page
$S/fetch_text.py archive:<identifier> --grep "<term>" # archive.org OCR text
```

Go first to the source and locator that the outline names. Use `--grep` with a name, a place, or a phrase from the scene to reach the passage. Read the whole passage, not only the matching line.

## Rules

- **No facts from memory.** Every line on a card comes from a source you read in this session, or from the notes with their source key.
- **Quotations are exact copies** from text you fetched or a local book, in the original language when the source has it, with our own English after it. Our English is plain and modern: no "thee", "hath", "bade", "brethren", or "wherein". When the only text is an old English translation, copy it exactly and add a line `plain:` with the same passage in plain modern English, checked against the original language if you can reach it. A paraphrase is not a quotation: mark it `paraphrase` and put no quotation marks around it. Never copy a quotation from a WebFetch summary.
- **The original before the edited text.** When the saint's words exist in an original form and in an edited edition, quote the original.
- **Rights.** Copy a testimony passage at length only from a `public-domain` source, or translate it yourself from a public-domain original. From a `facts-only` source, give the facts in your own words and at most one short quotation of 40 words.
- **The exact place and the original words.** Give every fact its source key and its exact place (page, chapter, section, letter, or witness). For each key detail (a name, a number, an action, a word that carries the meaning), copy the short original phrase in the source's language next to our English: `"izdaleka" (indirectly, in a roundabout way)`. Translation errors then show at once. See section 4 of `citations.md`.
- **Save what you fetch.** Fetch with `fetch_text.py <url> --save content-drafts/<slug>/sources/<key>-<short-name>.txt` (add `--grep` as usual). The full text is kept there, and any later call with the same `--save` path reads the file and does not fetch again. Look in `sources/` before you search.
- **Say what the sources do not say.** Story writing tempts a writer to add tears, gestures, rooms, crowds, and weather. If the source is silent on something a writer would expect, write it under "Not in the sources".

## The scene card

Write `content-drafts/<slug>/scenes-<group>.md`. One card per scene:

```
## SC-04 — Christmas night, 1886
- Status: full | thin | not done
- When and where: date, hour if known, place, room.
- Who was there: names and their relation to the saint.
- What happened, in order: short numbered steps, each with a source key, its exact place, and for key details the short original words.
- Details: objects, clothes, food, sounds, the state of the saint's health; only what a source gives.
- Words spoken: each exact quotation with speaker, original language, our English, and locator.
- Inner life: what the saint wrote or said about this moment, about God, or in prayer, with locator.
- Testimony: one passage of 200 words at most, copied exactly, in which the saint or a witness tells this moment. Give speaker, source, locator, and rights.
- What changed: the result of the scene, in one line.
- Not in the sources: what the writer must not add.
- Sources: keys, with any new source in full (author, title, date, language, URL or path, rights).
```

Leave out a line when the sources give nothing for it. Do not fill a card to its limit.

Finish with a report of three lines or fewer: how many cards are full, thin, and not done.
