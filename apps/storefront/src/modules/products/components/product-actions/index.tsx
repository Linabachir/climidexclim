"use client"

import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/common/components/ui"
import { useI18n } from "@lib/i18n/context"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import ProductPrice from "../product-price"
import { useRouter } from "next/navigation"
import { useSelectedColor } from "../color-context"
import { track } from "@lib/analytics/gtag"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt) => {
    if (varopt.option_id) acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const { t } = useI18n()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { setColor } = useSelectedColor()

  const visibleOptions = useMemo(
    () =>
      (product.options || []).filter(
        (option) => option.title !== "Electrical outlet"
      ),
    [product.options]
  )

  const defaultOptions = useMemo(() => {
    const plugOption = product.options?.find(
      (option) => option.title === "Electrical outlet"
    )
    const colorOption = product.options?.find(
      (option) => option.title === "Color"
    )

    return {
      ...(plugOption ? { [plugOption.id]: "EU" } : {}),
      ...(colorOption
        ? { [colorOption.id]: "Bright gold cold wind" }
        : {}),
    }
  }, [product.options])

  const [options, setOptions] = useState<Record<string, string | undefined>>(
    defaultOptions
  )
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
    // Si c'est l'option "Color", on prévient la galerie pour basculer la photo.
    const opt = product.options?.find((o) => o.id === optionId)
    if (opt?.title === "Color") {
      setColor(value)
    }
  }

  //check if the selected options produce a valid variant
  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const value = isValidVariant ? selectedVariant?.id : null

    if (params.get("v_id") === value) {
      return
    }

    if (value) {
      params.set("v_id", value)
    } else {
      params.delete("v_id")
    }

    router.replace(pathname + "?" + params.toString())
  }, [selectedVariant, isValidVariant])

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  // Ajoute la variante au panier puis ouvre directement la page panier :
  // plus clair que le mini-panier (évite les doubles ajouts).
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    try {
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
        countryCode,
      })
      track("add_to_cart", {
        currency: "EUR",
        value: (selectedVariant.calculated_price as { calculated_amount?: number })
          ?.calculated_amount,
        items: [
          {
            item_id: selectedVariant.id,
            item_name: product.title,
            price: (
              selectedVariant.calculated_price as { calculated_amount?: number }
            )?.calculated_amount,
            quantity: 1,
          },
        ],
      })
      router.push(`/${countryCode}/cart`)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-y-6">
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-6">
              {visibleOptions.map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.id]}
                      updateOption={setOptionValue}
                      previewOption={setColor}
                      endPreview={() => {
                        const selectedColor = product.options?.find(
                          (item) => item.title === "Color"
                        )
                        if (selectedColor) {
                          setColor(options[selectedColor.id] ?? null)
                        }
                      }}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>

        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={
            !inStock ||
            !selectedVariant ||
            !!disabled ||
            isAdding ||
            !isValidVariant
          }
          variant="primary"
          className="h-14 w-full !rounded-full bg-[#1d1d1f] text-sm font-medium tracking-normal text-white hover:bg-black disabled:bg-[#d2d2d7] disabled:text-white"
          style={{ borderRadius: "9999px" }}
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant || !isValidVariant
            ? visibleOptions.length > 1
              ? t.product.chooseOptions
              : t.product.chooseOption
            : !inStock
            ? t.product.outOfStock
            : t.product.addToCart}
        </Button>
      </div>
    </>
  )
}
