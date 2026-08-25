'use client'
import { siteConfig } from '@/lib/site-config'

export default function LocationSection() {
  const { address } = siteConfig

  return (
    <section className="section" id="location" aria-labelledby="location-heading">
      <div className="section-inner">
        <p className="section-label">Find Us</p>
        <h2 className="section-title" id="location-heading">Find the Forest</h2>
        <div className="section-divider" />
        <p style={{
          fontSize: '0.85rem',
          color: 'rgba(232,228,220,0.35)',
          textAlign: 'center',
          fontStyle: 'italic',
          marginBottom: '3rem',
          letterSpacing: '0.08em',
        }}>
          You can find us. The question is whether you&apos;ll find your way out.
        </p>

        <div className="location-grid">
          {/* Details column */}
          <div>
            <div className="location-detail">
              <svg className="location-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <div>
                <p className="location-detail-label">Address</p>
                <address className="location-detail-value" style={{ fontStyle: 'normal' }}>
                  {address.venue}<br />
                  {address.street}<br />
                  {address.city}, {address.state}
                </address>
              </div>
            </div>

            <div className="location-detail">
              <svg className="location-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <div>
                <p className="location-detail-label">Hours</p>
                <p className="location-detail-value">{siteConfig.season.hoursDisplay}</p>
                <p className="location-detail-value" style={{ fontSize: '0.8rem', marginTop: '0.25rem', color: 'rgba(232,228,220,0.45)' }}>
                  {siteConfig.season.specialNote}
                </p>
              </div>
            </div>

            <div className="location-detail">
              <svg className="location-detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
              <div>
                <p className="location-detail-label">Parking</p>
                <p className="location-detail-value">Free on-site parking available</p>
              </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={address.mapsUrl}
                className="btn-ticket"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'directions_click', { destination: 'google_maps' })
                  }
                }}
                style={{ animation: 'none' }}
              >
                Get Directions
              </a>
              <a href={siteConfig.tickets.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Buy Tickets
              </a>
            </div>
          </div>

          {/* Map column */}
          <div>
            <div className="map-placeholder">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(address.display)}&output=embed&z=13`}
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: 2, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.8) brightness(0.85)', minHeight: 300 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Field of Screams Nixa location map"
                aria-label="Map showing Field of Screams Nixa location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
