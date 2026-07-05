// Email « commande expédiée » : envoyé une seule fois par commande, dès que le
// numéro de suivi CJ apparaît (sync manuel du widget admin ou job périodique).

const RESEND_FROM =
  process.env.RESEND_FROM || "CLIMIDEX <onboarding@resend.dev>"

type ShippedEmailInput = {
  order: {
    display_id?: number | string
    id: string
    email?: string | null
    items?: { title: string; quantity: number }[] | null
    shipping_address?: {
      first_name?: string | null
      last_name?: string | null
      address_1?: string | null
      postal_code?: string | null
      city?: string | null
      country_code?: string | null
    } | null
  }
  trackNumber: string
  trackingUrl?: string | null
  logistic?: string | null
}

function buildHtml({ order, trackNumber, trackingUrl, logistic }: ShippedEmailInput): string {
  const url =
    trackingUrl ||
    `https://t.17track.net/fr#nums=${encodeURIComponent(trackNumber)}`

  const items = (order.items ?? [])
    .map(
      (it) =>
        `<tr>
           <td style="padding:7px 0;color:#1c1c1c;font-size:14px;">${it.title}</td>
           <td style="padding:7px 0;text-align:right;color:#6b6864;font-size:14px;">× ${it.quantity}</td>
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

  // Étapes : Commandée (faite) → Expédiée (active) → Livrée (à venir)
  const step = (label: string, state: "done" | "active" | "todo") => {
    const dot =
      state === "todo"
        ? `<span style="display:inline-block;width:12px;height:12px;border-radius:50%;border:2px solid #d9d4cc;background:#ffffff;"></span>`
        : `<span style="display:inline-block;width:16px;height:16px;border-radius:50%;background:${
            state === "active" ? "#1a2238" : "#9aa38b"
          };color:#fff;font-size:11px;line-height:16px;">&#10003;</span>`
    const color = state === "todo" ? "#b5afa6" : "#1c1c1c"
    const weight = state === "active" ? "600" : "400"
    return `<td align="center" style="width:33%;">
              ${dot}
              <div style="font-size:12px;color:${color};font-weight:${weight};margin-top:6px;letter-spacing:0.04em;">${label}</div>
            </td>`
  }

  return `
  <div style="background:#f7f5f2;padding:24px 0;">
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1c1c1c;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e7e3dd;">
    <div style="background:#1a2238;padding:30px;text-align:center;">
      <span style="color:#fff;font-size:22px;letter-spacing:6px;font-family:Georgia,serif;">CLIMIDEX</span>
    </div>

    <div style="padding:36px 28px 8px;text-align:center;">
      <div style="font-size:13px;text-transform:uppercase;letter-spacing:0.16em;color:#8a8478;margin-bottom:10px;">
        Commande #${order.display_id ?? order.id}
      </div>
      <h1 style="font-family:Georgia,serif;font-size:27px;margin:0 0 10px;line-height:1.2;">
        Ton Climaire est en route&nbsp;!
      </h1>
      <p style="color:#6b6864;margin:0 auto 26px;font-size:15px;line-height:1.6;max-width:40ch;">
        Ton colis a été remis au transporteur${logistic ? ` (${logistic})` : ""}.
        Tu peux suivre son trajet à tout moment.
      </p>

      <table role="presentation" style="width:100%;border-collapse:collapse;margin:0 0 28px;">
        <tr>
          ${step("Commandée", "done")}
          ${step("Expédiée", "active")}
          ${step("Livrée", "todo")}
        </tr>
      </table>

      <div style="background:#f7f5f2;border:1px solid #e7e3dd;border-radius:8px;padding:18px;margin:0 0 22px;">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#8a8478;margin-bottom:6px;">
          Numéro de suivi
        </div>
        <div style="font-family:Consolas,Menlo,monospace;font-size:17px;letter-spacing:0.06em;color:#1a2238;font-weight:bold;">
          ${trackNumber}
        </div>
      </div>

      <a href="${url}"
         style="display:inline-block;background:#1a2238;color:#ffffff;text-decoration:none;padding:14px 38px;border-radius:6px;font-size:15px;font-weight:500;">
        Suivre mon colis
      </a>
      <p style="color:#b5afa6;font-size:12px;margin:14px 0 30px;">
        Le suivi peut mettre 24&nbsp;à&nbsp;48&nbsp;h à s'activer chez le transporteur.
      </p>
    </div>

    <div style="padding:0 28px 30px;">
      ${
        items
          ? `<div style="border-top:1px solid #e7e3dd;padding-top:18px;">
               <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#8a8478;margin-bottom:4px;">Dans ce colis</div>
               <table role="presentation" style="width:100%;border-collapse:collapse;">${items}</table>
             </div>`
          : ""
      }
      ${
        addressBlock
          ? `<div style="border-top:1px solid #e7e3dd;margin-top:14px;padding-top:18px;">
               <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.14em;color:#8a8478;margin-bottom:6px;">Adresse de livraison</div>
               <p style="color:#6b6864;line-height:1.6;margin:0;font-size:14px;">${addressBlock}</p>
             </div>`
          : ""
      }
    </div>

    <div style="background:#f7f5f2;padding:20px;text-align:center;color:#8a8478;font-size:12px;line-height:1.7;">
      Une question&nbsp;? Écris-nous à
      <a href="mailto:contact@climidex.com" style="color:#1a2238;">contact@climidex.com</a><br/>
      © ${new Date().getFullYear()} CLIMIDEX
    </div>
  </div>
  </div>`
}

/**
 * Envoie l'email d'expédition via Resend. Renvoie true si l'envoi a réussi
 * (l'appelant marque alors la commande pour ne pas renvoyer l'email).
 */
export async function sendOrderShippedEmail(
  input: ShippedEmailInput,
  logger: { info: (m: string) => void; warn: (m: string) => void; error: (m: string) => void }
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    logger.warn("[email] RESEND_API_KEY not set — skipping shipping email.")
    return false
  }
  if (!input.order.email) {
    logger.warn(`[email] Order ${input.order.id} has no email — skipping shipping email.`)
    return false
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
        to: input.order.email,
        subject: `Ta commande #${input.order.display_id ?? input.order.id} est en route 📦`,
        html: buildHtml(input),
      }),
    })
    if (!res.ok) {
      logger.error(`[email] Resend rejected shipping email: ${res.status} ${await res.text()}`)
      return false
    }
    logger.info(`[email] Shipping email sent to ${input.order.email}.`)
    return true
  } catch (e) {
    logger.error(`[email] Failed to send shipping email: ${(e as Error).message}`)
    return false
  }
}
