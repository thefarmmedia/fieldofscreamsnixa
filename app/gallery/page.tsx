import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import ForestEnvironment from '@/components/environment/ForestEnvironment'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import GallerySection from '@/components/sections/GallerySection'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: `Gallery | ${siteConfig.name}`,
  description: `Photos from Field of Screams Nixa haunted attraction in Nixa, Missouri. Haunted Forest and Coulrophobia.`,
  alternates: {
    canonical: `https://${siteConfig.domain}/gallery`,
  },
}

export default function GalleryPage() {
  return (
    <>
      <ForestEnvironment />
      <Navigation />

      <div className="site-content">
        <div style={{ paddingTop: '7rem', paddingBottom: '2rem', textAlign: 'center' }}>
          <p className="section-label">Field of Screams Nixa</p>
          <h1 style={{
            fontFamily: 'var(--font-cinzel), Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--bone-light)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Gallery
          </h1>
        </div>

        <GallerySection />
        <Footer />
      </div>

      <StickyTicketCTA />
    </>
  )
}
