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
      <div className="relative space-y-4 pt-10 pb-6 text-center sm:pt-14">
        <span
          aria-hidden="true"
          className="balance sticker sticker-ambre absolute left-0 top-0 text-sm sm:-left-2"
          style={{ ['--r' as string]: '-9deg' }}
        >
          <span className="text-xl">E03</span> ×14
        </span>
        <span
          aria-hidden="true"
          className="balance sticker sticker-menthe absolute right-0 top-1 text-sm sm:-right-2"
          style={{ ['--r' as string]: '8deg', animationDelay: '-1.5s' }}
        >
          E02 cleared ✓
        </span>
        <p className="text-sm font-medium">A study app for students who hate red pen.</p>
        <h1 className="text-5xl sm:text-7xl">
          Turn your mistakes into <span className="mot-italique">moves</span>
        </h1>
        <p className="mx-auto max-w-md text-muet">
          Photograph your corrected paper. We read the teacher's marks, sort them by error type,
          and build the exercise that works on <em>your</em> weakness.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-1" aria-hidden="true">
          <span className="sticker sticker-rose text-xs" style={{ rotate: '-4deg' }}>
            No grades. Ever.
          </span>
          <span className="sticker sticker-blanc text-xs" style={{ rotate: '3deg' }}>
            12 error types
          </span>
        </div>
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
