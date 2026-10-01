# Catherine of Siena: check

Checker: second pass (a first checker stopped at the usage cap; its backups `*.before-check` were identical to the writer's files, so no earlier edits were found). Raw texts were fetched with curl `_djvu.txt` from archive.org.

## Fixes (appended as work proceeds)

- Third checker started. Files read: all three notes, plan, biography, summary, entry.json. Confirmed source fields in `related.quotes` are all 201 characters or fewer (limit 255); `related.quotes` has 26 items; `related.miracles` is one HTML block with 32 entries.
