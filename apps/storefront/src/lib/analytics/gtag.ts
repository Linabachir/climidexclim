// Fondation analytics — GA4 + Consent Mode v2.
//
// Tant que NEXT_PUBLIC_GA_ID est absent, AUCUN script ne se charge et
// `track()` est un no-op : zéro effet, zéro cookie, zéro risque sur le site.
// On active tout simplement en définissant NEXT_PUBLIC_GA_ID=G-XXXXXXX.

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || ""
export const analyticsEnabled = GA_ID.length > 0

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

type EventParams = Record<string, unknown>

/**
 * Envoie un événement GA4. Volontairement défensif : si gtag n'est pas
 * chargé (ID absent OU consentement non accordé), la fonction ne fait rien.
 */
export function track(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return
  if (typeof window.gtag !== "function") return
  window.gtag("event", event, params)
}

/**
 * Met à jour le consentement (Consent Mode v2) après le choix de
 * l'utilisateur dans le bandeau. À appeler avec `true` seulement après
 * acceptation explicite.
 */
export function updateConsent(granted: boolean): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  const value = granted ? "granted" : "denied"
  window.gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  })
}
