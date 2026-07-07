import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://climidex.com"

// Boutique mono-produit : les URL publiques sont connues statiquement.
const PATHS = [
  "",
  "/products/climaire-ventilateur-sans-pales",
  "/content/a-propos",
  "/content/cgv",
  "/content/mentions-legales",
  "/content/retours",
  "/content/confidentialite",
  "/content/contact",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return ["fr", "en"].flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
      priority: path === "" ? 1 : path.startsWith("/products") ? 0.9 : 0.5,
    }))
  )
}
