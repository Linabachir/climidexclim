import { model } from "@medusajs/framework/utils"

export const NewsletterSubscriber = model.define("newsletter_subscriber", {
  id: model.id().primaryKey(),
  email: model.text().unique(),
  source: model.text().nullable(),
})
