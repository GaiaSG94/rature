/**
 * Sommaire unique de l'écran « Comment ça marche ».
 *
 * Chaque section lit ici son ancre et son titre ; l'écran y lit son sommaire.
 * Aucune chaîne n'est recopiée d'un fichier à l'autre : ajouter une section,
 * c'est ajouter une entrée ici.
 */
export const SECTIONS = {
  pipeline: { id: 'pipeline', titre: 'The pipeline, step by step' },
  taxonomie: { id: 'taxonomie', titre: 'The 12 error types' },
  gardeFou: { id: 'garde-fou', titre: 'The exercise guardrail' },
  confidentialite: { id: 'confidentialite', titre: 'Your data: the five rules' },
  mesures: { id: 'mesures', titre: 'The real numbers, measured' },
  outilsIA: { id: 'outils-ia', titre: 'AI in the product, AI in the code' },
  liens: { id: 'liens', titre: 'Going further' },
} as const

export type SectionDef = (typeof SECTIONS)[keyof typeof SECTIONS]

/** Ordre d'affichage : l'ordre de déclaration ci-dessus. */
export const SOMMAIRE: readonly SectionDef[] = Object.values(SECTIONS)
