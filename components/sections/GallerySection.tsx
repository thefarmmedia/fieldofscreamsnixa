'use client'
import Image from 'next/image'

// TODO: Add actual Field of Screams Nixa gallery photos to /public/images/gallery/
// For now, the grid renders using the available brand images as placeholders.
const GALLERY_ITEMS = [
  { src: '/images/fos-banner.jpg', alt: 'Field of Screams Nixa — Haunted Attractions' },
  { src: '/images/fos-logo.jpg', alt: 'Field of Screams Nixa logo' },
  { src: '/images/fos-banner.jpg', alt: 'Field of Screams Nixa — Haunted Forest' },
  { src: '/images/fos-banner.jpg', alt: 'Field of Screams Nixa — Coulrophobia' },
  { src: '/images/fos-logo.jpg', alt: 'FoS Nixa — The Forest Awaits' },
  { src: '/images/fos-banner.jpg', alt: 'Field of Screams Nixa — Night Terrors' },
  { src: '/images/fos-banner.jpg', alt: 'Field of Screams Nixa — Haunted Attraction' },
  { src: '/images/fos-logo.jpg', alt: 'Field of Screams Nixa' },
]

export default function GallerySection() {
  return (
    <section className="section" id="gallery" aria-labelledby="gallery-heading">
      <div className="section-inner">
        <p className="section-label">Photography</p>
        <h2 className="section-title" id="gallery-heading">
          Evidence from the Woods
        </h2>
        <div className="section-divider" />
        <p style={{
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'rgba(232,228,220,0.3)',
          fontStyle: 'italic',
          marginBottom: '2rem',
          letterSpacing: '0.08em',
        }}>
          These were recovered from phones left behind.
        </p>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} className="gallery-item">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href="https://www.facebook.com/FieldOfScreamsNixa/photos"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'gallery_interaction', { action: 'view_all' })
              }
            }}
          >
            View Full Gallery on Facebook
          </a>
        </div>
      </div>
    </section>
  )
}
