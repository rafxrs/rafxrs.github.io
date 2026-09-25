/**
 * Renders the whole page the way the build's prerender step does and checks the HTML:
 * no broken in-page links, no leaked "undefined", and a heading outline without skipped levels.
 */
import { renderToString } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import App from './App'
import { nav } from './data/content'

const html = renderToString(<App />)
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]))

describe('prerendered page', () => {
  it('renders every navigation target', () => {
    for (const item of nav) expect(ids.has(item.sectionId), item.sectionId).toBe(true)
  })

  it('has no broken in-page links', () => {
    const anchors = [...html.matchAll(/href="#([^"]*)"/g)].map((match) => match[1])
    expect(anchors.length).toBeGreaterThan(0)
    expect(anchors.filter((id) => !ids.has(id))).toEqual([])
  })

  it('never renders an empty or placeholder link', () => {
    expect(html).not.toMatch(/href="(#|javascript:[^"]*)?"/)
  })

  it('points aria-controls and aria-labelledby at real elements', () => {
    const references = [...html.matchAll(/aria-(?:controls|labelledby|describedby)="([^"]+)"/g)].flatMap((match) =>
      match[1].split(/\s+/),
    )
    expect(references.filter((id) => !ids.has(id))).toEqual([])
  })

  it('does not leak undefined values into the markup', () => {
    expect(html).not.toMatch(/undefined|NaN|\[object Object\]/)
  })

  it('has exactly one h1 and no skipped heading levels', () => {
    const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((match) => Number(match[1]))
    expect(levels.filter((level) => level === 1)).toHaveLength(1)
    levels.forEach((level, index) => {
      if (index > 0) expect(level, `heading #${index + 1}`).toBeLessThanOrEqual(levels[index - 1] + 1)
    })
  })

  it('gives every image alt text', () => {
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) expect(tag).toMatch(/\salt="[^"]*"/)
  })
})
