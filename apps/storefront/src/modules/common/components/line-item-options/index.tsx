import { HttpTypes } from "@medusajs/types"
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
        const label = (o.option?.title ?? "").trim()
        return (
          <Text key={o.id} className="text-[13px] text-brand-mute">
            {label && (
              <span className="text-brand-ink-faint">{label} : </span>
            )}
            {o.value}
          </Text>
        )
      })}
    </div>
  )
}

export default LineItemOptions
