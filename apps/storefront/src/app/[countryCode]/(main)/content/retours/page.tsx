import { Metadata } from "next"

import { getI18n } from "@lib/i18n/server"
import LegalPage from "@modules/content/components/legal-page"

export const metadata: Metadata = {
  title: "Retours & remboursements | CLIMIDEX",
  alternates: { canonical: "/fr/content/retours", languages: { fr: "/fr/content/retours", en: "/en/content/retours", "x-default": "/fr/content/retours" } },
}

export default async function Retours() {
  const { t } = await getI18n()
  return <LegalPage title={t.legal.returnsTitle} body={t.legal.returnsBody} />
}
