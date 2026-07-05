"use client"

import Image from "next/image"
import { useRef, useState } from "react"

type Props = {
  src: string
  alt: string
}

/**
 * The hero product image with a gentle, premium motion:
 * a slow continuous float (CSS) + a subtle parallax that follows the cursor.
 * Respects prefers-reduced-motion (the float is disabled via CSS).
 */
const FloatingProduct = ({ src, alt }: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    // Max ~14px drift each axis — subtle.
    setOffset({ x: px * 28, y: py * 28 })
  }

  const reset = () => setOffset({ x: 0, y: 0 })

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative w-full h-full min-h-[360px]"
    >
      {/* soft floor shadow */}
      <div className="absolute left-1/2 bottom-12 h-6 w-2/5 -translate-x-1/2 rounded-[50%] bg-brand-ink/10 blur-2xl cj-float-shadow" />

      {/* cursor parallax layer */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      >
        {/* continuous float layer */}
        <div className="cj-float absolute inset-0">
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-10"
          />
        </div>
      </div>
    </div>
  )
}

export default FloatingProduct
