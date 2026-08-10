import type { Locale } from "./config"

// Les options produit viennent de l'import CJ en anglais ; on traduit à
// l'affichage (le mapping variante/commande garde les valeurs d'origine).

const OPTION_TITLES: Record<string, Record<Locale, string>> = {
  Color: { fr: "Coloris", en: "Color" },
  "Electrical outlet": { fr: "Type de prise", en: "Plug type" },
}

const OPTION_VALUES: Record<string, Record<Locale, string>> = {
  "Bright gold cold wind": {
    fr: "Ivoire",
    en: "Ivory",
  },
  "Silver cold wind": {
    fr: "Ivoire",
    en: "Ivory",
  },
  "Silver cooling and heating": {
    fr: "Ivoire",
    en: "Ivory",
  },
  "White blue cold wind": {
    fr: "Bleu",
    en: "Blue",
  },
  "Cold wind titanium dust": {
    fr: "Noir",
    en: "Black",
  },
  EU: { fr: "EU (France)", en: "EU" },
  UK: { fr: "UK", en: "UK" },
  US: { fr: "US", en: "US" },
}

export const translateOptionTitle = (title: string, locale: Locale): string =>
  OPTION_TITLES[title?.trim()]?.[locale] ?? title

export const translateOptionValue = (value: string, locale: Locale): string =>
  OPTION_VALUES[value?.trim()]?.[locale] ?? value
