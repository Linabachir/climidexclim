import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"

// Attribution influenceur : recopie le `ref` (pose par le lien ?ref=... via le
// cookie, grave dans le panier) sur la commande, pour compter les ventes par
// influenceur (voir la route /admin/ref-stats).
export default async function orderPlacedRefHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  try {
    const { data: orders } = await query.graph({
      entity: "order",
      fields: ["id", "metadata", "cart.metadata"],
      filters: { id: data.id },
    })
    const order: any = orders?.[0]
    const ref = order?.cart?.metadata?.ref
    if (!order || !ref) return
    if (order.metadata?.ref) return // déjà attribué

    const orderService: any = container.resolve(Modules.ORDER)
    await orderService.updateOrders([
      { id: order.id, metadata: { ...(order.metadata ?? {}), ref } },
    ])
    logger.info(`[ref] Commande ${order.id} attribuée à l'influenceur "${ref}".`)
  } catch (e) {
    logger.warn(`[ref] Attribution échouée pour ${data.id}: ${(e as Error).message}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
