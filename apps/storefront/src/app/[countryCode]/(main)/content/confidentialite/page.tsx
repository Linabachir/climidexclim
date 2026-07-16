import { Metadata } from "next"

import { getI18n } from "@lib/i18n/server"
import LegalPage from "@modules/content/components/legal-page"

export const metadata: Metadata = {
  title: "Politique de confidentialité | CLIMIDEX",
  alternates: { canonical: "/fr/content/confidentialite", languages: { fr: "/fr/content/confidentialite", "x-default": "/fr/content/confidentialite" } },
}

export default async function Confidentialite() {
  const { t } = await getI18n()
  return <LegalPage title={t.legal.privacyTitle} body={t.legal.privacyBody} />
}
