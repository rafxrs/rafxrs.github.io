import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

/** Decorative by default: every icon is paired with visible or screen-reader text. */
function StrokeIcon({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

function FillIcon({ children, viewBox = '0 0 24 24', ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg viewBox={viewBox} fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      {children}
    </svg>
  )
}

export const GitHubIcon = (props: IconProps) => (
  <FillIcon viewBox="0 0 16 16" {...props}>
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
  </FillIcon>
)

export const LinkedInIcon = (props: IconProps) => (
  <FillIcon {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0h.01Z" />
  </FillIcon>
)

export const MailIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m3.5 7.5 8.5 6 8.5-6" />
  </StrokeIcon>
)

export const ArrowRightIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </StrokeIcon>
)

export const ArrowUpRightIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </StrokeIcon>
)

export const ArrowDownIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </StrokeIcon>
)

export const ArrowUpIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </StrokeIcon>
)

export const FileTextIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </StrokeIcon>
)

export const PackageIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="m21 8-9-5-9 5v8l9 5 9-5V8Z" />
    <path d="m3 8 9 5 9-5M12 13v8" />
  </StrokeIcon>
)

export const ChevronDownIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="m6 9 6 6 6-6" />
  </StrokeIcon>
)

export const MenuIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </StrokeIcon>
)

export const CloseIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </StrokeIcon>
)

export const LockIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </StrokeIcon>
)

export const CopyIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </StrokeIcon>
)

export const CheckIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </StrokeIcon>
)

export const XIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="m7 7 10 10M17 7 7 17" />
  </StrokeIcon>
)

export const DotIcon = (props: IconProps) => (
  <FillIcon {...props}>
    <circle cx="12" cy="12" r="4" />
  </FillIcon>
)

export const AlertIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5M12 16.25h.01" />
  </StrokeIcon>
)

export const MapPinIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M12 21s-6.5-5.6-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.25" />
  </StrokeIcon>
)

export const PauseIcon = (props: IconProps) => (
  <FillIcon {...props}>
    <rect x="6.5" y="5" width="4" height="14" rx="1.25" />
    <rect x="13.5" y="5" width="4" height="14" rx="1.25" />
  </FillIcon>
)

export const PlayIcon = (props: IconProps) => (
  <FillIcon {...props}>
    <path d="M8 5.8v12.4a1 1 0 0 0 1.52.85l10.2-6.2a1 1 0 0 0 0-1.7L9.52 4.95A1 1 0 0 0 8 5.8Z" />
  </FillIcon>
)

export const SpinnerIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M21 12a9 9 0 1 1-6.22-8.56" />
  </StrokeIcon>
)
