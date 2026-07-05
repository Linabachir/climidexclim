import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { CJ_MODULE } from "./index"
import CjModuleService from "./service"

export type StockSyncResult = {
  productId: string
  title: string
  totalStock: number
  status: string
  hidden: boolean
  republished: boolean
}

/**
 * Syncs CJ stock for every imported product (metadata.source === "cj").
 * - Stores per-variant CJ stock in variant metadata (cj_stock).
 * - Auto-hides a product (status -> draft) when it is fully out of stock at CJ,
 *   and republishes it when stock returns (only if WE hid it).
 * - A CJ API failure for a variant leaves its previous stock untouched, so a
 *   transient error never causes a false "out of stock".
 */
export async function syncCjStock(
  container: MedusaContainer
): Promise<StockSyncResult[]> {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const cj = container.resolve<CjModuleService>(CJ_MODULE)
  const productModule = container.resolve(Modules.PRODUCT)

  const { data: products } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "title",
      "status",
      "metadata",
      "variants.id",
      "variants.metadata",
    ],
  })

  const cjProducts = products.filter(
    (p: any) => p.metadata?.source === "cj"
  )

  const results: StockSyncResult[] = []

  for (const p of cjProducts) {
    let total = 0
    let anyFetched = false

    for (const v of p.variants ?? []) {
      const vid = v.metadata?.cj_vid
      if (!vid) {
        continue
      }
      try {
        const stock = await cj.getVariantStock(String(vid))
        anyFetched = true
        total += stock
        await productModule.updateProductVariants(v.id, {
          metadata: { ...(v.metadata ?? {}), cj_stock: stock },
        })
      } catch {
        // Keep the variant's previous stock on CJ error — no false rupture.
      }
    }

    const wasAutoHidden = p.metadata?.cj_auto_hidden === true
    const baseMeta = { ...(p.metadata ?? {}), cj_total_stock: total }
    let hidden = false
    let republished = false

    if (anyFetched && total <= 0 && p.status === "published") {
      await productModule.updateProducts(p.id, {
        status: "draft",
        metadata: { ...baseMeta, cj_auto_hidden: true },
      })
      hidden = true
    } else if (
      anyFetched &&
      total > 0 &&
      wasAutoHidden &&
      p.status === "draft"
    ) {
      await productModule.updateProducts(p.id, {
        status: "published",
        metadata: { ...baseMeta, cj_auto_hidden: false },
      })
      republished = true
    } else {
      await productModule.updateProducts(p.id, { metadata: baseMeta })
    }

    results.push({
      productId: p.id,
      title: p.title,
      totalStock: total,
      status: hidden ? "draft" : republished ? "published" : p.status,
      hidden,
      republished,
    })
  }

  return results
}
