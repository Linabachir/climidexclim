import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { CJ_MODULE, CjModuleService } from "../../../../modules/cj"
import { sendOrderShippedEmail } from "../../../../lib/order-shipped-email"

// EU member states require an IOSS option for VAT on imports.
const EU_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
])

// Minimal ISO country-code -> name map for the markets we ship to.
// CJ requires both the code and a country name; falls back to the code.
const COUNTRY_NAMES: Record<string, string> = {
  FR: "France",
  BE: "Belgium",
  CH: "Switzerland",
  LU: "Luxembourg",
  DE: "Germany",
  ES: "Spain",
  IT: "Italy",
  NL: "Netherlands",
  PT: "Portugal",
  GB: "United Kingdom",
  US: "United States",
  CA: "Canada",
}

const ORDER_FIELDS = [
  "id",
  "display_id",
  "email",
  "currency_code",
  "metadata",
  "shipping_address.*",
  "items.id",
  "items.quantity",
  "items.title",
  "items.unit_price",
  "items.variant_sku",
  "items.variant.id",
  "items.variant.sku",
  "items.variant.metadata",
]

async function loadOrder(query: any, orderId: string) {
  const { data } = await query.graph({
    entity: "order",
    fields: ORDER_FIELDS,
    filters: { id: orderId },
  })
  return data[0]
}

async function saveOrderMeta(
  scope: MedusaRequest["scope"],
  orderId: string,
  existing: Record<string, unknown> | undefined,
  patch: Record<string, unknown>
) {
  const orderService: any = scope.resolve(Modules.ORDER)
  await orderService.updateOrders([
    { id: orderId, metadata: { ...(existing ?? {}), ...patch } },
  ])
}

/**
 * POST /admin/cj/fulfill  body: { orderId, logisticName?, fromCountryCode? }
 * Creates the matching order at CJ (payType 3 = create only, no charge).
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

  const cj = req.scope.resolve<CjModuleService>(CJ_MODULE)
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  try {
    const order = await loadOrder(query, orderId)
    if (!order) {
      return res.status(404).json({ message: "Commande introuvable." })
    }
    if (order.metadata?.cj_order_id) {
      return res.json({
        ok: false,
        alreadyExists: true,
        message: `Commande déjà envoyée à CJ (#${order.metadata.cj_order_id}).`,
        cjOrderId: order.metadata.cj_order_id,
      })
    }

    const addr = order.shipping_address
    if (!addr?.country_code) {
      return res
        .status(400)
        .json({ message: "Adresse de livraison incomplète (pays manquant)." })
    }

    // Map line items -> CJ products via the stored CJ variant id.
    const products = (order.items ?? [])
      .filter((it: any) => it.variant?.metadata?.cj_vid)
      .map((it: any) => ({
        vid: String(it.variant.metadata.cj_vid),
        // Order quantities can be BigNumber-like; coerce to a plain integer.
        quantity: Math.max(1, Math.round(Number(it.quantity) || 1)),
        sku: it.variant?.sku ?? it.variant_sku,
        storeLineItemId: it.id,
      }))

    if (!products.length) {
      return res.status(400).json({
        message:
          "Aucun produit CJ dans cette commande (variantes sans cj_vid).",
      })
    }

    const endCountryCode = String(addr.country_code).toUpperCase()
    const start = (fromCountryCode || "CN").toUpperCase()

    // Choose the cheapest shipping option unless one was supplied.
    let chosenLogistic = logisticName
    let shippingCost: number | undefined
    if (!chosenLogistic) {
      const cheapest = await cj.cheapestFreight({
        startCountryCode: start,
        endCountryCode,
        zip: addr.postal_code,
        products: products.map((p: any) => ({
          vid: p.vid,
          quantity: p.quantity,
        })),
      })
      if (!cheapest) {
        return res.status(502).json({
          message: "Aucune option de livraison CJ pour cette destination.",
        })
      }
      chosenLogistic = cheapest.logisticName
      shippingCost = cheapest.logisticPrice
    }

    const fullName =
      [addr.first_name, addr.last_name].filter(Boolean).join(" ").trim() ||
      "Customer"

    // EU destinations need an IOSS option (VAT). By default we send NOTHING so
    // CJ applies the account-level setting (My CJ > Declaration Settings).
    // Only override per-request if CJ_IOSS_TYPE is explicitly set in env.
    const isEu = EU_COUNTRIES.has(endCountryCode)
    const iossTypeEnv = process.env.CJ_IOSS_TYPE
    const iossType =
      isEu && iossTypeEnv ? Number(iossTypeEnv) : undefined
    const iossNumber =
      isEu && iossTypeEnv ? process.env.CJ_IOSS_NUMBER || undefined : undefined

    const created = await cj.createOrder({
      orderNumber: `MED-${order.display_id ?? order.id}`,
      shippingCountryCode: endCountryCode,
      shippingCountry: COUNTRY_NAMES[endCountryCode] ?? endCountryCode,
      shippingProvince: addr.province || addr.city || "-",
      shippingCity: addr.city || "-",
      shippingCustomerName: fullName,
      shippingAddress: addr.address_1 || "-",
      shippingAddress2: addr.address_2 || undefined,
      shippingZip: addr.postal_code || undefined,
      shippingPhone: addr.phone || undefined,
      logisticName: chosenLogistic!,
      fromCountryCode: start,
      iossType,
      iossNumber,
      products,
    })

    await saveOrderMeta(req.scope, order.id, order.metadata, {
      cj_order_id: created.orderId,
      cj_order_number: created.orderNumber,
      cj_logistic: chosenLogistic,
      cj_shipping_cost: shippingCost ?? created.postageAmount,
      cj_order_status: "CREATED",
      cj_synced_at: new Date().toISOString(),
    })

    res.json({
      ok: true,
      cjOrderId: created.orderId,
      logistic: chosenLogistic,
      shippingCost: shippingCost ?? created.postageAmount,
      productAmount: created.productAmount,
      items: products.length,
    })
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
