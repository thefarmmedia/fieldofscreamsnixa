import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: `Sponsors | ${siteConfig.name}`,
  description: `The local Nixa and Springfield-area businesses supporting ${siteConfig.name} this season.`,
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
              Sponsors
            </h1>
          </div>
        </div>

        <div className="section">
          <div className="section-inner">
            {/* Sponsor lineup pulled for now -- siteConfig.sponsors is left
                intact in lib/site-config.ts so the grid below can come back
                by restoring the .map() once sponsors are ready to announce. */}
            <div className="sponsors-coming-soon">
              <p className="section-label">Announcing Soon</p>
              <p className="sponsors-coming-soon-title">Sponsors Coming Soon</p>
              <p className="sponsors-coming-soon-body">
                We&apos;re finalizing this season&apos;s lineup of local Nixa and Springfield-area
                businesses backing {siteConfig.name}. Check back soon.
              </p>
            </div>

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
