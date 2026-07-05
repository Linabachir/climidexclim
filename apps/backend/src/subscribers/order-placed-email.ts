import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

const RESEND_FROM =
  process.env.RESEND_FROM || "CLIMIDEX <onboarding@resend.dev>"

function money(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount)
  } catch {
    return `${amount} ${currency.toUpperCase()}`
  }
}

function buildHtml(order: any): string {
  const currency = order.currency_code || "eur"
  const rows = (order.items ?? [])
    .map(
      (it: any) =>
        `<tr>
           <td style="padding:8px 0;color:#1c1c1c;">${it.title} × ${it.quantity}</td>
           <td style="padding:8px 0;text-align:right;color:#1c1c1c;">${money(
             Number(it.unit_price) * Number(it.quantity),
             currency
           )}</td>
         </tr>`
    )
    .join("")

  const addr = order.shipping_address
  const addressBlock = addr
    ? `${[addr.first_name, addr.last_name].filter(Boolean).join(" ")}<br/>
       ${addr.address_1 ?? ""}<br/>
       ${[addr.postal_code, addr.city].filter(Boolean).join(" ")}<br/>
       ${addr.country_code?.toUpperCase() ?? ""}`
    : ""

  return `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1c1c1c;">
    <div style="background:#1a2238;padding:28px;text-align:center;">
      <span style="color:#fff;font-size:22px;letter-spacing:6px;font-family:Georgia,serif;">CLIMIDEX</span>
    </div>
    <div style="padding:32px 24px;">
      <h1 style="font-family:Georgia,serif;font-size:24px;margin:0 0 8px;">Merci pour ta commande !</h1>
      <p style="color:#6b6864;margin:0 0 24px;">Commande <strong>#${
        order.display_id ?? order.id
      }</strong> — nous la préparons.</p>

      <table style="width:100%;border-collapse:collapse;border-top:1px solid #e7e3dd;">
        ${rows}
        <tr>
          <td style="padding:14px 0 0;font-weight:bold;border-top:1px solid #e7e3dd;">Total</td>
          <td style="padding:14px 0 0;text-align:right;font-weight:bold;border-top:1px solid #e7e3dd;">${money(
            Number(order.total ?? 0),
            currency
          )}</td>
        </tr>
      </table>

      ${
        addressBlock
          ? `<h3 style="font-size:14px;text-transform:uppercase;letter-spacing:1px;margin:28px 0 8px;">Livraison</h3>
             <p style="color:#6b6864;line-height:1.5;margin:0;">${addressBlock}</p>`
          : ""
      }

      <p style="color:#6b6864;margin:28px 0 0;font-size:13px;">
        Tu recevras un email avec le numéro de suivi dès l'expédition.
      </p>
    </div>
    <div style="background:#f7f5f2;padding:18px;text-align:center;color:#6b6864;font-size:12px;">
      © ${new Date().getFullYear()} CLIMIDEX
    </div>
  </div>`
}

export default async function orderPlacedEmailHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    logger.warn(
      "[email] RESEND_API_KEY not set — skipping order confirmation email."
    )
    return
  }

  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const { data: orders } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "display_id",
      "email",
      "currency_code",
      "total",
      "items.title",
      "items.quantity",
      "items.unit_price",
      "shipping_address.*",
    ],
    filters: { id: data.id },
  })
  const order = orders[0]
  if (!order?.email) {
    logger.warn(`[email] Order ${data.id} has no email — skipping.`)
    return
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: order.email,
        subject: `Confirmation de commande #${order.display_id ?? order.id}`,
        html: buildHtml(order),
      }),
    })
    if (!res.ok) {
      const body = await res.text()
      logger.error(`[email] Resend rejected the email: ${res.status} ${body}`)
      return
    }
    logger.info(`[email] Order confirmation sent to ${order.email}.`)
  } catch (e) {
    logger.error(`[email] Failed to send confirmation: ${(e as Error).message}`)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
