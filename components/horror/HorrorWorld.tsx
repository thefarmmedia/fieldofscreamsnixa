'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { horrorConfig } from '@/lib/horror-config'
import { useHorrorSupport } from '@/lib/use-horror-support'
import IntroEnvironment from './IntroEnvironment'
import Effects from './Effects'
import CameraRig from './CameraRig'
import EnvironmentalText from './EnvironmentalText'
import HorrorFallback from './HorrorFallback'
import JumpScare from './JumpScare'

export default function HorrorWorld() {
  const { status, reducedMotion } = useHorrorSupport()

  if (status === 'checking') {
    return <div style={{ minHeight: '90vh', background: '#010204' }} aria-hidden="true" />
  }
  if (status === 'fallback') {
    return <HorrorFallback />
  }
  return <HorrorWorldCanvas reducedMotion={reducedMotion} />
}

function HorrorWorldCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const blackoutRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  // Coarse pointer (phones/tablets) drops the expensive post-processing
  // passes and the DPR ceiling rather than dropping the experience.
  const [tier, setTier] = useState<'high' | 'low'>('high')
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const smallCores = (navigator.hardwareConcurrency ?? 8) <= 4
    setTier(coarse || smallCores ? 'low' : 'high')
  }, [])

  // Mouse parallax — desktop only, harmless no-op on touch since no
  // pointermove fires.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  useEffect(() => {
    if (!trackRef.current) return

    gsap.registerPlugin(ScrollTrigger)

    // Smooth-scroll hijacking is itself motion — skip Lenis entirely for
    // reduced-motion visitors and let ScrollTrigger read native scroll.
    let lenis: Lenis | null = null
    let raf: ((time: number) => void) | null = null
    if (!reducedMotion) {
      lenis = new Lenis({ smoothWheel: true })
      lenis.on('scroll', ScrollTrigger.update)
      raf = (time: number) => lenis!.raf(time * 1000)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    }

    const trigger = ScrollTrigger.create({
      trigger: trackRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        progressRef.current = self.progress
        const { blackoutStart, blackoutEnd } = horrorConfig.intro
        const p = self.progress
        const opacity =
          p <= blackoutStart ? 0 : p >= blackoutEnd ? 1 : (p - blackoutStart) / (blackoutEnd - blackoutStart)
        if (blackoutRef.current) blackoutRef.current.style.opacity = String(opacity)
      },
    })

    return () => {
      trigger.kill()
      if (raf) gsap.ticker.remove(raf)
      lenis?.destroy()
    }
  }, [reducedMotion])

  return (
    <div className="horror-world">
      <div ref={trackRef} className="horror-track" style={{ height: `${horrorConfig.intro.heightVh}vh` }}>
        <div className="horror-pin">
          <Canvas
            style={{ position: 'absolute', inset: 0 }}
            dpr={tier === 'high' ? [1, 1.75] : [1, 1.25]}
            gl={{
              antialias: false,
              powerPreference: 'high-performance',
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.5,
            }}
            camera={{ position: [0, 1.6, 22], fov: 45, near: 0.1, far: 100 }}
          >
            <Suspense fallback={null}>
              <IntroEnvironment progressRef={progressRef} />
              <CameraRig
                frames={horrorConfig.intro.camera}
                progressRef={progressRef}
                mouseRef={mouseRef}
                reducedMotion={reducedMotion}
              />
              <Effects tier={tier} />
            </Suspense>
          </Canvas>
          <EnvironmentalText cues={horrorConfig.intro.text} progressRef={progressRef} />
          <div ref={blackoutRef} className="horror-blackout" aria-hidden="true" />
          <JumpScare
            progressRef={progressRef}
            at={horrorConfig.intro.jumpScareAt}
            src="/images/attraction/clown-redhair-closeup.jpg"
            reducedMotion={reducedMotion}
          />
          <p className="horror-scroll-cue">Keep going</p>
        </div>
      </div>
    </div>
  )
}
