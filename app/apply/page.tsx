import type { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import AtmosphereBackground from '@/components/environment/AtmosphereBackground'
import AnnouncementBar from '@/components/ui/AnnouncementBar'
import Navigation from '@/components/ui/Navigation'
import StickyTicketCTA from '@/components/ui/StickyTicketCTA'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Footer from '@/components/ui/Footer'
import ApplicationForm from '@/components/sections/ApplicationForm'

export const metadata: Metadata = {
  title: `Apply Now | Join the Cast & Crew | ${siteConfig.name}`,
  description: `Apply to work at ${siteConfig.name} in Nixa, Missouri. Now hiring scare actors, makeup artists, build crew, admissions, concessions and security for the ${siteConfig.season.year} season.`,
  alternates: { canonical: `https://${siteConfig.domain}/apply` },
  openGraph: {
    title: `Apply Now | ${siteConfig.name}`,
    description: `Now hiring scare actors and crew for the ${siteConfig.season.year} season at ${siteConfig.name} in Nixa, Missouri.`,
    images: [siteConfig.seo.ogImage],
  },
}

const perks = [
  'No experience required — we train every scare actor before opening night.',
  'Work alongside a cast that comes back season after season.',
  'Flexible weekend schedules built around school and day jobs.',
  'Roles on and off the trail: acting, makeup, costuming, build crew, admissions, concessions, parking and security.',
]

export default function ApplyPage() {
  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Seasonal Haunt Cast & Crew',
    description:
      'Seasonal positions at Field of Screams Nixa including scare actors, makeup artists, costuming, build crew, admissions, concessions, parking and security for the 2026 haunt season.',
    employmentType: 'PART_TIME',
    industry: 'Entertainment',
    datePosted: '2026-09-21',
    validThrough: '2026-11-02',
    directApply: true,
    hiringOrganization: {
      '@type': 'Organization',
      name: siteConfig.name,
      sameAs: `https://${siteConfig.domain}`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.state,
        postalCode: siteConfig.address.zip,
        addressCountry: 'US',
      },
    },
  }

  return (
    <>
      <AtmosphereBackground />
      <AnnouncementBar />
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />

      <main className="site-content">
        <section className="section" style={{ paddingTop: '8rem' }}>
          <div className="section-inner" style={{ maxWidth: 880 }}>
            <Breadcrumbs items={[{ label: 'Apply Now' }]} />
            <p className="section-label">Now Hiring — {siteConfig.season.year} Season</p>
            <h1 className="section-title">Join The Nightmare</h1>
            <div className="section-divider" />

            <p style={{
              color: 'rgba(232,228,220,0.7)',
              lineHeight: 1.9,
              textAlign: 'center',
              maxWidth: 640,
              margin: '0 auto 2.5rem',
            }}>
              Every scream in the woods is somebody&apos;s job. We&apos;re building this
              season&apos;s cast and crew in Nixa — scare actors, makeup artists, build
              crew and the people who keep the gates running. Fill out the application
              below and our team will be in touch.
            </p>

            <ul className="apply-perks">
              {perks.map((perk) => <li key={perk}>{perk}</li>)}
            </ul>

            <div className="apply-heading">
              <h2>Apply Below</h2>
              <p>Fields marked <span aria-hidden="true">*</span> are required.</p>
            </div>

            <ApplicationForm />
          </div>
        </section>

        <Footer />
      </main>

      <StickyTicketCTA />
    </>
  )
}
