'use client'

import { useEffect, useRef, useCallback } from 'react'
import { atmosphereConfig } from '@/lib/atmosphere-config'

// ─── SVG Tree Silhouettes ──────────────────────────────────────────────────────

// Dead bare tree — dramatic reaching branches
function DeadTree({ x, y, scale = 1, flip = false, opacity = 1 }: {
  x: number; y: number; scale?: number; flip?: boolean; opacity?: number
}) {
  return (
    <g
      transform={`translate(${x}, ${y}) scale(${flip ? -scale : scale}, ${scale})`}
      style={{ transformOrigin: `${x}px ${y}px`, opacity }}
    >
      <path
        d="M0 0 C-2 -50 -1 -110 0 -160 C1 -210 -1 -250 0 -290
           M0 -160 C-20 -175 -40 -185 -55 -195 C-65 -202 -75 -205 -80 -215
           M-40 -185 C-50 -195 -55 -205 -58 -212
           M0 -180 C15 -195 30 -205 42 -215 C52 -222 62 -232 65 -242
           M30 -205 C38 -215 42 -225 44 -233
           M0 -220 C-12 -232 -22 -242 -30 -255 C-36 -263 -38 -272 -40 -280
           M-20 -242 C-28 -252 -31 -260 -32 -268
           M0 -235 C10 -248 20 -260 26 -272 C30 -280 32 -287 32 -295
           M18 -262 C22 -271 24 -279 24 -285
           M0 -260 C-5 -272 -6 -280 -7 -290"
        stroke="#030910"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  )
}

// Dense foliage tree (oak-like)
function FoliageTree({ x, y, scale = 1, opacity = 1 }: {
  x: number; y: number; scale?: number; opacity?: number
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} style={{ opacity }}>
      {/* trunk */}
      <path
        d="M-6 0 L-7 -80 L-5 -110 L-6 -140 L6 -140 L5 -110 L7 -80 L6 0Z"
        fill="#030910"
      />
      {/* crown — irregular blob */}
      <path
        d="M0 -140
           C0 -140 -38 -148 -52 -168 C-65 -188 -58 -215 -42 -225
           C-55 -232 -60 -252 -48 -262 C-36 -272 -20 -268 -12 -258
           C-18 -272 -12 -290 2 -295 C16 -300 28 -288 28 -272
           C38 -282 55 -278 60 -262 C65 -245 55 -228 42 -222
           C56 -215 62 -195 52 -178 C42 -162 22 -155 10 -160
           C18 -148 15 -138 0 -140Z"
        fill="#030910"
      />
    </g>
  )
}

// Pine/conifer silhouette
function PineTree({ x, y, scale = 1, opacity = 1 }: {
  x: number; y: number; scale?: number; opacity?: number
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`} style={{ opacity }}>
      <path d="M0 0 L0 -15 M-4 0 L4 0" stroke="#030910" strokeWidth="8" strokeLinecap="round" fill="none" />
      <path d="M0 -15 L-22 20 L22 20Z" fill="#030910" />
      <path d="M0 -50 L-18 -5 L18 -5Z" fill="#030910" />
      <path d="M0 -80 L-15 -42 L15 -42Z" fill="#030910" />
      <path d="M0 -105 L-12 -75 L12 -75Z" fill="#030910" />
      <path d="M0 -125 L-8 -100 L8 -100Z" fill="#030910" />
    </g>
  )
}

// Foreground trunk (just the base)
function ForegroundTrunk({ x, y, scale = 1, flip = false }: {
  x: number; y: number; scale?: number; flip?: boolean
}) {
  return (
    <g transform={`translate(${x}, ${y}) scale(${flip ? -1 : 1}, 1)`}>
      <path
        d={`M0 0 C-${8*scale} -${100*scale} -${6*scale} -${200*scale} -${4*scale} -${320*scale}
           M-${4*scale} -${320*scale} C-${20*scale} -${340*scale} -${35*scale} -${350*scale} -${45*scale} -${362*scale}
           M-${4*scale} -${320*scale} C${10*scale} -${335*scale} ${22*scale} -${345*scale} ${28*scale} -${358*scale}
           M-${4*scale} -${280*scale} C-${22*scale} -${295*scale} -${38*scale} -${302*scale} -${48*scale} -${310*scale}
           M-${4*scale} -${260*scale} C${14*scale} -${272*scale} ${25*scale} -${280*scale} ${30*scale} -${290*scale}`}
        stroke="#020608"
        strokeWidth={`${14 * scale}`}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  )
}

// Hidden eyes (the easter egg)
function HiddenEyes({ x, y, visible }: { x: number; y: number; visible: boolean }) {
  return (
    <g
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 2s ease',
      }}
    >
      <ellipse cx={x} cy={y} rx="2.5" ry="1.8" fill="rgba(160, 220, 60, 0.85)" />
      <ellipse cx={x + 10} cy={y} rx="2.5" ry="1.8" fill="rgba(160, 220, 60, 0.85)" />
      {/* glow */}
      <ellipse cx={x} cy={y} rx="5" ry="4" fill="rgba(160, 220, 60, 0.2)" />
      <ellipse cx={x + 10} cy={y} rx="5" ry="4" fill="rgba(160, 220, 60, 0.2)" />
    </g>
  )
}

// Hidden silhouette figure
function HiddenFigure({ visible }: { visible: boolean }) {
  return (
    <g
      style={{
        opacity: visible ? 0.18 : 0,
        transition: 'opacity 4s ease',
      }}
      transform="translate(62%, 40%)"
    >
      <ellipse cx="0" cy="-80" rx="10" ry="12" fill="#020508" />
      <path d="M0 -68 L-8 20 L0 18 L8 20Z" fill="#020508" />
      <path d="M0 -20 L-18 20 L-14 22 L0 -5Z" fill="#020508" />
      <path d="M0 -20 L18 15 L14 18 L0 -5Z" fill="#020508" />
      <path d="M-8 20 L-12 55 L-8 56 L-5 20Z" fill="#020508" />
      <path d="M8 20 L12 55 L8 56 L5 20Z" fill="#020508" />
    </g>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ForestEnvironment() {
  const envRef = useRef<HTMLDivElement>(null)
  const distantRef = useRef<SVGSVGElement>(null)
  const midRef = useRef<SVGSVGElement>(null)
  const nearRef = useRef<SVGSVGElement>(null)
  const fgRef = useRef<SVGSVGElement>(null)
  const eyesRef = useRef<SVGGElement>(null)
  const lightningRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const lastScrollY = useRef(0)

  // Parallax on scroll
  useEffect(() => {
    if (!atmosphereConfig.forestParallaxIntensity) return

    const onScroll = () => {
      const y = window.scrollY
      const intensity = atmosphereConfig.forestParallaxIntensity
      if (distantRef.current) {
        distantRef.current.style.transform = `translateY(${y * -0.06 * intensity}px)`
      }
      if (midRef.current) {
        midRef.current.style.transform = `translateY(${y * -0.13 * intensity}px)`
      }
      if (nearRef.current) {
        nearRef.current.style.transform = `translateY(${y * -0.22 * intensity}px)`
      }
      if (fgRef.current) {
        fgRef.current.style.transform = `translateY(${y * -0.35 * intensity}px)`
      }
    }

    const handler = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(onScroll)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Hidden eyes easter egg
  const eyesVisible = useRef(false)
  const eyesTimeoutRef = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => {
    if (!atmosphereConfig.hiddenEyesEnabled || !atmosphereConfig.easterEggEnabled) return

    const schedule = () => {
      const delay = (atmosphereConfig.hiddenEyesCooldownSec + Math.random() * 30) * 1000
      eyesTimeoutRef.current = setTimeout(() => {
        if (eyesRef.current) {
          eyesRef.current.style.opacity = '1'
          eyesRef.current.style.transition = 'opacity 2s ease'
          setTimeout(() => {
            if (eyesRef.current) {
              eyesRef.current.style.opacity = '0'
            }
            schedule()
          }, atmosphereConfig.hiddenEyesDurationSec * 1000)
        }
      }, delay)
    }
    schedule()
    return () => clearTimeout(eyesTimeoutRef.current)
  }, [])

  // Lightning easter egg
  useEffect(() => {
    if (!atmosphereConfig.lightningEnabled) return

    const schedule = () => {
      const delay = (atmosphereConfig.lightningCooldownSec + Math.random() * 60) * 1000
      setTimeout(() => {
        if (lightningRef.current) {
          lightningRef.current.style.opacity = '1'
          setTimeout(() => {
            if (lightningRef.current) {
              lightningRef.current.style.opacity = '0'
            }
          }, atmosphereConfig.lightningDurationMs)
          setTimeout(schedule, (atmosphereConfig.lightningCooldownSec + Math.random() * 60) * 1000)
        }
      }, delay)
    }
    schedule()
  }, [])

  // Late night message
  useEffect(() => {
    if (!atmosphereConfig.nightModeEnabled) return
    const hour = new Date().getHours()
    if (hour >= atmosphereConfig.lateNightMessageHour || hour < 5) {
      const shown = sessionStorage.getItem('fos-latenight-shown')
      if (!shown) {
        setTimeout(() => {
          sessionStorage.setItem('fos-latenight-shown', '1')
        }, 15000)
      }
    }
  }, [])

  return (
    <>
      {/* Fixed forest environment — stays behind all content */}
      <div ref={envRef} className="forest-env" aria-hidden="true">
        {/* Sky */}
        <div className="forest-sky" />

        {/* Moonlight atmosphere */}
        <div className="forest-moonlight" />

        {/* ── Fog Layers ── */}
        <div className="fog-layer fog-bg" style={{ opacity: atmosphereConfig.fogOpacityBase * 7 }} />
        <div className="fog-layer fog-mid" style={{ opacity: atmosphereConfig.fogOpacityMid * 5.5 }} />

        {/* ── Distant treeline (SVG) ── */}
        <svg
          ref={distantRef}
          viewBox="0 0 1600 200"
          preserveAspectRatio="xMidYMax meet"
          style={{
            position: 'absolute',
            bottom: '50%',
            left: 0,
            width: '100%',
            height: '25%',
            willChange: 'transform',
          }}
        >
          {/* Dense distant tree line — flat silhouette */}
          <path
            d={`M0 200
               L0 80 C30 60 50 50 60 55 C70 40 80 30 90 35
               C100 20 115 15 125 22 C135 10 148 5 158 12
               C168 0 178 0 188 8 C198 -5 210 -5 220 5
               C230 -8 242 -10 252 0 C262 -12 275 -12 285 -2
               C295 -15 305 -15 315 -5 C325 -18 338 -18 348 -8
               C358 -20 370 -18 380 -8 C390 -22 405 -20 415 -10
               C425 -25 438 -22 448 -12 C458 -26 472 -23 482 -13
               C492 -28 505 -25 515 -15 C525 -30 538 -27 548 -17
               C558 -32 572 -29 582 -18 C595 -35 608 -32 618 -20
               C630 -38 642 -35 652 -22 C665 -40 678 -37 688 -24
               C700 -42 715 -39 725 -26 C738 -45 752 -42 762 -28
               C775 -48 789 -45 799 -30 C812 -50 826 -47 836 -32
               C848 -52 862 -49 872 -34 C885 -55 899 -52 909 -36
               C922 -57 936 -54 946 -38 C959 -60 974 -57 984 -40
               C997 -62 1012 -59 1022 -42 C1035 -64 1050 -61 1060 -44
               C1073 -66 1088 -63 1098 -46 C1110 -68 1126 -65 1136 -48
               C1148 -70 1164 -67 1174 -50 C1186 -72 1202 -69 1212 -52
               C1225 -74 1240 -71 1250 -54 C1262 -76 1278 -73 1288 -56
               C1300 -78 1316 -75 1326 -58 C1338 -80 1355 -77 1365 -60
               C1377 -82 1393 -79 1403 -62 C1415 -84 1432 -81 1442 -64
               C1454 -86 1471 -83 1481 -66 C1493 -88 1510 -85 1520 -68
               C1532 -90 1548 -87 1558 -70 C1570 -92 1587 -89 1597 -72
               L1600 200Z`}
            fill="#020508"
          />
        </svg>

        {/* ── Mid treeline (SVG) ── */}
        <svg
          ref={midRef}
          viewBox="0 0 1600 400"
          preserveAspectRatio="xMidYMax meet"
          style={{
            position: 'absolute',
            bottom: '20%',
            left: 0,
            width: '100%',
            height: '60%',
            willChange: 'transform',
          }}
        >
          {/* Scattered mid trees */}
          <DeadTree x={120} y={400} scale={0.7} opacity={0.9} />
          <FoliageTree x={220} y={400} scale={0.65} opacity={0.85} />
          <DeadTree x={350} y={400} scale={0.8} flip opacity={0.95} />
          <PineTree x={480} y={400} scale={1.1} opacity={0.9} />
          <FoliageTree x={580} y={400} scale={0.72} opacity={0.88} />
          <DeadTree x={720} y={400} scale={0.9} opacity={1} />
          <PineTree x={850} y={400} scale={0.9} opacity={0.85} />
          <FoliageTree x={960} y={400} scale={0.78} opacity={0.9} />
          <DeadTree x={1080} y={400} scale={0.75} flip opacity={0.88} />
          <FoliageTree x={1180} y={400} scale={0.7} opacity={0.85} />
          <DeadTree x={1300} y={400} scale={0.85} opacity={0.92} />
          <PineTree x={1420} y={400} scale={0.95} opacity={0.9} />
          <FoliageTree x={1520} y={400} scale={0.68} opacity={0.82} />

          {/* Hidden eyes (mid-ground, between trees) */}
          <g ref={eyesRef} style={{ opacity: 0 }}>
            <HiddenEyes x={740} y={280} visible={false} />
          </g>
        </svg>

        {/* Mid fog over trees */}
        <div className="fog-layer fog-mid" style={{
          bottom: '15%',
          top: 'auto',
          height: '40%',
          opacity: atmosphereConfig.fogOpacityMid * 6,
        }} />

        {/* ── Near trees (SVG) ── */}
        <svg
          ref={nearRef}
          viewBox="0 0 1600 600"
          preserveAspectRatio="xMidYMax meet"
          style={{
            position: 'absolute',
            bottom: '0',
            left: 0,
            width: '100%',
            height: '80%',
            willChange: 'transform',
          }}
        >
          <DeadTree x={80} y={600} scale={1.2} opacity={0.9} />
          <FoliageTree x={240} y={600} scale={1.1} opacity={0.95} />
          <DeadTree x={420} y={600} scale={1.3} flip opacity={1} />
          <FoliageTree x={620} y={600} scale={1.0} opacity={0.9} />
          <DeadTree x={800} y={600} scale={1.4} opacity={1} />
          <FoliageTree x={980} y={600} scale={1.15} opacity={0.95} />
          <DeadTree x={1160} y={600} scale={1.1} flip opacity={0.9} />
          <FoliageTree x={1340} y={600} scale={1.05} opacity={0.92} />
          <DeadTree x={1500} y={600} scale={1.2} opacity={0.88} />
        </svg>

        {/* Ground fog */}
        <div className="fog-layer fog-ground" />

        {/* ── Foreground branches (SVG) — frame the viewport ── */}
        <svg
          ref={fgRef}
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMax meet"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        >
          {/* Left foreground trunk */}
          <g className="branch-sway" style={{ transformOrigin: '0px 900px' }}>
            <path
              d="M-20 900 C-15 780 -10 660 0 540 C5 480 2 420 5 360
                 M5 360 C-20 335 -40 320 -55 308
                 M5 360 C25 338 42 325 52 312
                 M0 480 C-25 460 -48 448 -62 438
                 M0 480 C22 462 40 452 50 444
                 M-5 580 C-30 565 -52 555 -68 546
                 M2 600 C20 588 36 580 44 574"
              stroke="#020608"
              strokeWidth="28"
              strokeLinecap="round"
              fill="none"
              opacity="0.95"
            />
          </g>

          {/* Right foreground trunk */}
          <g className="branch-sway-alt" style={{ transformOrigin: '1600px 900px' }}>
            <path
              d="M1620 900 C1615 780 1610 660 1600 540 C1595 480 1598 420 1595 360
                 M1595 360 C1620 335 1640 320 1655 308
                 M1595 360 C1575 338 1558 325 1548 312
                 M1600 480 C1625 460 1648 448 1662 438
                 M1600 480 C1578 462 1560 452 1550 444
                 M1605 580 C1630 565 1652 555 1668 546
                 M1598 600 C1580 588 1564 580 1556 574"
              stroke="#020608"
              strokeWidth="28"
              strokeLinecap="round"
              fill="none"
              opacity="0.95"
            />
          </g>

          {/* Hanging branches top-left */}
          <g className="branch-sway" style={{ transformOrigin: '0px 0px' }}>
            <path
              d="M0 0 C50 20 100 45 130 70 C150 85 165 98 168 112
                 M130 70 C120 88 115 102 116 115
                 M130 70 C145 60 158 52 165 46
                 M80 35 C72 55 68 70 70 82
                 M80 35 C95 28 108 22 115 18"
              stroke="#020608"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </g>

          {/* Hanging branches top-right */}
          <g className="branch-sway-alt" style={{ transformOrigin: '1600px 0px' }}>
            <path
              d="M1600 0 C1550 20 1500 45 1470 70 C1450 85 1435 98 1432 112
                 M1470 70 C1480 88 1485 102 1484 115
                 M1470 70 C1455 60 1442 52 1435 46
                 M1520 35 C1528 55 1532 70 1530 82
                 M1520 35 C1505 28 1492 22 1485 18"
              stroke="#020608"
              strokeWidth="16"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </g>
        </svg>

        {/* Foreground mist — very subtle, never blocks content */}
        <div className="fog-layer fog-foreground" />
      </div>

      {/* Lightning flash overlay — safe (not strobing, 150ms, very dim) */}
      <div
        ref={lightningRef}
        className="lightning-flash"
        style={{ opacity: 0, transition: 'opacity 0.05s ease' }}
        aria-hidden="true"
      />
    </>
  )
}
