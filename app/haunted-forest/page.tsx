import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
// Note: ticket CTA onClick tracking is handled by Navigation component
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import FAQSection from '@/components/sections/FAQSection'
import Footer from '@/components/ui/Footer'

const attraction = siteConfig.attractions[0]

export const metadata: Metadata = {
  title: `${attraction.name} | ${siteConfig.name}`,
  description: `${attraction.name} is one of two terrifying experiences at Field of Screams Nixa in Southwest Missouri. ${attraction.description}`,
  alternates: {
    canonical: `https://${siteConfig.domain}/haunted-forest`,
  },
  openGraph: {
    title: `${attraction.name} | ${siteConfig.name}`,
    description: attraction.description,
    images: [siteConfig.seo.ogImage],
  },
}

const FOREST_DETAILS = [
  {
    label: 'What Is It',
    content: 'The Haunted Forest is a fully immersive outdoor walk-through experience set deep in the Missouri woods. Actors emerge from the darkness, from the trees, from the fog itself. Disorienting pathways make you lose track of how far in you are.',
  },
  {
    label: 'The Environment',
    content: 'Dense Missouri hardwoods. Ground fog that reduces visibility to feet. Strategic lighting designed to disorient. Multiple layers of the property working together to create the sensation that you are genuinely lost.',
  },
  {
    label: 'What to Expect',
    content: 'An intense, multi-actor, full-immersion experience in the dark. The trail is designed to disorient your sense of direction. You will be startled. Your group will scatter. Wear closed-toe shoes and dress for Missouri October weather.',
  },
  {
    label: 'Duration',
    content: '20–35 minutes depending on group size and pace. Longer if you stop to look at everything following you.',
  },
]

export default function HauntedForestPage() {
  const attractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: `${attraction.name} at ${siteConfig.name}`,
    description: attraction.description,
    url: `https://${siteConfig.domain}/haunted-forest`,
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
      <AtmosphereBackground />
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(attractionSchema) }}
      />

      <div className="site-content">
        {/* Hero */}
        <div className="attraction-hero" style={{ minHeight: '75vh' }}>
          <div className="attraction-hero-bg" aria-hidden="true">
            <Image
              src="/images/attraction/twisted-figure-red.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
            />
          </div>
          {/* Atmospheric dark overlay deeper in forest */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(2,8,18,0.25) 0%, rgba(1,3,8,0.75) 100%)',
            zIndex: 0,
          }} aria-hidden="true" />

          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800 }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'center', gap: '0.75rem', fontSize: '0.65rem', letterSpacing: '0.15em' }}>
                <li><Link href="/" style={{ color: 'rgba(232,228,220,0.35)', textDecoration: 'none' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: 'rgba(196,26,0,0.4)' }}>›</li>
                <li style={{ color: 'rgba(232,228,220,0.6)' }} aria-current="page">Haunted Forest</li>
              </ol>
            </nav>

            <p className="section-label">Attraction 01</p>
            <h1 style={{
              fontFamily: 'var(--font-cinzel), Georgia, serif',
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 900,
              color: 'var(--bone-light)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              lineHeight: 1,
              marginBottom: '1rem',
            }}>
              Haunted Forest
            </h1>
            <p style={{
              fontFamily: 'var(--font-cinzel), Georgia, serif',
              fontSize: 'clamp(0.8rem, 2vw, 1rem)',
              color: 'rgba(232,228,220,0.5)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '2.5rem',
              fontStyle: 'italic',
            }}>
              {attraction.tagline}
            </p>
            <a href={siteConfig.tickets.url} className="btn-ticket">
              Get Tickets
            </a>
          </div>
        </div>

        {/* Main content — SEO note: using server component, analytics tracked via URL */}
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

            <div className="section-divider" />

            {/* Detail grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              marginTop: '3rem',
            }}>
              {FOREST_DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  style={{
                    padding: '1.75rem',
                    border: '1px solid rgba(232,228,220,0.07)',
                    borderTop: '2px solid rgba(196,26,0,0.35)',
                    background: 'rgba(3,9,18,0.5)',
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-cinzel), Georgia, serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.25em',
                    color: 'var(--blood)',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                  }}>
                    {detail.label}
                  </p>
                  <p style={{
                    fontSize: '0.875rem',
                    lineHeight: 1.75,
                    color: 'rgba(232,228,220,0.6)',
                  }}>
                    {detail.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Warning box */}
            <div style={{
              marginTop: '3rem',
              padding: '1.5rem 2rem',
              border: '1px solid rgba(196,26,0,0.25)',
              background: 'rgba(196,26,0,0.04)',
              borderLeft: '3px solid var(--blood)',
            }}>
              <p style={{
                fontFamily: 'var(--font-cinzel), Georgia, serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'var(--blood)',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>
                Advisory
              </p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(232,228,220,0.55)', lineHeight: 1.7 }}>
                The Haunted Forest is an intense outdoor experience designed for adults and mature teens. Not recommended for guests with heart conditions, severe anxiety, or young children. The terrain includes uneven ground, darkness, fog, and sudden surprises.
              </p>
            </div>

            {/* CTA */}
            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <p style={{
                fontFamily: 'var(--font-cinzel), Georgia, serif',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: 'rgba(232,228,220,0.3)',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}>
                Ready to enter?
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={siteConfig.tickets.url} className="btn-ticket">
                  Get Tickets
                </a>
                <Link href="/coulrophobia" className="btn-secondary">
                  Also See Coulrophobia →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <FAQSection limit={5} />

        <Footer />
      </div>

      <StickyTicketCTA />
    </>
  )
}
