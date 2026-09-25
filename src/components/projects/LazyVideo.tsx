import { useEffect, useRef, useState } from 'react'
import type { VideoMedia } from '../../data/types'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { assetUrl, hasAsset } from '../../lib/assets'
import { cn } from '../../lib/cn'
import { PauseIcon, PlayIcon } from '../ui/Icons'

/**
 * Muted, looping demo clip. The video only downloads once it nears the viewport and only plays
 * while on screen. Reduced-motion visitors see the poster with a play button instead of
 * autoplay, and everyone can pause (WCAG 2.2.2). The poster image carries the description for
 * screen readers; the video itself is decorative.
 */
export function LazyVideo({ media }: { media: VideoMedia }) {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const [near, setNear] = useState(false)
  const [onScreen, setOnScreen] = useState(false)
  const [choice, setChoice] = useState<'play' | 'pause' | null>(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)

  const wantsPlay = choice ? choice === 'play' : !reducedMotion
  const mountVideo = near && (wantsPlay || started)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true)
      },
      { rootMargin: '300px 0px' },
    )
    const screenObserver = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.25,
    })
    nearObserver.observe(frame)
    screenObserver.observe(frame)
    return () => {
      nearObserver.disconnect()
      screenObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (wantsPlay && onScreen) {
      // Browsers may still refuse (e.g. battery saver); the play button keeps working.
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [wantsPlay, onScreen, mountVideo])

  const ratio = media.width && media.height ? `${media.width} / ${media.height}` : '16 / 10'

  return (
    <div
      ref={frameRef}
      className="relative overflow-hidden rounded-xl border border-line bg-surface-raised"
      style={{ aspectRatio: ratio }}
    >
      <img
        src={assetUrl(media.poster)}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      {mountVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedMetadata={(event) => {
            const video = event.currentTarget
            if (media.startAt && video.currentTime < media.startAt) video.currentTime = media.startAt
          }}
          onPlaying={() => {
            setStarted(true)
            setPlaying(true)
          }}
          onPause={() => setPlaying(false)}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-500',
            started ? 'opacity-100' : 'opacity-0',
          )}
        >
          {media.sources
            .filter((source) => hasAsset(source.src))
            .map((source) => (
              <source key={source.src} src={assetUrl(source.src)} type={source.type} />
            ))}
        </video>
      )}
      <button
        type="button"
        onClick={() => setChoice(playing ? 'pause' : 'play')}
        className="absolute right-3 bottom-3 grid size-9 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80"
      >
        {playing ? <PauseIcon className="size-4" /> : <PlayIcon className="size-4" />}
        <span className="sr-only">{playing ? 'Pause demo video' : 'Play demo video'}</span>
      </button>
    </div>
  )
}
