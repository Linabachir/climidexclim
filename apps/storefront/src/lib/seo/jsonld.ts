// Source unique de vérité pour le SEO structuré (JSON-LD) de CLIMIDEX.
// Modifier la marque / le logo / l'URL ICI se répercute partout.

export const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://climidex.com"

export const BRAND = {
  name: "CLIMIDEX",
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/opengraph-image.jpg`,
  email: "contact@climidex.com",
}

type JsonLd = Record<string, unknown>

/** Schéma Organization : identité de la marque (entité, logo, contact). */
export function organizationJsonLd(): JsonLd {
  return {
    "@type": "Organization",
    name: BRAND.name,
    url: SITE_URL,
    logo: BRAND.logo,
    image: BRAND.image,
    email: BRAND.email,
  }
}

/** Schéma WebSite : le site comme entité. */
export function websiteJsonLd(): JsonLd {
  return {
    "@type": "WebSite",
    name: BRAND.name,
    url: SITE_URL,
    image: BRAND.image,
    inLanguage: "fr-FR",
  }
}

/** Fil d'Ariane structuré à partir d'une liste ordonnée (nom + url). */
export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

/** Schéma Product avec offre (prix, devise, disponibilité, vendeur). */
export function productJsonLd(input: {
  name: string
  description: string
  images: string[]
  url: string
  price?: number
  currency?: string
}): JsonLd {
  const { name, description, images, url, price, currency = "EUR" } = input
  return {
    "@type": "Product",
    name,
    description,
    image: images.slice(0, 6),
    brand: { "@type": "Brand", name: BRAND.name },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            url,
            priceCurrency: currency,
            price: price.toFixed(2),
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: BRAND.name },
          },
        }
      : {}),
  }
}

/** Schéma FAQPage à partir d'une liste de questions/réponses. */
export function faqJsonLd(qa: { question: string; answer: string }[]): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}

/** Enveloppe un ou plusieurs schémas dans un document @graph prêt à sérialiser. */
export function graph(...nodes: JsonLd[]): JsonLd {
  return { "@context": "https://schema.org", "@graph": nodes }
}
