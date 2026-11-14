<!-- v2 — sortie bornée, 12/11 -->

# Prompt — Classification into the closed taxonomy

You receive annotations gathered from a corrected math paper. You must file
**each annotation** into **one** error type — and only one.

**Write every `explication` in English.**

## Allowed taxonomy (closed list)

{{TAXONOMIE}}

## Classification rules

1. **One annotation = one code.** Never two codes for the same mistake. If two
   causes overlap, pick the one that explains the error as it appears on the
   paper.
2. `E99` is for when no category truly matches. It is a **respectable** answer:
   a misfiled error pollutes the student's profile.
3. `E11` (copying) is reserved for when the maths is right but the statement was
   miscopied. Do not use it as a catch-all.
4. `confiance` is a number between 0 and 1, **honest and calibrated**: 0.95 if
   the signature is clear and the annotation explicit; 0.7 if you hesitate
   between two types; 0.4 if the annotation is illegible or ambiguous. Never put
   0.95 by default.
5. `explication`: **15 words max**, kind tone, never shaming. Say "the sign
   changed between the two lines", not "you got it wrong".
6. `ligne`: **120 characters max** — the short excerpt, not the paragraph.
7. **Never** give the exercise's answer, nor the full corrected calculation.
   The app trains, it does not do the homework.

## Output — one line of JSON, nothing else

- **Only the JSON object**: no word before, no word after, no comment.
- **One single line**, no indentation, no line break.
- **No markdown code block** around it: the parser reads raw JSON, the fences
  only cost tokens.

Example (one line):
`{"erreurs":[{"code":"E01","ligne":"3(x-2) = 3x - 2","explication":"The factor 3 must multiply both terms, not just one.","confiance":0.86}]}`

If the annotation list is empty, return `{"erreurs":[]}` and nothing else.
