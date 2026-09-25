import { useState, type CSSProperties } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTypewriter } from '../../hooks/useTypewriter'
import { cn } from '../../lib/cn'
import { PauseIcon, PlayIcon } from '../ui/Icons'

interface FocusTyperProps {
  areas: readonly string[]
  className?: string
  style?: CSSProperties
}

/**
 * Types through the focus areas. Screen readers get the full list once instead of every
 * keystroke; reduced-motion visitors see the full list without animation; everyone else can
 * pause it (WCAG 2.2.2). On phones the label sits on its own line, so a long word never
 * re-wraps the row mid-animation and shifts the content below.
 */
export function FocusTyper({ areas, className, style }: FocusTyperProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [paused, setPaused] = useState(false)
  const animate = !reducedMotion && areas.length > 1
  const { index, text } = useTypewriter(areas, animate && !paused)
  // When paused mid-word, show the whole word rather than a fragment.
  const shown = paused ? areas[index] : text

  return (
    <div className={cn('mt-8 flex flex-wrap items-center gap-x-3 gap-y-2', className)} style={style}>
      <div className="flex w-full items-center gap-3 sm:w-auto">
        <span className="font-mono text-xs font-medium tracking-[0.16em] text-fg-subtle uppercase">Focus</span>
        <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
      </div>
      <div className="flex min-h-8 items-center gap-2">
        <p className="text-base font-medium text-accent sm:text-lg">
          <span className="sr-only">{areas.join(', ')}</span>
          {animate ? (
            <span aria-hidden="true" className="whitespace-nowrap">
              {shown}
              <span
                className={cn(
                  'ml-0.5 inline-block h-[1.05em] w-[2px] rounded-full bg-accent align-[-0.15em]',
                  !paused && 'animate-caret',
                )}
              />
            </span>
          ) : (
            <span aria-hidden="true">{areas.join(' · ')}</span>
          )}
        </p>
        {animate && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            className="grid size-8 shrink-0 place-items-center rounded-md text-fg-subtle transition-colors hover:bg-white/[0.06] hover:text-fg"
          >
            {paused ? <PlayIcon className="size-3.5" /> : <PauseIcon className="size-3.5" />}
            <span className="sr-only">{paused ? 'Resume focus-area animation' : 'Pause focus-area animation'}</span>
          </button>
        )}
      </div>
    </div>
  )
}
