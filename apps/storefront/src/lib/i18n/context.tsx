"use client"

import { createContext, useContext } from "react"

import type { Locale } from "./config"
import type { Dictionary } from "./dictionaries"

type I18nValue = {
  locale: Locale
  t: Dictionary
}

const I18nContext = createContext<I18nValue | null>(null)

/**
 * Fournit la langue + le dictionnaire aux composants client.
 * Alimenté depuis un composant serveur (le layout racine).
 */
export const I18nProvider = ({
  locale,
  dictionary,
  children,
}: {
  locale: Locale
  dictionary: Dictionary
  children: React.ReactNode
}) => {
  return (
    <I18nContext.Provider value={{ locale, t: dictionary }}>
      {children}
    </I18nContext.Provider>
  )
}

/**
 * Hook à utiliser dans les composants client : `const { locale, t } = useI18n()`
 */
export const useI18n = (): I18nValue => {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error("useI18n doit être utilisé à l'intérieur d'un I18nProvider")
  }
  return ctx
}
