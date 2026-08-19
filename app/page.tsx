import type { Metadata } from 'next'
import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import Countdown from '@/components/ui/Countdown'
import HorrorWorldLoader from '@/components/horror/HorrorWorldLoader'
import NightmareSelector from '@/components/sections/NightmareSelector'
import GallerySection from '@/components/sections/GallerySection'
import FAQSection from '@/components/sections/FAQSection'
import LocationSection from '@/components/sections/LocationSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  alternates: {
    canonical: `https://${siteConfig.domain}`,
  },
}

export default function HomePage() {
  return (
    <>
      <AtmosphereBackground />
      <Navigation />

      {/* Real crawlable H1 — the WebGL journey renders these words inside
          the 3D world, but search engines and screen readers get them here. */}
      <h1 className="sr-only">
        Field of Screams Nixa — Haunted Forest &amp; Coulrophobia Haunted Attractions in Nixa, Missouri
      </h1>

      <div className="site-content">
        {/* The homepage IS the experience: a scroll-driven journey through
            the woods to the gate. Falls back to the static photographic
            hero when WebGL is unavailable or reduced-motion is set. */}
        <HorrorWorldLoader />

        <NightmareSelector />

        <Countdown />

        <TestimonialsSection />

        <GallerySection />

        <FAQSection limit={6} />

        <LocationSection />

        {/* Final CTA — full-bleed, real photo, no more chances to look away */}
        <section className="final-cta" aria-labelledby="final-cta-heading">
          <div className="final-cta-bg" aria-hidden="true">
            <Image
              src="/images/attraction/red-wood-door.jpg"
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: '50% 50%' }}
            />
          </div>
          <div className="final-cta-content">
            <p className="final-cta-eyebrow">{siteConfig.season.year} Season</p>
            <h2 className="final-cta-heading" id="final-cta-heading">
              Are You Ready?
            </h2>
            <p className="final-cta-sub">
              Nixa, Missouri &nbsp;•&nbsp; October {siteConfig.season.year}
            </p>
            <a href={siteConfig.tickets.url} className="btn-ticket final-cta-btn">
              Secure Your Ticket
            </a>
          </div>
        </section>

        <Footer />
      </div>

      <StickyTicketCTA />
    </>
  )
}
