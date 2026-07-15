import { Metadata } from "next"
import { HttpTypes } from "@medusajs/types"

import { getI18n } from "@lib/i18n/server"
import Hero from "@modules/home/components/hero"
import HomeStats from "@modules/home/components/home-stats"
import HomePrinciples from "@modules/home/components/home-principles"
import HomeLifestyle from "@modules/home/components/home-lifestyle"
import HomeTech from "@modules/home/components/home-tech"
import HomeCta from "@modules/home/components/home-cta"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { getProductPrice } from "@lib/util/get-product-price"

// Handle du produit phare. La boutique est mono-produit pour l'instant ;
// ce handle pointe vers le Climaire dans le backend Medusa.
const CLIMAIRE_HANDLE = "climaire-ventilateur-sans-pales"

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n()
  return {
    title: t.home.metaTitle,
    description: t.home.metaDescription,
    // Version officielle = /fr (toutes les variantes pays servent le même
    // contenu ; sans canonical, Google les voit comme des doublons et
    // n'indexe rien).
    alternates: {
      canonical: "/fr",
      languages: { fr: "/fr", en: "/en", "x-default": "/fr" },
    },
  }
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await props.params

  const region = await getRegion(countryCode)

  // On récupère le Climaire par son handle. Si le backend est indisponible
  // ou le produit absent, on dégrade proprement vers une version texte.
  let product: HttpTypes.StoreProduct | null = null
  if (region) {
    const {
      response: { products },
    } = await listProducts({
      countryCode,
      queryParams: {
        handle: CLIMAIRE_HANDLE,
        // On demande les images du produit + le prix de la variante,
        // pour alimenter le hero et les visuels de la landing.
        fields: "*images,*variants.calculated_price,+thumbnail",
      },
    })
    product = products[0] ?? null
  }

  const productHref = product
    ? `/products/${product.handle}`
    : "/store"
  const price = product
    ? getProductPrice({ product }).cheapestPrice?.calculated_price
    : null

  return (
    <>
      <Hero product={product} />
      <HomeStats />
      <HomePrinciples />
      <HomeLifestyle />
      <HomeTech productHref={productHref} />
      <HomeCta productHref={productHref} price={price} />
    </>
  )
}
