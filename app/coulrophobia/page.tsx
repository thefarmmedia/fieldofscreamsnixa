import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import CoulrophobiaEnvironment from '@/components/environment/CoulrophobiaEnvironment'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import FAQSection from '@/components/sections/FAQSection'
import Footer from '@/components/ui/Footer'
import VideoBackground from '@/components/ui/VideoBackground'

const attraction = siteConfig.attractions[1]

export const metadata: Metadata = {
  title: `Coulrophobia | ${siteConfig.name}`,
  description: `Coulrophobia is a haunted carnival experience at Field of Screams Nixa in Southwest Missouri. Are you afraid of clowns? You will be. ${attraction.description}`,
  alternates: {
    canonical: `https://${siteConfig.domain}/coulrophobia`,
  },
  openGraph: {
    title: `Coulrophobia | ${siteConfig.name}`,
    description: attraction.description,
    images: [siteConfig.seo.ogImage],
  },
}

const CARNIVAL_DETAILS = [
  {
    label: 'What Is It',
    content: 'Coulrophobia is a walk-through haunted carnival experience built inside a broken and corrupted fairground environment. The deeper you go, the less it feels like something that used to be fun.',
  },
  {
    label: 'The Environment',
    content: 'Torn tent fabric. Flickering bulbs. Narrow corridors between carnival structures. Smells you cannot identify. Painted faces appearing from the dark. The kind of darkness that fills with sound.',
  },
  {
    label: 'What to Expect',
    content: 'Intense, close-quarters horror with a heavy emphasis on fear of the unknown and what you can almost-but-not-quite see. Actors in full clown/carnival makeup. Confined spaces. Disorienting turns. Sounds that come from everywhere.',
  },
  {
    label: 'Duration',
    content: '20–35 minutes. Longer if you keep stopping to figure out whether something behind you moved.',
  },
]

export default function CoulrophobiaPage() {
  const attractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: `Coulrophobia at ${siteConfig.name}`,
    description: attraction.description,
    url: `https://${siteConfig.domain}/coulrophobia`,
    containedInPlace: {
      '@type': 'AmusementPark',
      name: siteConfig.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
      },
    },
  }

  return (
    <>
      <CoulrophobiaEnvironment />
      <AnnouncementBar />
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionSchema) }}
      />

      <div className="site-content">
        {/* Hero */}
        <div className="attraction-hero" style={{ minHeight: '65vh' }}>
          <VideoBackground
            className="attraction-hero-bg"
            src="/videos/coulrophobia-loop.mp4"
            poster="/images/coulrophobia-poster.jpg"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(30, 3, 5, 0.5) 0%, rgba(6, 1, 3, 0.8) 100%)',
            zIndex: 0,
          }} aria-hidden="true" />

          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800 }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                <li><Link href="/" style={{ color: 'rgba(232,228,220,0.35)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(196,26,0,0.4)' }}>›</li>
                <li style={{ color: 'rgba(232,228,220,0.6)' }} aria-current="page">Coulrophobia</li>
              </ol>
            </nav>

            <p className="section-label">Attraction 02</p>
            <h1
              className="glitch-text"
              data-glitch="Coulrophobia"
              style={{
                fontFamily: 'var(--font-cinzel), Georgia, serif',
                fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                fontWeight: 900,
                color: 'var(--bone-light)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                lineHeight: 1,
                marginBottom: '1rem',
              }}
            >
              Coulrophobia
            </h1>
            <p style={{
              fontFamily: 'var(--font-cinzel), Georgia, serif',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              color: 'rgba(196, 100, 80, 0.7)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              Are You Afraid of Clowns?
            </p>
            <p style={{
              fontFamily: 'var(--font-cinzel), Georgia, serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: 'rgba(232,228,220,0.55)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '2.5rem',
              fontStyle: 'italic',
            }}>
              You Will Be.
            </p>
            <a href={siteConfig.tickets.url} className="btn-ticket">
              Get Tickets
            </a>
          </div>
        </div>

        {/* Main content */}
        <div className="section">
          <div className="section-inner">

            <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                lineHeight: 1.9,
                color: 'rgba(232,228,220,0.6)',
                marginBottom: '3rem',
              }}>
                {attraction.description}
              </p>
            </div>

            <div className="section-divider" style={{ background: 'linear-gradient(to right, transparent, rgba(120,10,10,0.8), transparent)' }} />

            {/* Detail grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '3rem',
            }}>
              {CARNIVAL_DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  style={{
                    padding: '1.75rem',
                    border: '1px solid rgba(120,10,10,0.2)',
                    borderTop: '2px solid rgba(120,10,10,0.5)',
                    background: 'rgba(8,2,4,0.5)',
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-cinzel), Georgia, serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.25em',
                    color: 'rgba(180,40,20,0.7)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}>
                    {detail.label}
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.75,
                    color: 'rgba(232,228,220,0.55)',
                  }}>
                    {detail.content}
                  </p>
                </div>
              ))}
            </div>

            {/* The name — atmospheric definition */}
            <div style={{
              marginTop: '4rem',
              padding: '2.5rem',
              border: '1px solid rgba(120,10,10,0.2)',
              background: 'rgba(8,2,4,0.7)',
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: 'var(--font-cinzel), Georgia, serif',
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: 'rgba(180,40,20,0.5)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                cou·lo·pho·bi·a
              </p>
              <p style={{
                fontFamily: 'var(--font-cinzel), Georgia, serif',
                fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
                letterSpacing: '0.1em',
                color: 'rgba(200,175,145,0.5)',
                fontStyle: 'italic',
              }}>
                /ˌkuːl.rəˈfoʊ.bi.ə/ &nbsp;·&nbsp; noun
              </p>
              <p style={{
                fontSize: '1rem',
                color: 'rgba(232,228,220,0.4)',
                marginTop: '0.75rem',
                lineHeight: 1.7,
              }}>
                An abnormal and persistent fear of clowns.
              </p>
              <p style={{
                fontFamily: 'var(--font-cinzel), Georgia, serif',
                fontSize: '0.75rem',
                color: 'rgba(180,40,20,0.5)',
                marginTop: '1rem',
                letterSpacing: '0.1em',
              }}>
                By the time you leave, it will be yours.
              </p>
            </div>

            {/* Warning */}
            <div style={{
              marginTop: '2.5rem',
              padding: '1.5rem 2rem',
              border: '1px solid rgba(120,10,10,0.3)',
              background: 'rgba(120,10,10,0.06)',
              borderLeft: '3px solid rgba(180,40,20,0.6)',
            }}>
              <p style={{
                fontFamily: 'var(--font-cinzel), Georgia, serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'rgba(180,40,20,0.7)',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>
                Advisory
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(232,228,220,0.5)', lineHeight: 1.7 }}>
                Coulrophobia contains intense clown imagery, confined spaces, disorienting darkness, and actors designed specifically to trigger a fear response. Not recommended for individuals with severe coulrophobia, claustrophobia, or heart conditions. Not suitable for young children.
              </p>
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={siteConfig.tickets.url} className="btn-ticket">
                  Get Tickets
                </a>
                <Link href="/haunted-forest" className="btn-secondary">
                  Also See Haunted Forest →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <FAQSection limit={4} />
        <Footer />
      </div>

      <StickyTicketCTA />
    </>
  )
}
