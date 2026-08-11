import { HttpTypes } from "@medusajs/types"
import { useI18n } from "@lib/i18n/context"
import {
  translateOptionTitle,
  translateOptionValue,
} from "@lib/i18n/product-options"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  previewOption?: (value: string) => void
  endPreview?: () => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const CLIMAIRE_COLOR_CHOICES = new Set([
  "Bright gold cold wind",
  "White blue cold wind",
  "Cold wind titanium dust",
])

const COLOR_SWATCHES: Record<string, string> = {
  "Bright gold cold wind": "bg-[#d8b77b]",
  "White blue cold wind": "bg-[#252568]",
  "Cold wind titanium dust": "bg-[#1d1d1f]",
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  previewOption,
  endPreview,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const { locale } = useI18n()
  const filteredOptions = (option.values ?? [])
    .map((value) => value.value)
    .filter(
      (value) => title !== "Color" || CLIMAIRE_COLOR_CHOICES.has(value)
    )

  return (
    <div className="flex flex-col gap-y-4">
      <span className="text-base font-medium">{translateOptionTitle(title, locale)}</span>
      <div
        className="grid grid-cols-1 gap-3 xsmall:grid-cols-3"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault()
                updateOption(option.id, v)
              }}
              onMouseEnter={() => title === "Color" && previewOption?.(v)}
              onMouseLeave={() => title === "Color" && endPreview?.()}
              onFocus={() => title === "Color" && previewOption?.(v)}
              onBlur={() => title === "Color" && endPreview?.()}
              key={v}
              className={clx(
                "flex min-h-14 items-center justify-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm leading-snug transition-all",
                {
                  "border-[#1d1d1f] ring-1 ring-[#1d1d1f]": v === current,
                  "border-[#d2d2d7] hover:border-[#86868b]":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {title === "Color" && (
                <span
                  className={`h-5 w-5 shrink-0 rounded-full border border-black/10 shadow-sm ${COLOR_SWATCHES[v] ?? "bg-white"}`}
                  aria-hidden
                />
              )}
              <span>{translateOptionValue(v, locale)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
