'use client'

// Cutouts of all four spirit figures from the brand banner art
// (public/images/fos-banner.jpg). Each flies in on a wavering path and
// settles into the hero scene, echoing their original flanking positions
// in the static artwork. mix-blend-mode: screen makes the near-black
// backdrop of each crop disappear against the dark site background, and
// each PNG also carries a real alpha channel derived from its own
// luminance, so there's no visible bounding box either way.
const GHOSTS = [
  { src: '/images/sprites/ghost-forest.png', className: 'flying-ghost-1' },
  { src: '/images/sprites/ghost-2.png', className: 'flying-ghost-2' },
  { src: '/images/sprites/ghost-3.png', className: 'flying-ghost-3' },
  { src: '/images/sprites/ghost-4.png', className: 'flying-ghost-4' },
]

export default function FlyingGhost() {
  return (
    <>
      {GHOSTS.map((g) => (
        <img
          key={g.src}
          src={g.src}
          alt=""
          aria-hidden="true"
          className={`flying-ghost ${g.className}`}
        />
      ))}
    </>
  )
}
