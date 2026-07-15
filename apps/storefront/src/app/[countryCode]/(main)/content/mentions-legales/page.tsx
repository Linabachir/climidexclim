import { Metadata } from "next"

import { getI18n } from "@lib/i18n/server"
import LegalPage from "@modules/content/components/legal-page"

export const metadata: Metadata = {
  title: "Mentions légales | CLIMIDEX",
  alternates: { canonical: "/fr/content/mentions-legales", languages: { fr: "/fr/content/mentions-legales", en: "/en/content/mentions-legales", "x-default": "/fr/content/mentions-legales" } },
}

export default async function MentionsLegales() {
  const { t } = await getI18n()
  return <LegalPage title={t.legal.legalTitle} body={t.legal.legalBody} />
}
