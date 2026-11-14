import { useRature } from '../../etat/useRature'
import type { Ecran } from '../../etat/useRature'

const LIENS: { ecran: Ecran; libelle: string }[] = [
  { ecran: 'accueil', libelle: 'Paper' },
  // Entrée directe : sans elle, le diagnostic et l'exercice n'étaient atteignables
  // qu'en sortant d'une analyse — invisibles après la démonstration complète.
  { ecran: 'diagnostic', libelle: 'Diagnosis' },
  { ecran: 'profil', libelle: 'Profile' },
  { ecran: 'prof', libelle: 'Teacher' },
  { ecran: 'apropos', libelle: 'How it works' },
  { ecran: 'reglages', libelle: 'Settings' },
]

/** Badge discret : l'analyse continue pendant que l'utilisateur navigue. */
function BadgeAnalyse() {
  const { occupe, diagnosticPret, aller, ecran } = useRature()
  if (ecran === 'analyse') return null
  if (occupe) {
    return (
      <button
        type="button"
        onClick={() => aller('analyse')}
        className="etape-en-cours rounded-full border border-jaune/60 px-3 py-1 text-xs text-jaune"
      >
        Analysing…
      </button>
    )
  }
  if (diagnosticPret) {
    return (
      <button
        type="button"
        onClick={() => aller('diagnostic')}
        className="rounded-full border border-vert/60 px-3 py-1 text-xs text-vert"
      >
        Diagnosis ready
      </button>
    )
  }
  return null
}

export function Entete() {
  const { ecran, aller } = useRature()
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <button
        type="button"
        onClick={() => aller('accueil')}
        className="text-lg font-extrabold uppercase tracking-[0.2em] text-texte"
      >
        Errata
      </button>
      <BadgeAnalyse />
      <nav aria-label="Main navigation" className="flex flex-wrap gap-1">
        {LIENS.map((lien) => (
          <button
            key={lien.ecran}
            type="button"
            onClick={() => aller(lien.ecran)}
            aria-current={ecran === lien.ecran ? 'page' : undefined}
            className={[
              'rounded-full px-3 py-1.5 text-sm font-medium transition',
              ecran === lien.ecran ? 'bg-texte text-fond' : 'text-muet hover:text-texte',
            ].join(' ')}
          >
            {lien.libelle}
          </button>
        ))}
      </nav>
    </header>
  )
}
