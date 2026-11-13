import { useRef, useState } from 'react'
import type { Erreur } from '../../domain/types'
import { BadgeCode } from '../components/BadgeCode'
import { Bouton } from '../components/Bouton'
import { Carte } from '../components/Carte'
import { CopieAnnotee } from '../components/CopieAnnotee'
import { ExplicationType } from '../components/ExplicationType'
import { origineDemo } from '../../pipeline/demo'
import { useRature } from '../../etat/useRature'

function LigneErreur({
  erreur,
  index,
  selectionne,
  onSelect,
  refItem,
}: {
  erreur: Erreur
  index: number
  selectionne: boolean
  onSelect: (index: number) => void
  refItem: (element: HTMLLIElement | null) => void
}) {
  return (
    <li
      ref={refItem}
      className={[
        'cursor-pointer rounded-xl border p-3 transition',
        selectionne ? 'border-jaune bg-surface-2' : 'border-bord bg-surface hover:border-jaune/50',
      ].join(' ')}
      onClick={() => onSelect(index)}
    >
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-muet">{index + 1}</span>
        <BadgeCode code={erreur.code} confiance={erreur.confiance} />
        {erreur.ponderee ? null : (
          <span className="text-xs text-muet">flagged, not counted in the profile</span>
        )}
      </div>
      <p className="font-mono text-sm text-texte/90">{erreur.ligne}</p>
      <p className="mt-1 text-sm text-muet">{erreur.explication}</p>
      {selectionne ? (
        <div className="mt-3 border-t border-bord pt-3">
          <ExplicationType code={erreur.code} />
        </div>
      ) : null}
    </li>
  )
}

/** Écran 4 : le diagnostic — où travailler, sans jugement. */
export function Diagnostic() {
  const { resultat, aller, demoId, progression } = useRature()
  const [selection, setSelection] = useState<number | null>(null)
  const refs = useRef<(HTMLLIElement | null)[]>([])

  if (!resultat) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Diagnosis</h1>
        <p className="text-sm text-muet">No analysis yet. Start by photographing a paper.</p>
        <Bouton onClick={() => aller('cadrage')}>Photograph a paper</Bouton>
      </div>
    )
  }

  const { diagnostic, imageAnonymisee, exercice, messageExercice, revue } = resultat
  const copiePropre = diagnostic.nbFautes === 0
  const demo = demoId ? origineDemo(demoId) : null
  const msTotal = progression.reduce((somme, etape) => somme + (etape.ms ?? 0), 0)

  /** Clic sur une faute de la liste : sélection + zoom sur sa zone. */
  const choisir = (index: number) => {
    setSelection(index)
    const zone = diagnostic.erreurs[index]?.zone
    if (zone) refs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">
        {copiePropre ? 'No mistakes found' : `${diagnostic.nbFautes} point(s) to work on`}
      </h1>

      {demo ? (
        <p className="rounded-lg border border-bord bg-surface-2 px-3 py-2 text-xs text-muet">
          Demo — {demo.titre}: answers **and real timings** recorded on{' '}
          {demo.enregistreLe.slice(0, 10)} with {demo.modele}. No network call during the demo.
        </p>
      ) : null}

      <p className="text-xs text-muet">
        {msTotal > 0 ? `Analysed in ${(msTotal / 1000).toFixed(1)}s · ` : ''}
        {revue && revue.revues > 0
          ? `${revue.revues} low-confidence mistake(s) rechecked, ${revue.modifiees} corrected`
          : 'no mistake needed a second check'}
      </p>

      <CopieAnnotee
        src={imageAnonymisee}
        alt="Your paper, name masked"
        erreurs={diagnostic.erreurs}
        selection={selection}
        onSelect={(index) => setSelection(index === selection ? null : index)}
      />

      {copiePropre ? (
        <Carte titre="All clean" ton="vert">
          <p className="text-sm text-muet">
            The teacher marked no mistake. Nothing to work on today: add another paper to refine
            your profile.
          </p>
        </Carte>
      ) : (
        <ul className="space-y-3">
          {diagnostic.erreurs.map((erreur, index) => (
            <LigneErreur
              key={index}
              erreur={erreur}
              index={index}
              selectionne={selection === index}
              onSelect={choisir}
              refItem={(element) => {
                refs.current[index] = element
              }}
            />
          ))}
        </ul>
      )}

      {progression.length > 0 ? (
        <details className="rounded-xl border border-bord bg-surface p-4">
          <summary className="cursor-pointer text-sm font-medium text-texte">
            Analysis trace — what each step produced
          </summary>
          <ul className="mt-3 space-y-2">
            {progression.map((entree) => (
              <li key={entree.etape} className="text-xs">
                <span className="font-medium text-texte">
                  {entree.etape}
                  {entree.ms !== undefined ? ` · ${entree.ms} ms` : ''}
                </span>
                {entree.preuve ? <span className="block text-muet">{entree.preuve}</span> : null}
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {exercice ? (
        <Bouton onClick={() => aller('exercice')} pleineLargeur>
          Do the exercise targeted on {exercice.exercice.typeTravaille}
        </Bouton>
      ) : null}
      {messageExercice ? <p className="text-sm text-muet">{messageExercice}</p> : null}
    </div>
  )
}
