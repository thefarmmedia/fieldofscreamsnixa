'use client'

// The site-wide woods. Same visual language as the banner hero — real
// pines, teal ground glow, drifting fog banks — held fixed behind every
// section so scrolling feels like moving through one continuous place
// rather than past a series of dark panels.
//
// The tree plate and cloud texture are the same files the banner uses, so
// there is nothing extra to download once the hero has loaded.
export default function AtmosphereBackground() {
  return (
    <div className="atmosphere-bg" aria-hidden="true">
      <div className="atmosphere-trees" />
      <div className="atmosphere-glow" />
      <div className="atmosphere-fogbank atmosphere-fogbank-1" />
      <div className="atmosphere-fogbank atmosphere-fogbank-2" />
      <div className="atmosphere-fogbank atmosphere-fogbank-3" />
      <div className="atmosphere-vignette" />
      <div className="atmosphere-grain" />
    </div>
  )
}
