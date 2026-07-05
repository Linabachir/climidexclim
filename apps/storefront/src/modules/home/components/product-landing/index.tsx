import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

import type { Dictionary } from "@lib/i18n/dictionaries"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductLandingProps = {
  product: HttpTypes.StoreProduct | null
  t: Dictionary["landing"]
}

const ProductLanding = ({ product, t }: ProductLandingProps) => {
  const productHref = product ? `/products/${product.handle}` : "/store"

  // Visuels des sections : on saute la 1re image (déjà utilisée par le hero)
  // et on répartit les suivantes sur les 4 piliers.
  const galleryImages = (product?.images ?? []).slice(1)

  return (
    <div className="bg-brand-ivory">
      {/* Phrase de transition */}
      <section className="content-container py-24 small:py-32 border-t border-brand-line">
        <p className="font-serif text-3xl small:text-4xl leading-tight text-brand-ink max-w-3xl">
          {t.intro}
        </p>
      </section>

      {/* Les quatre piliers */}
      <section className="content-container pb-8">
        <div className="flex flex-col gap-20 small:gap-28">
          {t.features.map((feature, index) => {
            const reversed = index % 2 === 1
            return (
              <div
                key={feature.eyebrow}
                className="grid grid-cols-1 small:grid-cols-2 gap-10 small:gap-16 items-center"
              >
                <div className={reversed ? "small:order-2" : "small:order-1"}>
                  <span className="text-xs uppercase tracking-widest text-brand-navy">
                    {feature.eyebrow}
                  </span>
                  <h2 className="font-serif text-4xl small:text-5xl leading-tight text-brand-ink mt-4">
                    {feature.title}
                  </h2>
                  <p className="text-base leading-7 text-brand-mute mt-6 max-w-md">
                    {feature.body}
                  </p>
                </div>
                <div
                  className={`relative aspect-[5/4] w-full overflow-hidden rounded-large bg-brand-paper border border-brand-line ${
                    reversed ? "small:order-1" : "small:order-2"
                  }`}
                >
                  {galleryImages[index]?.url ? (
                    <Image
                      src={galleryImages[index].url}
                      alt={feature.eyebrow}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-serif text-2xl text-brand-line">
                        {feature.eyebrow}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Tableau de caractéristiques techniques */}
      <section className="content-container py-24 small:py-32">
        <div className="grid grid-cols-1 small:grid-cols-2 gap-12 small:gap-16">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-navy">
              {t.specsEyebrow}
            </span>
            <h2 className="font-serif text-4xl small:text-5xl leading-tight text-brand-ink mt-4">
              {t.specsTitle}
            </h2>
          </div>
          <dl className="divide-y divide-brand-line border-t border-brand-line">
            {t.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-baseline justify-between py-4"
              >
                <dt className="text-sm uppercase tracking-wide text-brand-mute">
                  {spec.label}
                </dt>
                <dd className="text-base text-brand-ink font-medium">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="bg-brand-navy text-white">
        <div className="content-container py-24 small:py-32 flex flex-col items-center text-center gap-8">
          <h2 className="font-serif text-4xl small:text-6xl leading-tight max-w-2xl">
            {t.ctaTitle}
          </h2>
          <LocalizedClientLink
            href={productHref}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm uppercase tracking-widest text-brand-navy transition-opacity duration-200 hover:opacity-90"
            data-testid="landing-cta-link"
          >
            {t.ctaButton}
          </LocalizedClientLink>
        </div>
      </section>
    </div>
  )
}

export default ProductLanding
