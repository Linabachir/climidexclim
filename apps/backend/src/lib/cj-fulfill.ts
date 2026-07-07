// Logique partagée d'envoi d'une commande Medusa vers CJ Dropshipping.
// Utilisée par la route admin (bouton manuel) ET par le subscriber
// order.placed (envoi automatique à la commande).

import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { CJ_MODULE, CjModuleService } from "../modules/cj"

// EU member states require an IOSS option for VAT on imports.
export const EU_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
])

// Minimal ISO country-code -> name map for the markets we ship to.
// CJ requires both the code and a country name; falls back to the code.
export const COUNTRY_NAMES: Record<string, string> = {
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

export const ORDER_FIELDS = [
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

export async function loadOrder(query: any, orderId: string) {
  const { data } = await query.graph({
    entity: "order",
    fields: ORDER_FIELDS,
    filters: { id: orderId },
  })
  return data[0]
}

export async function saveOrderMeta(
  scope: any,
  orderId: string,
  existing: Record<string, unknown> | undefined,
  patch: Record<string, unknown>
) {
  const orderService: any = scope.resolve(Modules.ORDER)
  await orderService.updateOrders([
    { id: orderId, metadata: { ...(existing ?? {}), ...patch } },
  ])
}

export type CjFulfillResult = {
  ok: boolean
  alreadyExists?: boolean
  message?: string
  cjOrderId?: string
  logistic?: string
  shippingCost?: number
  productAmount?: number
  items?: number
  confirmed?: boolean
  paid?: boolean
}

/**
 * Crée la commande chez CJ, puis (si CJ_AUTO_PAY != "false") la confirme et
 * la paie depuis le solde du compte CJ. Idempotent : ne renvoie jamais deux
 * fois la même commande (garde sur metadata.cj_order_id).
 */
export async function sendOrderToCj(
  scope: any,
  orderId: string,
  opts: { logisticName?: string; fromCountryCode?: string } = {}
): Promise<CjFulfillResult> {
  const cj = scope.resolve(CJ_MODULE) as CjModuleService
  const query = scope.resolve(ContainerRegistrationKeys.QUERY)
  const logger = scope.resolve(ContainerRegistrationKeys.LOGGER)

  const order = await loadOrder(query, orderId)
  if (!order) {
    return { ok: false, message: "Commande introuvable." }
  }
  if (order.metadata?.cj_order_id) {
    return {
      ok: false,
      alreadyExists: true,
      message: `Commande déjà envoyée à CJ (#${order.metadata.cj_order_id}).`,
      cjOrderId: String(order.metadata.cj_order_id),
    }
  }

  const addr = order.shipping_address
  if (!addr?.country_code) {
    return { ok: false, message: "Adresse de livraison incomplète (pays manquant)." }
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
    return {
      ok: false,
      message: "Aucun produit CJ dans cette commande (variantes sans cj_vid).",
    }
  }

  const endCountryCode = String(addr.country_code).toUpperCase()
  const start = (opts.fromCountryCode || process.env.CJ_PRICING_START || "CN").toUpperCase()

  // Choose the cheapest shipping option unless one was supplied.
  let chosenLogistic = opts.logisticName
  let shippingCost: number | undefined
  if (!chosenLogistic) {
    const cheapest = await cj.cheapestFreight({
      startCountryCode: start,
      endCountryCode,
      zip: addr.postal_code,
      products: products.map((p: any) => ({ vid: p.vid, quantity: p.quantity })),
    })
    if (!cheapest) {
      return { ok: false, message: "Aucune option de livraison CJ pour cette destination." }
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
  const iossType = isEu && iossTypeEnv ? Number(iossTypeEnv) : undefined
  let iossNumber =
    isEu && iossTypeEnv ? process.env.CJ_IOSS_NUMBER || undefined : undefined
  // Doc CJ : avec iossType 3 (IOSS de CJ), iossNumber doit valoir la
  // constante "CJ-IOSS" — sans elle l'API répond « Please enter a IOSS number ».
  if (iossType === 3 && !iossNumber) {
    iossNumber = "CJ-IOSS"
  }

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

  // Confirmation + paiement depuis le solde CJ (désactivable : CJ_AUTO_PAY=false).
  const autoPay = (process.env.CJ_AUTO_PAY ?? "true") !== "false"
  let confirmed = false
  let paid = false
  if (autoPay) {
    try {
      await cj.confirmOrder(created.orderId)
      confirmed = true
    } catch (e) {
      logger.warn(`[cj] confirmOrder ${created.orderId}: ${(e as Error).message}`)
    }
    try {
      await cj.payBalance(created.orderId)
      paid = true
    } catch (e) {
      // Solde insuffisant, le cas le plus courant : la commande reste créée
      // chez CJ, à payer manuellement dans le dashboard.
      logger.warn(`[cj] payBalance ${created.orderId}: ${(e as Error).message}`)
    }
  }

  await saveOrderMeta(scope, order.id, order.metadata, {
    cj_order_id: created.orderId,
    cj_order_number: created.orderNumber,
    cj_logistic: chosenLogistic,
    cj_shipping_cost: shippingCost ?? created.postageAmount,
    cj_order_status: paid ? "PAID" : confirmed ? "CONFIRMED" : "CREATED",
    cj_auto_paid: paid,
    cj_synced_at: new Date().toISOString(),
  })

  return {
    ok: true,
    cjOrderId: created.orderId,
    logistic: chosenLogistic,
    shippingCost: shippingCost ?? created.postageAmount,
    productAmount: created.productAmount,
    items: products.length,
    confirmed,
    paid,
  }
}
