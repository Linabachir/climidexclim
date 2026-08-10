"use client"

import { useState } from "react"

const content = {
  fr: [
    { label: "Rafraîchit", title: "Un souffle précis.", text: "Huit vitesses pour adapter le flux d’air à chaque moment.", video: "/product/climaire-blue-video.mp4", poster: "/product/climaire-blue-video-poster.webp" },
    { label: "Chauffe", title: "Une chaleur douce.", text: "Un confort agréable lorsque les températures baissent.", video: "/product/climaire-gold-video.mp4", poster: "/product/climaire-gold-video-poster.webp" },
    { label: "Purifie", title: "Un air plus agréable.", text: "La filtration accompagne votre quotidien en toute discrétion.", video: "/product/climaire-anthracite-video.mp4", poster: "/product/climaire-anthracite-video-poster.webp" },
  ],
  en: [
    { label: "Cools", title: "Precise airflow.", text: "Eight speeds adapt the airflow to every moment.", video: "/product/climaire-blue-video.mp4", poster: "/product/climaire-blue-video-poster.webp" },
    { label: "Heats", title: "Gentle warmth.", text: "Comfort when the temperature starts to fall.", video: "/product/climaire-gold-video.mp4", poster: "/product/climaire-gold-video-poster.webp" },
    { label: "Purifies", title: "More pleasant air.", text: "Discreet filtration designed for everyday life.", video: "/product/climaire-anthracite-video.mp4", poster: "/product/climaire-anthracite-video-poster.webp" },
  ],
} as const

export default function ComfortShowcase({ locale }: { locale: "fr" | "en" }) {
  const [active, setActive] = useState(0)
  const items = content[locale]
  const item = items[active]

  return (
    <section id="sec-tech" className="scroll-mt-20 bg-black px-4 py-20 text-white small:px-8 small:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-medium text-white/55">{locale === "fr" ? "Confort toute saison" : "All-season comfort"}</p>
          <h2 className="mt-3 text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">{item.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/60">{item.text}</p>
        </div>

        <div className="relative mx-auto mt-10 aspect-[16/10] max-w-4xl overflow-hidden rounded-[32px] bg-[#0b0b0d] small:mt-14 small:rounded-[44px]">
          <video key={item.video} className="h-full w-full object-contain" src={item.video} poster={item.poster} autoPlay muted loop playsInline preload="metadata" />
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-2xl gap-1 rounded-full bg-[#242426] p-1.5 small:mt-8">
          {items.map((option, index) => (
            <button key={option.label} type="button" onClick={() => setActive(index)} className={`min-h-12 flex-1 rounded-full px-3 text-sm font-medium transition-all small:text-base ${active === index ? "bg-white text-[#1d1d1f]" : "text-white/65 hover:text-white"}`} aria-pressed={active === index}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
