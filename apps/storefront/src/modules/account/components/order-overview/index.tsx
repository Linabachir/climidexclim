"use client"

import { Button } from "@modules/common/components/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useI18n } from "@lib/i18n/context"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  const { t } = useI18n()
  if (orders?.length) {
    return (
      <div className="flex flex-col gap-y-6 w-full">
        {orders.map((o) => (
          <div key={o.id}>
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-4"
      data-testid="no-orders-container"
    >
      <h2 className="font-serif text-3xl text-brand-ink">
        {t.account.nothingHere}
      </h2>
      <p className="text-base-regular text-brand-mute">
        {t.account.noOrdersText}
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button
            data-testid="continue-shopping-button"
            className="rounded-md bg-brand-navy uppercase tracking-[0.14em] text-brand-on-navy hover:bg-brand-navy-deep"
          >
            {t.account.continueShopping}
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
