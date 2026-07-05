"use client"

import CartTotals from "@modules/common/components/cart-totals"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useI18n } from "@lib/i18n/context"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const { t } = useI18n()
  const step = getCheckoutStep(cart)

  return (
    <div className="rounded-lg border border-brand-line bg-white p-7 flex flex-col gap-y-6">
      <h2 className="font-serif text-2xl text-brand-ink">{t.cart.summary}</h2>

      <DiscountCode cart={cart} />

      <div className="h-px w-full bg-brand-line" />

      <CartTotals totals={cart} />

      <LocalizedClientLink
        href={"/checkout?step=" + step}
        data-testid="checkout-button"
        className="mt-1 inline-flex w-full items-center justify-center rounded-md bg-brand-navy px-6 py-3.5 text-[13px] font-medium uppercase tracking-[0.14em] text-brand-on-navy transition-colors duration-200 hover:bg-brand-navy-deep"
      >
        {t.cart.checkout}
      </LocalizedClientLink>

      <LocalizedClientLink
        href="/products/climaire-ventilateur-sans-pales"
        className="text-center text-[13px] text-brand-mute transition-colors duration-150 hover:text-brand-ink"
      >
        {t.cart.continueShopping}
      </LocalizedClientLink>
    </div>
  )
}

export default Summary
