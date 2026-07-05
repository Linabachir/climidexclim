import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { CJ_MODULE, CjModuleService } from "../modules/cj"
import { sendOrderShippedEmail } from "../lib/order-shipped-email"

// Vérifie chez CJ les commandes envoyées mais pas encore expédiées : dès qu'un
// numéro de suivi apparaît, met à jour la commande et envoie l'email
// « commande expédiée » (une seule fois par commande).
export default async function syncCjTrackingJob(container: MedusaContainer) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const cj = container.resolve<CjModuleService>(CJ_MODULE)
  const orderService: any = container.resolve(Modules.ORDER)

  try {
    // Les filtres graph ne couvrent pas les champs JSON : on prend les
    // commandes récentes et on filtre en mémoire (volume faible).
    const { data: orders } = await query.graph({
      entity: "order",
      fields: [
        "id",
        "display_id",
        "email",
        "metadata",
        "items.title",
        "items.quantity",
        "shipping_address.*",
      ],
      pagination: { take: 200, skip: 0, order: { created_at: "DESC" } },
    })

    const pending = (orders ?? []).filter(
      (o: any) => o.metadata?.cj_order_id && !o.metadata?.shipping_email_sent_at
    )
    if (!pending.length) return

    let sentCount = 0
    for (const order of pending) {
      try {
        const detail = await cj.getOrderDetail(String(order.metadata.cj_order_id))
        if (!detail.trackNumber) continue

        const sent = await sendOrderShippedEmail(
          {
            order,
            trackNumber: detail.trackNumber,
            trackingUrl: detail.trackingUrl,
            logistic: order.metadata?.cj_logistic as string | undefined,
          },
          logger
        )
        await orderService.updateOrders([
          {
            id: order.id,
            metadata: {
              ...(order.metadata ?? {}),
              cj_order_status: detail.orderStatus,
              cj_track_number: detail.trackNumber,
              cj_tracking_url: detail.trackingUrl,
              cj_synced_at: new Date().toISOString(),
              ...(sent
                ? { shipping_email_sent_at: new Date().toISOString() }
                : {}),
            },
          },
        ])
        if (sent) sentCount++
      } catch (e) {
        logger.warn(
          `[cj] Tracking sync failed for order ${order.id}: ${(e as Error).message}`
        )
      }
    }
    logger.info(
      `[cj] Tracking sync: ${pending.length} order(s) checked, ${sentCount} shipping email(s) sent.`
    )
  } catch (e) {
    logger.error(`[cj] Tracking sync failed: ${(e as Error).message}`)
  }
}

export const config = {
  name: "sync-cj-tracking",
  schedule: "30 */2 * * *", // toutes les 2 h, à la demie
}
