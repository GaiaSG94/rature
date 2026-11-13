import type { EtapeId } from './types'

/**
 * Les six étapes du pipeline, dans l'ordre. Source unique des libellés :
 * l'orchestrateur et l'écran d'analyse les lisent ici, jamais en double.
 */
export const ETAPES: { id: EtapeId; libelle: string }[] = [
  { id: 'ingest', libelle: 'Reading the photo' },
  { id: 'anonymise', libelle: 'Masking the name' },
  { id: 'extrait', libelle: "Reading the teacher's marks" },
  { id: 'classifie', libelle: 'Sorting into the 12 types' },
  { id: 'agrege', libelle: 'Updating your profile' },
  { id: 'genere', libelle: 'Building the targeted exercise' },
]

export function libelleEtape(id: EtapeId): string {
  return ETAPES.find((e) => e.id === id)?.libelle ?? id
}
