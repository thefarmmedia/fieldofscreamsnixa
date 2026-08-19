'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { CameraKeyframe } from '@/lib/horror-config'

function lerp3(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [
    THREE.MathUtils.lerp(a[0], b[0], t),
    THREE.MathUtils.lerp(a[1], b[1], t),
    THREE.MathUtils.lerp(a[2], b[2], t),
  ]
}

function sample(frames: readonly CameraKeyframe[], t: number) {
  const clamped = THREE.MathUtils.clamp(t, 0, 1)
  if (clamped <= frames[0].t) return frames[0]
  const last = frames[frames.length - 1]
  if (clamped >= last.t) return last
  for (let i = 0; i < frames.length - 1; i++) {
    const a = frames[i]
    const b = frames[i + 1]
    if (clamped >= a.t && clamped <= b.t) {
      const local = (clamped - a.t) / (b.t - a.t)
      return {
        position: lerp3(a.position, b.position, local),
        lookAt: lerp3(a.lookAt, b.lookAt, local),
        fov: THREE.MathUtils.lerp(a.fov, b.fov, local),
      }
    }
  }
  return last
}

/**
 * Drives the camera through the world from a scroll-progress ref (0-1) so
 * it never triggers React re-renders. Adds subtle mouse parallax and an
 * idle drift/bob so the camera never feels perfectly locked to a rail.
 */
export default function CameraRig({
  frames,
  progressRef,
  mouseRef,
  reducedMotion = false,
}: {
  frames: readonly CameraKeyframe[]
  progressRef: React.MutableRefObject<number>
  mouseRef: React.MutableRefObject<{ x: number; y: number }>
  /** Damps the idle bob and mouse parallax; the scroll-driven dolly
   *  itself stays, since that's the visitor's own input. */
  reducedMotion?: boolean
}) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3())
  const smoothedFov = useRef(frames[0].fov)

  useFrame((state) => {
    const t = progressRef.current
    const { position, lookAt, fov } = sample(frames, t)
    const time = state.clock.getElapsedTime()

    const damp = reducedMotion ? 0 : 1
    const bobX = Math.sin(time * 0.35) * 0.06 * damp
    const bobY = Math.sin(time * 0.5) * 0.04 * damp + 1.5
    const parallaxX = mouseRef.current.x * 0.35 * damp
    const parallaxY = mouseRef.current.y * 0.2 * damp

    camera.position.set(
      position[0] + bobX + parallaxX,
      position[1] + bobY - 1.5 + parallaxY,
      position[2]
    )

    target.current.set(lookAt[0] + parallaxX * 0.6, lookAt[1] + parallaxY * 0.6, lookAt[2])
    camera.lookAt(target.current)

    smoothedFov.current = THREE.MathUtils.lerp(smoothedFov.current, fov, 0.08)
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = smoothedFov.current
      camera.updateProjectionMatrix()
    }
  })

  return null
}
