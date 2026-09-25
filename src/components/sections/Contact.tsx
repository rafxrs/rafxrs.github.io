import { useEffect, useState } from 'react'
import { FORMSPREE_ENDPOINT } from '../../config'
import { contactLinks, sections } from '../../data/content'
import { cn } from '../../lib/cn'
import { Section } from '../layout/Section'
import { ExternalLink } from '../ui/ExternalLink'
import { ArrowUpRightIcon, CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../ui/Icons'
import { Reveal } from '../ui/Reveal'
import { ContactForm } from './ContactForm'

/** "https://github.com/rafxrs" → "github.com/rafxrs" */
const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

const rowClasses =
  'group flex min-h-[4.5rem] items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-line-strong hover:bg-surface-raised'
const iconTile = 'grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-fg-muted'

export function Contact() {
  return (
    <Section id="contact" copy={sections.contact} className="pb-28 sm:pb-36">
      <div className={cn('grid grid-cols-1 gap-8 lg:gap-12', FORMSPREE_ENDPOINT && 'lg:grid-cols-12')}>
        <Reveal className={cn(FORMSPREE_ENDPOINT && 'lg:col-span-5')}>
          <ul className={cn('grid grid-cols-1 gap-3', !FORMSPREE_ENDPOINT && 'md:grid-cols-3')}>
            <li>
              <ExternalLink href={contactLinks.github} className={rowClasses}>
                <span className={iconTile}>
                  <GitHubIcon className="size-[18px]" />
                </span>
                <LinkText label="GitHub" value={displayUrl(contactLinks.github)} />
                <ArrowUpRightIcon className="ml-auto size-4 shrink-0 text-fg-subtle transition-colors group-hover:text-fg" />
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={contactLinks.linkedin} className={rowClasses}>
                <span className={iconTile}>
                  <LinkedInIcon className="size-[17px]" />
                </span>
                <LinkText label="LinkedIn" value={displayUrl(contactLinks.linkedin)} />
                <ArrowUpRightIcon className="ml-auto size-4 shrink-0 text-fg-subtle transition-colors group-hover:text-fg" />
              </ExternalLink>
            </li>
            <li className="relative">
              <a href={`mailto:${contactLinks.email}`} className={cn(rowClasses, 'pr-16')}>
                <span className={iconTile}>
                  <MailIcon className="size-[19px]" />
                </span>
                <LinkText label="Email" value={contactLinks.email} />
              </a>
              <CopyEmailButton email={contactLinks.email} />
            </li>
          </ul>

          {!FORMSPREE_ENDPOINT && import.meta.env.DEV && (
            <p className="mt-6 rounded-lg border border-dashed border-warning/50 px-4 py-3 font-mono text-xs leading-relaxed text-warning">
              TODO: the contact form is hidden until FORMSPREE_FORM_ID is set in src/config.ts.
            </p>
          )}
        </Reveal>

        {FORMSPREE_ENDPOINT && (
          <Reveal className="lg:col-span-7" delay={0.08}>
            <ContactForm endpoint={FORMSPREE_ENDPOINT} />
          </Reveal>
        )}
      </div>
    </Section>
  )
}

function LinkText({ label, value }: { label: string; value: string }) {
  return (
    <span className="min-w-0">
      <span className="block text-sm font-medium text-fg">{label}</span>
      <span className="block truncate text-sm text-fg-muted">{value}</span>
    </span>
  )
}

function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const timer = window.setTimeout(() => setState('idle'), 2000)
    return () => window.clearTimeout(timer)
  }, [state])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setState('copied')
    } catch {
      setState('failed')
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="absolute top-1/2 right-4 grid size-9 -translate-y-1/2 place-items-center rounded-lg border border-line text-fg-muted transition-colors hover:border-line-strong hover:bg-white/[0.05] hover:text-fg"
      >
        {state === 'copied' ? <CheckIcon className="size-4 text-positive" /> : <CopyIcon className="size-4" />}
        <span className="sr-only">Copy email address</span>
      </button>
      <span role="status" className="sr-only">
        {state === 'copied' ? 'Email address copied' : state === 'failed' ? 'Couldn’t copy — select the address instead' : ''}
      </span>
    </>
  )
}
