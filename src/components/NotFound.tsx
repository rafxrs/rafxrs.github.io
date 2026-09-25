import { site } from '../data/content'
import { buttonClasses } from './ui/buttonStyles'
import { ArrowRightIcon } from './ui/Icons'

/** Rendered to a static dist/404.html at build time; needs no JavaScript. */
export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-dvh place-items-center overflow-hidden px-4">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000,transparent_75%)]"
      />
      <div className="max-w-md text-center">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-fg sm:text-4xl">This page doesn’t exist</h1>
        <p className="mt-4 text-fg-muted">The link may be mistyped, or the page may have moved.</p>
        <a href="/" className={buttonClasses('primary', 'md', 'group mt-8')}>
          Go to {site.url.replace(/^https?:\/\//, '')}
          <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </main>
  )
}
