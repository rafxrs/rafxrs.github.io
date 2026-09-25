import type { CSSProperties } from 'react'
import { contactLinks, profile } from '../../data/content'
import { cn } from '../../lib/cn'
import { ExternalLink } from './ExternalLink'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

const iconButton =
  'grid size-10 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:bg-white/[0.05] hover:text-fg'

export function SocialLinks({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <ul aria-label="Profiles and email" className={cn('flex items-center gap-2', className)} style={style}>
      <li>
        <ExternalLink href={contactLinks.github} className={iconButton} title="GitHub">
          <GitHubIcon className="size-[18px]" />
          <span className="sr-only">{profile.name} on GitHub</span>
        </ExternalLink>
      </li>
      <li>
        <ExternalLink href={contactLinks.linkedin} className={iconButton} title="LinkedIn">
          <LinkedInIcon className="size-[17px]" />
          <span className="sr-only">{profile.name} on LinkedIn</span>
        </ExternalLink>
      </li>
      <li>
        <a href={`mailto:${contactLinks.email}`} className={iconButton} title="Email">
          <MailIcon className="size-[19px]" />
          <span className="sr-only">Email {contactLinks.email}</span>
        </a>
      </li>
    </ul>
  )
}
