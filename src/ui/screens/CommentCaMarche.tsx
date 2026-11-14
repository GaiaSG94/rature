import { SOMMAIRE } from '../components/apropos/catalogue'
import { LienSommaire } from '../components/apropos/LienSommaire'
import { SectionPipeline } from '../components/apropos/SectionPipeline'
import { SectionTaxonomie } from '../components/apropos/SectionTaxonomie'
import { SectionGardeFou } from '../components/apropos/SectionGardeFou'
import { SectionConfidentialite } from '../components/apropos/SectionConfidentialite'
import { SectionMesures } from '../components/apropos/SectionMesures'
import { SectionOutilsIA } from '../components/apropos/SectionOutilsIA'
import { SectionLiens } from '../components/apropos/SectionLiens'
import { PanneauSante } from '../components/PanneauSante'

/**
 * Écran « Comment ça marche » : la page qui rend visible la valeur du produit —
 * pipeline et latences mesurées, taxonomie fermée et ses verrous, garde-fou de
 * l'exercice, confidentialité, chiffres sourcés, IA déclarée, liens publics.
 *
 * Chaque section vit dans son propre fichier ; le sommaire et les titres
 * viennent de `catalogue.ts`, donc aucune chaîne n'est recopiée.
 */
export function CommentCaMarche() {
  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">How it works</h1>
        <p className="text-muet">
          From the photo of your corrected paper to the exercise that works exactly on your
          weakness: the pipeline, the 12 error types, the guardrail, your data, and the real
          numbers. Nothing is promised, everything is sourced.
        </p>
      </div>

      <nav aria-label="Contents" className="rounded-2xl border border-bord bg-surface p-4">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muet">Contents</h2>
        <ol className="grid gap-1 sm:grid-cols-2">
          {SOMMAIRE.map((section) => (
            <li key={section.id}>
              <LienSommaire ancre={section.id} titre={section.titre} />
            </li>
          ))}
        </ol>
      </nav>

      <SectionPipeline />
      <SectionTaxonomie />
      <SectionGardeFou />
      <SectionConfidentialite />
      <SectionMesures />
      <PanneauSante />
      <SectionOutilsIA />
      <SectionLiens />
    </div>
  )
}
