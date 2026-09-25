import { profile } from '../../data/content'
import { assetUrl, hasAsset } from '../../lib/assets'
import { cn } from '../../lib/cn'
import { Container } from '../layout/Container'
import { ButtonLink } from '../ui/ButtonLink'
import { ArrowRightIcon, FileTextIcon, MapPinIcon } from '../ui/Icons'
import { SocialLinks } from '../ui/SocialLinks'
import { FocusTyper } from './FocusTyper'

const cvHref = profile.cv && hasAsset(profile.cv) ? assetUrl(profile.cv) : null

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-28 pb-14 sm:pt-36 sm:pb-20">
      <HeroBackdrop />
      <Container>
        {profile.availability && (
          <p className="inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-line-strong bg-white/[0.03] py-1.5 pr-3.5 pl-3 text-[13px] text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] backdrop-blur-sm">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-positive" />
              <span className="relative size-2 rounded-full bg-positive shadow-[0_0_10px_2px_rgb(74_222_128/0.55)]" />
            </span>
            {profile.availability}
          </p>
        )}

        <h1
          id="hero-title"
          className="mt-7 text-[clamp(2.75rem,1.3rem+6.4vw,5.75rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-balance"
        >
          <span className="block text-fg">{profile.name}</span>
          <span className="block text-fg-subtle">{profile.role}</span>
        </h1>

        <p
          className="mt-6 flex animate-fade-up flex-wrap items-center gap-x-3 gap-y-1.5 text-[15px] text-fg-muted sm:text-base"
          style={{ animationDelay: '80ms' }}
        >
          <span>{profile.affiliation}</span>
          <span aria-hidden="true" className="hidden text-fg-subtle/50 sm:inline">
            /
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPinIcon className="size-4 text-fg-subtle" />
            {profile.location}
          </span>
        </p>

        <FocusTyper areas={profile.focusAreas} className="animate-fade-up" style={{ animationDelay: '140ms' }} />

        <p
          className="mt-6 max-w-2xl animate-fade-up text-lg leading-relaxed text-pretty text-fg-muted sm:text-xl sm:leading-relaxed"
          style={{ animationDelay: '200ms' }}
        >
          {profile.pitch}
        </p>

        <div
          className="mt-9 grid animate-fade-up grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center"
          style={{ animationDelay: '260ms' }}
        >
          <ButtonLink href="#work" variant="primary" className="group col-span-2">
            View Work
            <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </ButtonLink>
          {cvHref && (
            <ButtonLink href={cvHref} external type="application/pdf" variant="secondary">
              <FileTextIcon className="size-4" />
              Download CV
            </ButtonLink>
          )}
          <ButtonLink
            href="#contact"
            variant="secondary"
            className={cn(
              !cvHref && 'col-span-2',
              // A bordered button on phones, where it sits beside "Download CV"; a quiet text button from sm up.
              'sm:border-transparent sm:bg-transparent sm:text-fg-muted sm:hover:border-transparent sm:hover:bg-white/[0.06] sm:hover:text-fg',
            )}
          >
            Contact
          </ButtonLink>
        </div>

        <SocialLinks className="mt-10 animate-fade-up" style={{ animationDelay: '320ms' }} />
      </Container>
    </section>
  )
}

/** Grid lines fading out from the top right, with a faint indigo light. Purely decorative. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_75%_65%_at_70%_0%,#000_25%,transparent_75%)]" />
      <div className="absolute -top-56 right-[-12%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(99_102_241/0.16),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-canvas" />
    </div>
  )
}
