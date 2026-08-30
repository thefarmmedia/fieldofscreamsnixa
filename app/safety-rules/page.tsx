import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Safety & Rules | Field of Screams Nixa',
  description: 'Read the safety warnings, prohibited items, terrain information and guest rules before visiting Field of Screams Nixa.',
  alternates: { canonical: `https://${siteConfig.domain}/safety-rules` },
}

const rules = [
  'No smoking, drugs, alcohol or weapons on the property.',
  'No flash photography inside either attraction.',
  'Wear comfortable, closed-toe shoes for uneven outdoor terrain.',
  'Children must be accompanied by an adult; parental discretion is strongly advised.',
  'Do not touch actors, props or set pieces. Actors are trained not to touch guests.',
  'Follow all instructions from security, attraction staff and posted signage.',
]

export default function SafetyRulesPage() {
  return (
    <>
      <AtmosphereBackground />
      <AnnouncementBar />
      <Navigation />
      <main className="site-content">
        <section className="section" style={{ paddingTop: '8rem' }}>
          <div className="section-inner" style={{ maxWidth: 850 }}>
            <Breadcrumbs items={[{ label: 'Safety & Rules' }]} />
            <p className="section-label">Read Before Entering</p>
            <h1 className="section-title">Safety &amp; Rules</h1>
            <div className="section-divider" />
            <div style={{ border: '1px solid rgba(196,26,0,.35)', background: 'rgba(80,5,5,.12)', padding: '1.5rem', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-cinzel)', color: 'var(--blood)', textTransform: 'uppercase', fontSize: '1rem', marginBottom: '.75rem' }}>Attraction Warning</h2>
              <p style={{ color: 'rgba(232,228,220,.7)', lineHeight: 1.8 }}>This attraction uses fog machines, strobe lights, intense sounds, lighting effects, dark areas, live actors, wet or damp conditions, shocking visuals and uneven ground. It is not recommended for guests with heart conditions, seizure disorders, severe anxiety or similar medical concerns.</p>
            </div>
            <ul style={{ display: 'grid', gap: '1rem', paddingLeft: '1.25rem', color: 'rgba(232,228,220,.7)', lineHeight: 1.7 }}>
              {rules.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <a href={siteConfig.tickets.url} target="_blank" rel="noopener noreferrer" className="btn-ticket">Get Tickets</a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
      <StickyTicketCTA />
    </>
  )
}
