'use client'

import { useEffect, useState } from 'react'

export type HorrorSupport = {
  status: 'checking' | 'supported' | 'fallback'
  /** True when the visitor asked for reduced motion — the world still
   *  renders, but camera drift/bob and idle animation are damped. */
  reducedMotion: boolean
}

/**
 * Gates the WebGL experience on the ONE thing that actually makes it
 * impossible: no WebGL context.
 *
 * Deliberately does NOT fall back for prefers-reduced-motion or Data
 * Saver. Phones ship "Reduce Motion" on by default for a lot of people,
 * and treating that as "show them the plain page instead" silently
 * replaced the entire experience for those visitors. Reduced motion is
 * honored by damping the animation inside the scene instead, which is
 * what the preference actually asks for.
 */
export function useHorrorSupport(): HorrorSupport {
  const [state, setState] = useState<HorrorSupport>({ status: 'checking', reducedMotion: false })

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let hasWebgl = false
    try {
      const canvas = document.createElement('canvas')
      hasWebgl = Boolean(
        canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      )
    } catch {
      hasWebgl = false
    }

    setState({ status: hasWebgl ? 'supported' : 'fallback', reducedMotion })
  }, [])

  return state
}
