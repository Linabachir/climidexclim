import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { CJ_MODULE, CjModuleService } from "../../../../modules/cj"
import {
  loadOrder,
  saveOrderMeta,
  sendOrderToCj,
} from "../../../../lib/cj-fulfill"
import { sendOrderShippedEmail } from "../../../../lib/order-shipped-email"

/**
 * POST /admin/cj/fulfill  body: { orderId, logisticName?, fromCountryCode? }
 * Envoi manuel (secours) : même logique que l'envoi automatique à la commande.
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { orderId, logisticName, fromCountryCode } = (req.body ?? {}) as {
    orderId?: string
    logisticName?: string
    fromCountryCode?: string
  }
  if (!orderId) {
    return res.status(400).json({ message: "Body field 'orderId' is required." })
  }

  try {
    const result = await sendOrderToCj(req.scope, orderId, {
      logisticName,
      fromCountryCode,
    })
    if (!result.ok && !result.alreadyExists) {
      const status = result.message === "Commande introuvable." ? 404 : 400
      return res.status(status).json({ message: result.message })
    }
    res.json(result)
  } catch (e) {
    res.status(502).json({ ok: false, message: (e as Error).message })
  }
}

/**
 * GET /admin/cj/fulfill?orderId=...
 * Returns the CJ status + tracking for a Medusa order, syncing it to metadata.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const orderId = req.query.orderId as string
  if (!orderId) {
    return res.status(400).json({ message: "Query param 'orderId' required." })
  }

  const cj = req.scope.resolve<CjModuleService>(CJ_MODULE)
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  try {
    const order = await loadOrder(query, orderId)
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable." })
    }
    const cjOrderId = order.metadata?.cj_order_id as string | undefined
    if (!cjOrderId) {
      return res.json({ ok: true, fulfilled: false })
    }

    const detail = await cj.getOrderDetail(cjOrderId)

    // Premier numéro de suivi → email « commande expédiée » (une seule fois).
    let shippedEmailSentAt = order.metadata?.shipping_email_sent_at as
      | string
      | undefined
    if (detail.trackNumber && !shippedEmailSentAt) {
      const logger = req.scope.resolve(ContainerRegistrationKeys.LOGGER)
      const sent = await sendOrderShippedEmail(
        {
          order,
          trackNumber: detail.trackNumber,
          trackingUrl: detail.trackingUrl,
          logistic: order.metadata?.cj_logistic as string | undefined,
        },
        logger
      )
      if (sent) shippedEmailSentAt = new Date().toISOString()
    }

    await saveOrderMeta(req.scope, order.id, order.metadata, {
      cj_order_status: detail.orderStatus,
      cj_track_number: detail.trackNumber,
      cj_tracking_url: detail.trackingUrl,
      cj_synced_at: new Date().toISOString(),
      ...(shippedEmailSentAt
        ? { shipping_email_sent_at: shippedEmailSentAt }
        : {}),
    })

    res.json({
      ok: true,
      fulfilled: true,
      cjOrderId,
      status: detail.orderStatus,
      trackNumber: detail.trackNumber,
      trackingUrl: detail.trackingUrl,
      logistic: order.metadata?.cj_logistic,
    })
  } catch (e) {
    res.status(502).json({ ok: false, message: (e as Error).message })
  }
}
