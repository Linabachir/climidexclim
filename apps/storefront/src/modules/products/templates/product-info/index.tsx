import { HttpTypes } from "@medusajs/types"

import { getI18n } from "@lib/i18n/server"
import { Heading } from "@modules/common/components/ui"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = async ({ product }: ProductInfoProps) => {
  const { locale, t } = await getI18n()

  return (
    <div id="product-info">
      <div className="mx-auto flex flex-col gap-y-5 lg:max-w-[500px]">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-base px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-brand-positive border border-brand-positive/30">
            {t.product.inStock}
          </span>
          <span className="inline-flex items-center rounded-base px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-brand-mute border border-brand-line">
            {t.product.shippedWithin}
          </span>
        </div>
        <span className="text-[13px] font-medium text-brand-navy">
          CLIMIDEX
        </span>
        <Heading
          level="h1"
          className="font-sans text-4xl small:text-5xl leading-tight text-brand-ink font-medium mt-1"
          data-testid="product-title"
        >
          Climaire
        </Heading>
        <p className="text-sm text-brand-mute small:text-base">
          {locale === "fr"
            ? "Ventilateur chaud, froid et purificateur d’air"
            : "Heating, cooling and air-purifying fan"}
        </p>
      </div>
    </div>
  )
}

export default ProductInfo
