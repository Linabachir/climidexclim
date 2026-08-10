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
  return (
    <div className="bg-white">
      <div className="content-container py-20 small:py-28">
        <div className="mx-auto max-w-2xl">
          <p className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-brand-mute">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.015em] text-brand-ink small:text-5xl">
            {title}
          </h1>
          <div className="mt-8 h-px w-full bg-brand-line" />
          <div className="mt-8 whitespace-pre-line font-sans text-[16.5px] leading-[1.8] text-brand-ink-secondary">
            {body}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalPage
