'use client'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import FlyingGhost from '@/components/environment/FlyingGhost'
import VideoBackground from '@/components/ui/VideoBackground'

export default function Hero() {
  const openingDate = siteConfig.season.openingDate
  const dateStr = openingDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <section className="hero" aria-label="Field of Screams Nixa — Hero">
      {/* Background: real event footage, falls back to a still on mobile/reduced-motion */}
      <VideoBackground
        className="hero-bg"
        src="/videos/hero-loop.mp4"
        poster="/images/hero-poster.jpg"
      />

      <FlyingGhost />

      {/* Content */}
      <div className="hero-frame">
        <div className="hero-main">
          <div className="hero-index">
            <span className="hero-index-line" aria-hidden="true" />
            <span className="hero-eyebrow">Nixa, Missouri — Season {siteConfig.season.year}</span>
          </div>

          <h1 className="hero-title">
            Field of Screams
            <span>Nixa</span>
          </h1>

          <p className="hero-tagline">{siteConfig.tagline}</p>

          <div className="hero-cta-surface">
            <div className="hero-attractions">
              <span>Haunted Forest</span>
              <span aria-hidden="true">•</span>
              <span>Coulrophobia</span>
            </div>

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
