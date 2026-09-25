import type { ReactNode } from 'react'
import type { Project } from '../../data/types'
import { cn } from '../../lib/cn'
import { ChevronDownIcon } from '../ui/Icons'
import { IterationTimeline } from './IterationTimeline'
import { MediaSlot } from './MediaSlot'
import { ResultsTable } from './ResultsTable'

interface ProjectDetailsProps {
  project: Project
  id: string
  open: boolean
  /** Whether the panel has been opened before; heavy media only mounts after that. */
  everOpened: boolean
  /** Flagship layout: a two-column write-up on large screens. */
  wide: boolean
  onCollapse: () => void
}

/**
 * The structured write-up behind a card's "Details" button. Sections without data are
 * omitted rather than shown empty.
 */
export function ProjectDetails({ project, id, open, everOpened, wide, onCollapse }: ProjectDetailsProps) {
  const { problem, approach, iterations, results, resultsTable, resultsFigure, limitations } = project.details
  const hasResults = Boolean(results?.length || resultsTable || resultsFigure)
  const span = (columns: string) => (wide ? columns : undefined)

  return (
    <div id={id} className="collapsible" data-open={open} inert={!open}>
      <div>
        <div className={cn('mt-8 grid grid-cols-1 gap-x-12 gap-y-10 border-t border-line pt-8', wide && 'lg:grid-cols-12')}>
          <DetailBlock title="Problem" className={span('lg:col-span-5')}>
            <p className="text-pretty">{problem}</p>
          </DetailBlock>

          <DetailBlock title="Approach" className={span('lg:col-span-7')}>
            <BulletList items={approach} />
          </DetailBlock>

          {iterations && iterations.length > 0 && (
            <DetailBlock title="Iteration history" className={span('lg:col-span-12')}>
              <IterationTimeline steps={iterations} />
            </DetailBlock>
          )}

          {hasResults && (
            <DetailBlock title="Results" className={span('lg:col-span-12')}>
              <div className="grid grid-cols-1 gap-8">
                {results && results.length > 0 && <BulletList items={results} className="max-w-3xl" />}
                {resultsTable && <ResultsTable table={resultsTable} id={`${id}-results`} />}
                {resultsFigure && everOpened && <MediaSlot media={resultsFigure} />}
              </div>
            </DetailBlock>
          )}

          {limitations && limitations.length > 0 && (
            <DetailBlock title="Limitations & Learnings" className={span('lg:col-span-12')}>
              <BulletList items={limitations} />
            </DetailBlock>
          )}

          <div className={span('lg:col-span-12')}>
            <button
              type="button"
              onClick={onCollapse}
              className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              <ChevronDownIcon className="size-4 rotate-180" />
              Collapse details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailBlock({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={cn('min-w-0', className)}>
      <h4 className="font-mono text-xs font-medium tracking-[0.14em] text-fg-subtle uppercase">{title}</h4>
      <div className="mt-4 text-[15px] leading-relaxed text-fg-muted">{children}</div>
    </div>
  )
}

function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <li key={item} className="relative pl-5 text-pretty">
          <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-2.5 bg-accent-strong/80" />
          {item}
        </li>
      ))}
    </ul>
  )
}
