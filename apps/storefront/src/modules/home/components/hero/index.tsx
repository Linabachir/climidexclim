import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type HeroProps = {
  product: HttpTypes.StoreProduct | null
}

const Hero = ({ product }: HeroProps) => {
  const price = product ? getProductPrice({ product }).cheapestPrice : null
  const productHref = product ? `/products/${product.handle}` : "/store"

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* visuel plein cadre */}
      <Image
        src="/home/living.webp"
        alt="Le Climaire dans un intérieur lumineux et épuré"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* voile clair pour la lisibilité + fondu ivoire en haut (continuité avec l'en-tête) */}
      <div className="absolute inset-0 bg-brand-ivory/55" />
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-brand-ivory to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-ivory to-transparent" />

      <div className="relative z-10 content-container flex flex-col items-center text-center py-28">
        <span className="font-sans text-[14px] font-medium text-brand-navy">
          Ventilateur sans pales
        </span>

        <h1 className="font-serif font-bold text-brand-ink leading-[0.98] tracking-[-0.02em] text-[clamp(46px,7vw,88px)] mt-6 max-w-[15ch]">
          Gardez la tête froide.
        </h1>

        <p className="font-sans text-[18px] leading-relaxed text-brand-ink-secondary mt-7 max-w-[48ch]">
          Le Climaire diffuse un air régulier et silencieux, sans pales ni
          surface tranchante. Facile à nettoyer, sûr autour des enfants.
        </p>

        <div className="flex flex-col xsmall:flex-row items-stretch xsmall:items-center gap-4 mt-11 w-full max-w-[560px]">
          <LocalizedClientLink
            href={productHref}
            className="cj-cta flex-1 inline-flex items-center justify-center rounded-md bg-brand-navy px-8 py-4 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-black"
            data-testid="hero-cart-link"
          >
            {price
              ? `Ajouter au panier · ${price.calculated_price}`
              : "Ajouter au panier"}
          </LocalizedClientLink>
          <LocalizedClientLink
            href={productHref}
            className="flex-1 inline-flex items-center justify-center rounded-md border border-brand-ink/25 px-8 py-4 text-[15px] font-medium text-brand-ink transition-colors duration-200 hover:border-brand-ink hover:bg-brand-ink/5"
            data-testid="hero-discover-link"
          >
            Découvrir le Climaire
          </LocalizedClientLink>
        </div>
      </div>

      {/* indicateur de défilement */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-brand-ink/40" aria-hidden>
          <path d="M12 5v14M6 13l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}

export default Hero
