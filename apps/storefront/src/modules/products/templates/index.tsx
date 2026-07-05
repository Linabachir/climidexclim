import React, { Suspense } from "react"

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
    <>
      <div
        id="acheter"
        className="content-container py-10 small:py-16 scroll-mt-24"
        data-testid="product-container"
      >
        <nav className="flex items-center gap-x-2 mb-8 text-[13px] text-brand-mute">
          <LocalizedClientLink href="/" className="hover:text-brand-ink">
            Maison
          </LocalizedClientLink>
          <span className="text-brand-line">/</span>
          <span className="text-brand-ink">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 small:grid-cols-2 gap-10 small:gap-16 items-start">
          {/* Colonne galerie photos */}
          <div className="w-full">
            <ImageGallery images={images} />
          </div>

          {/* Colonne achat (collante au défilement) */}
          <div className="flex flex-col gap-y-8 small:sticky small:top-28 w-full">
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
            {product.description && (
              <p
                className="text-[15px] leading-7 text-brand-ink-secondary whitespace-pre-line border-t border-brand-line pt-6"
                data-testid="product-description"
              >
                {product.description}
              </p>
            )}
            <TrustList />
            <ProductTabs product={product} />
          </div>
        </div>
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
    </>
  )
}

export default ProductTemplate
