import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { REVIEW_MODULE } from "../../../modules/review"
import ReviewModuleService from "../../../modules/review/service"

/**
 * GET /store/reviews?product_id=...
 * Returns approved reviews for a product plus aggregate stats.
 */
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productId = req.query.product_id as string
  if (!productId) {
    return res
      .status(400)
      .json({ message: "Query param 'product_id' is required." })
  }

  const reviewModule: ReviewModuleService = req.scope.resolve(REVIEW_MODULE)

  const reviews = await reviewModule.listReviews(
    { product_id: productId, status: "approved" },
    { order: { created_at: "DESC" } }
  )

  const count = reviews.length
  const average =
    count > 0
      ? Math.round(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / count) * 10
        ) / 10
      : 0

  res.json({
    reviews: reviews.map((r) => ({
      id: r.id,
      rating: r.rating,
      title: r.title,
      content: r.content,
      author_name: r.author_name,
      created_at: r.created_at,
    })),
    count,
    average,
  })
}

type CreateReviewBody = {
  product_id?: string
  rating?: number
  title?: string
  content?: string
  author_name?: string
  email?: string
}

/**
 * POST /store/reviews
 * Submits a review. Stored as "pending" until an admin approves it.
 */
export async function POST(
  req: MedusaRequest<CreateReviewBody>,
  res: MedusaResponse
) {
  const { product_id, rating, title, content, author_name, email } =
    req.body ?? {}

  if (!product_id || !content?.trim() || !author_name?.trim()) {
    return res.status(400).json({
      message: "product_id, content et author_name sont requis.",
    })
  }
  const r = Number(rating)
  if (!Number.isFinite(r) || r < 1 || r > 5) {
    return res
      .status(400)
      .json({ message: "La note doit être comprise entre 1 et 5." })
  }

  // Plafonds de taille : évite les payloads abusifs (bloat DB / DoS léger).
  if (
    author_name.trim().length > 80 ||
    (title?.trim().length ?? 0) > 120 ||
    content.trim().length > 2000 ||
    (email?.trim().length ?? 0) > 160
  ) {
    return res
      .status(400)
      .json({ message: "Un des champs dépasse la longueur autorisée." })
  }

  const reviewModule: ReviewModuleService = req.scope.resolve(REVIEW_MODULE)

  const review = await reviewModule.createReviews({
    product_id,
    rating: Math.round(r),
    title: title?.trim() || null,
    content: content.trim(),
    author_name: author_name.trim(),
    email: email?.trim() || null,
    status: "pending",
  })

  res.status(201).json({
    review: { id: review.id, status: review.status },
    message: "Merci ! Ton avis sera publié après validation.",
  })
}
