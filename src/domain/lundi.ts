/**
 * Décision « quoi reprendre lundi » (mode prof) — logique pure, testée.
 *
 * À partir de la statistique de classe, on dégage les deux types d'erreur
 * majoritaires et on propose une reprise collective concrète. Le contenu des
 * consignes est **statique** (table par code) : aucune génération, aucune
 * dépendance réseau, aucune mention culpabilisante envers les élèves.
 */
import { CODES_ERREUR, estPonderee, libelleDe } from './taxonomy'
import type { CodeErreur } from './taxonomy'
import type { StatsClasse } from './types'

/** Plan de reprise proposé au professeur. */
export type PlanLundi = {
  /** Types retenus, triés par fréquence décroissante (1 ou 2 entrées). */
  types: CodeErreur[]
  /** Phrase d'action en français, ton neutre et utile. */
  phrase: string
  /** Consigne d'exercice collectif pour chaque type retenu. */
  exercices: { code: CodeErreur; consigne: string }[]
  /** Part cumulée (0..1) des types retenus dans le total pondéré. */
  partCumulee: number
}

/**
 * Seuil de rétention du deuxième type, exprimé en part du total pondéré.
 *
 * On garde le deuxième type uniquement s'il pèse au moins 20 % des erreurs
 * pondérées de la classe. En dessous, le signal est trop faible pour justifier
 * une reprise en classe entière : on garde donc un unique type majoritaire.
 */
const SEUIL_DEUXIEME_TYPE = 0.2

/** Consignes collectives, une par type — contenu statique, jamais généré. */
const CONSIGNES: Record<(typeof CODES_ERREUR)[number], string> = {
  E01: 'Five expansions with a negative factor, done at the board while naming each sign.',
  E02: 'Three double distributivities where every term in the parentheses is multiplied, checked in pairs.',
  E03: 'Four special products to expand by writing all three terms, including the double product.',
  E04: 'Three sums of fractions over a common denominator, rewriting each adjusted numerator.',
  E05: 'Five equations to solve by discussing the values excluded from the domain before concluding.',
  E06: 'Four power computations to detail by applying each exponent rule, step by step.',
  E07: 'Three root simplifications to justify by keeping each factor under the radical.',
  E08: 'Five equations to transpose by naming the inverse operation applied to each side.',
  E09: 'Three computations kept in exact values until the last step, then rounded once.',
  E10: 'Four word problems to solve by writing the unit on every result and checking conversions.',
  E11: 'Reread the statement aloud before starting, then point to the copied line.',
  E12: 'Two short proofs to complete by writing each logical implication that links the steps.',
}

/** Consigne d'un type retenu ; E99 n'étant jamais retenu, ce repli est défensif. */
function consignePour(code: CodeErreur): string {
  if (code === 'E99') return 'Targeted review with the class.'
  return CONSIGNES[code]
}

/** Total pondéré restreint aux codes effectivement pondérés (hors E11, E99). */
function totalPondereStats(stats: StatsClasse): number {
  return CODES_ERREUR.reduce((somme, code) => somme + (estPonderee(code) ? stats.parType[code] ?? 0 : 0), 0)
}

/** Types pondérés classés par fréquence décroissante, puis ordre de la taxonomie. */
function typesTries(stats: StatsClasse): CodeErreur[] {
  return CODES_ERREUR.filter((code) => estPonderee(code) && (stats.parType[code] ?? 0) > 0).sort(
    (a, b) => (stats.parType[b] ?? 0) - (stats.parType[a] ?? 0),
  )
}

export function quoiReprendreLundi(stats: StatsClasse): PlanLundi {
  const total = totalPondereStats(stats)
  if (total === 0) {
    return { types: [], phrase: 'Nothing to review with the whole class.', exercices: [], partCumulee: 0 }
  }

  const classes = typesTries(stats)
  const premier = classes[0]
  if (!premier) {
    return { types: [], phrase: 'Nothing to review with the whole class.', exercices: [], partCumulee: 0 }
  }

  const second = classes[1]
  const partSecond = second ? (stats.parType[second] ?? 0) / total : 0
  const garderSecond = second !== undefined && partSecond >= SEUIL_DEUXIEME_TYPE

  const types = garderSecond ? [premier, second] : [premier]
  const partCumulee = types.reduce((somme, code) => somme + (stats.parType[code] ?? 0), 0) / total

  const libelles = types.map((code) => libelleDe(code).toLowerCase())
  const phrase =
    libelles.length === 1
      ? `To review on Monday: ${libelles[0]}.`
      : `To review on Monday: ${libelles[0]} and ${libelles[1]}.`

  return {
    types,
    phrase,
    exercices: types.map((code) => ({ code, consigne: consignePour(code) })),
    partCumulee,
  }
}