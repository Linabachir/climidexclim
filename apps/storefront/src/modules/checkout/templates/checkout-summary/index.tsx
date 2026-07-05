import { Heading } from "@modules/common/components/ui"

import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { getI18n } from "@lib/i18n/server"
import { HttpTypes } from "@medusajs/types"

const CheckoutSummary = async ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const { t } = await getI18n()
  return (
    <div className="lg:sticky lg:top-24 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 ">
      <div className="w-full rounded-lg border border-brand-line bg-white p-6 small:p-8 flex flex-col">
        <Heading
          level="h2"
          className="flex flex-row font-serif font-normal text-2xl text-brand-ink items-baseline"
        >
          {t.checkout.inYourCart}
        </Heading>
        <Divider className="my-6" />
        <CartTotals totals={cart} />
        <ItemsPreviewTemplate cart={cart} />
        <div className="my-6">
          <DiscountCode cart={cart} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
