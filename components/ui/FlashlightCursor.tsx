'use client'

import { useEffect, useRef } from 'react'

// A soft-edged dark mask that tracks the pointer, so the site reads like
// it's genuinely dark and the visitor's cursor is the only light source.
// Desktop (a real mouse) only -- there's no good touch equivalent of a
// cursor, and tracking a finger fought with the page's own scroll.
// Reduced-motion visitors get the plain page instead of a moving overlay.
export default function FlashlightCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!canHover) return

    const el = ref.current
    if (!el) return

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
  }, [])

  return <div ref={ref} className="flashlight-mask" aria-hidden="true" />
}
