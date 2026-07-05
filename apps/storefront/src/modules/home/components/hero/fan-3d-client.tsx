"use client"

import dynamic from "next/dynamic"

import Fan3DBoundary from "./fan-3d-boundary"

// Visuel de secours : affiché pendant le chargement ET si la 3D plante.
const Fallback = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="font-serif text-2xl text-white/30">Climaire</span>
  </div>
)

// Three.js renders client-side only — load without SSR.
const Fan3D = dynamic(() => import("./fan-3d"), {
  ssr: false,
  loading: () => <Fallback />,
})

const Fan3DClient = () => (
  <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
    <Fan3DBoundary fallback={<Fallback />}>
      <Fan3D />
    </Fan3DBoundary>
  </div>
)

export default Fan3DClient
