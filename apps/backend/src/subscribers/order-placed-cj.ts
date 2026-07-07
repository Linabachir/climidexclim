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
        await notifyUnpaidCjOrder(result.cjOrderId!, result.shippingCost, logger)
      }
    } else if (!result.alreadyExists) {
      logger.error(`[cj] Auto-fulfill failed for order ${data.id}: ${result.message}`)
      await notifyCjFailure(data.id, result.message, logger)
    }
  } catch (e) {
    // On ne relance pas : la commande reste visible dans l'admin avec le
    // bouton d'envoi manuel en secours.
    logger.error(
      `[cj] Auto-fulfill crashed for order ${data.id}: ${(e as Error).message}`
    )
  }
}

// Prévient la gérante qu'une commande CJ attend son paiement (mode sans
// wallet : paiement par carte/PayPal directement dans le dashboard CJ).
async function notifyUnpaidCjOrder(
  cjOrderId: string,
  shippingCost: number | undefined,
  logger: any
) {
  await sendAlertEmail(
    `🛒 CLIMIDEX — Commande CJ à payer (#${cjOrderId})`,
    `<div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#1a2238;">Une commande client attend son paiement chez CJ</h2>
      <p>La commande a bien été créée et confirmée chez CJ (n° <strong>${cjOrderId}</strong>${
        shippingCost ? `, transport ~${shippingCost} $` : ""
      }), mais le portefeuille CJ n'a pas pu la payer.</p>
      <p><strong>Action :</strong> paie-la par carte ou PayPal dans le dashboard CJ, sinon elle ne partira pas.</p>
      <p><a href="https://www.cjdropshipping.com/mine/dropshipping/orderList" style="background:#1a2238;color:#fff;padding:10px 22px;border-radius:6px;text-decoration:none;">Ouvrir mes commandes CJ</a></p>
      <p style="color:#888;font-size:12px;">Astuce : si tu recharges le wallet, le paiement sera retenté automatiquement sous 2 h et ces emails cesseront.</p>
    </div>`,
    logger
  )
}

// Prévient la gérante qu'une commande n'a pas pu partir chez CJ du tout.
async function notifyCjFailure(orderId: string, reason: string | undefined, logger: any) {
  await sendAlertEmail(
    "🚨 CLIMIDEX — Échec d'envoi d'une commande chez CJ",
    `<div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;">
      <h2 style="color:#1a2238;">Une commande client n'a pas pu être transmise à CJ</h2>
      <p>Commande Medusa : <strong>${orderId}</strong></p>
      <p>Raison : ${reason ?? "inconnue"}</p>
      <p><strong>Action :</strong> ouvre la commande dans l'admin Medusa et utilise le bouton d'envoi manuel CJ, ou contacte le support.</p>
      <p><a href="https://api.climidex.com/app/orders" style="background:#1a2238;color:#fff;padding:10px 22px;border-radius:6px;text-decoration:none;">Ouvrir l'admin</a></p>
    </div>`,
    logger
  )
}

async function sendAlertEmail(subject: string, html: string, logger: any) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CJ_ALERT_EMAIL || "linabelarbi@yahoo.fr"
  if (!apiKey) return
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "CLIMIDEX <onboarding@resend.dev>",
        to,
        subject,
        html,
      }),
    })
  } catch (e) {
    logger.warn(`[cj] Alert email failed: ${(e as Error).message}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
