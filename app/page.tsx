import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import Countdown from '@/components/ui/Countdown'
import Hero from '@/components/sections/Hero'
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

      <div className="site-content">
        <Hero />

        {/* Atmospheric interstitial */}
        <div style={{
          textAlign: 'center',
          padding: '2rem 1.5rem 2.5rem',
          background: 'linear-gradient(to bottom, transparent, rgba(2,5,8,0.6), transparent)',
        }}>
          <p style={{
            fontFamily: 'var(--font-cinzel), Georgia, serif',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
            letterSpacing: '0.25em',
            color: 'rgba(232,228,220,0.2)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
          }}>
            You shouldn&apos;t have come here alone.
          </p>
          <Link href="/enter-the-nightmare" className="btn-secondary">
            Enter the Nightmare →
          </Link>
        </div>

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
