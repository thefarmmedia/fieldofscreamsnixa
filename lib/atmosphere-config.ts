/**
 * Atmosphere Configuration
 * Centralized knobs for all environmental effects.
 * Adjust these values to tune the intensity of the experience.
 *
 * Usage: "Increase fog 20%" → raise fogOpacityBase and fogOpacityMid by 0.03
 *        "Make clown appear less often" → lower clownPeekFrequency
 */

export const atmosphereConfig = {
  // ─── Forest ──────────────────────────────────────────────────────────
  forestParallaxIntensity: 1.0,    // 0 = off, 1 = full, 0.5 = subtle
  fogOpacityBase: 0.26,            // Background fog layer opacity
  fogOpacityMid: 0.32,             // Midground fog layer opacity
  fogOpacityGround: 0.42,          // Ground fog opacity
  fogOpacityForeground: 0.12,      // Foreground mist (kept low — never obscure text)
  fogSpeedBase: 90,                // Background fog cycle in seconds
  fogSpeedMid: 65,                 // Midground fog cycle in seconds
  fogSpeedGround: 45,              // Ground fog cycle in seconds
  branchMovementPx: 2,             // Max branch sway in pixels
  branchMovementDuration: 18,      // Branch sway cycle in seconds

  // ─── Easter Eggs ─────────────────────────────────────────────────────
  easterEggEnabled: true,
  hiddenEyesEnabled: true,
  hiddenEyesIdleOpacity: 0.22,     // Faint "always watching" glimmer between flashes
  hiddenEyesDurationSec: 8,        // How long eyes stay at full brightness
  hiddenEyesCooldownSec: 14,       // Minimum seconds between full-bright appearances
  hiddenFigureEnabled: true,
  hiddenFigureCooldownSec: 55,     // Minimum seconds between silhouette appearances
  lightningEnabled: true,
  lightningCooldownSec: 75,        // Minimum seconds between lightning events
  lightningDurationMs: 150,        // Duration of the brightness flash

  // ─── Clown ───────────────────────────────────────────────────────────
  clownPeekEnabled: true,
  clownPeekFrequency: 0.15,        // 0-1; lower = rarer
  clownPeekMinTimeSec: 10,         // Min seconds on page before first peek
  clownPeekCooldownSec: 40,        // Min seconds between peeks
  clownPeekMaxPerSession: 5,       // Max peeks per session

  // ─── Coulrophobia ────────────────────────────────────────────────────
  carnivalLightIntensity: 0.8,     // 0-1; lamp glow strength
  carnivalFlickerFrequency: 6,     // Seconds between flicker cycles
  glitchFrequency: 8,              // Seconds between text glitch events
  analogDistortionOpacity: 0.04,   // Scanline/grain overlay opacity
  balloonEnabled: true,
  balloonFrequency: 0.2,           // 0-1; lower = rarer
  balloonMinCooldownSec: 20,       // Min seconds between balloons
  vhsDistortionDurationMs: 200,    // Duration of analog horror flash

  // ─── Night Mode ──────────────────────────────────────────────────────
  nightModeEnabled: true,
  nightModeStartHour: 21,          // 9 PM — site gets slightly darker
  nightModeEndHour: 5,             // 5 AM
  nightModeLateFogBoost: 0.06,     // Additional fog opacity at night
  lateNightMessageHour: 22,        // Hour for "You're up late" message
  lateNightMessageMaxPerSession: 1,// Show once per session
} as const

export type AtmosphereConfig = typeof atmosphereConfig
