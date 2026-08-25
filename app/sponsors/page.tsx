import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
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
            <p style={{
              textAlign: 'center',
              maxWidth: 640,
              margin: '0 auto 3.5rem',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              lineHeight: 1.85,
              color: 'rgba(232,228,220,0.85)',
            }}>
              Field of Screams Nixa doesn&apos;t happen without the local businesses that back it every
              season. The following sponsors are part of what makes this property possible.
            </p>

            <div className="sponsor-grid">
              {siteConfig.sponsors.map((s) => (
                <div key={s.name} className="sponsor-tile" title={s.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.logo} alt={s.name} loading="lazy" />
                </div>
              ))}
            </div>

            {/* Real text list for SEO/accessibility — the grid above is visual, this is the record */}
            <ul className="sponsor-text-list" aria-label="Full list of sponsors">
              {siteConfig.sponsors.map((s) => (
                <li key={s.name}>{s.name}</li>
              ))}
            </ul>

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
