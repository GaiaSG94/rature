/**
 * Contenu pédagogique par type d'erreur — lot 4.
 *
 * Statique, zéro appel API : chaque type reçoit une explication courte, le
 * geste concret qui l'évite, un mini-exemple faux et sa version juste, et le
 * piège voisin qui lui ressemble. C'est ce qui transforme un diagnostic en
 * apprentissage — l'argument pédagogique du projet. Ton bienveillant, jamais
 * culpabilisant. Contenu en anglais (le produit est en anglais).
 */
import { CODES_ERREUR, libelleDe } from './taxonomy'
import type { CodeErreur } from './taxonomy'

export type ExplicationType = {
  code: (typeof CODES_ERREUR)[number]
  titre: string
  pourquoi: string
  geste: string
  exemple: string
  contreExemple: string
  piege: string
}

const CONTENU: Record<(typeof CODES_ERREUR)[number], Omit<ExplicationType, 'code' | 'titre'>> = {
  E01: {
    pourquoi: 'A negative factor spread over parentheses flips every sign; one is often forgotten.',
    geste: 'Write each product on its own before reducing, and circle the sign that changes.',
    exemple: '-2(3x - 5) = -6x - 10',
    contreExemple: '-2(3x - 5) = -6x + 10',
    piege: "Don't confuse it with E08: here the maths is right, only the sign moves.",
  },
  E02: {
    pourquoi: 'Distributivity stops at the first term: a factor must multiply every term inside the parentheses.',
    geste: 'Underline each term inside the parentheses and check it received the factor.',
    exemple: '5(2x + 3) = 10x + 3',
    contreExemple: '5(2x + 3) = 10x + 15',
    piege: 'Close to E03: here it is a plain product, not a special product.',
  },
  E03: {
    pourquoi: '(a+b)² is not a²+b²: the double product 2ab is missing, and its sign matters.',
    geste: 'Say the formula out loud: square, double product, square — then substitute.',
    exemple: '(x + 3)² = x² + 9',
    contreExemple: '(x + 3)² = x² + 6x + 9',
    piege: 'Close to E02: here it is a special product, not plain distributivity.',
  },
  E04: {
    pourquoi: 'Numerators and denominators are added instead of finding a common denominator.',
    geste: 'Find the common denominator, adjust each numerator, then add only across the top.',
    exemple: '1/3 + 1/4 = 2/7',
    contreExemple: '1/3 + 1/4 = 4/12 + 3/12 = 7/12',
    piege: 'Close to E08: here the common denominator step is missing.',
  },
  E05: {
    pourquoi: 'A forbidden value (division by zero, root of a negative) was not discussed.',
    geste: 'Before concluding, ask: for which values does this not make sense?',
    exemple: 'f(x) = (x+1)/(x-2), Df = ℝ',
    contreExemple: 'f(x) = (x+1)/(x-2), Df = ℝ \\ {2}',
    piege: 'Close to E12: here a value is forgotten, not a reasoning step.',
  },
  E06: {
    pourquoi: 'An exponent applies to the whole factor, and the rules xᵃ·xᵇ = xᵃ⁺ᵇ get confused.',
    geste: 'Circle the exact base the exponent applies to before computing.',
    exemple: '(2x²)³ = 2x⁶',
    contreExemple: '(2x²)³ = 8x⁶',
    piege: 'Close to E07: here it is a power, not a root.',
  },
  E07: {
    pourquoi: 'The root of a sum is not the sum of the roots: √(a+b) ≠ √a + √b.',
    geste: 'First compute what is under the root, then take the root.',
    exemple: '√(9 + 16) = 3 + 4',
    contreExemple: '√(9 + 16) = √25 = 5',
    piege: 'Close to E06: here it is a root, not a power.',
  },
  E08: {
    pourquoi: 'Moving a term across the equals sign, the inverse operation is forgotten (adding instead of subtracting).',
    geste: 'Write the inverse operation applied to BOTH sides before simplifying.',
    exemple: '3x + 4 = 10 so 3x = 14',
    contreExemple: '3x + 4 = 10 so 3x = 10 - 4 = 6',
    piege: 'Close to E12: here the algebraic step is wrong, not just omitted.',
  },
  E09: {
    pourquoi: 'Rounding too early propagates the error; the exact value is lost before the end.',
    geste: 'Keep the exact value (fraction, root) until the last step, round only at the end.',
    exemple: 'v = 100/3 = 33 so d = 33 × 7 = 231',
    contreExemple: 'v = 100/3 so d = (100/3) × 7 = 700/3 ≈ 233.3',
    piege: 'Close to E10: here it is precision, not the unit.',
  },
  E10: {
    pourquoi: 'The result is given with no unit, or the conversion between units is inconsistent.',
    geste: 'Write the unit on every result and check consistency before concluding.',
    exemple: 'd = 231',
    contreExemple: 'd = 231 m',
    piege: 'Close to E09: here the unit is missing, not the precision.',
  },
  E11: {
    pourquoi: 'The maths is right but the statement was miscopied: carelessness, not a gap.',
    geste: 'Reread the copied statement before computing; circle the data carried over.',
    exemple: 'statement 2x+7 copied 2x+3',
    contreExemple: 'statement 2x+7 copied 2x+7',
    piege: "Don't confuse it with E12: here the reasoning is sound, only the copied statement differs.",
  },
  E12: {
    pourquoi: 'The reasoning is sound but a logical step is missing, or a claim is not proven.',
    geste: 'Write the "so" or "because" that links each step: the reader must be able to follow.',
    exemple: 'f(x)=0 so x=-1',
    contreExemple: 'f(x)=0 ⇔ x+1=0 ⇔ x=-1',
    piege: 'Close to E05: here it is the justification, not a forgotten value.',
  },
}

export function explicationDe(code: CodeErreur): ExplicationType | null {
  if (code === 'E99') return null
  const contenu = CONTENU[code]
  if (!contenu) return null
  return { code, titre: libelleDe(code), ...contenu }
}

export function glossaire(): ExplicationType[] {
  return CODES_ERREUR.map((code) => explicationDe(code)!).filter((e) => e !== null)
}
