import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://climidex.com"
const BACKEND = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || ""
const PUBKEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

// Le site sert son contenu sur des chemins par code pays (/fr, /gb, …) avec
// la langue gérée par cookie, PAS par des chemins /en. On ne déclare donc
// que le français (chemin canonique) + x-default pour éviter des alternates
// hreflang vers des URL inexistantes.
const LOCALES = ["fr"] as const

// Pages statiques connues. Ajouter ici les futurs hubs éditoriaux
// (/blog, /guide, /comparatif, /aide) au fur et à mesure de leur création.
const STATIC_PATHS = [
  "",
  "/content/a-propos",
  "/content/faq",
  "/content/cgv",
  "/content/mentions-legales",
  "/content/retours",
  "/content/confidentialite",
  "/content/contact",
]

// Handle de secours si l'API backend est injoignable au moment du rendu :
// le sitemap ne doit jamais être vide.
const FALLBACK_PRODUCT_PATHS = ["/products/climaire-ventilateur-sans-pales"]

/**
 * Récupère dynamiquement les handles produits depuis Medusa. Résilient :
 * en cas d'erreur réseau, on retombe sur le handle connu.
 */
async function getProductPaths(): Promise<
  { path: string; lastModified?: string }[]
> {
  if (!BACKEND || !PUBKEY) {
    return FALLBACK_PRODUCT_PATHS.map((path) => ({ path }))
  }
  try {
    const res = await fetch(
      `${BACKEND}/store/products?fields=handle,updated_at&limit=200`,
      {
        headers: { "x-publishable-api-key": PUBKEY },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) throw new Error(`Backend ${res.status}`)
    const data = (await res.json()) as {
      products?: { handle?: string; updated_at?: string }[]
    }
    const paths = (data.products ?? [])
      .filter((p) => p.handle)
      .map((p) => ({
        path: `/products/${p.handle}`,
        lastModified: p.updated_at,
      }))
    return paths.length
      ? paths
      : FALLBACK_PRODUCT_PATHS.map((path) => ({ path }))
  } catch {
    return FALLBACK_PRODUCT_PATHS.map((path) => ({ path }))
  }
}

// Une entrée par page, en français (version canonique), avec les alternates
// hreflang fr/en/x-default → une seule URL déclarée, langues signalées.
function entry(
  path: string,
  lastModified: Date | string
): MetadataRoute.Sitemap[number] {
  const languages: Record<string, string> = {
    "x-default": `${BASE_URL}/fr${path}`,
  }
  for (const l of LOCALES) languages[l] = `${BASE_URL}/${l}${path}`

  return {
    url: `${BASE_URL}/fr${path}`,
    lastModified,
    changeFrequency:
      path === ""
        ? "daily"
        : path.startsWith("/products")
        ? "weekly"
        : "monthly",
    priority: path === "" ? 1 : path.startsWith("/products") ? 0.9 : 0.5,
    alternates: { languages },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  const products = await getProductPaths()

  return [
    ...STATIC_PATHS.map((path) => entry(path, now)),
    ...products.map((p) => entry(p.path, p.lastModified ?? now)),
  ]
}
