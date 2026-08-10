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
        <div className="mx-auto max-w-3xl">
          <p className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brand-mute">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.04] tracking-[-0.035em] text-brand-ink small:text-5xl">
            {title}
          </h1>
          <div className="mt-10 border-t border-[#d2d2d7]">
            {sections.map((section, index) => {
              const [heading, ...content] = section.split("\n")
              const hasContent = content.length > 0

              return (
                <section
                  key={`${heading}-${index}`}
                  className="border-b border-[#e5e5e7] py-8 small:py-10"
                >
                  {hasContent && (
                    <h2 className="text-lg font-semibold tracking-[-0.015em] text-brand-ink small:text-xl">
                      {heading}
                    </h2>
                  )}
                  <p className={`${hasContent ? "mt-3" : ""} whitespace-pre-line font-sans text-[15.5px] leading-[1.8] text-brand-ink-secondary`}>
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
