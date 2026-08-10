import { Dialog, Transition } from "@headlessui/react"
import { clx } from "@modules/common/components/ui"
import React, { Fragment, useMemo } from "react"

import useToggleState from "@lib/hooks/use-toggle-state"
import { useI18n } from "@lib/i18n/context"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"

import { getProductPrice } from "@lib/util/get-product-price"
import OptionSelect from "./option-select"
import { HttpTypes } from "@medusajs/types"
import { isSimpleProduct } from "@lib/util/product"

type MobileActionsProps = {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
  options: Record<string, string | undefined>
  updateOptions: (title: string, value: string) => void
  inStock?: boolean
  handleAddToCart: () => void
  isAdding?: boolean
  show: boolean
  optionsDisabled: boolean
}

const MobileActions: React.FC<MobileActionsProps> = ({
  product,
  variant,
  options,
  updateOptions,
  inStock,
  handleAddToCart,
  isAdding,
  show,
  optionsDisabled,
}) => {
  const { t } = useI18n()
  const { state, open, close } = useToggleState()
  const visibleOptions = useMemo(
    () =>
      (product.options || []).filter(
        (option) => option.title !== "Electrical outlet"
      ),
    [product.options]
  )
  const visibleOptionValues = visibleOptions
    .map((option) => options[option.id])
    .filter(Boolean)

  const price = getProductPrice({
    product: product,
    variantId: variant?.id,
  })

  const selectedPrice = useMemo(() => {
    if (!price) {
      return null
    }
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const isSimple = isSimpleProduct(product)

  return (
    <>
      <div
        className={clx("lg:hidden inset-x-0 bottom-0 fixed z-50", {
          "pointer-events-none": !show,
        })}
      >
        <Transition
          as={Fragment}
          show={show}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="bg-white flex flex-col gap-3 w-full border-t border-[#e5e5e7] shadow-[0_-6px_20px_rgba(0,0,0,0.05)] px-4 pt-3 pb-4"
            data-testid="mobile-actions"
          >
            <div className="flex items-center justify-between gap-3">
              <span
                className="text-[14px] font-medium text-brand-ink truncate"
                data-testid="mobile-title"
              >
                {product.title}
              </span>
              {selectedPrice && (
                <span className="flex items-baseline gap-2 whitespace-nowrap">
                  {selectedPrice.price_type === "sale" && (
                    <span className="text-[13px] line-through text-brand-mute">
                      {selectedPrice.original_price}
                    </span>
                  )}
                  <span className="text-[15px] font-semibold text-brand-navy">
                    {selectedPrice.calculated_price}
                  </span>
                </span>
              )}
            </div>
            <div
              className={clx("grid grid-cols-2 gap-3", {
                "!grid-cols-1": isSimple,
              })}
            >
              {!isSimple && (
                <button
                  onClick={open}
                  data-testid="mobile-actions-button"
                  className="inline-flex items-center justify-between gap-2 rounded-md border border-brand-line px-4 py-3.5 text-[14px] text-brand-ink transition-colors hover:border-brand-ink"
                >
                  <span className="truncate">
                    {variant
                      ? visibleOptionValues.join(" / ")
                      : t.product.chooseOptions}
                  </span>
                  <ChevronDown />
                </button>
              )}
              <button
                onClick={handleAddToCart}
                disabled={!inStock || !variant || isAdding}
                data-testid="mobile-cart-button"
                className="inline-flex items-center justify-center rounded-md bg-brand-navy px-4 py-3.5 text-[14px] font-medium text-white transition-colors hover:bg-black disabled:bg-brand-navy/35 disabled:cursor-not-allowed"
              >
                {isAdding
                  ? "Ajout…"
                  : !variant
                  ? t.product.chooseOption
                  : !inStock
                  ? t.product.outOfStock
                  : t.product.addToCart}
              </button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition appear show={state} as={Fragment}>
        <Dialog as="div" className="relative z-[75]" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-brand-ink/40" />
          </Transition.Child>

          <div className="fixed bottom-0 inset-x-0">
            <div className="flex min-h-full h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Panel
                  className="w-full h-full transform overflow-hidden text-left flex flex-col gap-y-3"
                  data-testid="mobile-actions-modal"
                >
                  <div className="w-full flex justify-end pr-6">
                    <button
                      onClick={close}
                      className="bg-white w-12 h-12 rounded-full text-brand-ink flex justify-center items-center shadow-sm"
                      data-testid="close-modal-button"
                    >
                      <X />
                    </button>
                  </div>
                  <div className="bg-white px-6 py-10 rounded-t-2xl">
                    {(product.variants?.length ?? 0) > 1 && (
                      <div className="flex flex-col gap-y-6">
                        {visibleOptions.map((option) => {
                          return (
                            <div key={option.id}>
                              <OptionSelect
                                option={option}
                                current={options[option.id]}
                                updateOption={updateOptions}
                                title={option.title ?? ""}
                                disabled={optionsDisabled}
                              />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileActions
