import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { sendOrderToCj } from "../lib/cj-fulfill"

// Envoi AUTOMATIQUE de chaque nouvelle commande vers CJ Dropshipping
// (création + confirmation + paiement depuis le solde CJ).
// Désactivable avec CJ_AUTO_FULFILL=false ; le bouton manuel de l'admin
// reste disponible en secours.
export default async function orderPlacedCjHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  if ((process.env.CJ_AUTO_FULFILL ?? "true") === "false") return
  if (!process.env.CJ_API_KEY) {
    logger.warn("[cj] CJ_API_KEY not set — skipping auto-fulfillment.")
    return
  }

  try {
    const result = await sendOrderToCj(container, data.id)
    if (result.ok) {
      logger.info(
        `[cj] Auto-fulfill order ${data.id} → CJ #${result.cjOrderId} ` +
          `(${result.logistic}, confirmed=${result.confirmed}, paid=${result.paid})`
      )
      if (!result.paid) {
        logger.warn(
          `[cj] CJ order ${result.cjOrderId} created but NOT paid — top up the CJ wallet and pay it in the CJ dashboard.`
        )
      }
    } else if (!result.alreadyExists) {
      logger.error(`[cj] Auto-fulfill failed for order ${data.id}: ${result.message}`)
    }
  } catch (e) {
    // On ne relance pas : la commande reste visible dans l'admin avec le
    // bouton d'envoi manuel en secours.
    logger.error(
      `[cj] Auto-fulfill crashed for order ${data.id}: ${(e as Error).message}`
    )
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
