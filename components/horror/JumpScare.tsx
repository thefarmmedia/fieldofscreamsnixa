'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const VISIT_KEY = 'fos-scare-seen'

/** A quiet beat of darkness, then a single face rushing out of the woods.
 * Scroll-driven (no idle animation loop), once per tab visit, and silent.
 */
export default function JumpScare({ progressRef, at, src, reducedMotion }: {
  progressRef: React.MutableRefObject<number>
  at: number
  src: string
  reducedMotion: boolean
}) {
  const [phase, setPhase] = useState<'idle' | 'dread' | 'scare'>('idle')
  const fired = useRef(false)

  useEffect(() => {
    if (reducedMotion) {
      setPhase('idle')
      return
    }
    try { if (sessionStorage.getItem(VISIT_KEY)) return } catch { /* Private browsing. */ }

    let disposed = false
    let ready = false
    let frame = 0
    let previousY = window.scrollY
    const timers: ReturnType<typeof setTimeout>[] = []
    const image = new Image()
    image.onload = () => {
      if (image.decode) image.decode().then(() => { if (!disposed) ready = true }).catch(() => {})
      else ready = true
    }
    image.src = src

    const check = () => {
      frame = 0
      const y = window.scrollY
      const forward = y > previousY
      previousY = y
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = max > 0 ? y / max : 0
      if (!forward || fired.current || !ready || document.hidden || progressRef.current < at) return
      // Never interrupt a form, expanded navigation or an open dialog.
      if (document.activeElement?.matches('input, textarea, select, [contenteditable="true"]') ||
          document.querySelector('[role="dialog"], dialog[open], [aria-expanded="true"]')) return
      fired.current = true
      try { sessionStorage.setItem(VISIT_KEY, '1') } catch { /* Ref still prevents repeats. */ }
      setPhase('dread')
      timers.push(setTimeout(() => setPhase('scare'), 420))
      timers.push(setTimeout(() => setPhase('idle'), 900))
    }
    const onScroll = () => { if (!frame && !fired.current) frame = requestAnimationFrame(check) }
    const dismiss = () => {
      timers.forEach(clearTimeout)
      setPhase('idle')
    }
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') dismiss() }
    const onVisibility = () => { if (document.hidden) dismiss() }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('keydown', onKey)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      disposed = true
      image.onload = null
      cancelAnimationFrame(frame)
      timers.forEach(clearTimeout)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [at, progressRef, reducedMotion, src])

  if (reducedMotion || phase === 'idle') return null
  return createPortal(
    <div className={`jump-scare jump-scare--${phase}`} aria-hidden="true">
      {phase === 'scare' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" />
      )}
    </div>, document.body,
  )
}
