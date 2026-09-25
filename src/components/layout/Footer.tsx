import { footer, profile, site } from '../../data/content'
import { ArrowUpIcon } from '../ui/Icons'
import { ExternalLink } from '../ui/ExternalLink'
import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-4 py-10 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {__BUILD_YEAR__} {profile.name}
        </p>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span>{footer.builtWith}</span>
          <ExternalLink
            href={site.sourceRepo}
            className="rounded-sm text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-fg-muted"
          >
            Source
          </ExternalLink>
          <a
            href="#top"
            className="inline-flex items-center gap-1 rounded-sm text-fg-muted transition-colors hover:text-fg"
          >
            Back to top
            <ArrowUpIcon className="size-3.5" />
          </a>
        </p>
      </Container>
    </footer>
  )
}
