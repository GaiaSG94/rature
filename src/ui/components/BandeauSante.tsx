import { Bouton } from './Bouton'
import { useRature } from '../../etat/useRature'

/**
 * Bandeau « amont indisponible » — lot 2. On n'échoue pas devant un juge : on
 * annonce la panne et on propose la démonstration, qui ne dépend ni du réseau
 * ni de la place de marché du modèle. Honnêteté : on ne remplace JAMAIS la
 * photo de l'utilisateur par la démo — le clic reste explicite.
 */
export function BandeauSante() {
  const { santeProxy, analyserDemo, occupe, aller } = useRature()
  if (santeProxy !== 'ko') return null
  return (
    <div role="alert" className="rounded-xl border border-jaune/50 bg-surface-2 p-3">
      <p className="font-medium text-jaune">The model is temporarily unavailable.</p>
      <p className="mt-1 text-sm text-muet">
        Don't worry: you can still see the product, and check your connection. The demo replays
        answers that were actually recorded, with no network call at all.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <Bouton variante="secondaire" onClick={() => void analyserDemo()} disabled={occupe}>
          Run the demo
        </Bouton>
        <Bouton variante="discret" onClick={() => aller('reglages')}>
          Paste my own key (BYOK)
        </Bouton>
      </div>
    </div>
  )
}