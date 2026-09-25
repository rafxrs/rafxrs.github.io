import { research, sections } from '../../data/content'
import { Section } from '../layout/Section'
import { CodeNotPublic } from '../ui/CodeNotPublic'
import { Reveal } from '../ui/Reveal'
import { TagList } from '../ui/TagList'

export function Research() {
  return (
    <Section
      id="research"
      copy={sections.research}
      className="border-y border-line bg-[radial-gradient(ellipse_80%_60%_at_85%_0%,rgb(99_102_241/0.07),transparent_70%)]"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid-fine [mask-image:radial-gradient(ellipse_70%_80%_at_100%_0%,#000,transparent_75%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(129_140_248/0.8),transparent)]"
          />

          <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-12">
            <div className="lg:col-span-7">
              <p className="text-xl leading-snug font-medium tracking-[-0.015em] text-balance text-fg sm:text-2xl sm:leading-snug">
                {research.framing}
              </p>

              <div className="mt-9 border-t border-line pt-7">
                <h3 className="text-lg font-semibold tracking-tight text-fg">{research.role}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-fg-muted">{research.org}</p>
                <p className="mt-1.5 font-mono text-xs text-fg-subtle">{research.dates}</p>
              </div>

              <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-fg-muted">
                {research.points.map((point) => (
                  <li key={point} className="relative pl-5 text-pretty">
                    <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-2.5 bg-accent-strong/80" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-5">
              {research.stat && (
                <div className="rounded-2xl border border-accent-strong/25 bg-[linear-gradient(160deg,rgb(99_102_241/0.14),rgb(99_102_241/0.03)_60%)] p-6 sm:p-8">
                  <p className="text-6xl font-semibold tracking-[-0.045em] text-fg sm:text-7xl">{research.stat.value}</p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">{research.stat.label}</p>
                </div>
              )}
              <TagList tags={research.tags} label="Methods and tools" />
              {research.codeNotPublic && (
                <div>
                  <CodeNotPublic />
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
