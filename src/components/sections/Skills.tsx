import { sections, skills } from '../../data/content'
import { cn } from '../../lib/cn'
import { Section } from '../layout/Section'
import { Reveal } from '../ui/Reveal'
import { TagList } from '../ui/TagList'

/** Asymmetric bento for the first five groups; any extra groups fall back to thirds. */
const GROUP_LAYOUT = [
  'sm:col-span-2 lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-4',
  'lg:col-span-3',
  'sm:col-span-2 lg:col-span-5',
]

export function Skills() {
  return (
    <Section id="skills" copy={sections.skills}>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
        {skills.map((group, index) => (
          <li key={group.title} className={cn('flex', GROUP_LAYOUT[index] ?? 'lg:col-span-4')}>
            <Reveal delay={index * 0.05} className="flex w-full">
              <div className="relative w-full rounded-2xl border border-line bg-surface p-6 transition-[border-color,transform] duration-300 hover:border-line-strong motion-safe:hover:-translate-y-0.5 sm:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[15px] font-semibold tracking-tight text-fg">{group.title}</h3>
                  <span aria-hidden="true" className="font-mono text-[11px] text-fg-subtle">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <TagList tags={group.items} label={group.title} tone="neutral" className="mt-5" />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
