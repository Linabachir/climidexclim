import { Metadata } from "next"
import { HttpTypes } from "@medusajs/types"

import { getI18n } from "@lib/i18n/server"
import HomeExperience from "@modules/home/components/home-experience"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { graph, organizationJsonLd, websiteJsonLd } from "@lib/seo/jsonld"

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
      languages: { fr: "/fr", "x-default": "/fr" },
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
  // Données structurées Organisation + Site : aide Google à comprendre la
  // marque CLIMIDEX (entité, logo). Schémas centralisés dans lib/seo.
  const orgJsonLd = graph(organizationJsonLd(), websiteJsonLd())

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <HomeExperience productHref={productHref} />
    </>
  )
}
