"use client"

import { HttpTypes } from "@medusajs/types"
import { useI18n } from "@lib/i18n/context"
import {
  translateOptionTitle,
  translateOptionValue,
} from "@lib/i18n/product-options"
import { Text } from "@modules/common/components/ui"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  const { locale } = useI18n()
  const options = variant?.options ?? []

  // Pas d'options structurées : on retombe sur le titre de variante.
  if (!options.length) {
    return variant?.title ? (
      <Text
        data-testid={dataTestid}
        data-value={dataValue}
        className="text-[13px] text-brand-mute overflow-hidden text-ellipsis"
      >
        {variant.title}
      </Text>
    ) : null
  }

  return (
    <div
      className="flex flex-col gap-0.5"
      data-testid={dataTestid}
      data-value={dataValue}
    >
      {options.map((o) => {
        const label = translateOptionTitle(
          (o.option?.title ?? "").trim(),
          locale
        )
        return (
          <Text key={o.id} className="text-[13px] text-brand-mute">
            {label && (
              <span className="text-brand-ink-faint">{label} : </span>
            )}
            {translateOptionValue(o.value, locale)}
          </Text>
        )
      })}
    </div>
  )
}

export default LineItemOptions
