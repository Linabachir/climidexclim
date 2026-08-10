import type { HttpTypes } from "@medusajs/types"

const IMAGE_BY_COLOR: Record<string, string> = {
  "Bright gold cold wind": "/product/climaire-gold-front.webp",
  "Silver cold wind": "/product/climaire-gold-front.webp",
  "Silver cooling and heating": "/product/climaire-gold-front.webp",
  "White blue cold wind": "/product/climaire-blue-front.webp",
  "Cold wind titanium dust": "/product/climaire-anthracite-front.webp",
}

export const getClimaireCartImage = (
  item: HttpTypes.StoreCartLineItem
): string | undefined => {
  const color = item.variant?.options?.find(
    (option) => Boolean(IMAGE_BY_COLOR[option.value])
  )?.value

  return (color && IMAGE_BY_COLOR[color]) || item.thumbnail || undefined
}
