import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function SiloBreadcrumb({
  siloLabel,
  siloPath,
  articleTitle,
}: {
  siloLabel?: string
  siloPath?: string
  articleTitle?: string
}) {
  return (
    <nav
      aria-label="Fil d’Ariane"
      className="flex flex-wrap items-center gap-2 font-sans text-[13px] text-brand-mute"
    >
      <LocalizedClientLink href="/" className="hover:text-brand-ink">
        Accueil
      </LocalizedClientLink>
      <span aria-hidden="true">/</span>
      <LocalizedClientLink href="/journal" className="hover:text-brand-ink">
        Journal
      </LocalizedClientLink>
      {siloLabel && siloPath ? (
        <>
          <span aria-hidden="true">/</span>
          <LocalizedClientLink href={siloPath} className="hover:text-brand-ink">
            {siloLabel}
          </LocalizedClientLink>
        </>
      ) : null}
      {articleTitle ? (
        <>
          <span aria-hidden="true">/</span>
          <span className="max-w-[36ch] truncate text-brand-ink-secondary">
            {articleTitle}
          </span>
        </>
      ) : null}
    </nav>
  )
}
