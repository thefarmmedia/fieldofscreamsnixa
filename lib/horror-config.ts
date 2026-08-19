/**
 * Horror World Configuration
 * Scene pacing, camera keyframes, and environmental text for the
 * "Enter the Nightmare" WebGL intro. Editorial copy/dates/tickets live in
 * site-config.ts — this file is presentation/pacing only.
 *
 * The intro is one continuous camera dolly (Arrival -> Gate -> blackout)
 * driven by a single scroll-linked progress value (0-1) across
 * `heightVh` of real, crawlable DOM height, pinned via CSS `sticky`. The
 * blackout must reach full opacity (see blackoutEnd) comfortably before
 * `(heightVh - 100) / heightVh`, the point at which the sticky canvas
 * naturally starts releasing back into normal document flow — otherwise
 * the release would be visible instead of hidden in black.
 */

export type CameraKeyframe = {
  t: number
  position: [number, number, number]
  lookAt: [number, number, number]
  fov: number
}

export type EnvironmentalTextCue = {
  at: number
  window: number
  text: string
  sub?: string
}

export const horrorConfig = {
  intro: {
    heightVh: 600,

    fog: {
      color: '#04060a',
      nearDensity: 0.035,
      farDensity: 0.09,
    },

    // Eye height ~1.6m, rising as the trail climbs — you're walking UP
    // through the woods, not gliding along a level rail. The x values
    // weave a little so the path bends around trees instead of running
    // dead straight, and each lookAt leads slightly into the next bend
    // the way you look where you're about to walk.
    camera: [
      { t: 0, position: [0, 1.62, 22], lookAt: [0.4, 1.5, 12], fov: 46 },
      { t: 0.2, position: [-0.7, 1.78, 12], lookAt: [0.5, 1.7, 3], fov: 44 },
      { t: 0.38, position: [0.5, 1.95, 3], lookAt: [-0.3, 1.9, -6], fov: 42 },
      { t: 0.55, position: [-0.4, 2.12, -4], lookAt: [0.2, 2.1, -13], fov: 40 },
      { t: 0.7, position: [0.3, 2.3, -9], lookAt: [0, 2.3, -19], fov: 38 },
      { t: 1, position: [-0.2, 2.55, -16], lookAt: [0, 2.5, -30], fov: 42 },
    ] as CameraKeyframe[],

    text: [
      { at: 0.1, window: 0.1, text: 'FIELD OF SCREAMS', sub: 'THE NIGHTMARE BEGINS HERE' },
      { at: 0.3, window: 0.08, text: 'SCROLL TO ENTER' },
      { at: 0.48, window: 0.09, text: 'YOU CAN STILL TURN BACK' },
    ] as EnvironmentalTextCue[],

    // Gate sits at world z=-10 (see IntroEnvironment) — camera crosses it
    // around t=0.74 given the keyframes above, so open-before-arrival and
    // blackout-right-after line up with the geometry instead of just the
    // abstract progress number.
    gateOpenAt: 0.6,
    blackoutStart: 0.74,
    blackoutEnd: 0.8,

    // The single jump scare — fires after the blackout is fully opaque so
    // the face arrives out of pure black, not out of a half-lit forest.
    jumpScareAt: 0.85,
  },
} as const
