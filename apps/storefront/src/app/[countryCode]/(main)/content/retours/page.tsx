import { Metadata } from "next"

import { getI18n } from "@lib/i18n/server"
import LegalPage from "@modules/content/components/legal-page"

export const metadata: Metadata = {
  title: "Retours & remboursements | CLIMIDEX",
}

export default async function Retours() {
  const { t } = await getI18n()
  return <LegalPage title={t.legal.returnsTitle} body={t.legal.returnsBody} />
}
