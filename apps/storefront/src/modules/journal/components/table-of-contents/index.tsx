export type TocItem = { id: string; title: string; level: 2 | 3 }

export function slugifyHeading(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export function extractTableOfContents(content: string): TocItem[] {
  return content
    .split("\n")
    .map((line) => line.match(/^(##|###)\s+(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .map((match) => ({
      id: slugifyHeading(match[2].replace(/[*_`]/g, "")),
      title: match[2].replace(/[*_`]/g, ""),
      level: match[1] === "##" ? 2 : 3,
    }))
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (!items.length) return null

  return (
    <>
      <details className="border-y border-[#dedee2] py-5 lg:hidden">
        <summary className="cursor-pointer list-none font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brand-ink">
          Sommaire
        </summary>
        <TocLinks items={items} />
      </details>
      <nav aria-label="Sommaire de l’article" className="hidden lg:block">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-brand-ink">
          Sommaire
        </p>
        <TocLinks items={items} />
      </nav>
    </>
  )
}

function TocLinks({ items }: { items: TocItem[] }) {
  return (
    <ol className="mt-5 space-y-3 border-l border-[#dedee2] pl-4">
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
          <a
            href={`#${item.id}`}
            className="font-sans text-[13px] leading-5 text-brand-mute hover:text-brand-ink"
          >
            {item.title}
          </a>
        </li>
      ))}
    </ol>
  )
}
