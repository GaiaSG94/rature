import type { ReactNode } from 'react'

type Props = { titre?: string; children: ReactNode; ton?: 'neutre' | 'jaune' | 'vert' }

const TONS: Record<NonNullable<Props['ton']>, string> = {
  neutre: 'bg-surface',
  jaune: 'bg-jaune-doux',
  vert: 'bg-vert-doux',
}

/** Surface d'information : une idée par carte, jamais plus. */
export function Carte({ titre, children, ton = 'neutre' }: Props) {
  return (
    <section className={`rounded-xl border-[3px] border-texte ombre-dure ${TONS[ton]} p-4 sm:p-5`}>
      {titre ? <h2 className="mb-2 text-lg font-black uppercase text-texte">{titre}</h2> : null}
      <div className="text-texte/90">{children}</div>
    </section>
  )
}
