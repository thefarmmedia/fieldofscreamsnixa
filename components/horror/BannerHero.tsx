'use client'

import LivingBanner from './LivingBanner'
import { siteConfig } from '@/lib/site-config'

/**
 * The top of the website: the Field of Screams banner, alive. Full
 * viewport, no gate, no button to get past — you land on it and scroll.
 */
export default function BannerHero() {
  return (
    <section className="banner-hero" aria-label="Field of Screams Nixa">
      <LivingBanner>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="lb-logo"
          src="/images/sprites/fos-logotype.png"
          alt="Field of Screams Nixa — Haunted Attractions"
          fetchPriority="high"
        />

        <p className="lb-tagline">{siteConfig.tagline}</p>

        <div className="lb-cta-row">
          <a href={siteConfig.tickets.url} target="_blank" rel="noopener noreferrer" className="btn-ticket">
            Get Tickets
          </a>
          <a href="#choose" className="btn-secondary">
            Choose Your Nightmare
          </a>
        </div>
      </LivingBanner>

      <div className="lb-scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <span className="lb-scroll-line" />
      </div>
    </section>
  )
}
