import { z } from "zod"

export const journalSilos = [
  "choisir-un-ventilateur",
  "confort-thermique",
  "design-interieur",
  "air-interieur",
  "technologie",
] as const

const frontmatterDate = z.preprocess(
  (value) => (value instanceof Date ? value : new Date(String(value))),
  z.date()
)

export const journalFrontmatterSchema = z
  .object({
    title: z.string().trim().min(1),
    h1: z.string().trim().min(1),
    seoTitle: z.string().trim().min(1).max(62),
    metaDescription: z.string().trim().min(140).max(165),
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Le slug doit être en kebab-case")
      .refine(
        (slug) => !/(?:^|-)(?:19|20)\d{2}(?:-|$)/.test(slug),
        "Le slug ne doit pas contenir de millésime"
      ),
    silo: z.enum(journalSilos),
    type: z.enum(["hub", "pillar", "satellite"]),
    primaryKeyword: z.string().trim().min(1),
    secondaryKeywords: z.array(z.string().trim().min(1)).default([]),
    excerpt: z.string().trim().min(1),
    publishedAt: frontmatterDate,
    updatedAt: frontmatterDate,
    cover: z.string().trim().min(1),
    coverAlt: z.string().trim().min(1),
    relatedSlugs: z.array(z.string().trim().min(1)).min(2).max(6),
    faq: z
      .array(
        z.object({
          question: z.string().trim().min(1),
          answer: z.string().trim().min(1),
        })
      )
      .optional(),
    dataToConfirm: z.array(z.string().trim().min(1)).default([]),
    status: z.enum(["draft", "review", "published"]),
  })
  .refine((data) => data.updatedAt >= data.publishedAt, {
    message: "updatedAt doit être postérieur ou égal à publishedAt",
    path: ["updatedAt"],
  })

export type JournalFrontmatter = z.infer<typeof journalFrontmatterSchema>

export type JournalArticle = JournalFrontmatter & {
  content: string
  filePath: string
  readingTime: string
}
