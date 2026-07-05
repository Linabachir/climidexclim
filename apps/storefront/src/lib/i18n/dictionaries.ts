import { fr } from "./dictionaries/fr"
import { en } from "./dictionaries/en"
import type { Locale } from "./config"

// Le type Dictionary est dérivé du dictionnaire français (référence).
export type Dictionary = typeof fr

const dictionaries: Record<Locale, Dictionary> = { fr, en }

export const getDictionary = (locale: Locale): Dictionary =>
  dictionaries[locale] ?? dictionaries.fr
