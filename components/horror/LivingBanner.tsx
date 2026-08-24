'use client'

import { useEffect, useRef } from 'react'

/**
 * The Field of Screams banner, brought to life.
 *
 * Same composition as the printed banner — dark pines, teal ground fog,
 * four wraiths flanking the wordmark — but every element is its own layer
 * so it drifts, breathes and reacts to the pointer instead of sitting
 * still. This is the first thing a visitor sees, before the walk begins.
 *
 * The wraith art carries real feathered alpha (no fully-opaque pixels),
 * so the sprites composite directly. No blend-mode tricks, which is what
 * previously produced visible boxes on real devices.
 */

type Wraith = {
  src: string
  /** CSS positioning for the sprite's box */
  style: React.CSSProperties
  /** Parallax depth: higher = moves more with the pointer (reads nearer) */
  depth: number
  /** Seconds for one full drift cycle */
  drift: number
  /** Phase offset so they never move in unison */
  delay: number
}

const WRAITHS: Wraith[] = [
  {
    src: '/images/wraiths/wraith-1.webp',
    style: { left: '2%', bottom: '-6%', height: '68%' },
    depth: 26,
    drift: 17,
    delay: 0,
  },
  {
    src: '/images/wraiths/wraith-2.webp',
    style: { left: '16%', top: '1%', height: '44%' },
    depth: 14,
    drift: 21,
    delay: -6,
  },
  {
    src: '/images/wraiths/wraith-3.webp',
    style: { right: '14%', top: '0%', height: '48%' },
    depth: 16,
    drift: 19,
    delay: -11,
  },
  {
    src: '/images/wraiths/wraith-4.webp',
    style: { right: '-2%', bottom: '-4%', height: '64%' },
    depth: 24,
    drift: 23,
    delay: -3,
  },
]

export default function LivingBanner({ children }: { children?: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null)

  // Pointer parallax. Written straight to CSS custom properties via rAF so
  // this never triggers a React render while the pointer moves.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let x = 0
    let y = 0
    const apply = () => {
      el.style.setProperty('--px', String(x))
      el.style.setProperty('--py', String(y))
      raf = 0
    }
    const onMove = (e: PointerEvent) => {
      x = (e.clientX / window.innerWidth) * 2 - 1
      y = (e.clientY / window.innerHeight) * 2 - 1
      if (!raf) raf = requestAnimationFrame(apply)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="living-banner" ref={rootRef}>
      {/* Every visual layer lives in one wrapper so its bottom edge can be
          masked as a unit — that hard cut where the banner met the page was
          the line under the hero. Content stays outside the wrapper so the
          wordmark and CTAs are never faded. */}
      <div className="lb-scene" aria-hidden="true">
      <div className="lb-plate" aria-hidden="true" />

      {WRAITHS.map((w, i) => (
        <div
          key={w.src}
          className={`lb-wraith lb-wraith-${i + 1}`}
          aria-hidden="true"
          style={
            {
              ...w.style,
              '--depth': w.depth,
              animationDuration: `${w.drift}s`,
              animationDelay: `${w.delay}s`,
            } as React.CSSProperties
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={w.src} alt="" draggable={false} />
        </div>
      ))}

      {/* Real fog: a seamless cloud texture drifting at three different
          scales and speeds. Each bank's opacity swings on its own long
          cycle, so fog genuinely thickens and thins out rather than
          sitting at a constant haze. */}
      <div className="lb-fogbank lb-fogbank-1" aria-hidden="true" />
      <div className="lb-fogbank lb-fogbank-2" aria-hidden="true" />
      <div className="lb-fogbank lb-fogbank-3" aria-hidden="true" />

      {/* Teal ground glow at the base, as on the banner */}
      <div className="lb-fog lb-fog-a" aria-hidden="true" />

      {/* Drifting motes catching the light */}
      <div className="lb-motes" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <div className="lb-vignette" aria-hidden="true" />
      </div>

      <div className="lb-content">{children}</div>
    </div>
  )
}
