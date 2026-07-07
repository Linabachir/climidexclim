"use client"

import { useEffect } from "react"
import { Heading, Text, clx } from "@modules/common/components/ui"

import PaymentButton from "../payment-button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useI18n } from "@lib/i18n/context"
import { HttpTypes } from "@medusajs/types"

const Review = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "review"

  const paidByGiftcard = !!(
    (cart as unknown as Record<string, unknown>)?.gift_cards && ((cart as unknown as Record<string, unknown>)?.gift_cards as unknown[])?.length > 0 && cart?.total === 0
  )

  // Une session de paiement valide est requise pour confirmer. Elle peut être
  // invalidée après coup (ex. code promo appliqué => total modifié) : dans ce
  // cas on renvoie automatiquement à l'étape paiement au lieu de laisser un
  // bouton grisé sans issue.
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (s) => s.status === "pending"
  )
  const paymentReady = !!activeSession || paidByGiftcard

  useEffect(() => {
    if (isOpen && !paymentReady) {
      router.replace(`${pathname}?step=payment`)
    }
  }, [isOpen, paymentReady, router, pathname])

  const previousStepsCompleted =
    cart.shipping_address &&
    (cart.shipping_methods?.length ?? 0) > 0 &&
    paymentReady

  return (
    <div className="rounded-lg border border-brand-line bg-white p-6 small:p-8">
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row font-serif font-normal text-2xl small:text-[26px] text-brand-ink gap-x-2 items-baseline",
            {
              "opacity-50 pointer-events-none select-none": !isOpen,
            }
          )}
        >
          {t.checkout.review}
        </Heading>
      </div>
      {isOpen && previousStepsCompleted && (
        <>
          <div className="flex items-start gap-x-1 w-full mb-6">
            <div className="w-full">
              <Text className="txt-medium text-brand-mute mb-1">
                {t.checkout.reviewTerms}
              </Text>
            </div>
          </div>
          <PaymentButton cart={cart} data-testid="submit-order-button" />
        </>
      )}
    </div>
  )
}

export default Review
