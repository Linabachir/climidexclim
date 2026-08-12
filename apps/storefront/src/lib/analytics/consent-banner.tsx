"use client"

import { useEffect, useState } from "react"
import { updateConsent } from "./gtag"

// Versionner la clé permet de redemander le consentement lorsque l'expérience
// ou les catégories de cookies évoluent, sans afficher le bandeau à chaque page.
const STORAGE_KEY = "climidex_consent_v2"

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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-7 rounded-[32px] bg-white p-7 shadow-2xl small:flex-row small:items-center small:p-10">
        <p className="flex-1 text-[15px] leading-7 text-brand-ink-secondary small:text-base">
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
            className="min-h-14 flex-1 rounded-full bg-[#f5f5f7] px-8 text-base font-medium text-brand-ink transition-colors hover:bg-[#e8e8ed] small:flex-none"
          >
            Refuser
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="min-h-14 flex-1 rounded-full bg-[#1d1d1f] px-8 text-base font-medium text-white transition-colors hover:bg-black small:flex-none"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>}
    {accountVisible && <div role="dialog" aria-modal="true" aria-label="Créer un compte" className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-[36px] bg-white px-8 py-12 text-center shadow-2xl small:px-14 small:py-14">
        <button type="button" onClick={() => setAccountVisible(false)} aria-label="Fermer" className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-2xl text-[#1d1d1f] hover:bg-[#e8e8ed]">×</button>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
          <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden><circle cx="12" cy="8" r="4"/><path d="M4.5 21c.8-4.1 3.3-6 7.5-6s6.7 1.9 7.5 6"/></svg>
        </div>
        <h2 className="mt-7 text-4xl font-semibold tracking-[-0.03em] small:text-[42px]">Créez votre compte</h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-brand-ink-secondary">Suivez vos commandes et retrouvez facilement vos informations.</p>
        <a href={`/${countryCode}/account`} className="mt-8 flex min-h-14 w-full items-center justify-center rounded-full bg-[#1d1d1f] px-8 text-base font-medium text-white hover:bg-black">Créer mon compte</a>
        <button type="button" onClick={() => setAccountVisible(false)} className="mt-5 text-base text-brand-ink-secondary hover:text-brand-ink">Plus tard</button>
      </div>
    </div>}
    </>
  )
}
