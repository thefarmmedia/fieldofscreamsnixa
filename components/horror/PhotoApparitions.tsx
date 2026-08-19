'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Real Field of Screams photography living inside the 3D world — the
 * characters hang in the trees along the trail like something you're
 * walking past rather than a gallery you're browsing. Each plane is
 * invisible until the camera is close enough for the fog to give it up,
 * so they emerge and vanish as you travel instead of just sitting there.
 *
 * This is what keeps the world specifically *theirs* rather than generic
 * procedural geometry.
 */

type Apparition = {
  src: string
  position: [number, number, number]
  scale: [number, number]
  rotationY: number
  /** How close (world units) the camera must be before it's visible */
  revealRange: number
}

const APPARITIONS: Apparition[] = [
  { src: '/images/attraction/forest-figure-green.jpg', position: [-2.4, 2.3, 6], scale: [3, 4.2], rotationY: 0.42, revealRange: 16 },
  { src: '/images/attraction/twisted-figure-red.jpg', position: [2.6, 2.2, -1], scale: [3.2, 4], rotationY: -0.45, revealRange: 16 },
  { src: '/images/attraction/doll-girl-red.jpg', position: [-2.5, 2.1, -8], scale: [2.8, 3.9], rotationY: 0.4, revealRange: 16 },
  { src: '/images/attraction/hanging-figure.jpg', position: [2.7, 2.7, -15], scale: [2.9, 3.8], rotationY: -0.4, revealRange: 16 },
  { src: '/images/attraction/vampire-pale-dark.jpg', position: [-2.6, 2.2, -22], scale: [3.4, 2.6], rotationY: 0.45, revealRange: 16 },
  { src: '/images/attraction/clown-skull-dark.jpg', position: [2.6, 2.4, -28], scale: [2.8, 4], rotationY: -0.42, revealRange: 16 },
]

function Apparition({ data }: { data: Apparition }) {
  const texture = useTexture(data.src)
  const mat = useRef<THREE.MeshBasicMaterial>(null)
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!mat.current || !mesh.current) return
    const dist = state.camera.position.distanceTo(mesh.current.position)

    // Fade in as the camera approaches (smoothstep needs min < max, so
    // invert the result rather than the arguments), and fade back out
    // again once it's nearly on top of you so it never reads as a poster.
    const near = 1 - THREE.MathUtils.smoothstep(dist, data.revealRange * 0.18, data.revealRange)
    const tooClose = THREE.MathUtils.smoothstep(dist, 1.5, 3.5)
    const t = state.clock.getElapsedTime()
    // Never fully solid — they read as something glimpsed, not a poster.
    const breathe = 0.82 + Math.sin(t * 0.7 + data.position[2]) * 0.12

    mat.current.opacity = near * tooClose * breathe * 0.9
    mesh.current.position.y = data.position[1] + Math.sin(t * 0.4 + data.position[0]) * 0.06
  })

  return (
    <mesh ref={mesh} position={data.position} rotation={[0, data.rotationY, 0]}>
      <planeGeometry args={data.scale} />
      <meshBasicMaterial
        ref={mat}
        map={texture}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function PhotoApparitions() {
  const { scene, camera } = useThree()
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      ;(window as any).__fosScene = scene
      ;(window as any).__fosCam = camera
    }
  }, [scene, camera])
  return (
    <group name="apparitions">
      {APPARITIONS.map((a) => (
        <Apparition key={a.src + a.position[2]} data={a} />
      ))}
    </group>
  )
}
