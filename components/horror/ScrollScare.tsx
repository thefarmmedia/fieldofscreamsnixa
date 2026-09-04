'use client'

import { useEffect, useRef, useState } from 'react'
import JumpScare from './JumpScare'

/**
 * Fires the one jump scare off ordinary page scroll.
 *
 * It used to hang off the 3D walk's scroll progress; with that gone, this
 * tracks how far down the document you are instead. Same rules as before:
 * once per visit, forward only, silent, skipped under reduced motion.
 */
export default function ScrollScare({
  at = 0.55,
  src = '/images/attraction/clown-redhair-closeup.jpg',
}: {
  /** Fraction of the page scrolled before it triggers */
  at?: number
  src?: string
}) {
  const progressRef = useRef(0)
  // Resolved in an effect, never during render — `window` does not exist
  // when this is server-rendered.
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(motion.matches)
    updateMotion()
    motion.addEventListener('change', updateMotion)

    let raf = 0
    const read = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      progressRef.current = max > 0 ? window.scrollY / max : 0
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      motion.removeEventListener('change', updateMotion)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="scroll-scare-host">
      <JumpScare progressRef={progressRef} at={at} src={src} reducedMotion={reducedMotion} />
    </div>
  )
}
