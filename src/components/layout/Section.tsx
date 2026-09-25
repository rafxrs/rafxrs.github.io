import type { ReactNode } from 'react'
import type { SectionCopy } from '../../data/types'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import { Container } from './Container'

interface SectionProps {
  id: string
  copy: SectionCopy
  children: ReactNode
  className?: string
}

/** A page section with a consistent heading block; the heading names the landmark. */
export function Section({ id, copy, children, className }: SectionProps) {
  const titleId = `${id}-title`
  return (
    <section id={id} aria-labelledby={titleId} className={cn('scroll-mt-16 py-20 sm:py-24', className)}>
      <Container>
        <Reveal>
          <div className="mb-10 max-w-3xl sm:mb-14">
            {copy.eyebrow && (
              <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.16em] text-accent uppercase">
                <span aria-hidden="true" className="h-px w-6 bg-accent-strong/60" />
                {copy.eyebrow}
              </p>
            )}
            <h2
              id={titleId}
              className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance text-fg sm:text-[2.5rem] sm:leading-[1.1]"
            >
              {copy.title}
            </h2>
            {copy.intro && (
              <p className="mt-4 text-base leading-relaxed text-pretty text-fg-muted sm:text-lg">{copy.intro}</p>
            )}
          </div>
        </Reveal>
        {children}
      </Container>
    </section>
  )
}
