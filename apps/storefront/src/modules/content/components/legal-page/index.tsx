// Mise en page épurée et moderne pour les pages d'information
// (mentions légales, CGV, contact). Contenu fourni par le parent.
const LegalPage = ({
  title,
  body,
  eyebrow = "CLIMIDEX",
}: {
  title: string
  body: string
  eyebrow?: string
}) => {
  const sections = body.trim().split(/\n\s*\n/)

  return (
    <div className="bg-white">
      <div className="content-container py-16 small:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brand-mute">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-brand-ink small:text-6xl">
            {title}
          </h1>
          <div className="mt-12 grid gap-4">
            {sections.map((section, index) => {
              const [heading, ...content] = section.split("\n")
              const hasContent = content.length > 0

              return (
                <section
                  key={`${heading}-${index}`}
                  className="rounded-[28px] bg-[#f5f5f7] px-6 py-7 small:px-8 small:py-8"
                >
                  {hasContent && (
                    <h2 className="text-xl font-semibold tracking-[-0.02em] text-brand-ink">
                      {heading}
                    </h2>
                  )}
                  <p className={`${hasContent ? "mt-3" : ""} whitespace-pre-line font-sans text-[15.5px] leading-[1.75] text-brand-ink-secondary`}>
                    {hasContent ? content.join("\n") : heading}
                  </p>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalPage
