import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { REVIEW_MODULE } from "../../../modules/review"
import ReviewModuleService from "../../../modules/review/service"

/**
 * GET /admin/reviews?status=pending|approved|rejected
 * Lists reviews for moderation (newest first).
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const reviewModule: ReviewModuleService = req.scope.resolve(REVIEW_MODULE)

  const status = req.query.status as string | undefined
  const filters = status ? { status } : {}

  const [reviews, count] = await reviewModule.listAndCountReviews(filters, {
    order: { created_at: "DESC" },
    take: 100,
  })

  res.json({ reviews, count })
}
