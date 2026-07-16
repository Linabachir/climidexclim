"use client"

import { useEffect } from "react"
import { track } from "./gtag"

type Props = {
  event: string
  params?: Record<string, unknown>
  /**
   * Clé de déduplication (sessionStorage) : évite le double comptage quand
   * l'utilisateur recharge la page (ex. `purchase` sur la confirmation).
   */
  dedupeKey?: string
}

/**
 * Déclenche un événement GA4 une seule fois au montage, côté client.
 * Ne rend rien → aucun impact visuel, aucun impact sur le design.
 * Sûr : `track()` est un no-op tant que GA4 n'est pas chargé.
 */
export default function TrackEvent({ event, params, dedupeKey }: Props) {
  useEffect(() => {
    if (dedupeKey) {
      try {
        if (sessionStorage.getItem(dedupeKey)) return
        sessionStorage.setItem(dedupeKey, "1")
      } catch {
        /* sessionStorage indisponible → on trace quand même */
      }
    }
    track(event, params ?? {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
