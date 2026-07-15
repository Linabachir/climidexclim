import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Archivo, Inter, Poppins } from "next/font/google"
import { getI18n } from "@lib/i18n/server"
import { I18nProvider } from "@lib/i18n/context"
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
  // Logo CLIMIDEX servi comme favicon (onglet navigateur + résultats Google).
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/icon.svg",
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
      <body className="bg-brand-ivory text-brand-ink antialiased">
        <I18nProvider locale={locale} dictionary={t}>
          <main className="relative">{props.children}</main>
        </I18nProvider>
      </body>
    </html>
  )
}
