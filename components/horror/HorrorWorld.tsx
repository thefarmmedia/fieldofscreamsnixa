'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { horrorConfig } from '@/lib/horror-config'
import { useHorrorSupport } from '@/lib/use-horror-support'
import IntroEnvironment from './IntroEnvironment'
import CameraRig from './CameraRig'
import EnvironmentalText from './EnvironmentalText'
import LoadingExperience from './LoadingExperience'
import HorrorFallback from './HorrorFallback'

export default function HorrorWorld() {
  const support = useHorrorSupport()

  if (support === 'checking') {
    return <div style={{ minHeight: '90vh', background: '#010204' }} aria-hidden="true" />
  }
  if (support === 'fallback') {
    return <HorrorFallback />
  }
  return <HorrorWorldCanvas />
}

function HorrorWorldCanvas() {
  const [entered, setEntered] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const blackoutRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

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
    if (!entered || !trackRef.current) return

    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

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
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [entered])

  return (
    <div className="horror-world">
      <div ref={trackRef} className="horror-track" style={{ height: `${horrorConfig.intro.heightVh}vh` }}>
        <div className="horror-pin">
          {!entered && <LoadingExperience onEnter={() => setEntered(true)} />}
          <Canvas
            style={{ position: 'absolute', inset: 0 }}
            dpr={[1, 1.75]}
            gl={{ antialias: true, powerPreference: 'high-performance' }}
            camera={{ position: [0, 1.6, 22], fov: 45, near: 0.1, far: 100 }}
          >
            <IntroEnvironment progressRef={progressRef} />
            <CameraRig frames={horrorConfig.intro.camera} progressRef={progressRef} mouseRef={mouseRef} />
          </Canvas>
          <EnvironmentalText cues={horrorConfig.intro.text} progressRef={progressRef} />
          <div ref={blackoutRef} className="horror-blackout" aria-hidden="true" />
          {entered && <p className="horror-scroll-cue">Scroll</p>}
        </div>
      </div>
    </div>
  )
}
