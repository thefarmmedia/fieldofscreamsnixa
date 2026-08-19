'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { groundHeightAt } from './IntroEnvironment'

/**
 * Figures standing between the trees — pure black silhouettes, never lit,
 * never detailed. Deliberately NOT photographs of the cast: showing the
 * actual actors online spoils the attraction, and a shape you can't
 * identify is scarier than a portrait you can.
 *
 * Each one fades up only inside a narrow band of camera distance, so you
 * catch it in your periphery and it's gone by the time you look again.
 * Some are marked `occasional` and are re-rolled per visit, so repeat
 * visitors don't get an identical walk.
 */

type Figure = {
  position: [number, number, number]
  height: number
  /** Center of the distance band where it's visible */
  revealAt: number
  /** Half-width of that band */
  band: number
  occasional?: boolean
}

const FIGURES: Figure[] = [
  { position: [-3.4, 0, 4], height: 1.85, revealAt: 11, band: 4 },
  { position: [3.9, 0, -3], height: 1.9, revealAt: 12, band: 4.5, occasional: true },
  { position: [-4.6, 0, -11], height: 1.8, revealAt: 12, band: 4 },
  { position: [4.2, 0, -18], height: 1.95, revealAt: 13, band: 4.5, occasional: true },
  { position: [-3.1, 0, -24], height: 1.85, revealAt: 12, band: 4 },
  { position: [2.4, 0, -31], height: 2.0, revealAt: 14, band: 5 },
]

function Figure({ data }: { data: Figure }) {
  const group = useRef<THREE.Group>(null)
  const bodyMat = useRef<THREE.MeshBasicMaterial>(null)
  const headMat = useRef<THREE.MeshBasicMaterial>(null)

  useFrame((state) => {
    if (!group.current) return
    const dist = state.camera.position.distanceTo(group.current.position)
    // Visible only inside a band around revealAt — invisible far away
    // (fog) and gone again once you're past it.
    const inBand = 1 - THREE.MathUtils.clamp(Math.abs(dist - data.revealAt) / data.band, 0, 1)
    const o = inBand * inBand * 0.92
    if (bodyMat.current) bodyMat.current.opacity = o
    if (headMat.current) headMat.current.opacity = o
    // Almost imperceptible sway — enough that it doesn't read as a post.
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.25 + data.position[2]) * 0.05
  })

  const h = data.height
  return (
    <group ref={group} position={[data.position[0], groundHeightAt(data.position[2]), data.position[2]]}>
      {/* Torso/legs — a tapered column, human proportioned */}
      <mesh position={[0, h * 0.42, 0]}>
        <capsuleGeometry args={[h * 0.13, h * 0.62, 4, 8]} />
        <meshBasicMaterial ref={bodyMat} color="#000000" transparent opacity={0} depthWrite={false} fog={false} />
      </mesh>
      {/* Head */}
      <mesh position={[0, h * 0.9, 0]}>
        <sphereGeometry args={[h * 0.1, 10, 10]} />
        <meshBasicMaterial ref={headMat} color="#000000" transparent opacity={0} depthWrite={false} fog={false} />
      </mesh>
    </group>
  )
}

export default function Silhouettes() {
  // Re-rolled once per mount: the "occasional" figures aren't there on
  // every visit. Atmosphere only — never navigation or content.
  const active = useMemo(() => FIGURES.filter((f) => !f.occasional || Math.random() < 0.55), [])

  return (
    <group name="silhouettes">
      {active.map((f) => (
        <Figure key={f.position.join(',')} data={f} />
      ))}
    </group>
  )
}
