import { about, otherWork, sections } from '../../data/content'
import { Section } from '../layout/Section'
import { ExternalLink } from '../ui/ExternalLink'
import { ArrowUpRightIcon } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'

export function About() {
  return (
    <Section id="about" copy={sections.about}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-7">
          <div className="space-y-5 text-lg leading-relaxed text-pretty text-fg-muted">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mt-10 font-mono text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase">
            Spoken languages
          </h3>
          <dl className="mt-4 flex flex-wrap gap-3">
            {about.languages.map(({ language, level }) => (
              <div key={language} className="min-w-28 rounded-xl border border-line bg-surface px-4 py-3">
                <dt className="text-[15px] font-medium text-fg">{language}</dt>
                <dd className="mt-0.5 text-sm text-fg-subtle">{level}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={0.08}>
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-7">
            <h3 className="font-mono text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase">Other work</h3>
            <ul className="mt-5 divide-y divide-line">
              {otherWork.map((item) => (
                <li key={item.title} className="py-4 first:pt-0 last:pb-0">
                  {item.href ? (
                    <ExternalLink
                      href={item.href}
                      className="group inline-flex items-start gap-1.5 rounded-sm text-[15px] font-medium text-fg transition-colors hover:text-accent"
                    >
                      {item.title}
                      <ArrowUpRightIcon className="mt-[3px] size-3.5 shrink-0 text-fg-subtle transition-colors group-hover:text-accent" />
                    </ExternalLink>
                  ) : (
                    <p className="text-[15px] font-medium text-fg">{item.title}</p>
                  )}
                  {item.description && (
                    <p className="mt-1 text-sm leading-relaxed text-pretty text-fg-muted">{item.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
