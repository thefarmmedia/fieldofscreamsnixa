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
      <div className="atmosphere-moonlight" />
      {/* Existing transparent wraith artwork, glimpsed between the trees. */}
      {[1, 3, 4].map((ghost, i) => (
        <div key={ghost} className={`atmosphere-apparition atmosphere-apparition-${i + 1}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/wraiths/wraith-${ghost}.webp`} alt="" draggable={false} />
        </div>
      ))}
      <div className="atmosphere-fogbank atmosphere-fogbank-1" />
      <div className="atmosphere-fogbank atmosphere-fogbank-2" />
      <div className="atmosphere-fogbank atmosphere-fogbank-3" />
      <div className="atmosphere-vignette" />
      <div className="atmosphere-grain" />
    </div>
  )
}
