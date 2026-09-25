import { experience, sections } from '../../data/content'
import type { ExperienceEntry } from '../../data/types'
import { cn } from '../../lib/cn'
import { Section } from '../layout/Section'
import { ArrowRightIcon } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'

const KIND_LABELS: Record<ExperienceEntry['kind'], string> = {
  education: 'Education',
  research: 'Research',
  industry: 'Industry',
  teaching: 'Teaching',
}

export function Experience() {
  return (
    <Section id="experience" copy={sections.experience}>
      <ol className="max-w-4xl">
        {experience.map((entry, index) => {
          const last = index === experience.length - 1
          return (
            <li key={`${entry.role}-${entry.dates}`}>
              <Reveal className="grid md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10">
                <p className="hidden pt-1 text-right font-mono text-xs leading-5 text-fg-subtle md:block">{entry.dates}</p>

                <div className={cn('relative pl-8', !last && 'pb-12')}>
                  {!last && <span aria-hidden="true" className="absolute top-4 bottom-0 left-[4px] w-px bg-line-strong" />}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-1.5 left-0 size-[9px] rounded-full ring-4 ring-canvas',
                      index === 0 ? 'bg-accent shadow-[0_0_12px_rgb(129_140_248/0.7)]' : 'bg-fg-subtle/70',
                    )}
                  />

                  <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-fg-subtle uppercase">
                    {KIND_LABELS[entry.kind]}
                    <span className="md:hidden"> · {entry.dates}</span>
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">{entry.role}</h3>
                  <p className="mt-1 text-[15px] text-fg-muted">
                    {entry.org}
                    {entry.location && <span className="text-fg-subtle"> · {entry.location}</span>}
                  </p>

                  {entry.points && entry.points.length > 0 && (
                    <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-fg-muted">
                      {entry.points.map((point) => (
                        <li key={point} className="relative pl-5 text-pretty">
                          <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-2.5 bg-fg-subtle/60" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}

                  {entry.link && (
                    <a
                      href={entry.link.href}
                      className="group mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-accent"
                    >
                      {entry.link.label}
                      <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </a>
                  )}
                </div>
              </Reveal>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
