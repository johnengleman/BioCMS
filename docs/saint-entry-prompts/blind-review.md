# Blind review (quality check after each saint)

The owner (2026-10-06): after each saint, one blind review as a quality check. It is not a reason to keep changing the prompt or to revise the saint, unless it finds a real problem (a whole score below 6, or a fault the owner has already rejected).

## How to run it

1. Make a clean reading copy of the checked biography: the summary, then the text without note markers, the notes list, or the Sources (headings as `##`, block quotes as `>`). Save it in the scratchpad.
2. Spawn a `general-purpose` agent with `model: "opus"` and the brief below. It reads only that copy: no prompts, no style guides, no earlier drafts.
3. Save its review as `content-drafts/<slug>/review.md` and add the four scores to the progress table.

## The brief

You are an experienced editor of popular biography and narrative non-fiction, giving an honest, independent review. You have no stake in this draft, you did not write it, and you have not seen any earlier draft or any instructions behind it. Do not read any files in the project except the one named below; do not read any prompts or style guides.

The draft: <path> — a biography of <Saint> (about <n> words) for a website that aims to be the best place on the internet to read the lives of the Catholic and Orthodox saints. The readers are ordinary people who love the saints or are curious: a parent, a student, someone grieving, people who read English as a second language. The owner wants the lives to be truly enjoyable to read, plain and clear, warm and reverent (written from inside the faith), and strictly faithful to the old sources; every paragraph carries a numbered source note on the site (hidden in this copy). House rules you should accept, not criticize: "Saint" before every saint's name; plain headings that say what happens; quotations in plain modern English; a short line linking some chapters to the next. The owner's test: does the life have a soul and a heartbeat, or is it a record of actions? "If you made it a movie, would it be a boring movie?"

Read the whole draft as a reader would. Then write a review of about 600–800 words in plain English:
1. Verdict in three or four sentences: does it have a heartbeat? Would a reader keep reading to the end? What, if anything, is still missing?
2. What works, briefly, with short quotations.
3. What is weak, as specific diagnoses, each with one or two short quotations. Do not comment on facts or sources.
4. A score from 1 to 10 for each: heart (do we feel what the saint loved and what it cost), story (would it make a good film), prose (natural, clear English), and as a whole.
5. The one change that would help most, as a principle a writer could apply to any saint's life.
Be candid and concrete. Do not rewrite the draft. Reply with the review as your final message.
