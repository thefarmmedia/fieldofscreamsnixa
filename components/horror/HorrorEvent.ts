'use client'

import { useMemo, useRef } from 'react'

/**
 * Reusable scare-event system. A HorrorEvent fires once when scroll
 * progress crosses its trigger point, optionally gated by a probability
 * so repeat visitors don't see the exact same beat every time. Critical
 * content/navigation must never be randomized — only atmosphere events
 * (silhouettes, flickers, fog bursts) should use `chance`.
 */
export type HorrorEventType =
  | 'silhouette'
  | 'light-flicker'
  | 'camera-disturbance'
  | 'fog-burst'
  | 'object-movement'
  | 'blackout'
  | 'shadow-cross'
  | 'text-apparition'

export type HorrorEventDef = {
  id: string
  type: HorrorEventType
  /** Scroll progress (0-1) at which this event triggers */
  at: number
  /** 0-1 chance this event fires at all this session. Default 1 (always). */
  chance?: number
  onTrigger: () => void
}

/**
 * Call inside a useFrame or scroll callback with the current progress.
 * Fires each event's onTrigger exactly once, in the forward direction,
 * per mount. Each event's random inclusion is decided once at mount so
 * behavior is stable for the duration of a single visit.
 */
export function useHorrorEvents(defs: HorrorEventDef[]) {
  const fired = useRef<Set<string>>(new Set())
  const included = useMemo(() => {
    const set = new Set<string>()
    for (const def of defs) {
      if (Math.random() < (def.chance ?? 1)) set.add(def.id)
    }
    return set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (progress: number) => {
    for (const def of defs) {
      if (fired.current.has(def.id)) continue
      if (!included.has(def.id)) continue
      if (progress >= def.at) {
        fired.current.add(def.id)
        def.onTrigger()
      }
    }
  }
}
