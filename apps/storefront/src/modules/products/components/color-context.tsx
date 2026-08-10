"use client"

import { createContext, useContext, useState } from "react"

// Contexte partagé entre le sélecteur de coloris (ProductActions) et la
// galerie (ImageGallery) : sélectionner une couleur fait basculer la photo.
type ColorContextValue = {
  color: string | null
  setColor: (c: string | null) => void
}

const ColorContext = createContext<ColorContextValue>({
  color: null,
  setColor: () => {},
})

export const SelectedColorProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [color, setColor] = useState<string | null>(null)
  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  )
}

export const useSelectedColor = () => useContext(ColorContext)

// Associe une valeur de coloris (issue de CJ) au fragment de nom de fichier
// de sa photo. L'argenté ventilation+chauffage réutilise la photo argentée.
const COLOR_IMAGE: Record<string, string> = {
  "Bright gold cold wind": "climaire-gold",
  // Les deux variantes argentées utilisent les mêmes médias : seule la
  // présence du chauffage les différencie.
  "Silver cold wind": "climaire-silver",
  "Silver cooling and heating": "climaire-silver",
  "White blue cold wind": "climaire-blue",
  "Cold wind titanium dust": "climaire-anthracite",
}

export const imageKeyForColor = (color?: string | null): string | null =>
  color ? COLOR_IMAGE[color.trim()] ?? null : null
