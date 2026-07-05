"use client"

import { convertToLocale } from "@lib/util/money"
import { useI18n } from "@lib/i18n/context"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    currency_code: string
    item_subtotal?: number | null
    shipping_subtotal?: number | null
    discount_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const { t } = useI18n()
  const {
    currency_code,
    total,
    tax_total,
    item_subtotal,
    shipping_subtotal,
    discount_subtotal,
  } = totals

  return (
    <div>
      <div className="flex flex-col gap-y-3 text-[14px] text-brand-ink-secondary">
        <div className="flex items-center justify-between">
          <span>{t.cart.subtotalExcl}</span>
          <span
            className="text-brand-ink tabular-nums"
            data-testid="cart-subtotal"
            data-value={item_subtotal || 0}
          >
            {convertToLocale({ amount: item_subtotal ?? 0, currency_code })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t.cart.shipping}</span>
          <span
            className="text-brand-ink tabular-nums"
            data-testid="cart-shipping"
            data-value={shipping_subtotal || 0}
          >
            {shipping_subtotal
              ? convertToLocale({ amount: shipping_subtotal, currency_code })
              : t.cart.freeShipping}
          </span>
        </div>
        {!!discount_subtotal && (
          <div className="flex items-center justify-between">
            <span>{t.cart.discount}</span>
            <span
              className="text-brand-positive tabular-nums"
              data-testid="cart-discount"
              data-value={discount_subtotal || 0}
            >
              −{" "}
              {convertToLocale({
                amount: discount_subtotal ?? 0,
                currency_code,
              })}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span>{t.cart.taxes}</span>
          <span
            className="text-brand-ink tabular-nums"
            data-testid="cart-taxes"
            data-value={tax_total || 0}
          >
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>
      </div>
      <div className="h-px w-full bg-brand-line my-5" />
      <div className="flex items-center justify-between text-brand-ink">
        <span className="font-medium">{t.cart.total}</span>
        <span
          className="font-serif text-[26px] leading-none tabular-nums"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
    </div>
  )
}

export default CartTotals
