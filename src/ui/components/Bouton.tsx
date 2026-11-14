import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  variante?: 'principal' | 'secondaire' | 'discret'
  disabled?: boolean
  pleineLargeur?: boolean
}

const CLASSES: Record<NonNullable<Props['variante']>, string> = {
  principal:
    'bg-texte text-fond font-bold hover:opacity-90 active:opacity-80 disabled:opacity-40',
  secondaire:
    'bg-surface text-texte border border-texte hover:bg-surface-2 disabled:opacity-40',
  discret: 'bg-transparent text-muet hover:text-texte underline underline-offset-4',
}

/** Bouton unique du produit : grosses cibles, contraste AA, focus visible. */
export function Bouton({
  children,
  onClick,
  type = 'button',
  variante = 'principal',
  disabled = false,
  pleineLargeur = false,
}: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'min-h-12 rounded-full px-6 py-3 text-base transition',
        CLASSES[variante],
        pleineLargeur ? 'w-full' : '',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
