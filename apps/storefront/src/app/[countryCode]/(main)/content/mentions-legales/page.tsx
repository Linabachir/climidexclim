import { Metadata } from "next"

import { getI18n } from "@lib/i18n/server"
import LegalPage from "@modules/content/components/legal-page"

export const metadata: Metadata = {
  title: "Mentions légales | CLIMIDEX",
}

export default async function MentionsLegales() {
  const { t } = await getI18n()
  return <LegalPage title={t.legal.legalTitle} body={t.legal.placeholderBody} />
}
