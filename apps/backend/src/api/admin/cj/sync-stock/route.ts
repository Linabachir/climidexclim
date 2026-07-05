import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { syncCjStock } from "../../../../modules/cj/sync-stock"

/**
 * POST /admin/cj/sync-stock
 * Manually triggers a CJ stock sync for all imported products.
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  try {
    const results = await syncCjStock(req.scope)
    res.json({ ok: true, synced: results.length, results })
  } catch (e) {
    res.status(502).json({ ok: false, message: (e as Error).message })
  }
}
