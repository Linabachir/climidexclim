import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import TrackEvent from "@lib/analytics/track-event"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout() {
  const cart = await retrieveCart()

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <div className="bg-brand-ivory min-h-screen">
      <TrackEvent
        event="begin_checkout"
        params={{
          currency: cart.currency_code?.toUpperCase(),
          value: cart.total,
          items: (cart.items ?? []).map((i) => ({
            item_id: i.product_id,
            item_name: i.product_title,
            price: i.unit_price,
            quantity: i.quantity,
          })),
        }}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_416px] content-container gap-10 lg:gap-16 py-14 small:py-20">
        <PaymentWrapper cart={cart}>
          <CheckoutForm cart={cart} customer={customer} />
        </PaymentWrapper>
        <CheckoutSummary cart={cart} />
      </div>
    </div>
  )
}
