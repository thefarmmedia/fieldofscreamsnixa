'use client'
import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/ui/Lightbox'

// Real photography — cast, sets, guests. Pulled from official event
// photos and footage, not stock or placeholder imagery.
const GALLERY_ITEMS = [
  { src: '/images/attraction/forest-woman-teddybear.jpg', alt: 'A costumed actor among the trees, holding a teddy bear', size: 'tall' as const },
  { src: '/images/attraction/sideshow-banner.jpg', alt: 'The Coulrophobia entrance lined with vintage sideshow banners', size: 'wide' as const },
  { src: '/images/attraction/clown-redhair-closeup.jpg', alt: 'A red-haired clown character in close-up', size: 'normal' as const },
  { src: '/images/gallery/fos-graffiti.jpg', alt: 'The full cast lined up in front of the Field of Screams sign', size: 'wide' as const },
  { src: '/images/attraction/hanging-figure.jpg', alt: 'A bloodied figure hanging in the dark', size: 'normal' as const },
  { src: '/images/attraction/clown-jesters-purple.jpg', alt: 'Two jester-style clown characters', size: 'normal' as const },
  { src: '/images/attraction/forest-figure-green.jpg', alt: 'A ghostly figure lit green among the trees', size: 'tall' as const },
  { src: '/images/attraction/rabbit-mask-flame.jpg', alt: 'A masked performer with a flame prop', size: 'normal' as const },
  { src: '/images/gallery/clown-lineup.jpg', alt: 'A lineup of clown characters from Coulrophobia', size: 'normal' as const },
  { src: '/images/attraction/dreadlock-purple-reach.jpg', alt: 'A dreadlocked character reaching toward the camera under purple light', size: 'normal' as const },
  { src: '/images/attraction/tophat-dreadlock-warm.jpg', alt: 'A top-hatted character under warm firelight', size: 'normal' as const },
  { src: '/images/attraction/gas-mask-purple.jpg', alt: 'A gas-masked figure under purple light', size: 'normal' as const },
  { src: '/images/gallery/zombie-group.jpg', alt: 'A group of undead actors in red light', size: 'wide' as const },
  { src: '/images/attraction/flame-thrower-wall.jpg', alt: 'A performer with a flame prop against a distressed wall', size: 'normal' as const },
  { src: '/images/attraction/doll-girls-pastel.jpg', alt: 'Two porcelain-doll-style characters', size: 'normal' as const },
  { src: '/images/gallery/marquee.jpg', alt: 'The Now Showing Coulrophobia marquee sign', size: 'normal' as const },
  { src: '/images/attraction/ghost-masks-pair.jpg', alt: 'Two figures in pale masks', size: 'normal' as const },
  { src: '/images/attraction/chainsaw-crown-blue.jpg', alt: 'A crowned character under blue light', size: 'normal' as const },
]

export default function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
            <button
              key={item.src}
              type="button"
              className={`gallery-item gallery-item-${item.size}`}
              onClick={() => setOpenIndex(i)}
              aria-label={`Open photo: ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                style={{ objectFit: 'cover' }}
                loading="lazy"
              />
            </button>
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

      {openIndex !== null && (
        <Lightbox
          items={GALLERY_ITEMS}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  )
}
