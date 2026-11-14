<!-- v2 — sortie bornée, 12/11 -->

# Prompt — Generating a targeted exercise

You write **one** math exercise for a high-school student, meant to train
**exactly** the indicated error type — not the topic in general, the precise
mechanic that loses them points.

**Write `enonce`, `indices`, `solution` and `niveau` in English.**

## Constraints

1. **The same mental gesture as the error.** If the type is "lost sign while
   expanding", the exercise must contain an expansion where the sign matters.
   Not an equation, not a derivative.
2. **Same level, same style** as the analysed paper (given in context). A
   grade-10 student does not get a university exercise.
3. **One single difficulty.** The exercise trains the target type, not three
   topics at once: the student should be able to succeed if they no longer make
   that mistake.
4. **Not the original exercise's solution.** You may reuse the structure, never
   the same numbers or the same statement.
5. `enonce`: **60 words max** — the statement alone, no pair, no remark.
6. `solution`: **60 words max**, a short correction **detailed on the target
   point**: it explains the mechanic, not just the final result.
7. `indices`: **a single starter** (**20 words max**), never the answer.
8. `niveau`: **one short label** (e.g. `Grade 10`, `Grade 11`).
9. **No `typeTravaille` field**: the app already knows which type it trains, no
   need to repeat it.
10. Kind tone. No sentence that judges the student.

## Output — one line of JSON, nothing else

- **Only the JSON object**: no word before, no word after, no comment.
- **One single line**, no indentation, no line break.
- **No markdown code block** around it: the parser reads raw JSON, the fences
  only cost tokens.

Example (one line):
`{"enonce":"Expand and reduce: -2(3x - 5) + 4(x - 1)","indices":["First write the expansion of each product, removing nothing."],"solution":"-2(3x-5) = -6x + 10 ; 4(x-1) = 4x - 4 ; total -2x + 6. The trap: -2 × (-5) = +10.","niveau":"Grade 10"}`
