import { CjProduct, CjProductVariant } from "./types"

export type ToMedusaProductOptions = {
  /** Store currency the imported prices are written in (e.g. "eur"). */
  currencyCode: string
  /** Default sales channel to assign the product to. */
  salesChannelId: string
  /** Shipping profile required by Medusa to create a product. */
  shippingProfileId: string
  /** Multiplier applied to the landed cost (cost + shipping) — default 1. */
  markup?: number
  /** Estimated per-unit shipping cost in USD, added to product cost. */
  shippingCostUsd?: number
  /** USD -> store-currency conversion rate (default 1 = no conversion). */
  usdToEur?: number
  /** "draft" (default) or "published". */
  status?: "draft" | "published"
}

/** Charm-rounds a price up to the nearest .99 (e.g. 78.3 -> 78.99). */
export function charmPrice(value: number): number {
  if (!(value > 0)) {
    return 0
  }
  return Math.max(0.99, Math.ceil(value) - 0.01)
}

/** Sale price (store currency) from CJ cost + shipping, margin and FX applied. */
export function computeSalePrice(
  costUsd: number,
  opts: { markup?: number; shippingCostUsd?: number; usdToEur?: number }
): number {
  const markup = opts.markup && opts.markup > 0 ? opts.markup : 1
  const ship =
    opts.shippingCostUsd && opts.shippingCostUsd > 0 ? opts.shippingCostUsd : 0
  const fx = opts.usdToEur && opts.usdToEur > 0 ? opts.usdToEur : 1
  return charmPrice((costUsd + ship) * fx * markup)
}

/** Splits a CJ variantKey ("Silver cold wind-EU") into the product's options. */
export function mapVariantOptions(
  optionNames: string[],
  variant: CjProductVariant
): Record<string, string> {
  const raw = (variant.variantKey || variant.variantNameEn || "").trim()
  const parts = raw.split("-").map((s) => s.trim()).filter(Boolean)

  if (optionNames.length <= 1) {
    return { [optionNames[0] ?? "Variant"]: raw || (variant.variantSku ?? "") }
  }

  // The trailing option values (e.g. plug type) are single tokens; anything
  // before them belongs to the first option (e.g. a multi-word colour).
  const trailingCount = optionNames.length - 1
  const tail = parts.slice(parts.length - trailingCount)
  const head = parts.slice(0, parts.length - trailingCount).join("-")

  const result: Record<string, string> = {}
  result[optionNames[0]] = head || parts[0] || raw
  optionNames.slice(1).forEach((name, i) => {
    result[name] = tail[i] ?? ""
  })
  return result
}

const HTML_ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
}

/** Converts CJ's HTML description into clean, readable plain text. */
export function htmlToText(html?: string): string | undefined {
  if (!html) {
    return undefined
  }
  let text = html
    // Drop embedded media and scripts/styles entirely.
    .replace(/<img[^>]*>/gi, "")
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    // Turn line breaks and block ends into newlines.
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\/\s*(p|div|li|tr|h[1-6])\s*>/gi, "\n")
    .replace(/<\s*li[^>]*>/gi, "• ")
    // Remove every remaining tag.
    .replace(/<[^>]+>/g, "")

  text = text.replace(
    /&[a-zA-Z#0-9]+;/g,
    (m) => HTML_ENTITIES[m.toLowerCase()] ?? m
  )

  text = text
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((l) => l.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  return text || undefined
}

function parseImages(product: CjProduct): string[] {
  if (product.productImageSet?.length) {
    return product.productImageSet
  }
  if (product.productImage) {
    try {
      const parsed = JSON.parse(product.productImage)
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch {
      /* ignore malformed image json */
    }
  }
  return product.bigImage ? [product.bigImage] : []
}

function parseWeightGrams(value?: string | number): number | undefined {
  if (value === undefined || value === null) {
    return undefined
  }
  const n = Math.round(Number(value))
  return Number.isFinite(n) && n > 0 ? n : undefined
}

/**
 * Converts a CJ product into the input expected by Medusa's
 * createProductsWorkflow. CJ ids are stored in metadata so we can later
 * sync stock and route orders for fulfillment.
 */
export function toMedusaProduct(
  product: CjProduct,
  opts: ToMedusaProductOptions
) {
  const markup = opts.markup && opts.markup > 0 ? opts.markup : 1
  const optionNames = product.productKeyEnSet?.length
    ? product.productKeyEnSet
    : ["Variant"]

  const cjVariants = product.variants ?? []

  // Build the distinct value list per option from the variants.
  const optionValues: Record<string, Set<string>> = {}
  optionNames.forEach((n) => (optionValues[n] = new Set()))

  const variantInputs = cjVariants.map((v) => {
    const optionMap = mapVariantOptions(optionNames, v)
    for (const [name, value] of Object.entries(optionMap)) {
      if (value) {
        optionValues[name]?.add(value)
      }
    }

    const cost = Number(v.variantSellPrice ?? 0)
    const amount = computeSalePrice(cost, {
      markup,
      shippingCostUsd: opts.shippingCostUsd,
      usdToEur: opts.usdToEur,
    })

    return {
      title: v.variantNameEn || Object.values(optionMap).join(" / ") || v.vid,
      sku: v.variantSku,
      manage_inventory: false, // dropshipped — stock lives at CJ
      weight: parseWeightGrams(v.variantWeight),
      options: optionMap,
      prices: [{ amount, currency_code: opts.currencyCode }],
      metadata: {
        cj_vid: v.vid,
        cj_variant_sku: v.variantSku,
        cj_cost: cost,
      },
    }
  })

  const options = optionNames.map((name) => {
    const values = [...optionValues[name]]
    return { title: name, values: values.length ? values : ["Default"] }
  })

  const images = parseImages(product).map((url) => ({ url }))

  return {
    title: product.productNameEn || product.productSku || product.pid,
    description: htmlToText(product.description),
    // Idiomatic link to the source system — used to detect re-imports.
    external_id: product.pid,
    status: opts.status ?? ("draft" as const),
    weight: parseWeightGrams(product.productWeight),
    options,
    images,
    thumbnail: product.bigImage,
    shipping_profile_id: opts.shippingProfileId,
    sales_channels: [{ id: opts.salesChannelId }],
    variants: variantInputs,
    metadata: {
      source: "cj",
      cj_pid: product.pid,
      cj_product_sku: product.productSku,
      cj_category: product.categoryName,
    },
  }
}
