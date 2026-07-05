import { Container } from "@modules/common/components/ui"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { getI18n } from "@lib/i18n/server"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = async ({ customer, orders }: OverviewProps) => {
  const { t } = await getI18n()
  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden small:block">
        <div className="flex justify-between items-center mb-6">
          <span
            className="font-serif text-2xl text-brand-ink"
            data-testid="welcome-message"
            data-value={customer?.first_name}
          >
            {t.account.hello} {customer?.first_name}
          </span>
          <span className="text-small-regular text-brand-ink-secondary">
            {t.account.signedInAs}{" "}
            <span
              className="font-semibold text-brand-ink"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-brand-line">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-8 mb-6">
              <div className="flex flex-col gap-y-4 flex-1 rounded-lg border border-brand-line bg-white p-6">
                <h3 className="font-serif text-xl text-brand-ink">
                  {t.account.profile}
                </h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl-semi leading-none text-brand-ink"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="uppercase text-base-regular text-brand-mute">
                    {t.account.completed}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4 flex-1 rounded-lg border border-brand-line bg-white p-6">
                <h3 className="font-serif text-xl text-brand-ink">
                  {t.account.addresses}
                </h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="text-3xl-semi leading-none text-brand-ink"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-brand-mute">
                    {t.account.saved}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="font-serif text-xl text-brand-ink">
                  {t.account.recentOrders}
                </h3>
              </div>
              <ul
                className="flex flex-col gap-y-4"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li
                        key={order.id}
                        data-testid="order-wrapper"
                        data-value={order.id}
                      >
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <Container className="rounded-lg border border-brand-line bg-white flex justify-between items-center p-4 transition-colors hover:border-brand-navy">
                            <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1 text-brand-ink">
                              <span className="font-semibold text-brand-ink-secondary">
                                {t.account.datePlaced}
                              </span>
                              <span className="font-semibold text-brand-ink-secondary">
                                {t.account.orderNumber}
                              </span>
                              <span className="font-semibold text-brand-ink-secondary">
                                {t.account.totalAmount}
                              </span>
                              <span data-testid="order-created-date">
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span
                                data-testid="order-id"
                                data-value={order.display_id}
                              >
                                #{order.display_id}
                              </span>
                              <span data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between"
                              data-testid="open-order-button"
                            >
                              <span className="sr-only">
                                {t.account.goToOrder} #{order.display_id}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </Container>
                        </LocalizedClientLink>
                      </li>
                    )
                  })
                ) : (
                  <span
                    className="text-brand-mute"
                    data-testid="no-orders-message"
                  >
                    {t.account.noRecentOrders}
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
