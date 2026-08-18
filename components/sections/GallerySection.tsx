'use client'
import Image from 'next/image'

// Stills pulled from official Field of Screams Nixa event footage.
const GALLERY_ITEMS = [
  { src: '/images/gallery/fos-graffiti.jpg', alt: 'The full cast lined up in front of the Field of Screams sign' },
  { src: '/images/gallery/clown-lineup.jpg', alt: 'A lineup of clown characters from Coulrophobia' },
  { src: '/images/gallery/coulrophobia-sign.jpg', alt: 'The Coulrophobia haunted experience entrance sign' },
  { src: '/images/gallery/archway.jpg', alt: 'A glowing skeletal entrance archway' },
  { src: '/images/gallery/zombie-group.jpg', alt: 'A group of undead actors in red light' },
  { src: '/images/gallery/marquee.jpg', alt: 'The Now Showing Coulrophobia marquee sign' },
  { src: '/images/gallery/jail-scare.jpg', alt: 'An actor reaching through bars' },
  { src: '/images/gallery/bus-blue.jpg', alt: 'The blue-lit Demon Bus set piece' },
  { src: '/images/gallery/doll-island.jpg', alt: 'The Doll Island scene, hung with dolls' },
  { src: '/images/gallery/wrecked-car.jpg', alt: 'A wrecked car set piece' },
  { src: '/images/gallery/actor-lunge.jpg', alt: 'An actor lunging toward guests' },
  { src: '/images/gallery/guests-laughing.jpg', alt: 'Guests reacting inside the attraction' },
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
          color: 'rgba(232,228,220,0.4)',
          fontStyle: 'italic',
          marginBottom: '2rem',
          letterSpacing: '0.08em',
        }}>
          A glimpse inside the attraction.
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
