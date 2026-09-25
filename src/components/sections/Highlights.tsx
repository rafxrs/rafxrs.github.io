import { highlights, sections } from '../../data/content'
import type { Highlight } from '../../data/types'
import { cn } from '../../lib/cn'
import { Container } from '../layout/Container'
import { ArrowRightIcon } from '../ui/Icons'

/**
 * Asymmetric bento: the first tile spans two rows on large screens, the rest fill in around
 * it. Tiles beyond the fourth fall back to a plain span. The ribbon sits at the fold, so it
 * fades in on load (CSS, before hydration) rather than on scroll.
 */
const TILE_LAYOUT = [
  'sm:col-span-2 lg:col-span-5 lg:row-span-2',
  'sm:col-span-2 lg:col-span-7',
  'lg:col-span-3',
  'lg:col-span-4',
]

export function Highlights() {
  return (
    <section aria-labelledby="highlights-title" className="pb-8 sm:pb-12">
      <Container>
        <h2 id="highlights-title" className="sr-only">
          {sections.highlights.title}
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          {highlights.map((highlight, index) => (
            <li
              key={highlight.value}
              className={cn('flex animate-fade-up', TILE_LAYOUT[index] ?? 'lg:col-span-4')}
              style={{ animationDelay: `${380 + index * 70}ms` }}
            >
              <HighlightTile highlight={highlight} featured={index === 0} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function HighlightTile({ highlight, featured }: { highlight: Highlight; featured: boolean }) {
  const { value, unit, caption, link } = highlight
  return (
    <div
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded-2xl border p-6 transition-[border-color,transform] duration-300 motion-safe:hover:-translate-y-0.5 sm:p-7',
        featured
          ? 'justify-between border-accent-strong/25 bg-[linear-gradient(160deg,rgb(99_102_241/0.12),rgb(99_102_241/0.02)_55%)] hover:border-accent-strong/45'
          : 'border-line bg-surface hover:border-line-strong',
      )}
    >
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-fine [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]"
        />
      )}
      <div className="relative">
        <p
          className={cn(
            'font-semibold tracking-[-0.04em] text-fg',
            featured
              ? 'text-[clamp(2.75rem,14vw,3.75rem)] sm:text-7xl lg:text-[5.25rem] lg:leading-none'
              : 'text-[clamp(1.875rem,9vw,2.25rem)] sm:text-[2.75rem]',
          )}
        >
          {value}
          {unit && <span className="ml-2.5 text-lg font-medium tracking-tight text-fg-muted sm:text-xl">{unit}</span>}
        </p>
        <p className={cn('mt-4 text-sm leading-relaxed text-pretty text-fg-muted', featured && 'max-w-sm sm:text-[15px]')}>
          {caption}
        </p>
      </div>
      {link && (
        <a
          href={link.href}
          className="group relative mt-8 inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-medium text-accent"
        >
          {link.label}
          <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  )
}
