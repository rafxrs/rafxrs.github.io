import { cn } from '../../lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium select-none transition-[background-color,border-color,color,box-shadow] duration-200 disabled:cursor-not-allowed disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-fill text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.4),0_8px_24px_-10px_rgb(99_102_241/0.7)] hover:bg-accent-fill-hover',
  secondary:
    'border border-line-strong bg-white/[0.04] text-fg hover:border-white/20 hover:bg-white/[0.08]',
  ghost: 'text-fg-muted hover:bg-white/[0.06] hover:text-fg',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-11 px-5 text-sm',
  sm: 'h-9 px-3.5 text-[13px]',
}

export function buttonClasses(variant: ButtonVariant = 'secondary', size: ButtonSize = 'md', className?: string) {
  return cn(base, variants[variant], sizes[size], className)
}
