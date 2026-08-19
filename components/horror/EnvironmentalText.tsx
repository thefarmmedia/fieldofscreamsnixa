'use client'

import { useEffect, useRef } from 'react'
import type { EnvironmentalTextCue } from '@/lib/horror-config'

// Real semantic HTML overlaid on the canvas rather than baked into WebGL —
// crawlable and screen-reader visible, styled to feel embedded in the
// world (blur/scale tied to distance from its cue's peak). Opacity is
// pushed via direct style writes off a shared progress ref, not React
// state, so this never re-renders on scroll.
export default function EnvironmentalText({
  cues,
  progressRef,
}: {
  cues: readonly EnvironmentalTextCue[]
  progressRef: React.MutableRefObject<number>
}) {
  const refs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const p = progressRef.current
      cues.forEach((cue, i) => {
        const el = refs.current[i]
        if (!el) return
        const dist = Math.abs(p - cue.at)
        const visible = 1 - Math.min(1, dist / (cue.window / 2))
        const eased = Math.max(0, visible)
        el.style.opacity = String(eased)
        el.style.transform = `translate(-50%, -50%) scale(${0.94 + eased * 0.06})`
        el.style.filter = `blur(${(1 - eased) * 4}px)`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [cues, progressRef])

  return (
    <div className="horror-text-layer" aria-hidden={false}>
      {cues.map((cue, i) => (
        <div
          key={cue.text + i}
          ref={(el) => {
            refs.current[i] = el
          }}
          className="horror-text-cue"
        >
          {cue.text && <p className="horror-text-main">{cue.text}</p>}
          {cue.sub && <p className="horror-text-sub">{cue.sub}</p>}
        </div>
      ))}
    </div>
  )
}
