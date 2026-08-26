'use client'

import { useEffect, useRef } from 'react'

// A soft-edged dark mask that tracks the pointer, so the site reads like
// it's genuinely dark and the visitor's cursor is the only light source.
// Reduced-motion visitors get the plain page instead of a moving overlay.
//
// Desktop (a real mouse) keeps it lit continuously and following the
// cursor. Touch has no hover state to follow when idle, so it lights up
// only while a finger is actually on the glass -- down, tracks the drag,
// gone on lift -- rather than sitting at a stale last-touched point.
export default function FlashlightCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const el = ref.current
    if (!el) return

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    const apply = () => {
      el.style.setProperty('--fx', `${x}px`)
      el.style.setProperty('--fy', `${y}px`)
      raf = 0
    }
    const queueApply = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }

    if (canHover) {
      el.style.opacity = '1'
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return
        x = e.clientX
        y = e.clientY
        queueApply()
      }
      const onLeave = () => el.style.setProperty('--fo', '0')
      const onEnter = () => el.style.setProperty('--fo', '1')

      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('mouseleave', onLeave)
      document.documentElement.addEventListener('mouseenter', onEnter)
      return () => {
        window.removeEventListener('pointermove', onMove)
        document.documentElement.removeEventListener('mouseleave', onLeave)
        document.documentElement.removeEventListener('mouseenter', onEnter)
        if (raf) cancelAnimationFrame(raf)
      }
    }

    // Touch: light up on contact, follow the drag, fade out on release.
    //
    // This uses the legacy TouchEvent APIs rather than Pointer Events on
    // purpose. A page this long is normally scrolled by dragging a
    // finger, and per spec a browser is allowed to fire pointercancel
    // once it recognizes a drag as a scroll/pan gesture -- which is
    // exactly what happened here: real touch input produced a single
    // pointerdown and then nothing, because the very first move was
    // claimed by scrolling. touchmove has no such carve-out; it keeps
    // firing for the life of the gesture regardless of what the page
    // does with it, which is what actually lets the light track the
    // finger while the page scrolls underneath it.
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      x = t.clientX
      y = t.clientY
      el.style.opacity = '1'
      el.style.setProperty('--fo', '1')
      queueApply()
    }
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      x = t.clientX
      y = t.clientY
      queueApply()
    }
    const onTouchEnd = () => el.style.setProperty('--fo', '0')

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    window.addEventListener('touchcancel', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="flashlight-mask" aria-hidden="true" />
}
