'use client'

import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction, KernelSize } from 'postprocessing'
import * as THREE from 'three'
import { useMemo } from 'react'

/**
 * The post-processing stack is what separates "dark geometry in fog" from
 * something cinematic — bloom blooms the practical lights, DOF throws the
 * far forest out of focus so depth reads, grain + vignette + a touch of
 * chromatic aberration sell it as captured footage rather than a render.
 *
 * `tier` lets mobile drop the expensive passes (DOF especially) while
 * keeping the cheap ones that carry most of the mood.
 */
export default function Effects({ tier }: { tier: 'high' | 'low' }) {
  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0009), [])

  if (tier === 'low') {
    return (
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.5}
          kernelSize={KernelSize.MEDIUM}
          mipmapBlur
        />
        <Vignette offset={0.28} darkness={0.85} blendFunction={BlendFunction.NORMAL} />
        <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.35} />
      </EffectComposer>
    )
  }

  return (
    <EffectComposer multisampling={2}>
      <DepthOfField focusDistance={0.012} focalLength={0.05} bokehScale={4} height={480} />
      <Bloom
        intensity={2.1}
        luminanceThreshold={0.15}
        luminanceSmoothing={0.6}
        kernelSize={KernelSize.LARGE}
        mipmapBlur
      />
      <ChromaticAberration
        offset={caOffset}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={true}
        modulationOffset={0.4}
      />
      <Vignette offset={0.24} darkness={0.9} blendFunction={BlendFunction.NORMAL} />
      <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.42} />
    </EffectComposer>
  )
}
