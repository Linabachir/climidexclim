import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import { CJ_MODULE, CjModuleService } from "../../../../modules/cj"
import { toMedusaProduct } from "../../../../modules/cj/transform"

type ImportBody = {
  pid?: string
  markup?: number
  status?: "draft" | "published"
}

/**
 * POST /admin/cj/import
 * Body: { pid: string, markup?: number, status?: "draft" | "published" }
 * Imports a CJ catalog product (by product id) into the Medusa catalog.
 */
export async function POST(
  req: MedusaRequest<ImportBody>,
  res: MedusaResponse
) {
  const { pid, markup, status } = req.body ?? {}
  if (!pid) {
    return res.status(400).json({ message: "Body field 'pid' is required." })
  }

  const cj = req.scope.resolve<CjModuleService>(CJ_MODULE)
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  try {
    // 0. Bail early if this CJ product was already imported.
    const { data: existing } = await query.graph({
      entity: "product",
      fields: ["id", "title", "status"],
      filters: { external_id: pid },
    })
    if (existing.length) {
      const p = existing[0]
      return res.json({
        ok: false,
        alreadyExists: true,
        message: `Déjà importé : « ${p.title} ».`,
        product: {
          id: p.id,
          title: p.title,
          status: p.status,
          variants: 0,
        },
      })
    }

    // 1. Fetch the product from CJ.
    const cjProduct = await cj.getProduct(pid)

    // 2. Resolve the store defaults Medusa needs to create a product.
    const { data: stores } = await query.graph({
      entity: "store",
      fields: [
        "default_sales_channel_id",
        "supported_currencies.currency_code",
        "supported_currencies.is_default",
      ],
    })
    const store = stores[0]
    if (!store?.default_sales_channel_id) {
      return res.status(500).json({
        message: "No default sales channel configured on the store.",
      })
    }
    const currency =
      store.supported_currencies?.find((c: any) => c.is_default)
        ?.currency_code ||
      store.supported_currencies?.[0]?.currency_code
    if (!currency) {
      return res
        .status(500)
        .json({ message: "Store has no supported currency configured." })
    }

    const { data: profiles } = await query.graph({
      entity: "shipping_profile",
      fields: ["id"],
    })
    const shippingProfileId = profiles[0]?.id
    if (!shippingProfileId) {
      return res
        .status(500)
        .json({ message: "No shipping profile found. Create one first." })
    }

    // 2b. Estimate shipping for the default market so the sale price covers it.
    const usdToEur = Number(process.env.CJ_USD_TO_EUR || 0.92)
    const margin = markup ?? Number(process.env.CJ_DEFAULT_MARGIN || 1.5)
    const pricingCountry = (process.env.CJ_PRICING_COUNTRY || "FR").toUpperCase()
    const pricingStart = (process.env.CJ_PRICING_START || "CN").toUpperCase()

    let shippingCostUsd = 0
    const firstVid = cjProduct.variants?.[0]?.vid
    if (firstVid) {
      try {
        const cheapest = await cj.cheapestFreight({
          startCountryCode: pricingStart,
          endCountryCode: pricingCountry,
          products: [{ vid: String(firstVid), quantity: 1 }],
        })
        shippingCostUsd = Number(cheapest?.logisticPrice || 0)
      } catch {
        // Non-fatal: fall back to pricing on product cost only.
      }
    }

    // 3. Transform CJ -> Medusa and create the product.
    const productInput = toMedusaProduct(cjProduct, {
      currencyCode: currency,
      salesChannelId: store.default_sales_channel_id,
      shippingProfileId,
      markup: margin,
      shippingCostUsd,
      usdToEur,
      status,
    })

    const { result } = await createProductsWorkflow(req.scope).run({
      input: { products: [productInput] },
    })

    const created = result[0]
    res.json({
      ok: true,
      product: {
        id: created.id,
        title: created.title,
        variants: created.variants?.length ?? 0,
        status: created.status,
      },
      pricing: {
        margin,
        shippingCostUsd: Number(shippingCostUsd.toFixed(2)),
        usdToEur,
        examplePrice: productInput.variants?.[0]?.prices?.[0]?.amount,
      },
      cj: { pid: cjProduct.pid, sku: cjProduct.productSku },
    })
  } catch (e) {
    res.status(502).json({ ok: false, message: (e as Error).message })
  }
}
