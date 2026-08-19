'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Instances, Instance, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { horrorConfig } from '@/lib/horror-config'

// Deterministic PRNG so the forest layout is stable across renders/reloads.
function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Tree = {
  position: [number, number, number]
  height: number
  radius: number
  rotationY: number
  hasCanopy: boolean
  canopyScale: number
}

function generateTrees(count: number): Tree[] {
  const rand = mulberry32(1337)
  const trees: Tree[] = []
  for (let i = 0; i < count; i++) {
    const z = 18 - rand() * 46 // 18 down to -28
    const side = rand() < 0.5 ? -1 : 1
    const x = side * (3 + rand() * 11)
    const height = 4.5 + rand() * 5
    trees.push({
      position: [x, 0, z],
      height,
      radius: 0.18 + rand() * 0.16,
      rotationY: rand() * Math.PI,
      hasCanopy: rand() < 0.6,
      canopyScale: 1.4 + rand() * 1.3,
    })
  }
  return trees
}

function Forest() {
  const trees = useMemo(() => generateTrees(90), [])
  const trunks = trees
  const canopies = trees.filter((t) => t.hasCanopy)
  const branchTrees = trees.filter((t) => !t.hasCanopy)

  return (
    <group>
      <Instances limit={trunks.length}>
        <cylinderGeometry args={[0.12, 0.28, 1, 6]} />
        <meshStandardMaterial color="#1a1510" roughness={1} />
        {trunks.map((t, i) => (
          <Instance
            key={i}
            position={[t.position[0], t.height / 2, t.position[2]]}
            scale={[t.radius * 4, t.height, t.radius * 4]}
            rotation={[0, t.rotationY, 0]}
          />
        ))}
      </Instances>

      <Instances limit={Math.max(canopies.length, 1)}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#0e1a0a" roughness={1} flatShading />
        {canopies.map((t, i) => (
          <Instance
            key={i}
            position={[t.position[0], t.height + t.canopyScale * 0.5, t.position[2]]}
            scale={[t.canopyScale, t.canopyScale * 0.85, t.canopyScale]}
            rotation={[t.rotationY * 0.4, t.rotationY, 0]}
          />
        ))}
      </Instances>

      <Instances limit={Math.max(branchTrees.length * 3, 1)}>
        <cylinderGeometry args={[0.02, 0.05, 1, 4]} />
        <meshStandardMaterial color="#1a1510" roughness={1} />
        {branchTrees.flatMap((t, i) =>
          [0, 1, 2].map((b) => {
            const rand = mulberry32(i * 97 + b * 13)
            const angle = rand() * Math.PI * 2
            const tilt = 0.5 + rand() * 0.6
            const len = 1.2 + rand() * 1.4
            const y = t.height * (0.6 + rand() * 0.35)
            return (
              <Instance
                key={`${i}-${b}`}
                position={[t.position[0], y, t.position[2]]}
                rotation={[tilt, angle, 0]}
                scale={[1, len, 1]}
              />
            )
          })
        )}
      </Instances>
    </group>
  )
}

function FogDriver({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { scene } = useThree()
  const fog = useMemo(
    () => new THREE.FogExp2(horrorConfig.intro.fog.color, horrorConfig.intro.fog.nearDensity),
    []
  )
  useMemo(() => {
    scene.fog = fog
    scene.background = new THREE.Color(horrorConfig.intro.fog.color)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFrame(() => {
    const { nearDensity, farDensity } = horrorConfig.intro.fog
    fog.density = THREE.MathUtils.lerp(nearDensity, farDensity, progressRef.current)
  })
  return null
}

function DistantGlow() {
  const light = useRef<THREE.PointLight>(null)
  useFrame((state) => {
    if (!light.current) return
    const t = state.clock.getElapsedTime()
    light.current.intensity = 2.2 + Math.sin(t * 0.6) * 0.4 + Math.sin(t * 3.1) * 0.15
  })
  return (
    <group position={[2.5, 3, -34]}>
      <pointLight ref={light} color="#a01a10" intensity={2.2} distance={22} decay={2} />
      <mesh>
        <sphereGeometry args={[0.35, 12, 12]} />
        <meshBasicMaterial color="#c22a12" />
      </mesh>
    </group>
  )
}

function Gate({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const leftPivot = useRef<THREE.Group>(null)
  const rightPivot = useRef<THREE.Group>(null)
  const lantern = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    const { gateOpenAt } = horrorConfig.intro
    const openAmount = THREE.MathUtils.smoothstep(progressRef.current, gateOpenAt, gateOpenAt + 0.1)
    const angle = openAmount * (Math.PI / 2.4)
    if (leftPivot.current) leftPivot.current.rotation.y = angle
    if (rightPivot.current) rightPivot.current.rotation.y = -angle

    if (lantern.current) {
      const t = state.clock.getElapsedTime()
      const flicker = 1 + Math.sin(t * 9) * 0.08 + (Math.sin(t * 23) > 0.92 ? -0.5 : 0)
      lantern.current.intensity = 1.8 * flicker
    }
  })

  const postMat = <meshStandardMaterial color="#161210" roughness={0.9} metalness={0.15} />

  return (
    <group position={[0, 0, -10]}>
      {/* Left post, hinged at its inner edge */}
      <group ref={leftPivot} position={[-3.2, 0, 0]}>
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 5, 8]} />
          {postMat}
        </mesh>
      </group>
      {/* Right post */}
      <group ref={rightPivot} position={[3.2, 0, 0]}>
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 5, 8]} />
          {postMat}
        </mesh>
      </group>

      {/* Top beam (fixed) */}
      <mesh position={[0, 4.9, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.14, 6.8, 8]} />
        {postMat}
      </mesh>

      {/* Sign plank — the "FIELD OF SCREAMS" text itself lives in the
          real HTML overlay (EnvironmentalText), not baked into WebGL, so
          it stays crawlable/accessible and carries no font-CDN dependency */}
      <mesh position={[0, 5.6, 0.05]}>
        <boxGeometry args={[3.6, 0.7, 0.06]} />
        <meshStandardMaterial color="#0d0a08" roughness={0.95} />
      </mesh>

      {/* Lantern */}
      <mesh position={[1.7, 4.3, 0.3]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="#e8a83c" />
      </mesh>
      <pointLight ref={lantern} position={[1.7, 4.3, 0.3]} color="#e8a83c" intensity={1.8} distance={9} decay={2} />
    </group>
  )
}

export default function IntroEnvironment({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>
}) {
  return (
    <>
      <ambientLight intensity={0.34} color="#4a5568" />
      <directionalLight position={[-6, 10, 8]} intensity={0.4} color="#5a6a7d" />
      <hemisphereLight args={['#2a3550', '#020202', 0.3]} />
      <FogDriver progressRef={progressRef} />
      <DistantGlow />
      <Gate progressRef={progressRef} />
      <Forest />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
        <planeGeometry args={[80, 100]} />
        <meshStandardMaterial color="#0a0806" roughness={1} />
      </mesh>
      <Sparkles count={140} scale={[16, 6, 50]} size={1.4} speed={0.15} opacity={0.35} color="#aab4c0" />
    </>
  )
}
