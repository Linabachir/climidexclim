import { Metadata } from "next"
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion, listRegions } from "@lib/data/regions"
import ProductTemplate from "@modules/products/templates"
import { HttpTypes } from "@medusajs/types"
import TrackEvent from "@lib/analytics/track-event"

type Props = {
  params: Promise<{ countryCode: string; handle: string }>
  searchParams: Promise<{ v_id?: string }>
}

export async function generateStaticParams() {
  try {
    const countryCodes = await listRegions().then((regions) =>
      regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
    )

    if (!countryCodes) {
      return []
    }

    const promises = countryCodes.map(async (country) => {
      const { response } = await listProducts({
        countryCode: country,
        queryParams: { limit: 100, fields: "handle" },
      })

      return {
        country,
        products: response.products,
      }
    })

    const countryProducts = await Promise.all(promises)

    return countryProducts
      .flatMap((countryData) =>
        countryData.products.map((product) => ({
          countryCode: countryData.country,
          handle: product.handle,
        }))
      )
      .filter((param) => param.handle)
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : "Unknown error"
      }.`
    )
    return []
  }
}

function getImagesForVariant(
  product: HttpTypes.StoreProduct,
  selectedVariantId?: string
) {
  if (!selectedVariantId || !product.variants) {
    return product.images
  }

  const variant = product.variants!.find((v) => v.id === selectedVariantId)
  if (!variant || !variant.images?.length) {
    return product.images
  }

  const imageIdsMap = new Map(variant.images!.map((i) => [i.id, true]))
  return product.images?.filter((i) => imageIdsMap.has(i.id)) ?? null
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { handle } = params
  const region = await getRegion(params.countryCode)

  if (!region) {
    notFound()
  }

  const product = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products[0])

  if (!product) {
    notFound()
  }

  return {
    title: `${product.title} · Ventilateur sans pales | CLIMIDEX`,
    description:
      "Silencieux (35 dB), 8 vitesses & mode nuit. Sûr pour les enfants, sans pales. Rafraîchit jusqu'à 20 m². Livraison offerte partout en France.",
    // Version officielle = /fr (évite les doublons entre variantes pays).
    alternates: {
      canonical: `/fr/products/${handle}`,
      languages: {
        fr: `/fr/products/${handle}`,
        en: `/en/products/${handle}`,
        "x-default": `/fr/products/${handle}`,
      },
    },
    openGraph: {
      title: `${product.title} · Ventilateur sans pales | CLIMIDEX`,
      description: "Le ventilateur sans pales, silencieux et sûr pour toute la famille.",
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  }
}

export default async function ProductPage(props: Props) {
  const params = await props.params
  const region = await getRegion(params.countryCode)
  const searchParams = await props.searchParams

  const selectedVariantId = searchParams.v_id

  if (!region) {
    notFound()
  }

  const pricedProduct = await listProducts({
    countryCode: params.countryCode,
    queryParams: { handle: params.handle },
  }).then(({ response }) => response.products[0])

  if (!pricedProduct) {
    notFound()
  }

  const images = getImagesForVariant(pricedProduct, selectedVariantId)

  // Données structurées Product + fil d'Ariane : permet à Google d'afficher le
  // prix, la disponibilité et le chemin directement dans les résultats.
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://climidex.com"
  const prices = (pricedProduct.variants ?? [])
    .map((v) => (v.calculated_price as any)?.calculated_amount)
    .filter((n): n is number => typeof n === "number")
  const lowPrice = prices.length ? Math.min(...prices) : undefined
  const productUrl = `${base}/fr/products/${pricedProduct.handle}`
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: pricedProduct.title,
        description:
          "Ventilateur sans pales silencieux (35-39 dB), 8 vitesses, mode nuit. Rafraîchissement continu, faible consommation, sûr pour les enfants.",
        image: (pricedProduct.images ?? []).map((i) => i.url).slice(0, 6),
        brand: { "@type": "Brand", name: "CLIMIDEX" },
        ...(lowPrice
          ? {
              offers: {
                "@type": "Offer",
                url: productUrl,
                priceCurrency: "EUR",
                price: lowPrice.toFixed(2),
                availability: "https://schema.org/InStock",
                seller: { "@type": "Organization", name: "CLIMIDEX" },
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${base}/fr` },
          {
            "@type": "ListItem",
            position: 2,
            name: pricedProduct.title,
            item: productUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TrackEvent
        event="view_item"
        params={{
          currency: "EUR",
          value: lowPrice,
          items: [
            {
              item_id: pricedProduct.id,
              item_name: pricedProduct.title,
              price: lowPrice,
            },
          ],
        }}
      />
      <ProductTemplate
        product={pricedProduct}
        region={region}
        countryCode={params.countryCode}
        images={images ?? []}
      />
    </>
  )
}
