import { MedusaContainer } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { syncCjStock } from "../modules/cj/sync-stock"

export default async function syncCjStockJob(container: MedusaContainer) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  try {
    const results = await syncCjStock(container)
    const hidden = results.filter((r) => r.hidden).length
    const republished = results.filter((r) => r.republished).length
    logger.info(
      `[cj] Stock sync: ${results.length} product(s), ${hidden} hidden, ${republished} republished.`
    )
  } catch (e) {
    logger.error(`[cj] Stock sync failed: ${(e as Error).message}`)
  }
}

export const config = {
  name: "sync-cj-stock",
  schedule: "0 * * * *", // every hour, on the hour
}
