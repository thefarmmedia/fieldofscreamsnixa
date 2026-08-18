'use client'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export default function Hero() {
  const openingDate = siteConfig.season.openingDate
  const dateStr = openingDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <section className="hero" aria-label="Field of Screams Nixa — Hero">
      {/* Background: real trees, real fog, real actor in the woods — not the
          bright carnival highlight-reel video (read as a party, not a threat)
          and not the blue tunnel shot (read as an indoor hallway, not a forest) */}
      <div className="hero-bg" aria-hidden="true">
        <Image
          src="/images/attraction/forest-woman-teddybear.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
        />
      </div>

      {/* Layered fog — pure CSS, drifts slowly, never a hard-edged asset */}
      <div className="hero-fog" aria-hidden="true">
        <div className="hero-fog-layer hero-fog-layer-1" />
        <div className="hero-fog-layer hero-fog-layer-2" />
        <div className="hero-fog-layer hero-fog-layer-ground" />
      </div>

      {/* Content */}
      <div className="hero-frame">
        <div className="hero-main">
          <div className="hero-index">
            <span className="hero-index-line" aria-hidden="true" />
            <span className="hero-eyebrow">Nixa, Missouri — Season {siteConfig.season.year}</span>
          </div>

          <h1 className="hero-title">
            <Image
              src="/images/sprites/fos-logotype.png"
              alt="Field of Screams Nixa — Haunted Attractions"
              width={650}
              height={460}
              priority
              className="hero-logo-img"
            />
          </h1>

          <p className="hero-tagline">{siteConfig.tagline}</p>

          <div className="hero-attractions">
            <span>Haunted Forest</span>
            <span aria-hidden="true">•</span>
            <span>Coulrophobia</span>
          </div>

          <p className="hero-warning">You shouldn&apos;t have come here alone.</p>

          <div className="hero-cta-group">
            <a
              href={siteConfig.tickets.url}
              className="btn-ticket"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'ticket_click', { location: 'hero' })
                }
              }}
            >
              Get Tickets
            </a>
            <Link href="/#nightmare" className="btn-secondary">
              Explore the Attractions
            </Link>
          </div>
        </div>

        <div className="hero-meta-bar">
          <span>Southwest Missouri&apos;s Premier Haunted Attraction</span>
          <span className="hero-meta-divider" aria-hidden="true" />
          <span>Opens {dateStr}</span>
          <span className="hero-meta-divider" aria-hidden="true" />
          <span>{siteConfig.season.hoursDisplay}</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-indicator-line" />
      </div>
    </section>
  )
}
