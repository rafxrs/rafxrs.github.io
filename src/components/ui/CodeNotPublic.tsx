import { LockIcon } from './Icons'

/** Stands in for a repo button on research work whose code isn't public. */
export function CodeNotPublic() {
  return (
    <p className="inline-flex h-9 items-center gap-2 rounded-lg border border-dashed border-line-strong px-3.5 text-[13px] text-fg-subtle">
      <LockIcon className="size-3.5" />
      Research · code not public
    </p>
  )
}
