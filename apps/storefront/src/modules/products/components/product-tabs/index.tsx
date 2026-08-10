"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"
import { useI18n } from "@lib/i18n/context"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const { t } = useI18n()
  const tabs = [
    {
      label: t.product.tabInfo,
      component: <ProductInfoTab product={product} />,
    },
    {
      label: t.product.tabShipping,
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const { t } = useI18n()

  const cleanValue = (value?: string | null) =>
    value?.replace(/�/g, "é").trim() || null

  // On n'affiche que les champs renseignés (pas de lignes « - »).
  const rows = [
    { label: t.product.material, value: cleanValue(product.material) },
    { label: t.product.type, value: cleanValue(product.type?.value) },
    {
      label: t.product.weight,
      value: product.weight ? `${product.weight} g` : null,
    },
    {
      label: t.product.dimensions,
      value:
        product.length && product.width && product.height
          ? `${product.length} × ${product.width} × ${product.height} mm`
          : null,
    },
  ].filter((r) => r.value)

  if (!rows.length) {
    return (
      <div className="text-small-regular py-8">
        <p className="text-brand-mute">{t.landing.specsNote}</p>
      </div>
    )
  }

  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
        {rows.map((r) => (
          <div key={r.label}>
            <span className="font-semibold">{r.label}</span>
            <p>{r.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  const { t } = useI18n()
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">{t.product.fastDelivery}</span>
            <p className="max-w-sm">{t.product.fastDeliveryText}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">{t.product.exchanges}</span>
            <p className="max-w-sm">{t.product.exchangesText}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">{t.product.returns}</span>
            <p className="max-w-sm">{t.product.returnsText}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
