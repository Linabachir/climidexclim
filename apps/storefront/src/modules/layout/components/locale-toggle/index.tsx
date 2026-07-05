"use client"

import { Fragment, useTransition } from "react"
import { useRouter } from "next/navigation"

import { updateLocale } from "@lib/data/locale-actions"
import { useI18n } from "@lib/i18n/context"
import { locales, type Locale } from "@lib/i18n/config"
import { clx } from "@modules/common/components/ui"

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
      className="flex items-center gap-x-1.5 text-xs uppercase tracking-widest"
      aria-label="Langue"
    >
      {locales.map((l, i) => (
        <Fragment key={l}>
          {i > 0 && <span className="text-brand-line">/</span>}
          <button
            type="button"
            onClick={() => switchTo(l)}
            disabled={isPending}
            aria-pressed={l === locale}
            className={clx(
              "transition-colors disabled:opacity-60",
              l === locale
                ? "text-brand-ink font-medium"
                : "text-brand-mute hover:text-brand-ink"
            )}
            data-testid={`locale-${l}`}
          >
            {l}
          </button>
        </Fragment>
      ))}
    </div>
  )
}

export default LocaleToggle
