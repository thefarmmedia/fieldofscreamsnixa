import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

type SponsorsSectionProps = {
  compact?: boolean
  showHeading?: boolean
}

export default function SponsorsSection({ compact = false, showHeading = true }: SponsorsSectionProps) {
  return (
    <section className={`sponsors-section${compact ? ' sponsors-section-compact' : ''}`} aria-labelledby={showHeading ? (compact ? 'home-sponsors-heading' : 'sponsors-grid-heading') : undefined}>
      <div className="section-inner">
        {showHeading && (
          <div className="sponsors-heading">
            <p className="section-label">Thank You to Our Partners</p>
            <h2 id={compact ? 'home-sponsors-heading' : 'sponsors-grid-heading'}>2026 Sponsors</h2>
            <p>These local businesses help bring the fear to Field of Screams Nixa.</p>
          </div>
        )}

        <div className="sponsor-grid">
          {siteConfig.sponsors.map((sponsor) => (
            <a className="sponsor-tile" href={sponsor.url} target="_blank" rel="noopener noreferrer" key={sponsor.name} aria-label={`Visit ${sponsor.name} website`}>
              <Image src={sponsor.logo} alt={`${sponsor.name} logo`} width={600} height={400} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw" />
            </a>
          ))}
        </div>

        {compact && (
          <div className="sponsors-link-wrap">
            <Link href="/sponsors" className="btn-secondary">View All 2026 Sponsors</Link>
          </div>
        )}
      </div>
    </section>
  )
}
