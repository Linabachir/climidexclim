import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { REVIEW_MODULE } from "../../../../modules/review"
import ReviewModuleService from "../../../../modules/review/service"

type UpdateBody = { status?: "pending" | "approved" | "rejected" }

/**
 * POST /admin/reviews/:id  body: { status }
 * Moderates a review (approve / reject).
 */
export async function POST(
  req: MedusaRequest<UpdateBody>,
  res: MedusaResponse
) {
  const { id } = req.params
  const { status } = req.body ?? {}
  if (!status || !["pending", "approved", "rejected"].includes(status)) {
    return res
      .status(400)
      .json({ message: "status must be pending, approved or rejected." })
  }

  const reviewModule: ReviewModuleService = req.scope.resolve(REVIEW_MODULE)
  const review = await reviewModule.updateReviews({ id, status })

  res.json({ review })
}

/**
 * DELETE /admin/reviews/:id
 */
export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const { id } = req.params
  const reviewModule: ReviewModuleService = req.scope.resolve(REVIEW_MODULE)
  await reviewModule.deleteReviews(id)
  res.json({ id, deleted: true })
}
