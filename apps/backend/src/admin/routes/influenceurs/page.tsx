import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChartBar } from "@medusajs/icons"
import { Container, Heading, Text, Table, Badge, Button, toast } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { adminFetch } from "../../lib/admin-fetch"

type RefRow = { ref: string; orders: number; revenue: number }
type Stats = { total: number; attributed: number; byRef: RefRow[] }

const money = (n: number) => {
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(n)
  } catch {
    return `${n} €`
  }
}

const InfluencersPage = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await adminFetch<Stats>("/admin/ref-stats")
      setStats(res)
    } catch (e) {
      toast.error("Erreur", { description: (e as Error).message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Ventes par influenceur</Heading>
          <Text className="text-ui-fg-subtle mt-1" size="small">
            Chaque lien <code>climidex.com/?ref=NUMÉRO</code> attribue les ventes
            à l'influenceur correspondant.
          </Text>
        </div>
        <Button variant="secondary" size="small" onClick={load} isLoading={loading}>
          Actualiser
        </Button>
      </div>

      {stats && (
        <div className="flex gap-6 px-6 py-3 text-ui-fg-subtle" >
          <Text size="small">
            Total commandes : <strong className="text-ui-fg-base">{stats.total}</strong>
          </Text>
          <Text size="small">
            Attribuées à un influenceur :{" "}
            <strong className="text-ui-fg-base">{stats.attributed}</strong>
          </Text>
        </div>
      )}

      <div className="px-6 py-2">
        {!stats?.byRef?.length ? (
          <Text className="text-ui-fg-subtle py-8 text-center" size="small">
            {loading
              ? "Chargement…"
              : "Aucune vente attribuée pour l'instant. Les liens ?ref= apparaîtront ici dès la première commande."}
          </Text>
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Réf. (numéro)</Table.HeaderCell>
                <Table.HeaderCell className="text-right">Commandes</Table.HeaderCell>
                <Table.HeaderCell className="text-right">Chiffre d'affaires</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stats.byRef.map((r) => (
                <Table.Row key={r.ref}>
                  <Table.Cell>
                    <Badge size="small">{r.ref}</Badge>
                  </Table.Cell>
                  <Table.Cell className="text-right">{r.orders}</Table.Cell>
                  <Table.Cell className="text-right">{money(r.revenue)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Influenceurs",
  icon: ChartBar,
})

export default InfluencersPage
