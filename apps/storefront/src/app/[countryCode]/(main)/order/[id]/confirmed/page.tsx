import { retrieveOrder } from "@lib/data/orders"
import OrderCompletedTemplate from "@modules/order/templates/order-completed-template"
import TrackEvent from "@lib/analytics/track-event"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}
export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}

export default async function OrderConfirmedPage(props: Props) {
  const params = await props.params
  const order = await retrieveOrder(params.id).catch(() => null)

  if (!order) {
    return notFound()
  }

  return (
    <>
      <TrackEvent
        event="purchase"
        dedupeKey={`purchase_${order.id}`}
        params={{
          transaction_id: order.display_id ?? order.id,
          currency: order.currency_code?.toUpperCase(),
          value: order.total,
          shipping: order.shipping_total,
          tax: order.tax_total,
          items: (order.items ?? []).map((i) => ({
            item_id: i.product_id,
            item_name: i.product_title,
            price: i.unit_price,
            quantity: i.quantity,
          })),
        }}
      />
      <OrderCompletedTemplate order={order} />
    </>
  )
}
