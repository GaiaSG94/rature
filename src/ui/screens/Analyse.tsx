import { BUDGET_PIPELINE_MS } from '../../domain/config'
import { Bouton } from '../components/Bouton'
import { EtapesPipeline } from '../components/EtapesPipeline'
import { Carte } from '../components/Carte'
import { useRature } from '../../etat/useRature'

/**
 * Écran 3 : la progression nominale des six étapes. On ne montre pas un
 * spinner muet : l'attente devient une démonstration du pipeline (critère
 * Presentation), et le budget annoncé est celui du cahier des charges.
 */
export function Analyse() {
  const { progression, erreur, occupe, aller, messageProgres, modeleRepondu } = useRature()
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">Analysis in progress</h1>
      <p className="text-sm text-muet">
        Announced budget: under {(BUDGET_PIPELINE_MS / 1000).toFixed(0)}s from photo to diagnosis.
        The paper is sent only for this processing, then forgotten.
      </p>

      <Carte>
        <EtapesPipeline progression={progression} />
      </Carte>

      <div className="text-center">
        <Bouton variante="discret" onClick={() => aller('accueil')}>
          Continue without waiting — a badge will tell me when it's ready
        </Bouton>
      </div>

      {messageProgres ? (
        <p className="rounded-lg border border-bord bg-surface-2 px-3 py-2 font-mono text-xs text-muet">
          {messageProgres}
        </p>
      ) : null}

      {modeleRepondu ? (
        <p className="text-xs text-muet">Answered by {modeleRepondu.split('/').pop()}</p>
      ) : null}

      {erreur ? <p role="alert" className="text-sm text-jaune">{erreur}</p> : null}
      {!occupe && !erreur ? <p className="text-sm text-muet">Loading the result…</p> : null}
    </div>
  )
}
