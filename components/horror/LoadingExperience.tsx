'use client'

import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'

// Phase 1 has almost no bytes to load (procedural geometry, no textures/
// models yet), so real useProgress alone would flash past instantly. This
// blends real progress with a minimum-duration ramp for the intended
// cinematic beat; once real assets (models/textures) are added later,
// realProgress will naturally dominate on slower connections.
export default function LoadingExperience({ onEnter }: { onEnter: () => void }) {
  const { progress: realProgress } = useProgress()
  const [shown, setShown] = useState(0)
  const [ready, setReady] = useState(false)
  const start = useRef(performance.now())

  useEffect(() => {
    let raf = 0
    const MIN_MS = 2200
    const tick = () => {
      const elapsed = performance.now() - start.current
      const ramp = Math.min(100, (elapsed / MIN_MS) * 100)
      const next = Math.max(ramp, realProgress)
      setShown(next)
      if (next >= 100 && elapsed >= MIN_MS) {
        setReady(true)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [realProgress])

  return (
    <div className="horror-loading" role="status" aria-live="polite">
      <div className="horror-loading-logo">FIELD OF SCREAMS</div>
      <div className="horror-loading-bar-track">
        <div className="horror-loading-bar-fill" style={{ width: `${shown}%` }} />
      </div>
      <p className="horror-loading-label">
        {shown < 90 ? 'PREPARING YOUR NIGHTMARE…' : 'ONE LAST CHANCE TO LEAVE.'}
      </p>
      {ready && (
        <button type="button" className="horror-enter-btn" onClick={onEnter} autoFocus>
          ENTER
        </button>
      )}
    </div>
  )
}
