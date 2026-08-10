import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Archivo, Inter, Poppins } from "next/font/google"
import { getI18n } from "@lib/i18n/server"
import { I18nProvider } from "@lib/i18n/context"
import Analytics from "@lib/analytics/analytics"
import ConsentBanner from "@lib/analytics/consent-banner"
import "styles/globals.css"

// CLIMIDEX type pairing — Archivo (grotesque affirmé/éditorial, titres) + Inter
// (body/UI), exposés via --font-serif / --font-sans et consommés par Tailwind.
// (La variable garde le nom "--font-serif" pour ne pas casser les classes existantes.)
const serif = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-serif",
})

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  variable: "--font-sans",
})

// Logo CLIMIDEX — géométrique, proche du lettrage de la marque.
const logo = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
  variable: "--font-logo",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  // Titre par défaut ; les pages qui définissent le leur passent tel quel (%s).
  title: {
    default: "CLIMIDEX · Le Climaire, ventilateur sans pales",
    template: "%s",
  },
  applicationName: "CLIMIDEX",
  keywords: [
    "ventilateur sans pales",
    "ventilateur silencieux",
    "ventilateur colonne",
    "ventilateur tour",
    "rafraîchissement",
    "ventilateur design",
    "Climaire",
    "CLIMIDEX",
  ],
  authors: [{ name: "CLIMIDEX" }],
  creator: "CLIMIDEX",
  publisher: "CLIMIDEX",
  // Indexation par défaut, avec grandes previews d'image/snippet pour Google.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "CLIMIDEX",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
  },
  manifest: "/manifest.webmanifest",
  // Logo CLIMIDEX servi comme favicon (onglet navigateur + résultats Google).
  icons: {
    icon: [
      { url: "/favicon-64.png?v=4", type: "image/png", sizes: "64x64" },
      { url: "/icon.svg?v=4", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=4",
    apple: "/favicon-64.png?v=4",
  },
}

export default async function RootLayout(props: {
  children: React.ReactNode
}) {
  const { locale, t } = await getI18n()

  return (
    <html
      lang={locale}
      data-mode="light"
      className={`${serif.variable} ${sans.variable} ${logo.variable}`}
    >
      <body className="bg-white text-brand-ink antialiased">
        {/* Ouvre en avance la connexion vers le domaine des images produit et
            des avis (DNS + TLS) → LCP/FCP plus rapides sur les fiches.
            React 19 hisse ces balises dans le <head>. */}
        <link
          rel="preconnect"
          href="https://api.climidex.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://api.climidex.com" />
        <Analytics />
        <I18nProvider locale={locale} dictionary={t}>
          <main className="relative">{props.children}</main>
          <ConsentBanner />
        </I18nProvider>
      </body>
    </html>
  )
}
