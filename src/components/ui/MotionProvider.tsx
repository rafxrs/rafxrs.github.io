import { LazyMotion, MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

const loadFeatures = () => import('../../lib/motion-features').then((mod) => mod.default)

/**
 * Framer Motion with the animation engine loaded lazily (smaller first download) and the
 * visitor's reduced-motion preference applied to every animation.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
