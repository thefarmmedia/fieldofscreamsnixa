'use client'

import dynamic from 'next/dynamic'

// Three.js/R3F/drei/GSAP are heavy — keep them out of the route's initial
// JS entirely and load as a separate chunk only when this mounts.
// HorrorWorld itself still gates on WebGL/reduced-motion support before
// touching a canvas.
const HorrorWorld = dynamic(() => import('./HorrorWorld'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '90vh', background: '#010204' }} aria-hidden="true" />,
})

export default function HorrorWorldLoader() {
  return <HorrorWorld />
}
