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

// Ordre d'affichage préféré : les packshots sur fond blanc d'abord,
// les scènes lifestyle (bureau, salon) à la fin. Repérage par nom de fichier.
const ORDER = [
  "purificateur_d_air_moderne_et_", // packshot de face, fond blanc
  "1638e318", // packshot de trois-quarts, fond blanc
  "purificateur_d_air_moderne_en_d", // détail écran LED, fond blanc
  "bc132e79", // détail haut, fond blanc
  "29321f16", // scène bureau (lifestyle)
  "ambiance", // scène salon (lifestyle)
]
const rank = (url?: string) => {
  const u = (url ?? "").toLowerCase()
  const i = ORDER.findIndex((t) => u.includes(t))
  return i === -1 ? 50 : i
}

const ImageGallery = ({ images: rawImages }: ImageGalleryProps) => {
  const { t } = useI18n()
  const { color } = useSelectedColor()
  const images = [...rawImages].sort((a, b) => rank(a.url) - rank(b.url))
  const [active, setActive] = useState(0)

  // Quand un coloris est choisi, on bascule sur sa photo (si elle existe).
  useEffect(() => {
    const key = imageKeyForColor(color)
    if (!key) return
    const idx = images.findIndex((img) => (img.url ?? "").includes(key))
    if (idx >= 0) setActive(idx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color])

  const current = images[active] ?? images[0]

  const go = (dir: number) =>
    setActive((i) => (i + dir + images.length) % images.length)

  if (!images?.length) {
    return (
      <div className="aspect-[4/5] w-full rounded-large bg-brand-paper border border-brand-line" />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Image principale */}
      <div className="group relative w-full max-w-[440px] mx-auto aspect-[4/5] overflow-hidden rounded-lg bg-white border border-brand-line">
        {current?.url && (
          <Image
            key={current.id}
            src={current.url}
            priority
            className="object-contain p-3"
            alt="Climaire, ventilateur sans pales — vue du produit"
            fill
            sizes="(max-width: 1024px) 100vw, 440px"
          />
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t.product.galleryPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/85 text-brand-ink shadow-sm transition hover:bg-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t.product.galleryNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/85 text-brand-ink shadow-sm transition hover:bg-white"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            {/* compteur */}
            <div className="absolute bottom-3 right-3 rounded-full bg-brand-ink/70 px-2.5 py-1 text-[11px] font-medium text-white">
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Miniatures : petite rangée horizontale scrollable */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir le visuel ${i + 1}`}
              className={`relative shrink-0 w-[72px] h-[72px] overflow-hidden rounded-md bg-white border transition-colors ${
                active === i
                  ? "border-brand-navy"
                  : "border-brand-line hover:border-brand-mute"
              }`}
            >
              {image.url && (
                <Image
                  src={image.url}
                  className="object-cover"
                  alt={`Climaire, ventilateur sans pales — miniature ${i + 1}`}
                  fill
                  sizes="72px"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
