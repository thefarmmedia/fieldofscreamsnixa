import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import ForestEnvironment from '@/components/environment/ForestEnvironment'
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
      <ForestEnvironment />
      <Navigation />

      <div className="site-content">
        <Hero />

        {/* Atmospheric interstitial */}
        <div style={{
          textAlign: 'center',
          padding: '2rem 1.5rem',
          background: 'linear-gradient(to bottom, transparent, rgba(2,5,8,0.6), transparent)',
        }}>
          <p style={{
            fontFamily: 'var(--font-cinzel), Georgia, serif',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
            letterSpacing: '0.25em',
            color: 'rgba(232,228,220,0.2)',
            textTransform: 'uppercase',
          }}>
            You shouldn&apos;t have come here alone.
          </p>
        </div>

        <NightmareSelector />

        <Countdown />

        <TestimonialsSection />

        <GallerySection />

        <FAQSection limit={6} />

        <LocationSection />

        {/* Final CTA */}
        <section style={{
          textAlign: 'center',
          padding: '5rem 1.5rem 6rem',
          borderTop: '1px solid rgba(196,26,0,0.1)',
          background: 'linear-gradient(to bottom, transparent, rgba(196,26,0,0.03), transparent)',
        }}>
          <p style={{
            fontFamily: 'var(--font-cinzel), Georgia, serif',
            fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
            letterSpacing: '0.3em',
            color: 'var(--blood)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            {siteConfig.season.year} Season
          </p>
          <h2 style={{
            fontFamily: 'var(--font-cinzel), Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: 'var(--bone-light)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.75rem',
          }}>
            Are You Ready?
          </h2>
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(232,228,220,0.4)',
            marginBottom: '2.5rem',
            letterSpacing: '0.08em',
          }}>
            Nixa, Missouri &nbsp;•&nbsp; October {siteConfig.season.year}
          </p>
          <a href={siteConfig.tickets.url} className="btn-ticket" style={{ fontSize: '0.9rem', padding: '1rem 2.5rem' }}>
            Secure Your Ticket
          </a>
        </section>

        <Footer />
      </div>

      <StickyTicketCTA />
    </>
  )
}
