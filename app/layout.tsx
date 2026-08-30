import type { Metadata, Viewport } from 'next'
import { Cinzel, Inter, Special_Elite } from 'next/font/google'
import { siteConfig } from '@/lib/site-config'
import FlashlightCursor from '@/components/ui/FlashlightCursor'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const specialElite = Special_Elite({
  subsets: ['latin'],
  variable: '--font-special-elite',
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: siteConfig.seo.defaultTitle,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  keywords: [
    'haunted attraction',
    'haunted house',
    'Nixa Missouri',
    'Springfield Missouri',
    'Halloween',
    'Haunted Forest',
    'Coulrophobia',
    'Field of Screams',
    'Field of Screams Nixa',
    'Southwest Missouri haunted',
    'Ozarks haunted attraction',
    'scary haunted house Missouri',
  ],
  authors: [{ name: 'Field of Screams Nixa' }],
  creator: 'Field of Screams Nixa',
  publisher: 'Field of Screams Nixa',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 2047,
        height: 779,
        alt: 'Field of Screams Nixa — Haunted Attractions — Nixa, Missouri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.seo.ogImage],
  },
  alternates: {
    canonical: `https://${siteConfig.domain}`,
  },
}

export const viewport: Viewport = {
  themeColor: '#010204',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// Local Business + AmusementPark schema
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': ['AmusementPark', 'LocalBusiness'],
  name: siteConfig.name,
  description: siteConfig.seo.defaultDescription,
  url: `https://${siteConfig.domain}`,
  image: `https://${siteConfig.domain}/images/fos-banner.jpg`,
  address: {
    '@type': 'PostalAddress',
    name: siteConfig.address.venue,
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.zip,
    addressCountry: 'US',
  },
  telephone: siteConfig.phone,
  priceRange: '$$',
  hasMap: siteConfig.address.mapsUrl,
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 37.0434,
    longitude: -93.3312,
  },
  // Split into two specifications because the schedule genuinely differs
  // by month: September runs Friday/Saturday only, October adds Sundays.
  // The one-off Thursday (Oct 29) is covered by the eventSchedule dates
  // rather than being asserted as a weekly rule.
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday'],
      opens: '19:00',
      closes: '24:00',
      validFrom: '2026-09-18',
      validThrough: '2026-09-26',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday', 'Saturday', 'Sunday'],
      opens: '19:00',
      closes: '24:00',
      validFrom: '2026-10-02',
      validThrough: '2026-11-01',
    },
  ],
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.instagram,
    siteConfig.social.tiktok,
  ].filter(Boolean),
  // Real totals from the business's Google listing (not just the 6
  // reviews quoted in TestimonialsSection) -- update these two numbers
  // if the Google rating/count changes materially before launch.
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    reviewCount: 714,
    bestRating: '5',
  },
  potentialAction: {
    '@type': 'BuyAction',
    target: siteConfig.tickets.url,
    name: 'Buy Field of Screams Nixa tickets',
  },
}

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `Field of Screams Nixa ${siteConfig.season.year}`,
  description: siteConfig.seo.defaultDescription,
  startDate: '2026-09-18T19:00:00-05:00',
  endDate: '2026-11-02T00:00:00-06:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  image: [`https://${siteConfig.domain}/images/fos-banner.jpg`],
  url: `https://${siteConfig.domain}/dates`,
  location: {
    '@type': 'Place',
    name: siteConfig.address.venue,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: 'US',
    },
  },
  organizer: {
    '@type': 'Organization',
    name: siteConfig.name,
    url: `https://${siteConfig.domain}`,
  },
  offers: {
    '@type': 'Offer',
    url: siteConfig.tickets.url,
    availability: 'https://schema.org/InStock',
    validFrom: '2026-01-01',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable} ${specialElite.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
        />
        {/* Preload critical hero background */}
        <link rel="preload" as="image" href="/images/hero-poster.jpg" />
        {/* Meta Pixel — insert actual ID when known */}
        {siteConfig.analytics.metaPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${siteConfig.analytics.metaPixelId}');
                fbq('track', 'PageView');
              `,
            }}
          />
        )}
      </head>
      <body>
        <FlashlightCursor />
        {children}
        {/* Google Analytics */}
        {siteConfig.analytics.gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.analytics.gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.analytics.gaId}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </body>
    </html>
  )
}
