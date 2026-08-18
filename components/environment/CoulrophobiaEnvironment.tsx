'use client'

import { useEffect, useRef, useState } from 'react'
import { atmosphereConfig } from '@/lib/atmosphere-config'

// ─── Carnival Bulb Component ───────────────────────────────────────────────────

type BulbState = 'on' | 'flicker' | 'dead' | 'dim'

function CarnivalBulb({ state, color = 'warm' }: { state: BulbState; color?: 'warm' | 'red' | 'dim' }) {
  const colors: Record<string, string> = {
    warm: 'rgba(210, 185, 80, 0.9)',
    red: 'rgba(180, 40, 20, 0.9)',
    dim: 'rgba(100, 80, 30, 0.6)',
  }
  const glow: Record<string, string> = {
    warm: '0 0 8px rgba(210,185,80,0.7), 0 0 20px rgba(200,165,40,0.4), 0 0 40px rgba(180,140,20,0.2)',
    red: '0 0 8px rgba(180,40,20,0.7), 0 0 20px rgba(160,30,10,0.4), 0 0 40px rgba(140,20,5,0.2)',
    dim: '0 0 4px rgba(100,80,30,0.4)',
  }

  if (state === 'dead') {
    return (
      <div style={{
        width: 12, height: 18,
        background: 'rgba(25, 18, 8, 0.9)',
        borderRadius: '50% 50% 40% 40%',
        boxShadow: 'none',
      }} />
    )
  }

  return (
    <div style={{
      width: 12, height: 18,
      background: colors[color],
      borderRadius: '50% 50% 40% 40%',
      boxShadow: glow[color],
      animation: state === 'flicker'
        ? `carnivalFlicker ${atmosphereConfig.carnivalFlickerFrequency}s steps(1) infinite`
        : undefined,
      animationDelay: state === 'flicker' ? `${Math.random() * 3}s` : undefined,
    }} />
  )
}

// ─── Bulb String ──────────────────────────────────────────────────────────────

const BULB_PATTERN: Array<{ state: BulbState; color: 'warm' | 'red' | 'dim' }> = [
  { state: 'on', color: 'warm' },
  { state: 'on', color: 'red' },
  { state: 'flicker', color: 'warm' },
  { state: 'dead', color: 'warm' },
  { state: 'on', color: 'warm' },
  { state: 'on', color: 'red' },
  { state: 'dim', color: 'dim' },
  { state: 'on', color: 'warm' },
  { state: 'flicker', color: 'red' },
  { state: 'dead', color: 'warm' },
  { state: 'on', color: 'warm' },
  { state: 'on', color: 'red' },
  { state: 'dim', color: 'dim' },
  { state: 'flicker', color: 'warm' },
  { state: 'on', color: 'warm' },
  { state: 'dead', color: 'warm' },
  { state: 'on', color: 'red' },
  { state: 'on', color: 'warm' },
]

function BulbString({ top = 0, opacity = 0.7 }: { top?: number; opacity?: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        padding: '0 20px',
        opacity,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      {/* Wire */}
      <svg
        style={{ position: 'absolute', top: 0, left: 0, right: 0, width: '100%', height: 20 }}
        viewBox="0 0 1600 20"
        preserveAspectRatio="none"
      >
        <path
          d="M0 5 Q200 15 400 5 Q600 -5 800 8 Q1000 18 1200 5 Q1400 -5 1600 8"
          stroke="rgba(50, 35, 15, 0.8)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      {BULB_PATTERN.map((b, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 1, height: 8, background: 'rgba(50, 35, 15, 0.6)' }} />
          <CarnivalBulb state={b.state} color={b.color} />
        </div>
      ))}
    </div>
  )
}

// ─── Red Balloon ──────────────────────────────────────────────────────────────

function RedBalloon({ left, visible }: { left: number; visible: boolean }) {
  if (!visible) return null
  return (
    <div
      className="red-balloon"
      style={{ left: `${left}%` }}
      aria-hidden="true"
    >
      <svg width="28" height="42" viewBox="0 0 28 42">
        <ellipse cx="14" cy="16" rx="12" ry="14" fill="rgba(180, 15, 15, 0.85)" />
        <path d="M14 30 Q11 36 14 42" stroke="rgba(120, 10, 10, 0.7)" strokeWidth="0.8" fill="none" />
        <ellipse cx="10" cy="10" rx="4" ry="5" fill="rgba(220, 80, 80, 0.3)" />
      </svg>
    </div>
  )
}

// ─── Clown Peek ───────────────────────────────────────────────────────────────

function ClownPeek({ visible, onMouseEnter }: { visible: boolean; onMouseEnter: () => void }) {
  return (
    <div
      className={`clown-peek-container ${visible ? 'peeking' : ''}`}
      onMouseEnter={onMouseEnter}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <svg width="90" height="130" viewBox="0 0 90 130" aria-hidden="true">
        {/* Pale clown face — only partial, emerging from screen edge */}
        <ellipse cx="45" cy="65" rx="40" ry="48" fill="rgba(195, 185, 170, 0.9)" />
        {/* Hair — red, wild */}
        <path d="M8 30 Q-5 5 10 0 Q15 20 8 30Z" fill="rgba(160, 20, 10, 0.9)" />
        <path d="M20 18 Q12 -5 28 -8 Q28 15 20 18Z" fill="rgba(160, 20, 10, 0.9)" />
        <path d="M82 30 Q95 5 80 0 Q75 20 82 30Z" fill="rgba(160, 20, 10, 0.9)" />
        {/* Dark hollow eye sockets */}
        <ellipse cx="30" cy="58" rx="10" ry="12" fill="rgba(15, 8, 5, 0.95)" />
        <ellipse cx="60" cy="58" rx="10" ry="12" fill="rgba(15, 8, 5, 0.95)" />
        {/* Iris — catches light unnervingly */}
        <ellipse cx="32" cy="60" rx="5" ry="7" fill="rgba(80, 50, 30, 0.9)" />
        <ellipse cx="62" cy="60" rx="5" ry="7" fill="rgba(80, 50, 30, 0.9)" />
        <ellipse cx="33" cy="59" rx="2" ry="2.5" fill="rgba(200, 160, 80, 0.7)" />
        <ellipse cx="63" cy="59" rx="2" ry="2.5" fill="rgba(200, 160, 80, 0.7)" />
        {/* Painted smile — wrong */}
        <path
          d="M20 88 Q30 100 45 102 Q60 100 70 88"
          stroke="rgba(150, 20, 10, 0.9)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* Face paint — faded */}
        <ellipse cx="25" cy="72" rx="8" ry="5" fill="rgba(180, 40, 20, 0.2)" />
        <ellipse cx="65" cy="72" rx="8" ry="5" fill="rgba(180, 40, 20, 0.2)" />
        {/* Shadow on edge (sells the peeking effect) */}
        <rect x="70" y="0" width="20" height="130" fill="rgba(5, 1, 1, 0.6)" />
      </svg>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CoulrophobiaEnvironment() {
  const [balloonVisible, setBalloonVisible] = useState(false)
  const [balloonLeft, setBalloonLeft] = useState(15)
  const [clownVisible, setClownVisible] = useState(false)
  const clownPeekCount = useRef(0)
  const clownTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  const balloonTimeoutRef = useRef<ReturnType<typeof setTimeout>>()

  // Balloon schedule
  useEffect(() => {
    if (!atmosphereConfig.balloonEnabled) return
    const schedule = () => {
      const delay = (atmosphereConfig.balloonMinCooldownSec + Math.random() * 90) * 1000
      balloonTimeoutRef.current = setTimeout(() => {
        setBalloonLeft(8 + Math.random() * 20)
        setBalloonVisible(true)
        setTimeout(() => {
          setBalloonVisible(false)
          schedule()
        }, 21000)
      }, delay)
    }
    schedule()
    return () => clearTimeout(balloonTimeoutRef.current)
  }, [])

  // Clown peek schedule
  useEffect(() => {
    if (!atmosphereConfig.clownPeekEnabled) return
    // Only on desktop
    if (window.innerWidth < 768) return

    const schedule = () => {
      if (clownPeekCount.current >= atmosphereConfig.clownPeekMaxPerSession) return
      const minDelay = clownPeekCount.current === 0
        ? atmosphereConfig.clownPeekMinTimeSec * 1000
        : atmosphereConfig.clownPeekCooldownSec * 1000
      const delay = minDelay + Math.random() * 30000
      clownTimeoutRef.current = setTimeout(() => {
        setClownVisible(true)
        clownPeekCount.current++
        // Auto-retreat after 4s if user doesn't scare it away
        setTimeout(() => {
          setClownVisible(false)
          schedule()
        }, 4000)
      }, delay)
    }
    schedule()
    return () => clearTimeout(clownTimeoutRef.current)
  }, [])

  const handleClownMouseEnter = () => {
    setClownVisible(false)
    clearTimeout(clownTimeoutRef.current)
    // Schedule next peek after cooldown
    if (clownPeekCount.current < atmosphereConfig.clownPeekMaxPerSession) {
      clownTimeoutRef.current = setTimeout(() => {
        setClownVisible(true)
        clownPeekCount.current++
        setTimeout(() => setClownVisible(false), 4000)
      }, atmosphereConfig.clownPeekCooldownSec * 1000)
    }
  }

  return (
    <>
      <div className="coulrophobia-env" aria-hidden="true">
        {/* Background */}
        <div className="coulrophobia-bg" />

        {/* Very subtle diagonal stripe texture */}
        <div className="carnival-stripes" />

        {/* Bulb strings at top */}
        <BulbString top={0} opacity={0.7} />
        <BulbString top={30} opacity={0.4} />

        {/* Carnival fog */}
        <div className="carnival-fog" />
        <div className="carnival-ground-fog" />

        {/* VHS/analog overlay */}
        <div className="analog-overlay">
          <div className="scanlines" />
          <div className="film-grain" />
        </div>

        {/* Torn tent fabric — left side */}
        <svg
          style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '15%', pointerEvents: 'none', opacity: 0.35 }}
          viewBox="0 0 150 900"
          preserveAspectRatio="xMinYMin meet"
        >
          {/* Vertical striped drape */}
          <rect width="150" height="900" fill="rgba(5, 1, 2, 0.8)" />
          {[0, 30, 60, 90, 120].map((x) => (
            <rect key={x} x={x} y={0} width={12} height={900}
              fill={x % 60 === 0 ? 'rgba(60, 8, 8, 0.6)' : 'rgba(30, 4, 4, 0.3)'} />
          ))}
          {/* Torn edge */}
          <path
            d="M150 0 L145 80 L150 160 L140 240 L148 320 L142 400 L150 480 L143 560 L150 640 L144 720 L150 800 L146 900"
            stroke="rgba(30, 15, 10, 0.9)"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        {/* Torn tent fabric — right side */}
        <svg
          style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '15%', pointerEvents: 'none', opacity: 0.35, transform: 'scaleX(-1)' }}
          viewBox="0 0 150 900"
          preserveAspectRatio="xMinYMin meet"
        >
          <rect width="150" height="900" fill="rgba(5, 1, 2, 0.8)" />
          {[0, 30, 60, 90, 120].map((x) => (
            <rect key={x} x={x} y={0} width={12} height={900}
              fill={x % 60 === 0 ? 'rgba(60, 8, 8, 0.6)' : 'rgba(30, 4, 4, 0.3)'} />
          ))}
          <path
            d="M150 0 L145 80 L150 160 L140 240 L148 320 L142 400 L150 480 L143 560 L150 640 L144 720 L150 800 L146 900"
            stroke="rgba(30, 15, 10, 0.9)"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* Red balloon (outside env so it's above content layer z-wise, but behind interactive elements) */}
      {atmosphereConfig.balloonEnabled && (
        <RedBalloon left={balloonLeft} visible={balloonVisible} />
      )}

      {/* Clown peek (desktop only, handled in component) */}
      {atmosphereConfig.clownPeekEnabled && (
        <ClownPeek visible={clownVisible} onMouseEnter={handleClownMouseEnter} />
      )}
    </>
  )
}
