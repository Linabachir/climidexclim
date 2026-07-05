"use client"

import { clx } from "@modules/common/components/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { useI18n } from "@lib/i18n/context"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { t } = useI18n()
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-brand-line/40 animate-pulse" />
  }

  return (
    <div className="flex flex-col text-brand-ink">
      <span
        className={clx("font-serif text-3xl small:text-4xl", {
          "text-brand-navy": selectedPrice.price_type === "sale",
        })}
      >
        {!variant && `${t.product.from} `}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <p className="mt-1">
            <span className="text-brand-mute">{t.product.original} </span>
            <span
              className="line-through text-brand-mute"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-brand-navy">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  )
}
