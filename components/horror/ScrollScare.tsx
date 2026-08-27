'use client'

import { useEffect, useRef, useState } from 'react'
import JumpScare from './JumpScare'

// Pool of faces the scare can draw from. Kept to close-up, front-facing
// shots that read instantly at a glance — the scare only shows for
// ~170ms, so anything busier than a single face doesn't land in time.
const FACES = [
  '/images/attraction/clown-redhair-closeup.jpg',
  '/images/attraction/clown-skull-dark.jpg',
  '/images/attraction/chainsaw-crown-blue.jpg',
  '/images/attraction/ghost-masks-pair.jpg',
]

/**
 * Fires the one jump scare off ordinary page scroll.
 *
 * It used to hang off the 3D walk's scroll progress; with that gone, this
 * tracks how far down the document you are instead. Same rules as before:
 * once per visit, forward only, silent, skipped under reduced motion.
 */
export default function ScrollScare({
  at = 0.55,
  src,
}: {
  /** Fraction of the page scrolled before it triggers */
  at?: number
  /** Defaults to a random pick from FACES, re-rolled on every page load */
  src?: string
}) {
  const progressRef = useRef(0)
  // Picked once per mount, not on every render — a face shouldn't change
  // mid-visit just because something re-rendered this component.
  const [face] = useState(() => src ?? FACES[Math.floor(Math.random() * FACES.length)])
  // Resolved in an effect, never during render — `window` does not exist
  // when this is server-rendered.
  const [reducedMotion, setReducedMotion] = useState(true)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

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
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="scroll-scare-host">
      <JumpScare progressRef={progressRef} at={at} src={face} reducedMotion={reducedMotion} />
    </div>
  )
}
