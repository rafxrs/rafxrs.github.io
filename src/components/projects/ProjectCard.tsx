import { useRef, useState } from 'react'
import type { Project, ProjectLink } from '../../data/types'
import { cn } from '../../lib/cn'
import { ButtonLink } from '../ui/ButtonLink'
import { CodeNotPublic } from '../ui/CodeNotPublic'
import { ArrowUpRightIcon, ChevronDownIcon, GitHubIcon, PackageIcon } from '../ui/Icons'
import { TagList } from '../ui/TagList'
import { MediaSlot } from './MediaSlot'
import { ProjectDetails } from './ProjectDetails'

interface ProjectCardProps {
  project: Project
  /** Flagship layout: media beside the text on large screens. */
  wide?: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
}

const LINK_ICONS: Record<ProjectLink['icon'], typeof GitHubIcon> = {
  github: GitHubIcon,
  package: PackageIcon,
  external: ArrowUpRightIcon,
}

export function ProjectCard({ project, wide = false, open, onOpenChange }: ProjectCardProps) {
  const [everOpened, setEverOpened] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const anchorId = `project-${project.id}`
  const titleId = `${anchorId}-title`
  const detailsId = `${anchorId}-details`

  const setOpen = (next: boolean) => {
    if (next) setEverOpened(true)
    onOpenChange(next)
  }

  return (
    <article
      id={anchorId}
      aria-labelledby={titleId}
      className={cn(
        'relative flex h-full scroll-mt-24 flex-col rounded-3xl border border-line bg-surface p-5 transition-[border-color,transform] duration-300 hover:border-line-strong sm:p-7',
        wide && 'lg:p-9',
        !open && 'motion-safe:hover:-translate-y-0.5',
      )}
    >
      <div className={cn('flex flex-1 flex-col gap-7', wide && 'lg:grid lg:grid-cols-12 lg:items-start lg:gap-10')}>
        {project.media && (
          <MediaSlot media={project.media} className={cn(wide && 'lg:order-last lg:col-span-7')} />
        )}

        <div className={cn('flex flex-1 flex-col', wide && 'h-full lg:col-span-5')}>
          {project.kicker && (
            <p className="font-mono text-xs font-medium tracking-[0.14em] text-accent uppercase">{project.kicker}</p>
          )}
          <h3
            id={titleId}
            className={cn(
              'mt-3 font-semibold tracking-[-0.025em] text-balance text-fg',
              wide ? 'text-2xl sm:text-[2rem] sm:leading-[1.15]' : 'text-xl sm:text-2xl',
            )}
          >
            {project.title}
          </h3>
          {project.context && <p className="mt-2 text-sm leading-relaxed text-fg-subtle">{project.context}</p>}
          <p className="mt-4 text-[15px] leading-relaxed text-pretty text-fg-muted sm:text-base">{project.summary}</p>

          {project.keyStats && project.keyStats.length > 0 && (
            <dl
              className={cn(
                'mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3',
                wide && 'lg:grid-cols-1',
              )}
            >
              {project.keyStats.map((stat) => (
                <div
                  key={stat.label}
                  className={cn(
                    'flex flex-col-reverse justify-end gap-1.5 bg-surface p-4',
                    wide && 'lg:flex-row-reverse lg:items-baseline lg:gap-4 lg:px-5 lg:py-3.5',
                  )}
                >
                  <dt className="text-xs leading-snug text-pretty text-fg-subtle">{stat.label}</dt>
                  <dd className={cn('text-2xl font-semibold tracking-tight text-fg', wide && 'lg:w-[5.25rem] lg:shrink-0')}>
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {project.keyResult && (
            <div className="mt-6 rounded-xl border border-line bg-white/[0.02] p-4 sm:p-5">
              <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-fg-subtle uppercase">Key result</p>
              <p className="mt-2 text-[15px] leading-relaxed text-pretty text-fg">{project.keyResult.text}</p>
              {project.keyResult.note && (
                <p className="mt-2 text-xs leading-relaxed text-fg-subtle">{project.keyResult.note}</p>
              )}
            </div>
          )}

          <TagList tags={project.tags} label={`Technologies used in ${project.title}`} className="mt-6" />

          <div className="mt-auto flex flex-wrap items-center gap-2 pt-7">
            {project.links?.map((link) => {
              const Icon = LINK_ICONS[link.icon]
              return (
                <ButtonLink key={link.href} href={link.href} external size="sm" variant="secondary">
                  <Icon className="size-4" />
                  {link.label}
                  <span className="sr-only">: {project.title}</span>
                </ButtonLink>
              )
            })}
            {project.codeNotPublic && <CodeNotPublic />}
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={detailsId}
              onClick={() => setOpen(!open)}
              className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium text-accent transition-colors hover:bg-accent-strong/10"
            >
              Details
              <span className="sr-only">: {project.title}</span>
              <ChevronDownIcon
                className={cn('size-4 transition-transform duration-300', open && 'rotate-180')}
              />
            </button>
          </div>
        </div>
      </div>

      <ProjectDetails
        project={project}
        id={detailsId}
        open={open}
        everOpened={everOpened}
        wide={wide}
        onCollapse={() => {
          setOpen(false)
          toggleRef.current?.focus()
        }}
      />
    </article>
  )
}
