import { m } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Gentle fade/slide-in the first time an element scrolls into view. With reduced motion,
 * MotionConfig (see MotionProvider) drops the movement. The data-reveal attribute lets the
 * <noscript> style in index.html and the print stylesheet show content without JavaScript.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.div>
  )
}
