"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useEffect, useState } from "react"

import { useI18n } from "@lib/i18n/context"
import {
  imageKeyForColor,
  useSelectedColor,
} from "@modules/products/components/color-context"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

type GalleryMedia = {
  id: string
  url: string
  alt: string
}

const PRODUCT_MEDIA: GalleryMedia[] = [
  { id: "gold-front", url: "/product/climaire-gold-front.webp", alt: "Climaire blanc et champagne, vue de face" },
  { id: "gold-display", url: "/product/climaire-gold-display.webp", alt: "Écran et filtre du Climaire blanc et champagne" },
  { id: "gold-filter", url: "/product/climaire-gold-filter.webp", alt: "Filtre doré du Climaire en détail" },
  { id: "gold-arc", url: "/product/climaire-gold-arc.webp", alt: "Finition champagne de l'anneau du Climaire" },
  { id: "blue-front", url: "/product/climaire-blue-front.webp", alt: "Climaire blanc et bleu, vue de face" },
  { id: "blue-display", url: "/product/climaire-blue-display.webp", alt: "Écran du Climaire blanc et bleu" },
  { id: "blue-filter", url: "/product/climaire-blue-filter.webp", alt: "Filtre bleu du Climaire en détail" },
  { id: "anthracite-front", url: "/product/climaire-anthracite-front.webp", alt: "Climaire anthracite et doré, vue de face" },
  { id: "anthracite-angle", url: "/product/climaire-anthracite-angle.webp", alt: "Climaire anthracite et doré, vue de trois-quarts" },
  { id: "anthracite-filter", url: "/product/climaire-anthracite-filter.webp", alt: "Filtre du Climaire anthracite en détail" },
]

const DEFAULT_COLOR_KEY = "climaire-gold"

const ImageGallery = (_props: ImageGalleryProps) => {
  const { t } = useI18n()
  const { color } = useSelectedColor()
  const activeColorKey = imageKeyForColor(color) ?? DEFAULT_COLOR_KEY
  const media = PRODUCT_MEDIA.filter((item) =>
    item.url.includes(activeColorKey)
  )
  const [active, setActive] = useState(0)

  useEffect(() => {
    setActive(0)
  }, [activeColorKey])

  const current = media[active] ?? media[0]
  const go = (direction: number) =>
    setActive((index) => (index + direction + media.length) % media.length)

  if (!media.length) {
    return (
      <div className="aspect-[4/5] w-full bg-white" />
    )
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="group relative isolate aspect-square w-full overflow-hidden bg-white">
        <Image
          key={current.id}
          src={current.url}
          priority
          className={`scale-[1.08] object-contain p-5 mix-blend-multiply small:p-8 ${
            current.url.includes("climaire-blue")
              ? "[mask-image:radial-gradient(ellipse_76%_86%_at_center,black_68%,transparent_100%)]"
              : ""
          }`}
          alt={current.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 55vw"
        />

        {media.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label={t.product.galleryPrev} className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/85 text-brand-ink shadow-sm transition hover:bg-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M15 6l-6 6 6 6" /></svg>
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t.product.galleryNext} className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/85 text-brand-ink shadow-sm transition hover:bg-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
            </button>
            <div className="absolute bottom-3 right-3 rounded-full bg-brand-ink/70 px-2.5 py-1 text-[11px] font-medium text-white">
              {active + 1} / {media.length}
            </div>
          </>
        )}
      </div>

      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {media.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Voir le visuel ${index + 1}`}
              className={`relative h-[72px] w-[72px] shrink-0 overflow-hidden bg-white border transition-colors ${active === index ? "border-brand-ink" : "border-[#e5e5e7] hover:border-brand-mute"}`}
            >
              <Image
                src={item.url}
                className={`object-cover mix-blend-multiply ${
                  item.url.includes("climaire-blue")
                    ? "[mask-image:radial-gradient(ellipse_76%_86%_at_center,black_68%,transparent_100%)]"
                    : ""
                }`}
                alt={item.alt}
                fill
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
