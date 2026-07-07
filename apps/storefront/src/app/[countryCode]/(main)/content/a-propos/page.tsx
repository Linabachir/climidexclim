import { Metadata } from "next"

import { getI18n } from "@lib/i18n/server"
import LegalPage from "@modules/content/components/legal-page"

export const metadata: Metadata = {
  title: "À propos | CLIMIDEX",
}

export default async function APropos() {
  const { t } = await getI18n()
  return <LegalPage title={t.legal.aboutTitle} body={t.legal.aboutBody} />
}
