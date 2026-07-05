"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import { Minus, Plus, Spinner, Trash } from "@medusajs/icons"

import { updateLineItem, deleteLineItem } from "@lib/data/cart"
import { useI18n } from "@lib/i18n/context"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import ErrorMessage from "@modules/checkout/components/error-message"

type CartLineItemProps = {
  item: HttpTypes.StoreCartLineItem
  currencyCode: string
}

const MAX_QTY = 10

// Packshots sur fond blanc (produit centré) — préférés à la scène lifestyle
// pour la vignette du panier.
const PACKSHOT = [
  "purificateur_d_air_moderne_et_",
  "1638e318",
  "bc132e79",
  "purificateur_d_air_moderne_en_d",
]
const pickThumb = (item: HttpTypes.StoreCartLineItem) => {
  const imgs = item.product?.images ?? []
  const packshot = imgs.find((i) =>
    PACKSHOT.some((p) => (i.url ?? "").toLowerCase().includes(p))
  )?.url
  return packshot || item.thumbnail || imgs[0]?.url
}

const CartLineItem = ({ item, currencyCode }: CartLineItemProps) => {
  const { t } = useI18n()
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    if (quantity < 1 || quantity > MAX_QTY) return
    setError(null)
    setUpdating(true)
    await updateLineItem({ lineId: item.id, quantity })
      .catch((err) => setError(err.message))
      .finally(() => setUpdating(false))
  }

  const remove = async () => {
    setUpdating(true)
    await deleteLineItem(item.id).catch(() => setUpdating(false))
  }

  return (
    <div
      className="flex items-center gap-5 py-6 first:pt-0 last:pb-0"
      data-testid="product-row"
    >
      <LocalizedClientLink
        href={`/products/${item.product_handle}`}
        className="relative w-24 h-24 shrink-0 overflow-hidden rounded-md border border-brand-line bg-white"
      >
        {pickThumb(item) && (
          <Image
            src={pickThumb(item) as string}
            alt={item.product_title ?? "Produit"}
            fill
            sizes="96px"
            className="object-contain p-2"
          />
        )}
      </LocalizedClientLink>

      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col">
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="font-medium text-brand-ink transition-colors hover:text-brand-navy"
              data-testid="product-title"
            >
              {item.product_title}
            </LocalizedClientLink>
            <div className="text-[13px] text-brand-mute">
              <LineItemOptions
                variant={item.variant}
                data-testid="product-variant"
              />
            </div>
            <div className="mt-1 text-[13px] text-brand-mute small:hidden">
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
          </div>

          <div className="text-right">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={currencyCode}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center rounded-md border border-brand-line">
            <button
              type="button"
              onClick={() => changeQuantity(item.quantity - 1)}
              disabled={updating || item.quantity <= 1}
              aria-label="−"
              className="flex h-9 w-9 items-center justify-center text-brand-ink-secondary transition-colors hover:text-brand-ink disabled:opacity-30"
            >
              <Minus />
            </button>
            <span
              className="w-8 text-center text-sm tabular-nums text-brand-ink"
              data-testid="product-quantity"
            >
              {updating ? <Spinner className="mx-auto animate-spin" /> : item.quantity}
            </span>
            <button
              type="button"
              onClick={() => changeQuantity(item.quantity + 1)}
              disabled={updating || item.quantity >= MAX_QTY}
              aria-label="+"
              className="flex h-9 w-9 items-center justify-center text-brand-ink-secondary transition-colors hover:text-brand-ink disabled:opacity-30"
            >
              <Plus />
            </button>
          </div>

          <button
            type="button"
            onClick={remove}
            className="inline-flex items-center gap-1.5 text-[13px] text-brand-mute transition-colors hover:text-brand-critical"
            data-testid="product-delete-button"
          >
            <Trash className="h-4 w-4" />
            {t.cart.remove}
          </button>
        </div>

        <ErrorMessage error={error} data-testid="product-error-message" />
      </div>
    </div>
  )
}

export default CartLineItem
