import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Badge, Button, Container, Heading, Select, Text, toast } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { adminFetch } from "../../lib/admin-fetch"

type Review = {
  id: string
  rating: number
  title: string | null
  content: string
  author_name: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}

const STATUS_COLOR: Record<string, "green" | "orange" | "red" | "grey"> = {
  approved: "green",
  pending: "orange",
  rejected: "red",
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filter, setFilter] = useState<string>("pending")
  const [loading, setLoading] = useState(false)

  const load = async (status: string) => {
    setLoading(true)
    try {
      const qs = status === "all" ? "" : `?status=${status}`
      const res = await adminFetch<{ reviews: Review[] }>(
        `/admin/reviews${qs}`
      )
      setReviews(res.reviews ?? [])
    } catch (e) {
      toast.error("Erreur", { description: (e as Error).message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load(filter)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const moderate = async (id: string, status: string) => {
    try {
      await adminFetch(`/admin/reviews/${id}`, {
        method: "POST",
        body: { status },
      })
      toast.success(status === "approved" ? "Avis approuvé" : "Avis rejeté")
      load(filter)
    } catch (e) {
      toast.error("Erreur", { description: (e as Error).message })
    }
  }

  const remove = async (id: string) => {
    try {
      await adminFetch(`/admin/reviews/${id}`, { method: "DELETE" })
      toast.success("Avis supprimé")
      load(filter)
    } catch (e) {
      toast.error("Erreur", { description: (e as Error).message })
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Avis clients</Heading>
          <Text className="text-ui-fg-subtle" size="small">
            Approuve les avis pour qu'ils apparaissent sur la boutique.
          </Text>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <Select.Trigger className="w-44">
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="pending">En attente</Select.Item>
            <Select.Item value="approved">Approuvés</Select.Item>
            <Select.Item value="rejected">Rejetés</Select.Item>
            <Select.Item value="all">Tous</Select.Item>
          </Select.Content>
        </Select>
      </div>

      <div className="flex flex-col divide-y">
        {loading && (
          <Text className="px-6 py-6 text-ui-fg-subtle" size="small">
            Chargement…
          </Text>
        )}
        {!loading && reviews.length === 0 && (
          <Text className="px-6 py-6 text-ui-fg-subtle" size="small">
            Aucun avis dans cette catégorie.
          </Text>
        )}
        {!loading &&
          reviews.map((r) => (
            <div key={r.id} className="flex flex-col gap-y-2 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-3">
                  <Text weight="plus">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</Text>
                  <Text size="small" weight="plus">
                    {r.author_name}
                  </Text>
                  <Badge size="2xsmall" color={STATUS_COLOR[r.status] ?? "grey"}>
                    {r.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-x-2">
                  {r.status !== "approved" && (
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => moderate(r.id, "approved")}
                    >
                      Approuver
                    </Button>
                  )}
                  {r.status !== "rejected" && (
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => moderate(r.id, "rejected")}
                    >
                      Rejeter
                    </Button>
                  )}
                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => remove(r.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
              {r.title && <Text weight="plus" size="small">{r.title}</Text>}
              <Text size="small" className="text-ui-fg-subtle">
                {r.content}
              </Text>
            </div>
          ))}
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Avis clients",
  icon: ChatBubbleLeftRight,
})

export default ReviewsPage
