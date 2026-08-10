"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { updateLocale } from "@lib/data/locale-actions"
import { useI18n } from "@lib/i18n/context"
import { locales, type Locale } from "@lib/i18n/config"
import { clx } from "@modules/common/components/ui"

const localeDetails: Record<Locale, { flag: string; label: string }> = {
  fr: { flag: "\u{1F1EB}\u{1F1F7}", label: "Francais" },
  en: { flag: "\u{1F1EC}\u{1F1E7}", label: "English" },
}

// Bascule FR / EN. Écrit dans le cookie `_medusa_locale` (via updateLocale)
// puis rafraîchit la page pour recharger les textes dans la bonne langue.
const LocaleToggle = () => {
  const { locale } = useI18n()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const switchTo = (next: Locale) => {
    if (next === locale || isPending) return
    startTransition(async () => {
      await updateLocale(next)
      router.refresh()
    })
  }

  return (
    <div
      className="flex items-center gap-x-2"
      aria-label="Langue"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          disabled={isPending}
          aria-label={localeDetails[l].label}
          title={localeDetails[l].label}
          aria-pressed={l === locale}
          className={clx(
            "flex h-8 w-8 items-center justify-center rounded-full text-[19px] leading-none transition-all disabled:opacity-60",
            l === locale
              ? "bg-brand-ink/[0.08] ring-1 ring-brand-ink/20"
              : "opacity-55 grayscale hover:opacity-100 hover:grayscale-0"
          )}
          data-testid={`locale-${l}`}
        >
          <span aria-hidden="true">{localeDetails[l].flag}</span>
        </button>
      ))}
    </div>
  )
}

export default LocaleToggle
