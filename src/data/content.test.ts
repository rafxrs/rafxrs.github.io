/**
 * Guards for src/data/content.ts, so later edits can't ship placeholder text, dead links, or
 * inconsistent numbers.
 */
import { describe, expect, it } from 'vitest'
import * as content from './content'

/** Every string value in the content, with its path, e.g. "projects.0.details.problem". */
function strings(value: unknown, path = ''): Array<[string, string]> {
  if (typeof value === 'string') return [[path, value]]
  if (Array.isArray(value)) return value.flatMap((item, index) => strings(item, `${path}.${index}`))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) => strings(item, path ? `${path}.${key}` : key))
  }
  return []
}

const allStrings = strings(content)

describe('content', () => {
  it('contains no placeholder text', () => {
    const placeholder = /\[ADD|\bTODO\b|\bTBD\b|lorem|ipsum|placeholder|xxx/i
    expect(allStrings.filter(([, text]) => placeholder.test(text))).toEqual([])
  })

  it('has no empty strings', () => {
    expect(allStrings.filter(([, text]) => text.trim() === '')).toEqual([])
  })

  it('only links to https URLs, mailto:, or in-page anchors', () => {
    const links = allStrings.filter(([path]) => /(href|url|sourceRepo|github|linkedin)$/.test(path))
    expect(links.length).toBeGreaterThan(0)
    for (const [path, href] of links) {
      expect(href, path).toMatch(/^(https:\/\/[^\s#]+|mailto:\S+@\S+|#[a-z][\w-]*)$/)
    }
  })

  it('has a plausible email address', () => {
    expect(content.contactLinks.email).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i)
  })

  it('uses unique project ids', () => {
    const ids = content.projects.map((project) => project.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('keeps evaluation tables internally consistent', () => {
    for (const project of content.projects) {
      for (const row of project.details.resultsTable?.rows ?? []) {
        const label = `${project.id}: ${row.opponent}`
        expect(row.wins + row.losses + row.ties, label).toBe(row.games)
        expect(row.ci95[0], label).toBeLessThanOrEqual(row.winRate)
        expect(row.ci95[1], label).toBeGreaterThanOrEqual(row.winRate)
      }
    }
  })

  it('references /public files by absolute path', () => {
    const files = allStrings.filter(([path]) => /(\.src|poster|fullSize|cv)$/.test(path))
    for (const [path, file] of files) expect(file, path).toMatch(/^\/[\w./-]+\.\w+$/)
  })
})
