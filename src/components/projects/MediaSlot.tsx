import type { ImageMedia, Media } from '../../data/types'
import { assetUrl, hasAsset } from '../../lib/assets'
import { cn } from '../../lib/cn'
import { ExternalLink } from '../ui/ExternalLink'
import { ArrowUpRightIcon } from '../ui/Icons'
import { LazyVideo } from './LazyVideo'

function isAvailable(media: Media): boolean {
  return media.kind === 'video'
    ? hasAsset(media.poster) && media.sources.some((source) => hasAsset(source.src))
    : hasAsset(media.src)
}

/** The file a placeholder is waiting for, for the TODO marker. */
function expectedFile(media: Media): string {
  if (media.kind === 'image') return media.src
  return hasAsset(media.poster) ? (media.sources[0]?.src ?? media.poster) : media.poster
}

function aspectRatio(media: Media): string {
  return media.width && media.height ? `${media.width} / ${media.height}` : '16 / 10'
}

/**
 * A project's image or video — or, while the file is missing from /public, a placeholder slot
 * instead of a broken image.
 *
 * Extension point: an interactive in-browser demo (e.g. an ONNX export run with onnxruntime-web)
 * can be added as a new Media kind in data/types.ts, rendered here through a lazily imported
 * component so it costs nothing until a visitor reaches it.
 */
export function MediaSlot({ media, className }: { media: Media; className?: string }) {
  if (!isAvailable(media)) return <MediaPlaceholder media={media} className={className} />
  return (
    <figure className={className}>
      {media.kind === 'video' ? <LazyVideo media={media} /> : <ImageFrame media={media} />}
      <MediaCaption media={media} />
    </figure>
  )
}

function ImageFrame({ media }: { media: ImageMedia }) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-surface-raised"
      style={{ backgroundColor: media.background, aspectRatio: aspectRatio(media) }}
    >
      <img
        src={assetUrl(media.src)}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading="lazy"
        decoding="async"
        className="block size-full object-contain"
      />
    </div>
  )
}

function MediaCaption({ media }: { media: Media }) {
  const fullSize = media.kind === 'image' && media.fullSize && hasAsset(media.fullSize) ? media.fullSize : null
  if (!media.caption && !fullSize) return null
  return (
    <figcaption className="mt-3 flex flex-col gap-2 text-xs leading-relaxed text-fg-subtle sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      {media.caption && <span className="text-pretty">{media.caption}</span>}
      {fullSize && (
        <ExternalLink
          href={assetUrl(fullSize)}
          className="inline-flex shrink-0 items-center gap-1 rounded-sm font-medium text-fg-muted transition-colors hover:text-fg"
        >
          Original plot
          <ArrowUpRightIcon className="size-3.5" />
        </ExternalLink>
      )}
    </figcaption>
  )
}

function MediaPlaceholder({ media, className }: { media: Media; className?: string }) {
  return (
    // TODO(content): this slot is waiting for a file in /public — see the TODO next to this media
    // entry in src/data/content.ts. It turns into the real image as soon as the file exists.
    <div
      aria-hidden="true"
      data-missing-media={expectedFile(media)}
      className={cn('relative overflow-hidden rounded-xl border border-line bg-surface-raised', className)}
      style={{ aspectRatio: aspectRatio(media) }}
    >
      {media.placeholder === 'chessboard' ? (
        // An 8×8 board receding in perspective, fading into the frame.
        <div className="absolute inset-0 [perspective:640px]">
          <div
            className="absolute top-[38%] left-1/2 aspect-square w-[118%] -translate-x-1/2 [transform-origin:50%_0%] [transform:rotateX(62deg)]"
            style={{
              background:
                'repeating-conic-gradient(rgb(129 140 248 / 0.16) 0 25%, rgb(255 255 255 / 0.025) 0 50%) 0 0 / 25% 25%',
              maskImage: 'radial-gradient(ellipse 55% 60% at 50% 18%, #000 25%, transparent 72%)',
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_40%,rgb(99_102_241/0.12),transparent)]" />
      {import.meta.env.DEV && (
        <p className="absolute inset-x-3 bottom-3 rounded-md border border-dashed border-warning/60 bg-canvas/85 px-2.5 py-1.5 font-mono text-[11px] text-warning">
          TODO: add public{expectedFile(media)}
        </p>
      )}
    </div>
  )
}
