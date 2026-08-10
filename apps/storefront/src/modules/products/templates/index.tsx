import React, { Suspense } from "react"
import Image from "next/image"

import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductSpecs from "@modules/products/components/product-specs"
import ProductTabs from "@modules/products/components/product-tabs"
import ProductInfo from "@modules/products/templates/product-info"
import ProductReviews from "@modules/products/components/product-reviews"
import ProductStory from "@modules/products/components/product-story"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ProductActionsWrapper from "./product-actions-wrapper"
import { SelectedColorProvider } from "@modules/products/components/color-context"

const TRUST = [
  "Livraison suivie",
  "Sans pales, sûr pour les enfants",
  "Paiement sécurisé",
]

const TrustList = () => (
  <div className="flex flex-col gap-y-3 border-t border-brand-line pt-6">
    {TRUST.map((t) => (
      <div key={t} className="flex items-center gap-x-3 text-brand-ink-secondary">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          className="text-brand-navy shrink-0"
          aria-hidden
        >
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-sm">{t}</span>
      </div>
    ))}
  </div>
)

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <main className="bg-white [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Text','Helvetica_Neue',Arial,sans-serif]">
      <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-[#e8e8e8] text-white">
        <video
          className="absolute inset-0 h-full w-full object-cover object-center"
          src="/home/climidex-film.mp4"
          poster="/home/climidex-film-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Le Climaire en situation"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/10" />
        <div className="content-container relative flex min-h-[calc(100svh-72px)] flex-col justify-end pb-10 small:pb-14">
          <h1 className="max-w-[9ch] text-[clamp(3.5rem,7vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
            Climaire
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/90 small:text-xl">
            Chaud, froid et air purifié. Un seul appareil pour toute l’année.
          </p>
          <a
            href="#acheter"
            className="mt-8 inline-flex w-fit items-center gap-3 text-sm font-medium text-white transition-opacity hover:opacity-70"
          >
            Découvrir le produit
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 2.5v10M4.5 9l3.5 3.5L11.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <section id="decouvrir" className="bg-[#000] pb-24 text-white small:pb-36">
        <div className="sticky top-0 z-30 border-b border-white/10 bg-black/80 backdrop-blur-xl">
          <div className="content-container flex h-16 items-center justify-between">
            <span className="text-lg font-semibold tracking-[-0.02em]">Climaire</span>
            <div className="flex items-center gap-5 text-sm">
              <a href="#points-forts" className="text-white/70 transition-colors hover:text-white">
                Découvrir
              </a>
              <a href="#acheter" className="rounded-full bg-white px-5 py-2 font-medium text-black transition-opacity hover:opacity-85">
                Acheter
              </a>
            </div>
          </div>
        </div>

        <div id="points-forts" className="content-container scroll-mt-20 pt-20 small:pt-28">
          <h2 className="text-[clamp(3rem,6vw,6rem)] font-semibold leading-none tracking-[-0.05em]">
            Points forts.
          </h2>

          <article className="mt-12 overflow-hidden rounded-[28px] bg-[#f5f5f7] text-[#1d1d1f] small:mt-16 small:rounded-[40px]">
            <div className="px-6 pb-4 pt-10 text-center small:px-12 small:pt-16">
              <h3 className="mx-auto max-w-[18ch] text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                Trois finitions. Un même confort.
              </h3>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#6e6e73] small:text-lg">
                Ivoire, Noir ou Bleu. Le Climaire trouve naturellement sa place dans votre intérieur.
              </p>
            </div>
            <div className="grid grid-cols-3 items-end gap-1 px-2 pt-5 small:gap-6 small:px-[8vw] small:pt-10">
              {[
                ["/product/climaire-gold-front.webp", "Climaire Ivoire"],
                ["/product/climaire-anthracite-front.webp", "Climaire Noir"],
                ["/product/climaire-blue-front.webp", "Climaire Bleu"],
              ].map(([src, alt]) => (
                <div key={src} className="relative aspect-[3/5] overflow-hidden">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="33vw"
                    className="object-contain object-bottom mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </article>

          <div className="mt-6 grid gap-5 min-[768px]:grid-cols-2">
            <article className="flex min-h-[420px] flex-col overflow-hidden rounded-[28px] bg-[#f5f5f7] text-[#1d1d1f] small:min-h-[450px] small:rounded-[32px]">
              <div className="px-7 pt-8 small:px-10 small:pt-10">
                <p className="text-sm font-medium text-[#6e6e73]">Confort toute saison</p>
                <h3 className="mt-3 max-w-[12ch] text-[clamp(2rem,3.2vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
                  Du frais à la chaleur.
                </h3>
              </div>
              <div className="relative mx-5 mb-5 mt-8 aspect-[16/10] overflow-hidden rounded-[22px] small:mx-7 small:mb-7 small:rounded-[26px]">
                <Image src="/product/climaire-gold-arc.webp" alt="Finition de l'anneau du Climaire" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </article>

            <article className="flex min-h-[420px] flex-col overflow-hidden rounded-[28px] bg-[#f5f5f7] text-[#1d1d1f] small:min-h-[450px] small:rounded-[32px]">
              <div className="px-7 pt-8 small:px-10 small:pt-10">
                <p className="text-sm font-medium text-[#6e6e73]">Air intérieur</p>
                <h3 className="mt-3 max-w-[12ch] text-[clamp(2rem,3.2vw,3.25rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
                  Respirez un air plus pur.
                </h3>
              </div>
              <div className="relative mx-5 mb-5 mt-8 aspect-[16/10] overflow-hidden rounded-[22px] small:mx-7 small:mb-7 small:rounded-[26px]">
                <Image src="/product/climaire-gold-filter.webp" alt="Système de filtration du Climaire" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <div
        id="acheter"
        className="content-container py-7 small:py-12 scroll-mt-24"
        data-testid="product-container"
      >
        <nav className="flex items-center gap-x-2 mb-6 text-[13px] text-brand-mute">
          <LocalizedClientLink href="/" className="hover:text-brand-ink">
            La Maison
          </LocalizedClientLink>
          <span className="text-brand-line">/</span>
          <span className="text-brand-ink">
            Climaire ventilateur purificateur
          </span>
        </nav>

        <SelectedColorProvider>
        <div className="grid grid-cols-1 small:grid-cols-[1.08fr_0.92fr] gap-10 small:gap-12 large:gap-16 items-start">
          {/* Colonne galerie photos */}
          <div className="w-full">
            <ImageGallery images={images} />
          </div>

          {/* Colonne achat (collante au défilement) */}
          <div className="flex w-full flex-col gap-y-10 small:sticky small:top-28">
            <ProductInfo product={product} />
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
            <section
              className="border-t border-brand-line pt-7"
              data-testid="product-description"
            >
              <h2 className="text-2xl font-semibold tracking-[-0.025em] text-brand-ink">
                Chaud, froid et air purifié.
              </h2>
              <p className="mt-3 text-[15px] leading-7 text-brand-ink-secondary">
                Un seul appareil pour toute l’année : il rafraîchit l’air en
                été, diffuse une chaleur douce en hiver et contribue à purifier
                l’air de votre intérieur au quotidien.
              </p>
              <ul className="mt-6 grid grid-cols-3 gap-1 rounded-full bg-[#e8e8ed] p-1.5">
                {["Rafraîchit", "Chauffe", "Purifie"].map((label) => (
                  <li
                    key={label}
                    className="flex min-h-11 items-center justify-center rounded-full px-2 text-center text-sm font-medium text-[#3a3a3c] transition-colors duration-200 hover:bg-white hover:text-[#1d1d1f] small:text-base"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </section>
            <TrustList />
            <ProductTabs product={product} />
          </div>
        </div>
        </SelectedColorProvider>
      </div>

      {/* Récit produit premium (visuels + bénéfices) */}
      <ProductStory buyHref="#acheter" />

      {/* Caractéristiques techniques */}
      <ProductSpecs />

      {/* Avis clients */}
      <ProductReviews productId={product.id} />

      {/*
        Section "produits associés" retirée : la boutique est mono-produit et
        le backend contient encore des produits de démonstration Medusa.
        À réactiver (RelatedProducts) une fois de vrais produits ajoutés.
      */}
    </main>
  )
}

export default ProductTemplate
