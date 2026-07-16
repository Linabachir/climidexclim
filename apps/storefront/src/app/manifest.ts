import type { MetadataRoute } from "next"

// Manifest web : icône d'installation sur mobile, couleurs de marque.
// Servi automatiquement par Next.js sur /manifest.webmanifest.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CLIMIDEX · Le Climaire",
    short_name: "CLIMIDEX",
    description:
      "Le Climaire : ventilateur sans pales, silencieux, faible consommation. Rafraîchissement doux pour la maison, l'appartement ou le bureau.",
    start_url: "/fr",
    display: "standalone",
    background_color: "#f7f5f2",
    theme_color: "#1a2238",
    lang: "fr-FR",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  }
}
