import { useEffect, useState } from 'react'
import { TAILLE_MAX_IMAGE_OCTETS } from '../../domain/config'
import { Bouton } from '../components/Bouton'
import { BandeauSante } from '../components/BandeauSante'
import { Carte } from '../components/Carte'
import { useRature } from '../../etat/useRature'

/** Écran 2 : cadrage — aperçu avant analyse, refus poli si trop lourd. */
export function Cadrage() {
  const { analyser, analyserDemo, erreur, reinitialiserErreur, occupe } = useRature()
  const [fichier, setFichier] = useState<File | null>(null)
  const [apercu, setApercu] = useState<string | null>(null)
  const [refus, setRefus] = useState<string | null>(null)

  useEffect(() => {
    if (!fichier) {
      setApercu(null)
      return
    }
    const url = URL.createObjectURL(fichier)
    setApercu(url)
    return () => URL.revokeObjectURL(url)
  }, [fichier])

  const choisir = (entrees: FileList | null) => {
    setRefus(null)
    reinitialiserErreur()
    const premier = entrees?.[0]
    if (!premier) return
    if (premier.size > TAILLE_MAX_IMAGE_OCTETS) {
      setRefus('Photo too large (10 MB max). Retake it at normal quality.')
      setFichier(null)
      return
    }
    setFichier(premier)
  }

  return (
    <div className="space-y-5">
      <BandeauSante />
      <h1 className="text-2xl font-bold tracking-tight">Framing</h1>
      <p className="text-sm text-muet">
        Fit the whole page in the frame, natural light if you can. The name is masked
        automatically before anything is shown.
      </p>

      <label className="block cursor-pointer rounded-2xl border border-dashed border-bord bg-surface p-6 text-center transition hover:border-jaune">
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="sr-only"
          onChange={(event) => choisir(event.target.files)}
        />
        <span className="text-base text-texte">Choose a photo of the corrected paper</span>
        <span className="mt-1 block text-sm text-muet">JPG, PNG or WebP — 10 MB maximum</span>
      </label>

      {apercu ? (
        <Carte titre="Preview">
          <img src={apercu} alt="Preview of your paper" className="max-h-[45vh] w-full rounded-lg object-contain" />
        </Carte>
      ) : null}

      {refus ?? erreur ? <p role="alert" className="text-sm text-jaune">{refus ?? erreur}</p> : null}

      <Bouton onClick={() => fichier && void analyser(fichier)} disabled={!fichier || occupe} pleineLargeur>
        {occupe ? 'Analysing…' : 'Analyse this paper'}
      </Bouton>

      <div className="text-center">
        <Bouton variante="discret" onClick={() => void analyserDemo()} disabled={occupe}>
          Run the demo (sample paper, recorded answers)
        </Bouton>
      </div>
    </div>
  )
}
