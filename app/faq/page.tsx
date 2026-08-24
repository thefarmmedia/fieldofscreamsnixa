import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import FAQSection from '@/components/sections/FAQSection'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: `FAQ | ${siteConfig.name}`,
  description: `Frequently asked questions about Field of Screams Nixa haunted attraction in Nixa, Missouri. Tickets, hours, age recommendations, and more.`,
  alternates: {
    canonical: `https://${siteConfig.domain}/faq`,
  },
}

export default function FAQPage() {
  return (
    <>
      <AtmosphereBackground />
      <AnnouncementBar />
      <Navigation />

      <div className="site-content">
        <div style={{ paddingTop: '7rem', paddingBottom: '2rem', textAlign: 'center' }}>
          <p className="section-label">Field of Screams Nixa</p>
          <h1 style={{
            fontFamily: 'var(--font-cinzel), Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--bone-light)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Frequently Asked Questions
          </h1>
        </div>

        <FAQSection />

        <Footer />
      </div>

      <StickyTicketCTA />
    </>
  )
}
