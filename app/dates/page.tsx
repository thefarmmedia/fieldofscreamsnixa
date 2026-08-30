import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Countdown from '@/components/ui/Countdown'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: '2026 Dates & Hours | Haunted House in Nixa, MO',
  description: 'See every 2026 Field of Screams Nixa date and nightly hours. Open September 18 through November 1 at Summers at the River in Nixa, Missouri.',
  alternates: { canonical: `https://${siteConfig.domain}/dates` },
  openGraph: {
    title: 'Field of Screams Nixa 2026 Dates & Hours',
    description: `Plan your visit for ${siteConfig.season.displayRange}. Open nightly from 7 PM to midnight.`,
    url: `https://${siteConfig.domain}/dates`,
  },
}

const months = [
  { name: 'September', dates: ['18', '19', '25', '26'] },
  { name: 'October', dates: ['2', '3', '4', '9', '10', '11', '16', '17', '18', '23', '24', '25', '29', '30', '31'] },
  { name: 'November', dates: ['1'] },
]

export default function DatesPage() {
  return (
    <>
      <AtmosphereBackground />
      <AnnouncementBar />
      <Navigation />
      <main className="site-content">
        <section className="section" style={{ paddingTop: '8rem' }}>
          <div className="section-inner">
            <Breadcrumbs items={[{ label: 'Dates & Hours' }]} />
            <p className="section-label">2026 Season</p>
            <h1 className="section-title">Field of Screams Nixa Dates &amp; Hours</h1>
            <div className="section-divider" />
            <p style={{ textAlign: 'center', color: 'rgba(232,228,220,.65)', marginBottom: '2.5rem' }}>
              Every attraction opens at 7:00 PM and closes at midnight. Buy online before peak nights sell out.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '1.5rem' }}>
              {months.map((month) => (
                <article key={month.name} style={{ border: '1px solid rgba(196,26,0,.3)', background: 'rgba(3,9,18,.72)', padding: '1.75rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--bone-light)', textTransform: 'uppercase', marginBottom: '1rem' }}>{month.name}</h2>
                  <p style={{ color: 'rgba(232,228,220,.7)', lineHeight: 2, fontSize: '1.05rem' }}>{month.dates.join('  •  ')}</p>
                </article>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <a href={siteConfig.tickets.url} target="_blank" rel="noopener noreferrer" className="btn-ticket">Buy Tickets</a>
            </div>
          </div>
        </section>
        <Countdown />
        <Footer />
      </main>
      <StickyTicketCTA />
    </>
  )
}
