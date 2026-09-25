import type { AnchorHTMLAttributes } from 'react'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonStyles'
import { ExternalLink } from './ExternalLink'

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: ButtonVariant
  size?: ButtonSize
  /** Open in a new tab (for other sites and files like the CV). */
  external?: boolean
}

export function ButtonLink({ variant, size, external, className, children, ...props }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className)
  return external ? (
    <ExternalLink className={classes} {...props}>
      {children}
    </ExternalLink>
  ) : (
    <a className={classes} {...props}>
      {children}
    </a>
  )
}
