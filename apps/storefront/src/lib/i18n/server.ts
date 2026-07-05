import "server-only"

import { getLocale } from "@lib/data/locale-actions"
import { normalizeLocale, type Locale } from "./config"
import { getDictionary, type Dictionary } from "./dictionaries"

/**
 * Langue d'interface courante (fr | en), déduite du cookie `_medusa_locale`.
 * À utiliser dans les composants serveur.
 */
export const getUiLocale = async (): Promise<Locale> => {
  const raw = await getLocale()
  return normalizeLocale(raw)
}

/**
 * Renvoie la langue courante + le dictionnaire de textes associé.
 * Usage : `const { locale, t } = await getI18n()`
 */
export const getI18n = async (): Promise<{
  locale: Locale
  t: Dictionary
}> => {
  const locale = await getUiLocale()
  return { locale, t: getDictionary(locale) }
}
