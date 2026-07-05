"use client"

import { Component, ReactNode } from "react"

type Props = {
  children: ReactNode
  fallback: ReactNode
}

type State = {
  hasError: boolean
}

/**
 * Garde-fou autour du rendu 3D (Three.js / WebGL).
 * Si le canvas plante (WebGL indisponible, modèle illisible, driver GPU…),
 * on affiche un visuel de secours au lieu de laisser l'erreur remonter
 * et blanchir toute la page.
 */
class Fan3DBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // Trace utile en dev, sans casser l'affichage.
    console.error("[Fan3D] rendu 3D indisponible :", error)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default Fan3DBoundary
