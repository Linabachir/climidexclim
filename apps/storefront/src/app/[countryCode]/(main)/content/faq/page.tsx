import { Metadata } from "next"

import { getI18n } from "@lib/i18n/server"
import Faq from "@modules/content/components/faq"

export const metadata: Metadata = {
  title: "FAQ · Questions fréquentes | CLIMIDEX",
  description:
    "Questions fréquentes sur le Climaire : fonctionnement sans pales, silence, sécurité enfants, livraison offerte, retours 14 jours, garantie 2 ans.",
  alternates: {
    canonical: "/fr/content/faq",
    languages: {
      fr: "/fr/content/faq",
      "x-default": "/fr/content/faq",
    },
  },
}

export default async function FaqPage() {
  const { t } = await getI18n()

  // Données structurées FAQPage : permet à Google d'afficher les questions
  // directement dans les résultats de recherche (rich result).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Faq title={t.faq.title} lead={t.faq.lead} items={t.faq.items} />
    </>
  )
}
