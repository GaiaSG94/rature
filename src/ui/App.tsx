import { Accueil } from './screens/Accueil'
import { CommentCaMarche } from './screens/CommentCaMarche'
import { Analyse } from './screens/Analyse'
import { Cadrage } from './screens/Cadrage'
import { Diagnostic } from './screens/Diagnostic'
import { Exercice } from './screens/Exercice'
import { Prof } from './screens/Prof'
import { Profil } from './screens/Profil'
import { Reglages } from './screens/Reglages'
import { Entete } from './components/Entete'
import { useRature } from '../etat/useRature'
import type { Ecran } from '../etat/useRature'
import type { JSX } from 'react'

const ECRANS: Record<Ecran, () => JSX.Element> = {
  accueil: Accueil,
  cadrage: Cadrage,
  analyse: Analyse,
  diagnostic: Diagnostic,
  profil: Profil,
  exercice: Exercice,
  prof: Prof,
  reglages: Reglages,
  apropos: CommentCaMarche,
}

/** Routeur maison : un état, huit écrans, aucune dépendance externe. */
const ETIQUETTES_SANTE = {
  ok: 'model online',
  ko: 'model unavailable',
  inconnue: 'model not probed',
} as const

export function Application() {
  const { ecran, santeProxy } = useRature()
  const EcranActif = ECRANS[ecran]
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-3 py-4 sm:px-6 sm:py-8">
      <div className="flex flex-1 flex-col rounded-md bg-fond px-4 py-5 sm:px-8 sm:py-7">
        <Entete />
        <main className="flex-1">
          <EcranActif />
        </main>
      </div>
      <footer className="mt-4 px-1 text-xs text-white/85">
        No paper is ever stored · local history ·{' '}
        <span
          aria-label={ETIQUETTES_SANTE[santeProxy]}
          title={ETIQUETTES_SANTE[santeProxy]}
          className={
            santeProxy === 'ko'
              ? 'text-ambre'
              : santeProxy === 'ok'
                ? 'text-menthe'
                : 'text-white/70'
          }
        >
          ● {ETIQUETTES_SANTE[santeProxy]}
        </span>
      </footer>
    </div>
  )
}
