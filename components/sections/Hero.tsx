'use client'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export default function Hero() {
  const openingDate = siteConfig.season.openingDate
  const dateStr = openingDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <section className="hero" aria-label="Field of Screams Nixa — Hero">
      {/* Background image */}
      <div className="hero-bg" aria-hidden="true">
        <Image
          src="/images/fos-banner.jpg"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, width: '100%' }}>
        <p className="hero-eyebrow">Nixa, Missouri — Season {siteConfig.season.year}</p>

        <h1 className="hero-title">
          Field of Screams
          <span>Nixa</span>
        </h1>

        <p className="hero-location">Southwest Missouri&apos;s Premier Haunted Attraction</p>

        <p className="hero-tagline">{siteConfig.tagline}</p>

        <div className="hero-attractions">
          <span>Haunted Forest</span>
          <span>•</span>
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

        <p className="hero-dates">
          Opens {dateStr} &nbsp;•&nbsp; {siteConfig.season.hoursDisplay}
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-indicator-line" />
      </div>
    </section>
  )
}
