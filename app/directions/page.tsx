import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import LocationSection from '@/components/sections/LocationSection'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: 'Directions & Parking | Field of Screams Nixa',
  description: `Directions, address and free parking information for Field of Screams Nixa at ${siteConfig.address.display}.`,
  alternates: { canonical: `https://${siteConfig.domain}/directions` },
  openGraph: {
    title: 'Directions to Field of Screams Nixa',
    description: `Find Field of Screams at ${siteConfig.address.display}. Free on-site parking.`,
    url: `https://${siteConfig.domain}/directions`,
  },
}

export default function DirectionsPage() {
  return (
    <>
      <AtmosphereBackground />
      <AnnouncementBar />
      <Navigation />
      <main className="site-content">
        <div style={{ paddingTop: '7rem', textAlign: 'center' }}>
          <Breadcrumbs items={[{ label: 'Directions' }]} />
          <h1 className="sr-only">Directions and Parking for Field of Screams Nixa</h1>
        </div>
        <LocationSection />
        <Footer />
      </main>
      <StickyTicketCTA />
    </>
  )
}
