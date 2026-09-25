/**
 * Last step of `npm run build`, after the client build (dist/) and the server build (dist-ssr/):
 *
 * 1. Renders the app into dist/index.html, so content and layout arrive with the first response
 *    (faster first paint, crawlable text); React then hydrates it in the browser.
 * 2. Inlines the stylesheet (about 10 KB gzipped), saving a round trip before first paint.
 * 3. Writes dist/404.html — GitHub Pages serves it for unknown paths.
 * 4. Writes robots.txt and sitemap.xml from the site URL in src/data/content.ts.
 * 5. Deletes the temporary server bundle.
 */
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const PLACEHOLDER = '<!--app-html-->'

const { render, renderNotFound, site } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

// Replacements use functions so "$&"-style patterns in content are never interpreted.
const replace = (html, search, value) => html.replace(search, () => value)

async function inlineStylesheets(html) {
  for (const [tag, href] of html.matchAll(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)) {
    const css = await readFile(path.join(distDir, 'assets', path.basename(href)), 'utf8')
    html = replace(html, tag, `<style>${css}</style>`)
  }
  return html
}

const template = await inlineStylesheets(await readFile(path.join(distDir, 'index.html'), 'utf8'))
if (!template.includes(PLACEHOLDER)) {
  throw new Error(`dist/index.html has no ${PLACEHOLDER} placeholder to render into.`)
}

await writeFile(path.join(distDir, 'index.html'), replace(template, PLACEHOLDER, render()))

// The 404 page reuses the styles and fonts but ships no JavaScript and isn't indexed.
let notFound = replace(template, PLACEHOLDER, renderNotFound())
notFound = notFound
  .replace(/<script type="module"[^>]*><\/script>\s*/g, '')
  .replace(/<link rel="modulepreload"[^>]*>\s*/g, '')
  .replace(/<link rel="canonical"[^>]*>\s*/, '')
  .replace(/<title>[^<]*<\/title>/, '<title>Page not found</title>')
  .replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>')
await writeFile(path.join(distDir, '404.html'), notFound)

await writeFile(
  path.join(distDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`,
)
await writeFile(
  path.join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site.url}/</loc></url>
</urlset>
`,
)

await rm(ssrDir, { recursive: true, force: true })
console.log('✓ Prerendered index.html and 404.html, wrote robots.txt and sitemap.xml')
