# The title "Saint"

The owner's rule (2026-10-05): "Anytime we are referring to a saint, we need to say Saint Nicholas. It would be disrespectful to refer to them without the word Saint."

## The rule

- **Every time a text names a saint, write "Saint" before the name:** "Saint Augustine", "Saint Augustine's mother, Saint Monica". This applies to the saint of the page and to every other saint the text names, in the body text, the headings, the summary, and the `<cite>` lines of block quotes.
- **Spell it out:** "Saint", not "St" or "St.". Names of churches and places keep their usual form ("St. Peter's Basilica" or "Saint Peter's Basilica" are both fine).
- **Use the saint's name, with the title, in every period of the life,** childhood included: "Saint Seraphim was ten when he fell ill", not "the boy Prokhor". Give the birth name once, as a fact: "He was born Prokhor Moshnin." Before a saint took a religious name, "Saint Francis" is still right.
- **"He" and "she" are fine.** The rule is about the name, not every reference.
- **Who is a saint:** a person the Church that venerates the saint of the page honors as a saint, including the apostles ("Saint Peter"). The Mother of God keeps her own titles ("the Mother of God", "the Virgin Mary"). A person declared Blessed is "Blessed" ("Blessed Angela"). Old Testament figures keep their names ("Moses", "the prophet Elijah").
- **Check before you add the title.** Many saints share names with people who are not saints: Pope Benedict XVI, Pope Francis, Pope Leo XIV, Thomas of Celano, Brother Elias, the Emperor Constantine (a saint in the Orthodox Church, not in the Catholic calendar). When you are not sure, leave the name plain and list it in your report.
- **Never change words inside quotation marks or block quotes,** the titles of works, or the sources list. A quotation keeps its own wording.

## The pass (for texts written before the rule)

Copy each file to `<file>.before-titles`. Then go through `biography.html`, `summary.txt`, `miracles.html`, and `teachings.html` (each that exists) and apply the rule above. Do not change anything else. Run the check script on each HTML file (with `--kind miracles` or `--kind teachings` where it fits) and keep it free of MUST FIX lines; split a sentence that the title pushes over 30 words. Report the names you left plain because you were not sure.

**Popular names.** When the world knows a saint by another name, use the Church's name with "Saint" in the text, and say once, early, how the world knows the saint. The owner's choice for Padre Pio (2026-10-05): "Saint Pio", with "The world still knows him as Padre Pio, which is Italian for Father Pio." in the biography, and the same point once in the summary and the miracle list.
