import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import { getI18n } from "@lib/i18n/server"
import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type HeroProps = {
  product: HttpTypes.StoreProduct | null
}

const Hero = async ({ product }: HeroProps) => {
  const { t } = await getI18n()
  const price = product ? getProductPrice({ product }).cheapestPrice : null
  const productHref = product ? `/products/${product.handle}` : "/store"

  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center">
      {/* visuel plein cadre */}
      <Image
        src="/home/living.webp"
        alt={t.home.heroAlt}
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
          {t.home.heroEyebrow}
        </span>

        <h1 className="font-serif font-bold text-brand-ink leading-[0.98] tracking-[-0.02em] text-[clamp(46px,7vw,88px)] mt-6 max-w-[15ch]">
          {t.home.heroTitle1}
          <br />
          {t.home.heroTitle2}
        </h1>

        <p className="font-sans text-[18px] leading-relaxed text-brand-ink-secondary mt-7 max-w-[48ch]">
          {t.home.heroDescription}
        </p>

        <div className="flex flex-col items-center gap-4 mt-11">
          <LocalizedClientLink
            href={productHref}
            className="cj-cta inline-flex items-center justify-center rounded-md bg-brand-navy px-12 py-4 text-[15px] font-medium text-white transition-colors duration-200 hover:bg-black"
            data-testid="hero-discover-link"
          >
            {t.home.discoverClimaire}
          </LocalizedClientLink>
          <p className="font-sans text-[14px] text-brand-ink-secondary">
            {t.home.heroTrust}
          </p>
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
