import Image from 'next/image'
import Link from 'next/link'

// Rendered instead of the WebGL intro when the browser lacks WebGL, the
// visitor has prefers-reduced-motion set, or has Data Saver on. Same
// headline beats as the 3D intro, told as a normal accessible page.
export default function HorrorFallback() {
  return (
    <section className="attraction-hero" style={{ minHeight: '90vh' }} aria-label="Field of Screams — Enter the Nightmare">
      <div className="attraction-hero-bg" aria-hidden="true">
        <Image
          src="/images/attraction/forest-woman-teddybear.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 800 }}>
        <p className="section-label">The Nightmare Begins Here</p>
        <h1
          style={{
            fontFamily: 'var(--font-cinzel), Georgia, serif',
            fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
            fontWeight: 900,
            color: 'var(--bone-light)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            lineHeight: 1,
            marginBottom: '1.25rem',
          }}
        >
          Field of Screams
        </h1>
        <p style={{ fontSize: '1rem', color: 'rgba(232,228,220,0.6)', marginBottom: '2.5rem', letterSpacing: '0.08em' }}>
          You can still turn back. Or keep scrolling.
        </p>
        <Link href="#choose" className="btn-secondary">
          Continue ↓
        </Link>
      </div>
    </section>
  )
}
