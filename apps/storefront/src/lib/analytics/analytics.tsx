"use client"

import Script from "next/script"
import { GA_ID } from "./gtag"

/**
 * Charge GA4 avec Consent Mode v2. Conforme CNIL : tous les stockages sont
 * refusés PAR DÉFAUT (`denied`) ; le bandeau de consentement les passe à
 * `granted` via `updateConsent(true)` uniquement après acceptation.
 *
 * Ne rend STRICTEMENT RIEN si NEXT_PUBLIC_GA_ID n'est pas défini.
 */
export default function Analytics() {
  if (!GA_ID) return null

  return (
    <>
      {/* Ouvre la connexion à Google en avance (perf). */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />

      {/* Défauts Consent Mode v2 — doivent s'exécuter AVANT gtag.js. */}
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>

      {/* Librairie GA4 — chargée après hydratation pour ne pas bloquer le rendu. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  )
}
