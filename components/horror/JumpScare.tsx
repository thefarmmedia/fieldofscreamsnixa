'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The one jump scare in the journey. Fires once, at the very end, out of
 * the blackout: darkness -> face -> darkness. Roughly 170ms — long enough
 * to register, too short to study, which is what makes it land instead of
 * reading as a poster.
 *
 * Rules it deliberately follows:
 * - Once per visit, forward direction only. Scrolling back up won't
 *   re-fire it (a scare you can replay on demand isn't a scare).
 * - Silent. No audio is triggered here.
 * - Skipped entirely for prefers-reduced-motion: a sudden high-contrast
 *   flash is exactly what that preference exists to prevent.
 * - The image is preloaded at mount. If it decoded at trigger time the
 *   scare would arrive late or not at all.
 */
export default function JumpScare({
  progressRef,
  at,
  src,
  reducedMotion,
}: {
  progressRef: React.MutableRefObject<number>
  /** Scroll progress (0-1) that triggers it */
  at: number
  src: string
  reducedMotion: boolean
}) {
  const [visible, setVisible] = useState(false)
  const fired = useRef(false)
  const ready = useRef(false)

  // Preload + decode up front so the flash is instant when it fires.
  useEffect(() => {
    if (reducedMotion) return
    const img = new Image()
    img.src = src
    const done = () => {
      ready.current = true
    }
    if (img.decode) {
      img.decode().then(done).catch(done)
    } else {
      img.onload = done
      img.onerror = done
    }
  }, [src, reducedMotion])

  useEffect(() => {
    if (reducedMotion) return
    let raf = 0
    let hideTimer: ReturnType<typeof setTimeout>
    const tick = () => {
      if (!fired.current && ready.current && progressRef.current >= at) {
        fired.current = true
        setVisible(true)
        hideTimer = setTimeout(() => setVisible(false), 260)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(hideTimer)
    }
  }, [at, progressRef, reducedMotion])

  if (reducedMotion || !visible) return null

  return (
    <div className="jump-scare" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" />
    </div>
  )
}
