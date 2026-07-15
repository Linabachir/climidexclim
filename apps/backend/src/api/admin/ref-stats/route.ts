import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

/**
 * GET /admin/ref-stats
 * Ventes par influenceur : agrège les commandes par metadata.ref.
 * Renvoie { total, attributed, byRef: [{ ref, orders, revenue }] }.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: orders } = await query.graph({
    entity: "order",
    fields: ["id", "display_id", "total", "currency_code", "metadata", "created_at"],
    pagination: { take: 1000, skip: 0, order: { created_at: "DESC" } },
  })

  const byRef: Record<string, { ref: string; orders: number; revenue: number }> =
    {}
  let attributed = 0
  for (const o of orders ?? []) {
    const ref = (o as any).metadata?.ref as string | undefined
    if (!ref) continue
    attributed++
    if (!byRef[ref]) byRef[ref] = { ref, orders: 0, revenue: 0 }
    byRef[ref].orders++
    byRef[ref].revenue += Number((o as any).total) || 0
  }

  res.json({
    total: orders?.length ?? 0,
    attributed,
    byRef: Object.values(byRef).sort((a, b) => b.orders - a.orders),
  })
}
