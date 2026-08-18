'use client'

// Fixed, persistent site atmosphere — dark base, slow-drifting fog, film
// grain, vignette. No illustrated trees/eyes/figures: those read as
// cartoonish next to real attraction photography. This is pure texture
// and light, the way a real dark space actually looks, and it stays
// visible behind every section as the page scrolls rather than living
// only in the hero.
export default function AtmosphereBackground() {
  return (
    <div className="atmosphere-bg" aria-hidden="true">
      <div className="atmosphere-fog atmosphere-fog-1" />
      <div className="atmosphere-fog atmosphere-fog-2" />
      <div className="atmosphere-fog atmosphere-fog-3" />
      <div className="atmosphere-fog-ground" />
      <div className="atmosphere-vignette" />
      <div className="atmosphere-grain" />
    </div>
  )
}
