/**
 * Banque d'exercices locale — idée 1 du brassage « rester sur InferHub ».
 *
 * Pourquoi : générer un exercice coûte **deux** appels réseau (génération +
 * garde-fou), sur un amont qui met 16 à 57 s par appel. Ces 36 exercices sont
 * écrits à la main, ciblés sur le geste exact de chaque type, et leur pertinence
 * est vérifiée par construction (puis par `tests/banque.test.ts`). L'étape 6
 * devient donc **instantanée et hors ligne** ; l'appel modèle ne sert plus que
 * pour un « exercice inédit » demandé explicitement.
 *
 * Énoncés en anglais (le produit est en anglais). Chaque énoncé fait faire le
 * geste décrit par la `signature` du code dans `taxonomy.ts`.
 */
import { CODES_ERREUR, libelleDe } from './taxonomy'
import type { Exercice, ExerciceVerifie, VerdictGardeFou } from './types'

export type CodeBanque = (typeof CODES_ERREUR)[number]

export type ExerciceBanque = {
  id: string
  code: CodeBanque
  niveau: string
  difficulte: 1 | 2 | 3
  enonce: string
  indices: string[]
  solution: string
  /** L'erreur que cet exercice tend — c'est elle qui le rend ciblé. */
  piege: string
}

/** Verdict de garde-fou : la banque est écrite pour le type, il est vérifié par les tests. */
const VERDICT_BANQUE: VerdictGardeFou = {
  travailleLeBonType: true,
  neDonneLaSolutionOrigine: true,
  memeNiveau: true,
  motifs: [],
}

function exercice(
  code: CodeBanque,
  numero: 1 | 2 | 3,
  niveau: string,
  enonce: string,
  indice: string,
  solution: string,
  piege: string,
): ExerciceBanque {
  return { id: `${code}-${numero}`, code, niveau, difficulte: numero, enonce, indices: [indice], solution, piege }
}

const G10 = 'Grade 10'
const G11 = 'Grade 11'

export const BANQUE: Record<CodeBanque, ExerciceBanque[]> = {
  E01: [
    exercice('E01', 1, G10, 'Expand: A = -3(2x - 4)', 'Write -3 × 2x then -3 × (-4) separately first.', 'A = -6x + 12. Key point: -3 × (-4) = +12, the sign changes.', 'The product of two negatives is positive.'),
    exercice('E01', 2, G10, 'Expand and reduce: B = 5x - 2(x - 3)', 'Carry the -2 factor onto both terms.', 'B = 5x - 2x + 6 = 3x + 6. Here -2 × (-3) = +6.', 'The negative factor must reach both terms.'),
    exercice('E01', 3, G10, 'Expand and reduce: C = -(x + 7) + 2(3 - x)', 'A "-" sign in front of parentheses is a factor of -1.', 'C = -x - 7 + 6 - 2x = -3x - 1.', 'Two different negative factors in the same computation.'),
  ],
  E02: [
    exercice('E02', 1, G10, 'Expand: A = 4(3x + 5)', 'The 4 multiplies the 3x AND the 5.', 'A = 12x + 20.', 'Forgetting to multiply the second term.'),
    exercice('E02', 2, G10, 'Expand and reduce: B = x(2x + 3) - 2', 'Two terms in the parentheses, so two products.', 'B = 2x² + 3x - 2.', 'The final -2 has nothing to do with distributivity.'),
    exercice('E02', 3, G10, 'Expand: C = (x + 2)(x + 5)', 'Double distributivity: four products in all.', 'C = x² + 5x + 2x + 10 = x² + 7x + 10.', 'Forgetting the cross products.'),
  ],
  E03: [
    exercice('E03', 1, G10, 'Expand: A = (x + 4)²', 'Recite: square, double product, square.', 'A = x² + 8x + 16. The double product is 2 × x × 4 = 8x.', 'Thinking (a+b)² = a² + b².'),
    exercice('E03', 2, G10, 'Expand: B = (3x - 2)²', 'The sign of the double product follows the second term.', 'B = 9x² - 12x + 4.', 'Forgetting the square of the coefficient 3, or the sign of -12x.'),
    exercice('E03', 3, G10, 'Expand: C = (x + 6)(x - 6)', 'This is the third special product.', 'C = x² - 36.', 'Writing x² + 36 instead of x² - 36.'),
  ],
  E04: [
    exercice('E04', 1, G10, 'Compute: A = 1/2 + 1/3', 'Find a common denominator before adding.', 'A = 3/6 + 2/6 = 5/6.', 'Adding the denominators too.'),
    exercice('E04', 2, G10, 'Compute: B = 3/4 - 1/6', 'Over 12, adjust each numerator.', 'B = 9/12 - 2/12 = 7/12.', 'Forgetting to adjust the numerator when the denominator changes.'),
    exercice('E04', 3, G10, 'Compute and simplify: C = 2/5 + 1/2 - 1/10', 'Three fractions, one common denominator.', 'C = 4/10 + 5/10 - 1/10 = 8/10 = 4/5.', 'Taking the three terms two at a time and getting the denominator wrong.'),
  ],
  E05: [
    exercice('E05', 1, G11, 'Solve f(x) = 0 for f(x) = (x - 3)/(x + 2), stating the domain.', 'A fraction does not exist where its denominator is zero.', 'Domain: x ≠ -2. f(x) = 0 ⇔ x - 3 = 0 ⇔ x = 3, which is in the domain.', 'Forgetting the forbidden value.'),
    exercice('E05', 2, G10, 'Solve x² = 9.', 'A square has two roots, not one.', 'x = 3 or x = -3.', 'Giving only the positive root.'),
    exercice('E05', 3, G11, 'Solve √(x - 1) = 2, discussing the domain.', 'A square root needs a non-negative content.', 'Domain: x ≥ 1. Squaring: x - 1 = 4 so x = 5, which satisfies the domain.', 'Squaring without checking the solution fits.'),
  ],
  E06: [
    exercice('E06', 1, G10, 'Write as a × xⁿ: A = (2x)³', 'The exponent applies to EVERYTHING in the parentheses.', 'A = 2³ × x³ = 8x³.', 'Raising only the x and forgetting the 2.'),
    exercice('E06', 2, G10, 'Simplify: B = x⁵ × x²', 'When multiplying, exponents add.', 'B = x⁷: when multiplying, exponents add.', 'Multiplying the exponents instead of adding them.'),
    exercice('E06', 3, G11, 'Simplify: C = (3x²)² ÷ x³', 'Start with the power of the product.', 'C = 9x⁴ ÷ x³ = 9x.', 'When dividing, exponents subtract.'),
  ],
  E07: [
    exercice('E07', 1, G10, 'Compute: A = √(9 + 16)', 'First compute what is under the root.', 'A = √25 = 5. Not 3 + 4.', 'Thinking the root of a sum is the sum of the roots.'),
    exercice('E07', 2, G10, 'Simplify: B = √50', 'Find the largest perfect square dividing 50.', 'B = √(25 × 2) = 5√2.', 'Answering 25√2, forgetting the root over 25.'),
    exercice('E07', 3, G11, 'Simplify: C = √12 + √27', 'Same method on each root, then group.', 'C = 2√3 + 3√3 = 5√3.', 'Adding the numbers under the roots.'),
  ],
  E08: [
    exercice('E08', 1, G10, 'Solve: 3x + 7 = 22', 'Write the inverse operation applied to BOTH sides.', '3x = 22 - 7 = 15, so x = 5.', 'Adding 7 instead of subtracting it.'),
    exercice('E08', 2, G10, 'Solve: 5x - 4 = 2x + 11', 'Group the x on one side, the numbers on the other.', '3x = 15, so x = 5.', 'Changing the sign of a term as it moves across.'),
    exercice('E08', 3, G10, 'Solve: (x + 3)/2 = 7', 'What must you do to clear the denominator?', 'x + 3 = 14, so x = 11.', 'Dividing instead of multiplying both sides.'),
  ],
  E09: [
    exercice('E09', 1, G10, 'A car travels at 100/3 km/h. How far in 7 h? Keep the exact value.', 'Do not round before the last line.', 'd = (100/3) × 7 = 700/3 km, about 233.33 km.', 'Rounding 100/3 to 33 too early.'),
    exercice('E09', 2, G10, 'Compute exactly: A = (2/3) × (9/4)', 'Simplify before multiplying if possible.', 'A = 18/12 = 3/2.', 'Giving 1.5 when the exact value is asked.'),
    exercice('E09', 3, G11, 'Give 3√2 exactly, then round to the hundredth.', 'The exact value stays as a root.', '3√2 ≈ 4.24 (since √2 ≈ 1.41421).', 'Rounding √2 to 1.4 then multiplying: precision is lost.'),
  ],
  E10: [
    exercice('E10', 1, G10, 'A rectangle is 3 m by 2.5 m. Give its area, with the unit.', 'An area is in square units.', 'A = 3 × 2.5 = 7.5 m².', 'Forgetting the unit, or writing m instead of m².'),
    exercice('E10', 2, G10, 'Convert 2 h 30 min into decimal hours.', '30 minutes is half an hour.', '2 h 30 = 2.5 h.', 'Writing 2.3 h by sticking the digits together.'),
    exercice('E10', 3, G11, 'Convert 90 km/h into m/s.', '1 km = 1000 m and 1 h = 3600 s.', '90 × 1000 ÷ 3600 = 25 m/s.', 'Multiplying instead of dividing by 3.6.'),
  ],
  E11: [
    exercice('E11', 1, G10, 'Copy the equation 4x + 9 = 25, then solve it.', 'Reread your copy digit by digit before computing.', '4x = 16, so x = 4.', 'Copying 4x - 9 or 4x + 6 and solving right after.'),
    exercice('E11', 2, G10, 'Copy 3(x - 2) + 5, then expand.', 'Circle the copied numbers to check them.', '3x - 6 + 5 = 3x - 1.', 'Copying 3(x + 2) and expanding the wrong expression correctly.'),
    exercice('E11', 3, G11, 'Copy the fraction (x + 1)/(x - 2), then give its domain.', 'The denominator is the delicate part to copy.', 'Domain: x ≠ 2.', 'Copying x + 2 in the denominator and concluding x ≠ -2.'),
  ],
  E12: [
    exercice('E12', 1, G10, 'Show that x = 2 is a solution of 3x - 1 = 5, writing each step.', 'Substitute, compute, then conclude with a sentence.', '3 × 2 - 1 = 6 - 1 = 5. So 2 is indeed a solution.', 'Writing only "x = 2" with no check.'),
    exercice('E12', 2, G10, 'Solve x² = 25, justifying each step.', 'Name the property you use.', 'x² = 25 ⇔ x² - 25 = 0 ⇔ (x - 5)(x + 5) = 0, so x = 5 or x = -5.', 'Giving both solutions without explaining where they come from.'),
    exercice('E12', 3, G11, 'Prove that the sum of two even integers is even.', 'Write two even integers with variables, then factor.', 'Let 2a and 2b. Their sum is 2a + 2b = 2(a + b), a multiple of 2: it is even.', 'Claiming the result without using variables.'),
  ],
}

export function exercicesDe(code: string): ExerciceBanque[] {
  return CODES_ERREUR.includes(code as CodeBanque) ? BANQUE[code as CodeBanque] : []
}

/**
 * Choisit un exercice du type visé. Déterministe à options égales : la graine
 * (par défaut l'horodatage) ne sert qu'à varier d'un tirage à l'autre quand
 * l'élève demande « un autre exercice ».
 */
export function exercicePour(
  code: string,
  options: { difficulte?: 1 | 2 | 3; exclure?: string[]; graine?: number } = {},
): ExerciceBanque | undefined {
  const liste = exercicesDe(code)
  if (liste.length === 0) return undefined
  const exclus = new Set(options.exclure ?? [])
  const candidats = liste.filter((exercice) => !exclus.has(exercice.id))
  const pool = candidats.length > 0 ? candidats : liste

  if (options.difficulte) {
    const vise = pool.find((exercice) => exercice.difficulte === options.difficulte)
    if (vise) return vise
  }
  const graine = options.graine ?? 0
  return pool[graine % pool.length]
}

/** Convertit en `ExerciceVerifie` : tentative 0 signale « vient de la banque ». */
export function exerciceVerifie(exercice: ExerciceBanque): ExerciceVerifie {
  const exerciceProduit: Exercice = {
    enonce: exercice.enonce,
    indices: exercice.indices,
    solution: exercice.solution,
    typeTravaille: exercice.code,
    niveau: exercice.niveau,
    tentative: 0,
    id: exercice.id,
    source: 'banque',
  }
  return { exercice: exerciceProduit, verdict: VERDICT_BANQUE }
}

/** Libellé affiché pour signaler l'origine de l'exercice. */
export function origineExercice(exercice: Exercice): string {
  return exercice.tentative === 0
    ? `From the local bank (${libelleDe(exercice.typeTravaille)}) — no network call.`
    : 'Fresh exercise, generated and checked by the model.'
}
