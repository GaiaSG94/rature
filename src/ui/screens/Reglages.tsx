import { useState } from 'react'
import { MODELE_PAR_DEFAUT, PROXY_PAR_DEFAUT } from '../../domain/config'
import type { Reglages as ReglagesType } from '../../domain/types'
import { Bouton } from '../components/Bouton'
import { PanneauSante } from '../components/PanneauSante'
import { Carte } from '../components/Carte'
import { useRature } from '../../etat/useRature'

const CHAMP = 'w-full rounded-lg border border-bord bg-surface-2 p-3 text-texte'

/** Écran 8 : BYOK, modèle, proxy, confidentialité, export et suppression. */
export function Reglages() {
  const { reglages, enregistrerReglages, viderHistorique, diagnostics } = useRature()
  const [brouillon, setBrouillon] = useState<ReglagesType>(reglages)
  const [confirme, setConfirme] = useState(false)

  const maj = (champ: keyof ReglagesType, valeur: string) => {
    setConfirme(false)
    setBrouillon({ ...brouillon, [champ]: valeur })
  }

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>

      <Carte titre="Model access" ton="jaune">
        <p className="mb-3 text-sm text-muet">
          By default, analysis goes through a proxy that keeps its key server-side. If the proxy
          quota is used up, paste your own InferHub key (BYOK): it stays on this device.
        </p>
        <label className="mb-3 block text-sm text-texte" htmlFor="cle">
          Personal key (BYOK)
          <input
            id="cle"
            type="password"
            autoComplete="off"
            className={`${CHAMP} mt-1 font-mono`}
            value={brouillon.clePersonnelle}
            placeholder="ih_…"
            onChange={(event) => maj('clePersonnelle', event.target.value)}
          />
        </label>
        <label className="mb-3 block text-sm text-texte" htmlFor="modele">
          Model
          <input
            id="modele"
            type="text"
            className={`${CHAMP} mt-1 font-mono`}
            value={brouillon.modele}
            placeholder={MODELE_PAR_DEFAUT}
            onChange={(event) => maj('modele', event.target.value)}
          />
        </label>
        <label className="block text-sm text-texte" htmlFor="proxy">
          Proxy address
          <input
            id="proxy"
            type="text"
            className={`${CHAMP} mt-1 font-mono`}
            value={brouillon.proxy}
            placeholder={PROXY_PAR_DEFAUT}
            onChange={(event) => maj('proxy', event.target.value)}
          />
        </label>
      </Carte>

      <Bouton
        onClick={() => {
          void enregistrerReglages(brouillon)
          setConfirme(true)
        }}
      >
        {confirme ? 'Settings saved' : 'Save'}
      </Bouton>

      <PanneauSante />

      <Carte titre="Privacy" ton="vert">
        <ul className="list-inside list-disc space-y-1 text-sm text-muet">
          <li>No paper is ever stored: the image is forgotten as soon as the analysis ends.</li>
          <li>The student's name is masked before anything is shown.</li>
          <li>The history stays on this device (IndexedDB), never on a server.</li>
          <li>The proxy only logs the timestamp and the HTTP status code.</li>
        </ul>
      </Carte>

      <Carte titre="My data">
        <p className="mb-3 text-sm text-muet">
          {diagnostics.length} diagnosis(es) saved on this device.
        </p>
        <Bouton
          variante="secondaire"
          onClick={() => {
            void viderHistorique()
          }}
        >
          Delete all history
        </Bouton>
      </Carte>
    </div>
  )
}
