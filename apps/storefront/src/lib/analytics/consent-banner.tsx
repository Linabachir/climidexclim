"use client"

import { useEffect, useState } from "react"
import { analyticsEnabled, updateConsent } from "./gtag"

const STORAGE_KEY = "climidex_consent"

/**
 * Bandeau de consentement (RGPD/CNIL) piloté par Consent Mode v2.
 * - Par défaut GA4 est en « denied » (cf. analytics.tsx) : rien n'est suivi
 *   tant que l'utilisateur n'a pas accepté.
 * - « Accepter » et « Refuser » sont au même niveau (exigence CNIL).
 * - Le choix est mémorisé → le bandeau ne réapparaît pas.
 * Ne s'affiche que si GA4 est activé (NEXT_PUBLIC_GA_ID défini).
 */
export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!analyticsEnabled) return
    let choice: string | null = null
    try {
      choice = localStorage.getItem(STORAGE_KEY)
    } catch {
      /* stockage indisponible */
    }
    if (choice === "granted") {
      updateConsent(true) // visiteur déjà consentant → réactive le suivi
    } else if (choice === "denied") {
      updateConsent(false)
    } else {
      setVisible(true) // aucun choix encore → on demande
    }
  }, [])

  const decide = (granted: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied")
    } catch {
      /* ignore */
    }
    updateConsent(granted)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed inset-x-0 bottom-0 z-50 p-4 small:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg border border-brand-line bg-white p-5 shadow-lg small:flex-row small:items-center small:p-6">
        <p className="flex-1 text-[13px] leading-relaxed text-brand-ink-secondary">
          Nous utilisons des cookies de mesure d'audience (Google Analytics)
          pour comprendre l'usage du site et l'améliorer. Vous pouvez accepter
          ou refuser.{" "}
          <a
            href="/fr/content/confidentialite"
            className="underline underline-offset-2 hover:text-brand-ink"
          >
            En savoir plus
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-md border border-brand-line px-5 py-2.5 text-xs uppercase tracking-widest text-brand-ink transition-colors hover:bg-brand-paper"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="rounded-md bg-brand-navy px-5 py-2.5 text-xs uppercase tracking-widest text-white transition-colors hover:bg-brand-ink"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
