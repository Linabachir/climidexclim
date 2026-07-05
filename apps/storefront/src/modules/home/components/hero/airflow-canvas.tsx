"use client"

import { useEffect, useRef } from "react"

/**
 * Flux d'air animé derrière le produit du hero :
 * lignes verticales ascendantes bleutées + réticule elliptique en rotation lente.
 * Respecte prefers-reduced-motion.
 */
const AirflowCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    // colonnes de particules ascendantes
    const N = 46
    const parts = Array.from({ length: N }, () => ({
      x: Math.random(),
      y: Math.random(),
      len: 26 + Math.random() * 60,
      spd: 0.0016 + Math.random() * 0.0032,
      a: 0.08 + Math.random() * 0.22,
    }))

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // lignes de flux
      for (const p of parts) {
        const x = p.x * w
        const y = p.y * h
        const grad = ctx.createLinearGradient(x, y, x, y - p.len)
        grad.addColorStop(0, `rgba(190,224,255,0)`)
        grad.addColorStop(0.5, `rgba(190,224,255,${p.a})`)
        grad.addColorStop(1, `rgba(190,224,255,0)`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y - p.len)
        ctx.stroke()
        if (!reduce) {
          p.y -= p.spd
          if (p.y < -0.1) {
            p.y = 1.1
            p.x = Math.random()
          }
        }
      }

      // réticule elliptique en rotation lente
      ctx.save()
      ctx.translate(w / 2, h * 0.46)
      ctx.rotate(reduce ? 0 : t * 0.15)
      ctx.strokeStyle = "rgba(200,214,232,0.09)"
      ctx.lineWidth = 1
      ctx.setLineDash([4, 8])
      ctx.beginPath()
      ctx.ellipse(0, 0, w * 0.32, h * 0.34, 0, 0, Math.PI * 2)
      ctx.stroke()
      ctx.restore()

      t += 0.016
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" aria-hidden />
}

export default AirflowCanvas
