import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"

import { journalFrontmatterSchema } from "../src/lib/journal/schema"

const projectRoot = path.resolve(process.cwd(), "..", "..")
const journalDirectory = path.join(projectRoot, "content", "journal")

function findMdxFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return []

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = path.join(directory, entry.name)
    return entry.isDirectory()
      ? findMdxFiles(absolutePath)
      : entry.isFile() && entry.name.endsWith(".mdx")
      ? [absolutePath]
      : []
  })
}

const errors: string[] = []
const files = findMdxFiles(journalDirectory)

for (const filePath of files) {
  const relativePath = path.relative(projectRoot, filePath)

  try {
    const source = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(source)
    const frontmatter = journalFrontmatterSchema.parse(data)
    const containsPlaceholder = /<DataToConfirm\b|\[DONNÉE À CONFIRMER\]/.test(
      content
    )

    if (
      frontmatter.status === "published" &&
      (frontmatter.dataToConfirm.length > 0 || containsPlaceholder)
    ) {
      errors.push(
        `${relativePath}: un article publié contient une donnée à confirmer.`
      )
    }
  } catch (error) {
    errors.push(
      `${relativePath}: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

if (errors.length > 0) {
  console.error("\nValidation du Journal échouée:\n")
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`Journal validé: ${files.length} fichier(s) MDX contrôlé(s).`)
