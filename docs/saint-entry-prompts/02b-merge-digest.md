# Stage 2b — Merge the dossier into digests

Use this prompt after all stage 2 research parts are finished. A large dossier holds thousands of cards, which is too much for one agent. So the cards stay where they are (their IDs are already unique, for example F-EW-0123 or F-OW-0456), and parallel agents write **digests** that the outline agent can read.

## Preparation (the coordinator)

Sort the fact cards into life periods by year:

```bash
python3 /Users/nicholas/Desktop/saints-website/BioCMS/scripts/saint-entry/split_cards.py content-drafts/<slug>/02-dossier "P1:1600-1876,P2:1877-1886,…"
```

Choose periods that follow the turning points of this life. Aim for no more than about 90,000 words for each period. The script writes `02-dossier/_by-period/<label>.md` and a file `undated.md`.

Then spawn these agents in parallel:

- one **period agent** for each period file
- one **character agent** for `undated.md`
- one **miracles agent**
- one **quotations and scenes agent**

## Period agent

Read your period file in chunks of about 100 cards. Write `02-dossier/digest/<label>.md` as you go, and save after each chunk.

1. **Events.** Group the cards into events. Several witnesses often describe the same event, and that is one event. Write each event in time order:

```
### E-P4-012 — 23–27 Jun 1888 — Louis Martin disappears to Le Havre
- What happened: 2–4 plain sentences that combine all the sources.
- Cards: F-LF-0201, F-EW-1333, F-OW-0450
- Best details: the most concrete and human details, one line each, with its card.
- Evidence: the source types (own writing, eyewitness, official, later Life) and the confidence.
- Conflicts: where the cards disagree, with both versions and the cards.
- New to English readers: yes | partial | no
- Scene potential: high | medium | low, and why in one line.
```

2. **Keep the details.** A digest that drops the vivid details defeats its purpose. Keep every detail that is specific, surprising, funny, or moving, with its card.
3. **Do not invent.** Combine what the cards say. Add nothing else.
4. **At the top of the file,** after you finish, write a period summary: the turning points, the five best scenes (with event IDs), the five best "new to English" facts, the people who matter in this period, and the open conflicts.

## Character agent (undated cards)

The undated cards are mostly about character and daily life. Write `digest/character.md`, grouped by theme: temperament, humor, faults and struggles, habits and daily work, prayer, relationships (one heading for each important person), how others saw the saint (admirers and critics), and the body and health. Use the same rules as above: combine duplicates, keep the vivid details with their cards, and invent nothing.

## Miracles agent

Merge all the `parts/*/miracles.md` files into `02-dossier/miracles.md`:

- Combine entries that describe the same event. Keep every witness's card ID and note where the witnesses differ.
- Group the entries: approved by the Church, investigated, during life, and after death. Order each group by date.
- Keep the status and the medical facts of every entry exactly.
- Number the merged entries M-001, M-002, and so on, and list the source entry IDs in each one.
- At the top, give the counts for each group.

## Quotations and scenes agent

- Merge all the `quotations.md` files into `02-dossier/quotations.md`. Remove exact duplicates. Keep the original language, our translation, the locator, and the rights label. Mark quotations that a part flagged as "not matching the source" as `re-check`. At the top, rank the 40 quotations that best show the person.
- Merge all the `scenes.md` files into `02-dossier/scenes.md`. Remove duplicates, and rank the 25 strongest scenes. Each scene keeps its cards.
- Merge the `works.md` files into `02-dossier/works.md`.
- Collect every card and note about **connections to other saints** into `02-dossier/connections.md`, and every **surprise** into `02-dossier/surprises.md`.
- Merge the `gaps-and-conflicts.md` files into `02-dossier/gaps-and-conflicts.md`, and the `sources.md` files into `02-dossier/sources.md`.

## Rules for all agents

- Never change or renumber the cards in `parts/`. The digests point to them.
- Save to disk often.
- Copy dates, names, numbers, and quotations exactly from the cards.
- Finish with a short report: what you wrote, the counts, and anything a later stage must know.
