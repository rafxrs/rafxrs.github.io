import type { IterationStep } from '../../data/types'
import { cn } from '../../lib/cn'
import { CheckIcon, DotIcon, XIcon } from '../ui/Icons'

const VERDICTS: Record<IterationStep['verdict'], { label: string; marker: string; text: string; Icon: typeof CheckIcon }> = {
  negative: {
    label: 'Negative result',
    marker: 'border-line-strong bg-surface-raised text-fg-subtle',
    text: 'text-fg-subtle',
    Icon: XIcon,
  },
  control: {
    label: 'Control',
    marker: 'border-accent-strong/50 bg-accent-strong/10 text-accent',
    text: 'text-accent',
    Icon: DotIcon,
  },
  positive: {
    label: 'Positive result',
    marker: 'border-positive/40 bg-positive/10 text-positive',
    text: 'text-positive',
    Icon: CheckIcon,
  },
}

/** The experimental path, in order — including the runs that didn't work. */
export function IterationTimeline({ steps }: { steps: IterationStep[] }) {
  return (
    <ol className="relative">
      {steps.map((step, index) => {
        const verdict = VERDICTS[step.verdict]
        const last = index === steps.length - 1
        return (
          <li key={step.step} className="relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-4 pb-6 last:pb-0 sm:grid-cols-[1.75rem_10rem_minmax(0,1fr)]">
            {!last && <span aria-hidden="true" className="absolute top-8 bottom-1 left-[0.875rem] w-px -translate-x-1/2 bg-line-strong" />}
            <span
              aria-hidden="true"
              className={cn('relative mt-0.5 grid size-7 place-items-center rounded-full border', verdict.marker)}
            >
              <verdict.Icon className="size-3.5" />
            </span>
            <div className="pt-1">
              <p className="font-mono text-[13px] font-medium text-fg">{step.step}</p>
              <p className={cn('mt-0.5 text-xs', verdict.text)}>{verdict.label}</p>
            </div>
            <div className="col-start-2 mt-2 sm:col-start-3 sm:mt-0 sm:pt-1">
              <p className="text-[15px] leading-relaxed text-fg-muted">{step.change}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-fg">
                <span className="text-fg-subtle">Outcome: </span>
                {step.outcome}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
