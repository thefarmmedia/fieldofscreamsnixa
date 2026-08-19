'use client'

import Hero from '@/components/sections/Hero'

// Rendered instead of the WebGL journey when the browser lacks WebGL, the
// visitor has prefers-reduced-motion set, or Data Saver is on. Reuses the
// real photographic hero rather than a stripped-down duplicate, so the
// non-WebGL experience is still the full designed page.
export default function HorrorFallback() {
  return <Hero />
}
