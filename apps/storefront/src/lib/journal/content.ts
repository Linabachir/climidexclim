import "server-only"

import fs from "node:fs"
import path from "node:path"

import matter from "gray-matter"
import readingTime from "reading-time"

import {
  journalFrontmatterSchema,
  journalSilos,
  type JournalArticle,
} from "./schema"

function resolveJournalDirectory() {
  const candidates = [
    path.join(process.cwd(), "content", "journal"),
    path.join(process.cwd(), "..", "..", "content", "journal"),
  ]

  return candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0]
}

export const JOURNAL_DIRECTORY = resolveJournalDirectory()

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

function parseArticle(filePath: string): JournalArticle {
  const source = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(source)
  const frontmatter = journalFrontmatterSchema.parse(data)

  return {
    ...frontmatter,
    content,
    filePath,
    readingTime: getReadingTime(content),
  }
}

export function getAllArticles(): JournalArticle[] {
  return findMdxFiles(JOURNAL_DIRECTORY)
    .map(parseArticle)
    .filter((article) => article.status !== "draft")
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return getAllArticles().find((article) => article.slug === slug)
}

export function getArticlesBySilo(
  silo: (typeof journalSilos)[number]
): JournalArticle[] {
  return getAllArticles().filter((article) => article.silo === silo)
}

export function getRelatedArticles(
  article: JournalArticle,
  limit = 3
): JournalArticle[] {
  const articles = getAllArticles().filter(
    (candidate) => candidate.slug !== article.slug
  )
  const explicit = article.relatedSlugs
    .map((slug) => articles.find((candidate) => candidate.slug === slug))
    .filter((candidate): candidate is JournalArticle => Boolean(candidate))
  const fallback = articles.filter(
    (candidate) =>
      candidate.silo === article.silo &&
      !explicit.some((selected) => selected.slug === candidate.slug)
  )

  return [...explicit, ...fallback].slice(0, limit)
}

export function getSiloTree() {
  const articles = getAllArticles()

  return journalSilos.map((silo) => ({
    silo,
    hub: articles.find(
      (article) => article.silo === silo && article.type === "hub"
    ),
    pillars: articles.filter(
      (article) => article.silo === silo && article.type === "pillar"
    ),
    satellites: articles.filter(
      (article) => article.silo === silo && article.type === "satellite"
    ),
  }))
}

export function getReadingTime(content: string): string {
  const minutes = Math.max(1, Math.ceil(readingTime(content).minutes))
  return `${minutes} min de lecture`
}

export function getArticlePath(article: JournalArticle): string {
  return article.type === "hub"
    ? `/journal/${article.slug}`
    : `/journal/${article.silo}/${article.slug}`
}
