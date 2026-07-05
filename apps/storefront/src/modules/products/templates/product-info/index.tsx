import { HttpTypes } from "@medusajs/types"
import { Heading } from "@modules/common/components/ui"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info">
      <div className="flex flex-col gap-y-4 lg:max-w-[500px] mx-auto">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-base px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-brand-positive border border-brand-positive/30">
            En stock
          </span>
          <span className="inline-flex items-center rounded-base px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-brand-mute border border-brand-line">
            Expédié sous 5 à 9 jours
          </span>
        </div>
        <span className="text-[13px] font-medium text-brand-navy">
          CLIMIDEX
        </span>
        <Heading
          level="h2"
          className="font-serif text-4xl small:text-5xl leading-tight text-brand-ink font-medium -mt-1"
          data-testid="product-title"
        >
          {product.title}
        </Heading>
      </div>
    </div>
  )
}

export default ProductInfo
