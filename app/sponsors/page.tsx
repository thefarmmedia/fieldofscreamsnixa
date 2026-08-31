import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Footer from '@/components/ui/Footer'
import SponsorsSection from '@/components/sections/SponsorsSection'

export const metadata: Metadata = {
  title: `2026 Sponsors | ${siteConfig.name}`,
  description: `Meet the local Nixa and Springfield-area businesses supporting ${siteConfig.name} in 2026.`,
  alternates: {
    canonical: `https://${siteConfig.domain}/sponsors`,
  },
}

export default function SponsorsPage() {
  return (
    <>
      <AtmosphereBackground />
      <AnnouncementBar />
      <Navigation />

      <div className="site-content">
        <div className="attraction-hero" style={{ minHeight: '40vh' }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(2,8,18,0.4) 0%, rgba(1,3,8,0.7) 100%)',
            zIndex: 0,
          }} aria-hidden="true" />

          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800 }}>
            <Breadcrumbs items={[{ label: 'Sponsors' }]} />
            <p className="section-label">Backed By Nixa &amp; Springfield</p>
            <h1 style={{
              fontFamily: 'var(--font-cinzel), Georgia, serif',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 900,
              color: 'var(--bone-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              lineHeight: 1,
            }}>
              2026 Sponsors
            </h1>
          </div>
        </div>

        <SponsorsSection showHeading={false} />

        <div className="section sponsors-ticket-cta">
          <div className="section-inner">
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a href={siteConfig.tickets.url} target="_blank" rel="noopener noreferrer" className="btn-ticket">
                Get Tickets
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      <StickyTicketCTA />
    </>
  )
}
