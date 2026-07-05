import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { CJ_MODULE, CjModuleService } from "../modules/cj"
import { sendOrderShippedEmail } from "../lib/order-shipped-email"

// Alerte solde bas : au plus une par 24 h (état en mémoire, remis à zéro au
// redémarrage — acceptable pour une alerte).
let lastBalanceAlertAt = 0

async function alertLowBalance(amount: number, threshold: number, logger: any) {
  if (Date.now() - lastBalanceAlertAt < 24 * 60 * 60 * 1000) return
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CJ_ALERT_EMAIL || "petitdrogba@icloud.com"
  if (!apiKey) return
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "CLIMIDEX <onboarding@resend.dev>",
        to,
        subject: `⚠️ CLIMIDEX — Solde CJ bas : ${amount.toFixed(2)} $`,
        html: `<div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;">
          <h2 style="color:#1a2238;">Le portefeuille CJ est presque vide</h2>
          <p>Solde actuel : <strong>${amount.toFixed(2)} $</strong> (seuil d'alerte : ${threshold} $).</p>
          <p>Les prochaines commandes clients seront créées chez CJ mais <strong>ne partiront pas</strong> tant que le wallet n'est pas rechargé.</p>
          <p><a href="https://www.cjdropshipping.com" style="background:#1a2238;color:#fff;padding:10px 22px;border-radius:6px;text-decoration:none;">Recharger le wallet (My CJ → Wallet)</a></p>
          <p style="color:#888;font-size:12px;">Dès la recharge, les commandes en attente seront payées automatiquement (vérification toutes les 2 h).</p>
        </div>`,
      }),
    })
    if (res.ok) {
      lastBalanceAlertAt = Date.now()
      logger.warn(`[cj] Low balance alert sent to ${to} (${amount.toFixed(2)} $).`)
    }
  } catch (e) {
    logger.warn(`[cj] Low balance alert failed: ${(e as Error).message}`)
  }
}

// Toutes les 2 h : 1) retente le paiement CJ des commandes créées mais non
// payées (wallet vide au moment de la commande), 2) surveille le solde du
// wallet et alerte par email s'il est bas, 3) synchronise le suivi et envoie
// l'email « commande expédiée » au premier numéro de suivi.
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

    // Surveillance du solde : alerte si bas et qu'il reste du travail à payer.
    const threshold = Number(process.env.CJ_BALANCE_ALERT_THRESHOLD || 60)
    try {
      const { amount } = await cj.getBalance()
      if (amount < threshold) {
        await alertLowBalance(amount, threshold, logger)
      }
    } catch (e) {
      logger.warn(`[cj] getBalance failed: ${(e as Error).message}`)
    }

    if (!pending.length) return

    let sentCount = 0
    for (const order of pending) {
      try {
        // Rattrapage : la commande CJ existe mais n'a pas pu être payée
        // (wallet vide à ce moment-là) → on retente à chaque passage.
        if (!order.metadata?.cj_auto_paid) {
          try {
            await cj.payBalance(String(order.metadata!.cj_order_id))
            order.metadata = { ...(order.metadata ?? {}), cj_auto_paid: true }
            await orderService.updateOrders([
              { id: order.id, metadata: order.metadata },
            ])
            logger.info(
              `[cj] Retried payment OK for CJ order ${order.metadata.cj_order_id}.`
            )
          } catch {
            /* toujours pas de solde — on retentera au prochain passage */
          }
        }

        const detail = await cj.getOrderDetail(String(order.metadata!.cj_order_id))
        if (!detail.trackNumber) continue

        const sent = await sendOrderShippedEmail(
          {
            order: order as any,
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
