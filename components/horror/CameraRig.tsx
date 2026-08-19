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

  // Distance actually travelled down the trail, accumulated from scroll.
  // Footstep bob is driven by THIS rather than by elapsed time, so the
  // gait is tied to the visitor's own movement: scroll and you're
  // walking, stop and you're standing still. Time-driven bob feels like
  // swaying on the spot, which is what read as "not outdoors".
  const walked = useRef(0)
  const lastProgress = useRef(progressRef.current)
  const bobAmount = useRef(0)

  useFrame((state, delta) => {
    const t = progressRef.current
    const { position, lookAt, fov } = sample(frames, t)

    const dProgress = t - lastProgress.current
    lastProgress.current = t
    walked.current += Math.abs(dProgress)

    // How "in motion" we are right now, smoothed so steps ease in and out
    // instead of snapping on the first scroll tick.
    const speed = Math.min(1, Math.abs(dProgress) / (delta || 0.016) / 0.25)
    bobAmount.current = THREE.MathUtils.lerp(bobAmount.current, speed, 0.08)

    const damp = reducedMotion ? 0 : 1
    const gait = walked.current * 165
    const moving = bobAmount.current * damp

    // Two steps per stride: vertical bobs at double the lateral sway rate,
    // which is what actual walking does.
    const stepY = Math.sin(gait * 2) * 0.05 * moving
    const swayX = Math.sin(gait) * 0.07 * moving
    const rollZ = Math.sin(gait) * 0.012 * moving

    // Never fully still even when standing — breathing.
    const breathe = Math.sin(state.clock.getElapsedTime() * 0.7) * 0.012 * damp

    const parallaxX = mouseRef.current.x * 0.3 * damp
    const parallaxY = mouseRef.current.y * 0.18 * damp

    camera.position.set(
      position[0] + swayX + parallaxX,
      position[1] + stepY + breathe + parallaxY,
      position[2]
    )

    target.current.set(
      lookAt[0] + swayX * 0.5 + parallaxX * 0.6,
      lookAt[1] + stepY * 0.4 + parallaxY * 0.6,
      lookAt[2]
    )
    camera.lookAt(target.current)
    camera.rotation.z += rollZ

    smoothedFov.current = THREE.MathUtils.lerp(smoothedFov.current, fov, 0.08)
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = smoothedFov.current
      camera.updateProjectionMatrix()
    }
  })

  return null
}
