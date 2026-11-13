import { Bouton } from '../components/Bouton'
import { BandeauSante } from '../components/BandeauSante'
import { Carte } from '../components/Carte'
import { COPIES_DEMO, ID_COPIES_DEMO } from '../../pipeline/demo'
import { useRature } from '../../etat/useRature'

/** Écran 1 : un seul bouton. Pas d'explication avant l'action (§21). */
export function Accueil() {
  const { aller, profil, analyserDemo, occupe } = useRature()
  const plusieurs = ID_COPIES_DEMO.length > 1
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Your corrected paper knows what you repeat.
        </h1>
        <p className="text-muet">
          Photograph it. We read the teacher's marks, sort them by error type, and build the
          exercise that works on <em>your</em> weakness.
        </p>
      </div>

      <Bouton onClick={() => aller('cadrage')} pleineLargeur>
        Photograph my paper
      </Bouton>

      <BandeauSante />

      <div className="flex flex-col items-center gap-2">
        <Bouton variante="discret" onClick={() => void analyserDemo()} disabled={occupe}>
          No paper handy? Run the demo
        </Bouton>
        {plusieurs ? (
          <Bouton variante="discret" onClick={() => void analyserDemo(ID_COPIES_DEMO)} disabled={occupe}>
            Full demo ({ID_COPIES_DEMO.length} papers → profile and trajectory)
          </Bouton>
        ) : null}
        <p className="text-center text-xs text-muet">
          Model answers actually recorded on {COPIES_DEMO.length} sample paper(s) — no network
          call, no key.
        </p>
      </div>

      <p className="text-center text-sm text-muet">
        No paper is ever stored. Your history stays on your device.
      </p>

      {profil.totalAnalyses > 0 ? (
        <Carte titre="Continue" ton="vert">
          <p className="text-sm text-muet">
            {profil.totalAnalyses} paper(s) analysed on this device.
          </p>
          <div className="mt-3">
            <Bouton variante="secondaire" onClick={() => aller('profil')}>
              See my error profile
            </Bouton>
          </div>
        </Carte>
      ) : null}
    </div>
  )
}
