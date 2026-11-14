/**
 * Exports (RF-21 CSV du profil, RF-22 fiche de révision Markdown).
 * Logique pure : aucune dépendance au DOM, testée dans `tests/export.test.ts`.
 */
import { libelleDe } from '../domain/taxonomy'
import type { CodeErreur } from '../domain/taxonomy'
import { classement, phraseSynthese, pourcentage, typeDominant } from '../domain/profil'
import type { Diagnostic, Profil, StatsClasse } from '../domain/types'

function csvCell(valeur: string | number): string {
  const texte = String(valeur)
  return /[",\n;]/.test(texte) ? `"${texte.replace(/"/g, '""')}"` : texte
}

/** Profil → CSV (séparateur `;`, attendu par les tableurs francophones). */
export function profilEnCsv(profil: Profil): string {
  const lignes: string[] = ['code,label,count,percent']
  for (const entree of classement(profil)) {
    lignes.push(
      [
        csvCell(entree.code),
        csvCell(libelleDe(entree.code)),
        csvCell(entree.n),
        csvCell(pourcentage(entree.part)),
      ].join(','),
    )
  }
  lignes.push(`total,,${classement(profil).reduce((s, e) => s + e.n, 0)},100`)
  return lignes.join('\n')
}

/** Fiche de révision Markdown : le type dominant, ce qu'il veut dire, 3 conseils. */
export function ficheEnMarkdown(profil: Profil, diagnostics: Diagnostic[]): string {
  const dominant = typeDominant(profil)
  const date = new Date().toISOString().slice(0, 10)
  const lignes: string[] = [`# My Errata sheet — ${date}`, '']

  if (!dominant) {
    lignes.push('No recurring mistake yet. Add a corrected paper.')
    return lignes.join('\n')
  }

  lignes.push(
    `**${phraseSynthese(profil)}.**`,
    '',
    `Type dominant : \`${dominant}\` — ${libelleDe(dominant)}.`,
    '',
    '## What to work on',
    '',
  )
  for (const entree of classement(profil).slice(0, 3)) {
    lignes.push(`- **${libelleDe(entree.code)}** — ${entree.n} time(s), ${pourcentage(entree.part)}% of your mistakes.`)
  }

  lignes.push('', '## My recent papers', '')
  for (const diagnostic of diagnostics.slice(-5).reverse()) {
    const types = diagnostic.erreurs.map((e) => libelleDe(e.code)).join(', ')
    lignes.push(`- ${diagnostic.createdAt.slice(0, 10)} — ${diagnostic.nbFautes} mistake(s): ${types || 'none'}`)
  }

  lignes.push('', '_Generated locally by Errata. No paper is ever stored._')
  return lignes.join('\n')
}

/** Statistique de classe → CSV (RF-21 côté professeur). */
export function statsEnCsv(stats: StatsClasse): string {
  const total = Object.values(stats.parType).reduce((somme, n) => somme + n, 0)
  const lignes: string[] = ['papers,code,label,count,percent']
  for (const [code, n] of Object.entries(stats.parType)) {
    if (n === 0) continue
    const part = total === 0 ? 0 : Math.round((n / total) * 100)
    lignes.push(
      [csvCell(stats.nbCopies), csvCell(code), csvCell(libelleDe(code as CodeErreur)), csvCell(n), csvCell(part)].join(','),
    )
  }
  return lignes.join('\n')
}

export function nomFichierDate(prefixe: string, extension: string): string {
  const iso = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  return `${prefixe}-${iso}.${extension}`
}
