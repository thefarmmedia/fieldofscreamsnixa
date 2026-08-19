import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import HorrorWorldLoader from '@/components/horror/HorrorWorldLoader'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import Countdown from '@/components/ui/Countdown'
import NightmareSelector from '@/components/sections/NightmareSelector'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import GallerySection from '@/components/sections/GallerySection'
import FAQSection from '@/components/sections/FAQSection'
import LocationSection from '@/components/sections/LocationSection'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: `Enter the Nightmare | ${siteConfig.name}`,
  description:
    'Step through the gate before you ever set foot on the property. An interactive journey into Field of Screams Nixa — Southwest Missouri\'s Haunted Forest and Coulrophobia haunted attractions in Nixa, MO, near Springfield.',
  alternates: {
    canonical: `https://${siteConfig.domain}/enter-the-nightmare`,
  },
  openGraph: {
    title: `Enter the Nightmare | ${siteConfig.name}`,
    description: 'An interactive journey into Field of Screams Nixa — Haunted Forest and Coulrophobia in Nixa, Missouri.',
    images: [siteConfig.seo.ogImage],
  },
}

export default function EnterTheNightmarePage() {
  return (
    <>
      <AtmosphereBackground />
      <Navigation />

      {/* Real, crawlable heading for this page — the WebGL layer renders
          the same words inside the 3D world; this is here for SEO, screen
          readers, and the no-WebGL/reduced-motion fallback. */}
      <h1 className="sr-only">Enter the Nightmare — Field of Screams Nixa, Missouri</h1>

      <div className="site-content">
        <HorrorWorldLoader />

        <div id="choose">
          <NightmareSelector />
        </div>

        <Countdown />
        <TestimonialsSection />
        <GallerySection />
        <FAQSection limit={6} />
        <LocationSection />
        <Footer />
      </div>

      <StickyTicketCTA />
    </>
  )
}
