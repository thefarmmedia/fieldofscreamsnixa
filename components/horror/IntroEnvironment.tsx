'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Instances, Instance, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { horrorConfig } from '@/lib/horror-config'
import Silhouettes from './Silhouettes'

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

/** The trail climbs as it goes: ground height at a given depth. Camera
 *  keyframes in horror-config rise on the same grade, so you are walking
 *  up a slope rather than along a flat plane. */
export function groundHeightAt(z: number) {
  // Higher the further in (more negative z) you go.
  return THREE.MathUtils.clamp((18 - z) * 0.026, 0, 1.6)
}

function generateTrees(count: number): Tree[] {
  const rand = mulberry32(1337)
  const trees: Tree[] = []
  for (let i = 0; i < count; i++) {
    const z = 18 - rand() * 46 // 18 down to -28
    const side = rand() < 0.5 ? -1 : 1
    // Pulled in close to the trail — you are walking THROUGH the woods,
    // with trunks passing near the camera, not down a clearing.
    const x = side * (1.9 + rand() * 9)
    const height = 4.5 + rand() * 5
    trees.push({
      position: [x, groundHeightAt(z), z],
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
        <meshStandardMaterial color="#2b241b" roughness={1} />
        {trunks.map((t, i) => (
          <Instance
            key={i}
            position={[t.position[0], t.position[1] + t.height / 2, t.position[2]]}
            scale={[t.radius * 4, t.height, t.radius * 4]}
            rotation={[0, t.rotationY, 0]}
          />
        ))}
      </Instances>

      <Instances limit={Math.max(canopies.length, 1)}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#16240f" roughness={1} flatShading />
        {canopies.map((t, i) => (
          <Instance
            key={i}
            position={[t.position[0], t.position[1] + t.height + t.canopyScale * 0.5, t.position[2]]}
            scale={[t.canopyScale, t.canopyScale * 0.85, t.canopyScale]}
            rotation={[t.rotationY * 0.4, t.rotationY, 0]}
          />
        ))}
      </Instances>

      <Instances limit={Math.max(branchTrees.length * 3, 1)}>
        <cylinderGeometry args={[0.02, 0.05, 1, 4]} />
        <meshStandardMaterial color="#2b241b" roughness={1} />
        {branchTrees.flatMap((t, i) =>
          [0, 1, 2].map((b) => {
            const rand = mulberry32(i * 97 + b * 13)
            const angle = rand() * Math.PI * 2
            const tilt = 0.5 + rand() * 0.6
            const len = 1.2 + rand() * 1.4
            const y = t.position[1] + t.height * (0.6 + rand() * 0.35)
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
    light.current.intensity = 1.9 + Math.sin(t * 0.35) * 0.25
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

/** Ground that actually climbs, so the slope is visible underfoot rather
 *  than only implied by the camera rising. Displaces a plane's vertices
 *  along the same grade the camera follows, plus a little roll so it
 *  reads as uneven ground rather than a ramp. */
function SlopedGround() {
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(90, 110, 40, 60)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i) // pre-rotation, this maps to world z
      const worldZ = -y - 10
      const h = groundHeightAt(worldZ)
      const bumps = Math.sin(x * 0.5) * 0.08 + Math.sin(worldZ * 0.7 + x * 0.2) * 0.1
      pos.setZ(i, h + bumps)
    }
    g.computeVertexNormals()
    return g
  }, [])

  return (
    <mesh geometry={geom} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
      <meshStandardMaterial color="#12100c" roughness={1} />
    </mesh>
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
      // No fixture flicker — the light in these woods is the moon. This is
      // a dim, steady oil lantern with only a faint breath of movement.
      const t = state.clock.getElapsedTime()
      lantern.current.intensity = 0.75 + Math.sin(t * 1.6) * 0.06
    }
  })

  const postMat = <meshStandardMaterial color="#241d18" roughness={0.9} metalness={0.15} />

  return (
    <group position={[0, groundHeightAt(-10), -10]}>
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
        <meshBasicMaterial color="#d99a42" />
      </mesh>
      <pointLight ref={lantern} position={[1.7, 4.3, 0.3]} color="#e0a04a" intensity={0.75} distance={8} decay={2} />
    </group>
  )
}

/** The moon itself, hung low and back over the trail so it reads as the
 *  source of everything else. Steady — the moon does not flicker. */
function Moon() {
  return (
    <group position={[-9, 17, -40]}>
      <mesh>
        <sphereGeometry args={[1.5, 20, 20]} />
        <meshBasicMaterial color="#cfd8e6" fog={false} />
      </mesh>
      {/* Halo through the haze */}
      <mesh>
        <sphereGeometry args={[3.4, 20, 20]} />
        <meshBasicMaterial
          color="#7f93b0"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </mesh>
      <pointLight color="#aebdd4" intensity={1.4} distance={70} decay={1.4} />
    </group>
  )
}

/** Moonlight raking down through the canopy. These are placed along the
 *  whole trail and angled consistently — all from the moon's direction —
 *  so as the camera walks forward it passes through them one after
 *  another and the light sweeps over you. That read (walking under trees
 *  in moonlight) is the point; nothing here flickers like a fixture.
 *  Only a slow breathing shift, as if branches are moving overhead. */
function Moonbeams() {
  const group = useRef<THREE.Group>(null)
  const beams = useMemo(() => {
    const rand = mulberry32(4242)
    const out: Array<{ pos: [number, number, number]; scale: number; phase: number }> = []
    // Spread down the length of the trail the camera actually travels.
    for (let z = 14; z > -34; z -= 3.4) {
      const x = (rand() - 0.5) * 11
      out.push({
        pos: [x, groundHeightAt(z) + 7.5, z + (rand() - 0.5) * 1.6],
        scale: 0.7 + rand() * 0.75,
        phase: rand() * Math.PI * 2,
      })
    }
    return out
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.children.forEach((child, i) => {
      const mesh = child as THREE.Mesh
      const mat = mesh.material as THREE.MeshBasicMaterial
      // Slow canopy movement, not a flicker: never fully off, never a snap.
      mat.opacity = 0.055 + Math.sin(t * 0.28 + beams[i].phase) * 0.028
    })
  })

  return (
    <group ref={group}>
      {beams.map((b, i) => (
        <mesh
          key={i}
          position={b.pos}
          // Consistent tilt for every beam — one moon, one direction.
          rotation={[0.2, 0, 0.16]}
          scale={[b.scale, 1, b.scale]}
        >
          <coneGeometry args={[1.9, 15, 10, 1, true]} />
          <meshBasicMaterial
            color="#93a9c6"
            transparent
            opacity={0.055}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Dappled moonlight on the ground the camera walks over — the pools of
 *  light that fall between branches. Keeps the trail from reading as a
 *  flat unlit plane. */
function MoonPools() {
  const pools = useMemo(() => {
    const rand = mulberry32(99)
    const out: Array<{ pos: [number, number, number]; r: number }> = []
    for (let z = 14; z > -34; z -= 2.6) {
      out.push({ pos: [(rand() - 0.5) * 9, groundHeightAt(z) + 0.02, z], r: 0.9 + rand() * 1.5 })
    }
    return out
  }, [])
  return (
    <group>
      {pools.map((p, i) => (
        <mesh key={i} position={p.pos} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[p.r, 14]} />
          <meshBasicMaterial
            color="#7288a6"
            transparent
            opacity={0.07}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
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
      {/* Key light comes from the moon's actual position, so the trees are
          lit from the same direction the beams fall. */}
      <ambientLight intensity={0.42} color="#4a5c7c" />
      <directionalLight position={[-9, 17, -40]} intensity={0.9} color="#aebdd4" />
      <hemisphereLight args={['#3c4a68', '#050505', 0.55]} />
      <FogDriver progressRef={progressRef} />
      <Moon />
      <DistantGlow />
      <Moonbeams />
      <MoonPools />
      <Silhouettes />
      <Gate progressRef={progressRef} />
      <Forest />
      <SlopedGround />
      <Sparkles count={140} scale={[16, 6, 50]} size={1.4} speed={0.15} opacity={0.35} color="#aab4c0" />
    </>
  )
}
