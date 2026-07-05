import { Metadata } from "next"

import { getI18n } from "@lib/i18n/server"
import LegalPage from "@modules/content/components/legal-page"

export const metadata: Metadata = {
  title: "Conditions générales de vente | CLIMIDEX",
}

export default async function CGV() {
  const { t } = await getI18n()
  return <LegalPage title={t.legal.termsTitle} body={t.legal.termsBody} />
}
