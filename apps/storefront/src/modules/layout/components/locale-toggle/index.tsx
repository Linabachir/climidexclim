"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"

import { updateLocale } from "@lib/data/locale-actions"
import { useI18n } from "@lib/i18n/context"
import { locales, type Locale } from "@lib/i18n/config"
import { clx } from "@modules/common/components/ui"

const localeDetails: Record<Locale, { label: string }> = {
  fr: { label: "Français" },
  en: { label: "English" },
}

const FlagIcon = ({ locale }: { locale: Locale }) =>
  locale === "fr" ? (
    <svg viewBox="0 0 30 20" className="h-4 w-6 rounded-[2px] shadow-sm" aria-hidden="true">
      <path fill="#002395" d="M0 0h10v20H0z" />
      <path fill="#fff" d="M10 0h10v20H10z" />
      <path fill="#ED2939" d="M20 0h10v20H20z" />
    </svg>
  ) : (
    <svg viewBox="0 0 60 40" className="h-4 w-6 rounded-[2px] shadow-sm" aria-hidden="true">
      <path fill="#012169" d="M0 0h60v40H0z" />
      <path stroke="#fff" strokeWidth="8" d="M0 0l60 40M60 0L0 40" />
      <path stroke="#C8102E" strokeWidth="4" d="M0 0l60 40M60 0L0 40" />
      <path fill="#fff" d="M25 0h10v40H25zM0 15h60v10H0z" />
      <path fill="#C8102E" d="M27 0h6v40h-6zM0 17h60v6H0z" />
    </svg>
  )

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
            "flex h-9 w-9 items-center justify-center rounded-full leading-none transition-all disabled:opacity-60",
            l === locale
              ? "bg-brand-ink/[0.08] ring-1 ring-brand-ink/20"
              : "opacity-55 grayscale hover:opacity-100 hover:grayscale-0"
          )}
          data-testid={`locale-${l}`}
        >
          <FlagIcon locale={l} />
        </button>
      ))}
    </div>
  )
}

export default LocaleToggle
