import { cn } from '../../lib/cn'

interface TagListProps {
  tags: string[]
  /** Accessible name for the list, e.g. "Technologies". */
  label: string
  tone?: 'accent' | 'neutral'
  className?: string
}

export function TagList({ tags, label, tone = 'accent', className }: TagListProps) {
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className={cn(
            'rounded-full border px-2.5 py-1 text-xs leading-none font-medium',
            tone === 'accent'
              ? 'border-accent-strong/25 bg-accent-strong/10 text-accent'
              : 'border-line bg-white/[0.03] text-fg-muted',
          )}
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}
