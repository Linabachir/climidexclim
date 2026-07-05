import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CJ_MODULE, CjModuleService } from "../../../../modules/cj"

/**
 * GET /admin/cj/ping
 * Verifies CJ credentials by performing a fresh authentication.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const cj = req.scope.resolve<CjModuleService>(CJ_MODULE)

  try {
    const result = await cj.ping()
    res.json(result)
  } catch (e) {
    res.status(502).json({ ok: false, message: (e as Error).message })
  }
}
