import { Metadata } from "next"

import OrderOverview from "@modules/account/components/order-overview"
import { notFound } from "next/navigation"
import { listOrders } from "@lib/data/orders"
import { getI18n } from "@lib/i18n/server"
import Divider from "@modules/common/components/divider"
import TransferRequestForm from "@modules/account/components/transfer-request-form"

export const metadata: Metadata = {
  title: "Commandes | CLIMIDEX",
  description: "Aperçu de vos commandes CLIMIDEX.",
}

export default async function Orders() {
  const orders = await listOrders()
  const { t } = await getI18n()

  if (!orders) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="orders-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="font-serif text-3xl text-brand-ink">
          {t.account.ordersTitle}
        </h1>
        <p className="text-base-regular text-brand-mute">
          {t.account.ordersSubtitle}
        </p>
      </div>
      <div>
        <OrderOverview orders={orders} />
        <Divider className="mb-8 mt-8" />
        <TransferRequestForm />
      </div>
    </div>
  )
}
