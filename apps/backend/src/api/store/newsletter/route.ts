import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { NEWSLETTER_MODULE } from "../../../modules/newsletter"
import NewsletterModuleService from "../../../modules/newsletter/service"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type Body = { email?: string; source?: string }

/**
 * POST /store/newsletter
 * Stores a newsletter subscriber. Idempotent on email.
 */
export async function POST(req: MedusaRequest<Body>, res: MedusaResponse) {
  const email = req.body?.email?.trim().toLowerCase()
  if (!email || !EMAIL_RE.test(email)) {
    return res.status(400).json({ message: "Email invalide." })
  }

  const service: NewsletterModuleService = req.scope.resolve(NEWSLETTER_MODULE)

  const existing = await service.listNewsletterSubscribers({ email })
  if (existing.length) {
    return res.json({ ok: true, alreadySubscribed: true })
  }

  await service.createNewsletterSubscribers({
    email,
    source: req.body?.source || "storefront",
  })

  res.status(201).json({ ok: true })
}
