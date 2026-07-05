import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminOrder } from "@medusajs/framework/types"
import { Badge, Button, Container, Heading, Text, toast } from "@medusajs/ui"
import { useState } from "react"
import { adminFetch } from "../lib/admin-fetch"

type FulfillState = {
  fulfilled: boolean
  cjOrderId?: string
  status?: string
  trackNumber?: string
  trackingUrl?: string
  logistic?: string
  shippingCost?: number
}

const CjOrderWidget = ({ data }: DetailWidgetProps<AdminOrder>) => {
  const meta = (data.metadata ?? {}) as Record<string, any>
  const [state, setState] = useState<FulfillState>({
    fulfilled: !!meta.cj_order_id,
    cjOrderId: meta.cj_order_id,
    status: meta.cj_order_status,
    trackNumber: meta.cj_track_number,
    trackingUrl: meta.cj_tracking_url,
    logistic: meta.cj_logistic,
    shippingCost: meta.cj_shipping_cost,
  })
  const [loading, setLoading] = useState(false)

  const sendToCj = async () => {
    setLoading(true)
    try {
      const res = await adminFetch<any>("/admin/cj/fulfill", {
        method: "POST",
        body: { orderId: data.id },
      })
      if (res.ok) {
        setState({
          fulfilled: true,
          cjOrderId: res.cjOrderId,
          status: "CREATED",
          logistic: res.logistic,
          shippingCost: res.shippingCost,
        })
        toast.success("Commande envoyée à CJ", {
          description: `#${res.cjOrderId} · ${res.logistic}`,
        })
      } else if (res.alreadyExists) {
        toast.info("Déjà envoyée", { description: res.message })
        setState((s) => ({ ...s, fulfilled: true, cjOrderId: res.cjOrderId }))
      } else {
        toast.error("Échec", { description: res.message })
      }
    } catch (e) {
      toast.error("Échec", { description: (e as Error).message })
    } finally {
      setLoading(false)
    }
  }

  const refresh = async () => {
    setLoading(true)
    try {
      const res = await adminFetch<any>(
        `/admin/cj/fulfill?orderId=${data.id}`
      )
      if (res.ok && res.fulfilled) {
        setState((s) => ({
          ...s,
          status: res.status,
          trackNumber: res.trackNumber,
          trackingUrl: res.trackingUrl,
        }))
        toast.success("Suivi mis à jour", {
          description: res.trackNumber
            ? `Suivi : ${res.trackNumber}`
            : `Statut : ${res.status ?? "—"}`,
        })
      } else {
        toast.error("Erreur", { description: res.message ?? "—" })
      }
    } catch (e) {
      toast.error("Erreur", { description: (e as Error).message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">CJ Dropshipping</Heading>
        {state.fulfilled && (
          <Badge size="2xsmall" color="green">
            {state.status ?? "CREATED"}
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-y-3 px-6 py-4">
        {!state.fulfilled && (
          <>
            <Text size="small" className="text-ui-fg-subtle">
              Envoyer cette commande à CJ (livraison la moins chère, sans
              paiement automatique).
            </Text>
            <Button
              variant="primary"
              onClick={sendToCj}
              isLoading={loading}
            >
              Envoyer à CJ
            </Button>
          </>
        )}

        {state.fulfilled && (
          <>
            <Row label="Commande CJ" value={`#${state.cjOrderId ?? "—"}`} />
            <Row label="Statut" value={state.status ?? "—"} />
            <Row label="Transporteur" value={state.logistic ?? "—"} />
            {state.shippingCost != null && (
              <Row
                label="Frais de port (coût CJ)"
                value={`${state.shippingCost} USD`}
              />
            )}
            <Row
              label="N° de suivi"
              value={
                state.trackingUrl && state.trackNumber ? (
                  <a
                    className="text-ui-fg-interactive"
                    href={state.trackingUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {state.trackNumber}
                  </a>
                ) : (
                  state.trackNumber ?? "en attente"
                )
              }
            />
            <Button
              variant="secondary"
              onClick={refresh}
              isLoading={loading}
            >
              Rafraîchir le suivi
            </Button>
            <Text size="xsmall" className="text-ui-fg-muted">
              ⚠️ La commande est créée chez CJ mais pas encore payée. Paie-la
              dans ton compte CJ pour lancer l'expédition.
            </Text>
          </>
        )}
      </div>
    </Container>
  )
}

const Row = ({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) => (
  <div className="flex items-center justify-between">
    <Text size="small" className="text-ui-fg-subtle">
      {label}
    </Text>
    <Text size="small">{value}</Text>
  </div>
)

export const config = defineWidgetConfig({
  zone: "order.details.side.after",
})

export default CjOrderWidget
