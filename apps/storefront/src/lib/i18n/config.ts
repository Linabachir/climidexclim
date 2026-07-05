// Langues de l'interface CLIMIDEX. On s'appuie sur le cookie `_medusa_locale`
// déjà géré par le storefront (voir lib/data/locale-actions.ts), normalisé en
// "fr" ou "en" pour choisir le dictionnaire de textes.

export const locales = ["fr", "en"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "fr"

/**
 * Convertit un code de locale quelconque ("en", "en-US", "fr-FR", null…)
 * en l'une de nos deux langues d'interface. Tout ce qui n'est pas anglais
 * retombe sur le français.
 */
export const normalizeLocale = (raw?: string | null): Locale => {
  if (raw && raw.toLowerCase().startsWith("en")) {
    return "en"
  }
  return defaultLocale
}
