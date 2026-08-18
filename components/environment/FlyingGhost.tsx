'use client'

// A cutout of one of the spirits from the brand banner art, cropped from
// /public/images/fos-banner.jpg. It flies in on a wavering path and settles
// into the hero scene. mix-blend-mode: screen makes the near-black backdrop
// of the crop disappear against the dark site background — no alpha channel
// needed, the same trick used to composite flame/smoke footage shot on black.
export default function FlyingGhost() {
  return (
    <img
      src="/images/sprites/ghost-forest.png"
      alt=""
      aria-hidden="true"
      className="flying-ghost"
    />
  )
}
