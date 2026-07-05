import { model } from "@medusajs/framework/utils"

export const Review = model.define("review", {
  id: model.id().primaryKey(),
  product_id: model.text().index(),
  rating: model.number(),
  title: model.text().nullable(),
  content: model.text(),
  author_name: model.text(),
  email: model.text().nullable(),
  // Moderation: only "approved" reviews are shown on the storefront.
  status: model
    .enum(["pending", "approved", "rejected"])
    .default("pending"),
})
