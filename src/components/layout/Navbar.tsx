import { useEffect, useRef, useState } from 'react'
import { nav, profile } from '../../data/content'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { assetUrl, hasAsset } from '../../lib/assets'
import { cn } from '../../lib/cn'
import { ExternalLink } from '../ui/ExternalLink'
import { CloseIcon, FileTextIcon, MenuIcon } from '../ui/Icons'
import { Container } from './Container'

const SECTION_IDS = nav.map((item) => item.sectionId)
const cvHref = profile.cv && hasAsset(profile.cv) ? assetUrl(profile.cv) : null

export function Navbar() {
  const scrolled = useScrolled()
  const activeSection = useActiveSection(SECTION_IDS)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Close the mobile menu on Escape, on a click outside the header, or when the viewport
  // grows into the desktop layout.
  useEffect(() => {
    if (!menuOpen) return
    const desktop = window.matchMedia('(min-width: 768px)')
    const close = () => setMenuOpen(false)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      close()
      menuButtonRef.current?.focus()
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close()
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    desktop.addEventListener('change', close)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      desktop.removeEventListener('change', close)
    }
  }, [menuOpen])

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300',
        scrolled || menuOpen
          ? 'border-line bg-canvas/80 backdrop-blur-xl backdrop-saturate-150'
          : 'border-transparent',
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-2.5 rounded-lg" onClick={() => setMenuOpen(false)}>
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-accent-fill text-[12px] font-semibold tracking-tight text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22)]"
          >
            {profile.initials}
          </span>
          <span className="text-sm font-medium tracking-tight text-fg">{profile.name}</span>
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const current = activeSection === item.sectionId
              return (
                <li key={item.sectionId}>
                  <a
                    href={`#${item.sectionId}`}
                    aria-current={current ? 'true' : undefined}
                    className={cn(
                      'rounded-md px-3 py-2 text-sm transition-colors',
                      current ? 'bg-white/[0.06] text-fg' : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {cvHref && (
            <ExternalLink
              href={cvHref}
              type="application/pdf"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-accent-strong/40 bg-accent-strong/10 px-3 text-[13px] font-medium text-accent transition-colors hover:border-accent-strong/70 hover:bg-accent-strong/20"
            >
              <FileTextIcon className="size-4" />
              CV<span className="sr-only"> (PDF)</span>
            </ExternalLink>
          )}
          <button
            ref={menuButtonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-lg text-fg-muted transition-colors hover:bg-white/[0.06] hover:text-fg md:hidden"
          >
            {menuOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </Container>

      <nav
        id="mobile-menu"
        aria-label="Main"
        inert={!menuOpen}
        className={cn(
          'overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <Container>
          <ul className="border-t border-line py-2">
            {nav.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={`#${item.sectionId}`}
                  onClick={() => setMenuOpen(false)}
                  aria-current={activeSection === item.sectionId ? 'true' : undefined}
                  className="flex min-h-12 items-center rounded-lg px-2 text-base text-fg-muted transition-colors hover:text-fg aria-[current=true]:text-fg"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </header>
  )
}
