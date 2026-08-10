"use client"

import { useEffect, useState } from "react"
import { updateConsent } from "./gtag"

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
  const [accountVisible, setAccountVisible] = useState(false)

  useEffect(() => {
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
    window.setTimeout(() => setAccountVisible(true), 250)
  }

  const countryCode = typeof window === "undefined"
    ? "fr"
    : window.location.pathname.split("/").filter(Boolean)[0] || "fr"

  if (!visible && !accountVisible) return null

  return (
    <>
    {visible && <div role="dialog" aria-live="polite" aria-label="Consentement aux cookies" className="fixed inset-0 z-50 flex items-end bg-black/20 p-4 backdrop-blur-[2px] small:p-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 rounded-[28px] bg-white p-6 shadow-2xl small:flex-row small:items-center small:p-7">
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
            className="min-h-12 rounded-full bg-[#f5f5f7] px-6 text-sm font-medium text-brand-ink transition-colors hover:bg-[#e8e8ed]"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="min-h-12 rounded-full bg-[#1d1d1f] px-6 text-sm font-medium text-white transition-colors hover:bg-black"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>}
    {accountVisible && <div role="dialog" aria-modal="true" aria-label="Créer un compte" className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-[32px] bg-white px-7 py-9 text-center shadow-2xl small:px-10">
        <button type="button" onClick={() => setAccountVisible(false)} aria-label="Fermer" className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-xl text-[#1d1d1f] hover:bg-[#e8e8ed]">×</button>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden><circle cx="12" cy="8" r="4"/><path d="M4.5 21c.8-4.1 3.3-6 7.5-6s6.7 1.9 7.5 6"/></svg>
        </div>
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em]">Créez votre compte</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-brand-ink-secondary">Suivez vos commandes et retrouvez facilement vos informations.</p>
        <a href={`/${countryCode}/account`} className="mt-7 flex min-h-12 w-full items-center justify-center rounded-full bg-[#1d1d1f] px-6 text-sm font-medium text-white hover:bg-black">Créer mon compte</a>
        <button type="button" onClick={() => setAccountVisible(false)} className="mt-4 text-sm text-brand-ink-secondary hover:text-brand-ink">Plus tard</button>
      </div>
    </div>}
    </>
  )
}
