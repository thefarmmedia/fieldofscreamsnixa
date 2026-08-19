import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'

export default function NightmareSelector() {
  const [forest, carnival] = siteConfig.attractions

  return (
    <section id="nightmare" aria-labelledby="nightmare-heading">
      <div style={{ textAlign: 'center', padding: '4rem 1.5rem 2.5rem' }}>
        <p className="section-label">Two Attractions</p>
        <h2 className="section-title" id="nightmare-heading">Choose Your Nightmare</h2>
        <div className="section-divider" />
        <p style={{
          fontSize: '0.9rem',
          color: 'rgba(232,228,220,0.55)',
          maxWidth: 480,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          They exist on the same property. They belong to the same darkness.
          They feel nothing like each other.
        </p>
      </div>

      <div className="nightmare-split">
        {/* Haunted Forest */}
        <Link href={forest.href} className="nightmare-panel" aria-label={`Learn about ${forest.name}`}>
          <Image
            src="/images/attraction/twisted-figure-red.jpg"
            alt="A costumed actor standing among the trees at the Haunted Forest attraction"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: '50% 25%' }}
            className="nightmare-panel-img"
          />
          <div className="nightmare-panel-scrim nightmare-panel-scrim-forest" />
          <div className="nightmare-panel-content">
            <p className="nightmare-panel-number">Attraction 01</p>
            <h3 className="nightmare-panel-name">{forest.name}</h3>
            <p className="nightmare-panel-tagline">{forest.tagline}</p>
            <span className="nightmare-panel-cta">
              Enter the Forest
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                <path d="M0 5H14M10 1L14 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </Link>

        {/* Coulrophobia */}
        <Link href={carnival.href} className="nightmare-panel" aria-label={`Learn about ${carnival.name}`}>
          <Image
            src="/images/attraction/sideshow-banner.jpg"
            alt="The real Coulrophobia haunted experience entrance, lined with vintage sideshow banners"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            style={{ objectFit: 'cover', objectPosition: '50% 35%' }}
            className="nightmare-panel-img"
          />
          <div className="nightmare-panel-scrim nightmare-panel-scrim-carnival" />
          <div className="nightmare-panel-content">
            <p className="nightmare-panel-number">Attraction 02</p>
            <h3 className="nightmare-panel-name glitch-text" data-glitch={carnival.name}>
              {carnival.name}
            </h3>
            <p className="nightmare-panel-tagline">{carnival.tagline}</p>
            <span className="nightmare-panel-cta">
              Enter the Carnival
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                <path d="M0 5H14M10 1L14 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </Link>
      </div>

      <div style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-cinzel), Georgia, serif',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          color: 'rgba(232,228,220,0.35)',
          textTransform: 'uppercase',
          marginBottom: '1.25rem',
        }}>
          One ticket. Both nightmares.
        </p>
        <a href={siteConfig.tickets.url} className="btn-ticket">
          Get Tickets
        </a>
      </div>
    </section>
  )
}
