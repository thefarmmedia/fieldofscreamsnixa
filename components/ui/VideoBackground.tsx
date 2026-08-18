'use client'
import { useEffect, useState } from 'react'

// Real event-footage background, used behind a hero. Falls back to a
// static poster frame on mobile, when the visitor prefers reduced motion,
// or on a metered/data-saver connection — video is a real cost, not
// something to force on everyone by default.
export default function VideoBackground({
  src,
  poster,
  className,
}: {
  src: string
  poster: string
  className?: string
}) {
  const [canPlayVideo, setCanPlayVideo] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = window.innerWidth >= 768
    const saveData = (navigator as any).connection?.saveData === true
    if (!prefersReducedMotion && isDesktop && !saveData) {
      setCanPlayVideo(true)
    }
  }, [])

  return (
    <div className={className} aria-hidden="true">
      {canPlayVideo ? (
        <video autoPlay muted loop playsInline preload="auto" poster={poster}>
          <source src={src.replace(/\.mp4$/, '.webm')} type="video/webm" />
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" />
      )}
    </div>
  )
}
