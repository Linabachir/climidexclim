import { getAllArticles, getArticlePath } from "@lib/journal/content"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://climidex.com"

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function GET() {
  const items = getAllArticles()
    .filter((article) => article.status === "published")
    .map((article) => {
      const url = `${BASE_URL}/fr${getArticlePath(article)}`
      return `<item><title>${escapeXml(article.title)}</title><link>${url}</link><guid>${url}</guid><description>${escapeXml(article.excerpt)}</description><pubDate>${article.publishedAt.toUTCString()}</pubDate></item>`
    })
    .join("")
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Journal CLIMIDEX</title><link>${BASE_URL}/fr/journal</link><description>Comprendre le confort intérieur. Choisir avec précision.</description><language>fr-FR</language>${items}</channel></rss>`

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  })
}
