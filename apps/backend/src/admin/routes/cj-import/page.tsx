import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ArrowDownTray } from "@medusajs/icons"
import {
  Button,
  Container,
  Heading,
  Input,
  Label,
  Select,
  Text,
  Textarea,
  toast,
} from "@medusajs/ui"
import { useState } from "react"
import { adminFetch } from "../../lib/admin-fetch"

/** Extracts a CJ product id from a pasted link or raw id. */
function extractPid(input: string): string | null {
  const value = input.trim()
  if (!value) {
    return null
  }
  // Raw numeric id.
  if (/^\d{6,}$/.test(value)) {
    return value
  }
  // qksource / cjdropshipping link: ...-p-<pid>.html  or  ?pid=<pid>
  const patterns = [/-p-(\d{6,})/, /[?&]pid=(\d{6,})/, /(\d{12,})/]
  for (const re of patterns) {
    const m = value.match(re)
    if (m) {
      return m[1]
    }
  }
  return null
}

type ImportResult = {
  ok: boolean
  alreadyExists?: boolean
  message?: string
  product?: { id: string; title: string; variants: number; status: string }
}

const CjImportPage = () => {
  const [link, setLink] = useState("")
  const [markup, setMarkup] = useState("")
  const [status, setStatus] = useState<"draft" | "published">("draft")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [syncing, setSyncing] = useState(false)

  const pid = extractPid(link)

  const onSyncStock = async () => {
    setSyncing(true)
    try {
      const res = await adminFetch<{
        ok: boolean
        synced?: number
        message?: string
        results?: { title: string; totalStock: number; hidden: boolean }[]
      }>("/admin/cj/sync-stock", { method: "POST" })
      if (res.ok) {
        const hidden = res.results?.filter((r) => r.hidden).length ?? 0
        toast.success("Stock synchronisé", {
          description: `${res.synced} produit(s) mis à jour${
            hidden ? `, ${hidden} masqué(s) (rupture)` : ""
          }.`,
        })
      } else {
        toast.error("Échec de la synchro", { description: res.message })
      }
    } catch (e) {
      toast.error("Échec de la synchro", {
        description: (e as Error).message,
      })
    } finally {
      setSyncing(false)
    }
  }

  const onImport = async () => {
    if (!pid) {
      toast.error("Lien ou ID CJ invalide", {
        description: "Colle un lien produit CJ (qksource.com) ou un ID.",
      })
      return
    }
    setLoading(true)
    setResult(null)
    try {
      const body: Record<string, unknown> = { pid, status }
      const m = parseFloat(markup.replace(",", "."))
      if (!Number.isNaN(m) && m > 0) {
        body.markup = m
      }
      const res = await adminFetch<ImportResult>("/admin/cj/import", {
        method: "POST",
        body,
      })
      setResult(res)
      if (res.ok) {
        toast.success("Produit importé", {
          description: `${res.product?.title} (${res.product?.variants} variantes)`,
        })
      } else if (res.alreadyExists) {
        toast.info("Déjà importé", { description: res.message })
      } else {
        toast.error("Échec de l'import", { description: res.message })
      }
    } catch (e) {
      const message = (e as Error).message || "Erreur inconnue"
      setResult({ ok: false, message })
      toast.error("Échec de l'import", { description: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Import CJ Dropshipping</Heading>
          <Text className="text-ui-fg-subtle" size="small">
            Colle un lien produit CJ (qksource.com) pour l'importer dans le
            catalogue.
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-y-4 px-6 py-6">
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="cj-link">Lien ou ID produit CJ</Label>
          <Textarea
            id="cj-link"
            placeholder="https://qksource.com/product/...-p-1471750758729912320.html"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          {link && (
            <Text size="xsmall" className="text-ui-fg-muted">
              {pid ? `ID détecté : ${pid}` : "Aucun ID détecté dans ce lien."}
            </Text>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="cj-markup">Marge (multiplicateur, optionnel)</Label>
            <Input
              id="cj-markup"
              type="text"
              inputMode="decimal"
              placeholder="ex : 2.5"
              value={markup}
              onChange={(e) => setMarkup(e.target.value)}
            />
            <Text size="xsmall" className="text-ui-fg-muted">
              Prix de vente = coût CJ × marge. Vide = coût CJ.
            </Text>
          </div>

          <div className="flex flex-col gap-y-2">
            <Label htmlFor="cj-status">Statut</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as "draft" | "published")}
            >
              <Select.Trigger id="cj-status">
                <Select.Value />
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="draft">Brouillon</Select.Item>
                <Select.Item value="published">Publié</Select.Item>
              </Select.Content>
            </Select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={onImport}
            isLoading={loading}
            disabled={!pid}
          >
            Importer le produit
          </Button>
        </div>

        {result?.ok && result.product && (
          <div className="bg-ui-bg-subtle rounded-lg p-4">
            <Text weight="plus">✅ Importé : {result.product.title}</Text>
            <Text size="small" className="text-ui-fg-subtle">
              {result.product.variants} variantes · statut{" "}
              {result.product.status}
            </Text>
            <a
              className="text-ui-fg-interactive text-sm"
              href={`/app/products/${result.product.id}`}
            >
              Ouvrir le produit →
            </a>
          </div>
        )}
        {result && !result.ok && result.alreadyExists && result.product && (
          <div className="bg-ui-bg-subtle rounded-lg p-4">
            <Text weight="plus">ℹ️ {result.message}</Text>
            <a
              className="text-ui-fg-interactive text-sm"
              href={`/app/products/${result.product.id}`}
            >
              Ouvrir le produit →
            </a>
          </div>
        )}
        {result && !result.ok && !result.alreadyExists && (
          <div className="bg-ui-bg-subtle rounded-lg p-4">
            <Text className="text-ui-fg-error">❌ {result.message}</Text>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex flex-col gap-y-1">
          <Text weight="plus" size="small">
            Stock CJ
          </Text>
          <Text size="xsmall" className="text-ui-fg-subtle">
            Synchronise le stock depuis CJ (auto chaque heure). Masque un
            produit en rupture totale, le republie quand le stock revient.
          </Text>
        </div>
        <Button
          variant="secondary"
          onClick={onSyncStock}
          isLoading={syncing}
        >
          Synchroniser le stock
        </Button>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Import CJ",
  icon: ArrowDownTray,
})

export default CjImportPage
