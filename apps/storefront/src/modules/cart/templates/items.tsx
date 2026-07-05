import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { getI18n } from "@lib/i18n/server"

import CartLineItem from "@modules/cart/components/line-item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = async ({ cart }: ItemsTemplateProps) => {
  const items = cart?.items
  const { t } = await getI18n()
  const count = items?.reduce((acc, i) => acc + i.quantity, 0) ?? 0

  return (
    <div>
      <div className="flex items-baseline gap-3 pb-6">
        <h1 className="font-serif text-3xl small:text-4xl text-brand-ink">
          {t.cart.title}
        </h1>
        {count > 0 && (
          <span className="text-sm text-brand-mute">
            {count} {count > 1 ? t.cart.article + "s" : t.cart.article}
          </span>
        )}
      </div>

      <div className="rounded-lg border border-brand-line bg-white px-6 divide-y divide-brand-line">
        {items
          ? items
              .sort((a, b) =>
                (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
              )
              .map((item) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  currencyCode={cart?.currency_code ?? "eur"}
                />
              ))
          : repeat(3).map((i) => <SkeletonLineItem key={i} />)}
      </div>
    </div>
  )
}

export default ItemsTemplate
