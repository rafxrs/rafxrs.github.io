/**
 * Small build-time plugins for the portfolio:
 *
 * - publicAssets: exposes the list of files in /public as `virtual:public-assets`, so the UI can
 *   hide a CV button or show a marked placeholder instead of linking to a file that isn't there.
 * - siteMeta: writes <title>, description, canonical URL, Open Graph / Twitter tags and JSON-LD
 *   from src/data/content.ts, and warns about referenced files missing from /public.
 * - preloadFonts: preloads the above-the-fold font file so text renders in the final face sooner.
 */
import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import type { HtmlTagDescriptor, Plugin, ResolvedConfig } from 'vite'
import { contactLinks, profile, projects, site } from '../src/data/content.ts'

const PUBLIC_ASSETS_ID = 'virtual:public-assets'
const RESOLVED_PUBLIC_ASSETS_ID = '\0' + PUBLIC_ASSETS_ID

/** Social preview image, relative to /public. Recommended size: 1200 × 630. */
const OG_IMAGE = '/og-image.png'

function listPublicFiles(dir: string, root = dir): string[] {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listPublicFiles(full, root)
    return ['/' + path.relative(root, full).split(path.sep).join('/')]
  })
}

function publicFileExists(publicDir: string, file: string): boolean {
  return existsSync(path.join(publicDir, file.replace(/^\//, '')))
}

function escapeText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export function publicAssets(): Plugin {
  let publicDir = ''
  return {
    name: 'portfolio:public-assets',
    configResolved(config) {
      publicDir = config.publicDir
    },
    resolveId(id) {
      if (id === PUBLIC_ASSETS_ID) return RESOLVED_PUBLIC_ASSETS_ID
    },
    load(id) {
      if (id !== RESOLVED_PUBLIC_ASSETS_ID) return
      return `export default new Set(${JSON.stringify(listPublicFiles(publicDir))})`
    },
    configureServer(server) {
      // Adding or removing a file in /public refreshes the list without restarting the dev server.
      const refresh = (file: string) => {
        if (!file.startsWith(publicDir)) return
        for (const environment of Object.values(server.environments)) {
          const mod = environment.moduleGraph.getModuleById(RESOLVED_PUBLIC_ASSETS_ID)
          if (mod) environment.moduleGraph.invalidateModule(mod)
        }
        server.ws.send({ type: 'full-reload' })
      }
      server.watcher.on('add', refresh)
      server.watcher.on('unlink', refresh)
    },
  }
}

/** Every /public file that content.ts points at. */
function referencedAssets(): string[] {
  const files = profile.cv ? [profile.cv] : []
  for (const project of projects) {
    const { media } = project
    if (media?.kind === 'video') files.push(media.poster, ...media.sources.map((source) => source.src))
    if (media?.kind === 'image') files.push(media.src, ...(media.fullSize ? [media.fullSize] : []))
    const figure = project.details.resultsFigure
    if (figure) files.push(figure.src, ...(figure.fullSize ? [figure.fullSize] : []))
  }
  return files
}

function headTags(publicDir: string): HtmlTagDescriptor[] {
  const url = `${site.url}/`
  const hasOgImage = publicFileExists(publicDir, OG_IMAGE)
  const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({
    tag: 'meta',
    attrs,
    injectTo: 'head',
  })

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url,
    jobTitle: profile.role,
    email: `mailto:${contactLinks.email}`,
    homeLocation: { '@type': 'Place', name: profile.location },
    knowsAbout: profile.focusAreas,
    sameAs: [contactLinks.github, contactLinks.linkedin],
  }

  const tags: HtmlTagDescriptor[] = [
    { tag: 'title', children: escapeText(site.title), injectTo: 'head' },
    meta({ name: 'description', content: site.description }),
    meta({ name: 'author', content: profile.name }),
    { tag: 'link', attrs: { rel: 'canonical', href: url }, injectTo: 'head' },
    meta({ property: 'og:type', content: 'website' }),
    meta({ property: 'og:site_name', content: profile.name }),
    meta({ property: 'og:url', content: url }),
    meta({ property: 'og:title', content: site.title }),
    meta({ property: 'og:description', content: site.description }),
    meta({ name: 'twitter:card', content: hasOgImage ? 'summary_large_image' : 'summary' }),
    meta({ name: 'twitter:title', content: site.title }),
    meta({ name: 'twitter:description', content: site.description }),
  ]

  // Only advertise a preview image that exists, so link previews never point at a 404.
  if (hasOgImage) {
    const image = `${site.url}${OG_IMAGE}`
    const alt = `${profile.name}, ${profile.role}`
    tags.push(
      meta({ property: 'og:image', content: image }),
      meta({ property: 'og:image:width', content: '1200' }),
      meta({ property: 'og:image:height', content: '630' }),
      meta({ property: 'og:image:alt', content: alt }),
      meta({ name: 'twitter:image', content: image }),
      meta({ name: 'twitter:image:alt', content: alt }),
    )
  }

  tags.push({
    tag: 'script',
    attrs: { type: 'application/ld+json' },
    // JSON can't contain a literal "</script>" once "<" is escaped.
    children: JSON.stringify(person).replace(/</g, '\\u003c'),
    injectTo: 'head',
  })
  return tags
}

export function siteMeta(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'portfolio:site-meta',
    configResolved(resolved) {
      config = resolved
    },
    buildStart() {
      // Only warn once, during the client build (not in the dev server, tests, or SSR build).
      if (config.command !== 'build' || config.build.ssr) return
      const missing = referencedAssets().filter((file) => !publicFileExists(config.publicDir, file))
      if (!publicFileExists(config.publicDir, OG_IMAGE)) missing.push(OG_IMAGE)
      for (const file of missing) {
        this.warn(
          `public${file} is missing. The site stays usable (the link is hidden or a placeholder is ` +
            `shown), but add the file or update src/data/content.ts.`,
        )
      }
    },
    transformIndexHtml() {
      return headTags(config.publicDir)
    },
  }
}

export function preloadFonts(patterns: RegExp[]): Plugin {
  let base = '/'
  return {
    name: 'portfolio:preload-fonts',
    apply: 'build',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return
        const links = Object.keys(ctx.bundle)
          .filter((file) => patterns.some((pattern) => pattern.test(file)))
          .map((file) => `<link rel="preload" href="${base + file}" as="font" type="font/woff2" crossorigin>`)
        // Right after the viewport tag: early enough for the preload scanner, after <meta charset>.
        return html.replace(/(<meta name="viewport"[^>]*>)/, `$1\n    ${links.join('\n    ')}`)
      },
    },
  }
}
