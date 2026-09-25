import { useState } from 'react'
import { projects, sections } from '../../data/content'
import { cn } from '../../lib/cn'
import { Section } from '../layout/Section'
import { ProjectCard } from '../projects/ProjectCard'
import { Reveal } from '../ui/Reveal'

/**
 * Bento layout on large screens: the flagship spans the full width, then projects pair up in
 * alternating 5/7 and 7/5 columns. An unpaired last card takes the full width.
 */
function columnSpan(index: number, count: number): string {
  if (index === 0) return 'lg:col-span-12'
  const position = index - 1
  const unpaired = position % 2 === 0 && index === count - 1
  if (unpaired) return 'lg:col-span-12'
  const narrowFirst = Math.floor(position / 2) % 2 === 0
  const isFirstOfPair = position % 2 === 0
  return isFirstOfPair === narrowFirst ? 'lg:col-span-5' : 'lg:col-span-7'
}

export function Work() {
  const [openIds, setOpenIds] = useState<ReadonlySet<string>>(() => new Set())

  const setOpen = (id: string, open: boolean) =>
    setOpenIds((previous) => {
      const next = new Set(previous)
      if (open) next.add(id)
      else next.delete(id)
      return next
    })

  // Paired cards share a row height while closed; once one opens, its neighbour keeps its own
  // height instead of stretching to match.
  const pairedCardOpen = projects.slice(1).some((project) => openIds.has(project.id))

  return (
    <Section id="work" copy={sections.work}>
      <div className={cn('grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5', pairedCardOpen && 'lg:items-start')}>
        {projects.map((project, index) => (
          <Reveal key={project.id} className={cn('flex flex-col', columnSpan(index, projects.length))}>
            <ProjectCard
              project={project}
              wide={index === 0}
              open={openIds.has(project.id)}
              onOpenChange={(open) => setOpen(project.id, open)}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
