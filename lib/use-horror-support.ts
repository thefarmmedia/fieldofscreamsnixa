'use client'

import { useEffect, useState } from 'react'

/**
 * Gates the WebGL experience: requires a real WebGL context, a
 * non-reduced-motion preference, and (best-effort) not Data Saver.
 * Anything else falls back to the plain accessible DOM content, which is
 * why every scene's narrative text and imagery is real, always-rendered
 * HTML rather than baked into the canvas.
 */
export function useHorrorSupport() {
  const [status, setStatus] = useState<'checking' | 'supported' | 'fallback'>('checking')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = Boolean((navigator as any).connection?.saveData)

    let hasWebgl = false
    try {
      const canvas = document.createElement('canvas')
      hasWebgl = Boolean(
        canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      )
    } catch {
      hasWebgl = false
    }

    setStatus(hasWebgl && !reducedMotion && !saveData ? 'supported' : 'fallback')
  }, [])

  return status
}
