import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="section-inner">
        <Image
          src="/images/fos-logo.jpg"
          alt="Field of Screams Nixa"
          width={72}
          height={72}
          className="footer-logo"
          style={{ borderRadius: '50%', opacity: 0.7 }}
        />

        <nav aria-label="Footer navigation">
          <ul className="footer-nav" role="list">
            {[
              { href: '/', label: 'Home' },
              { href: '/haunted-forest', label: 'Haunted Forest' },
              { href: '/coulrophobia', label: 'Coulrophobia' },
              { href: '/#dates', label: 'Dates' },
              { href: '/faq', label: 'FAQ' },
              { href: '/gallery', label: 'Gallery' },
              { href: '/sponsors', label: 'Sponsors' },
              { href: '/#location', label: 'Directions' },
              { href: siteConfig.tickets.url, label: 'Tickets', external: true },
            ].map((link) =>
              link.external ? (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                    {link.label}
                  </a>
                </li>
              ) : (
                <li key={link.href}>
                  <Link href={link.href} className="footer-nav-link">
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="footer-social" aria-label="Social media links">
          {siteConfig.social.facebook && (
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Field of Screams Nixa on Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          )}
          {siteConfig.social.instagram && (
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Field of Screams Nixa on Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          )}
          {siteConfig.social.tiktok && (
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="Field of Screams Nixa on TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.6 5.82c-1.006-.998-1.567-2.35-1.564-3.82h-3.44v13.94c0 1.856-1.5 3.36-3.35 3.36-1.85 0-3.35-1.504-3.35-3.36 0-1.856 1.5-3.36 3.35-3.36.32 0 .63.05.92.13V9.28a6.82 6.82 0 0 0-.92-.06c-3.79 0-6.86 3.08-6.86 6.87S4.46 23 8.25 23c3.79 0 6.86-3.08 6.86-6.87V9.16a9.6 9.6 0 0 0 5.6 1.79V7.5a5.83 5.83 0 0 1-4.11-1.68z" />
              </svg>
            </a>
          )}
        </div>

        <address style={{ fontStyle: 'normal', marginBottom: '1rem' }}>
          <p style={{
            fontSize: '0.7rem',
            color: 'rgba(232,228,220,0.25)',
            letterSpacing: '0.05em',
          }}>
            {siteConfig.address.display}
          </p>
        </address>

        <p className="footer-copy">
          © {year} {siteConfig.name}. All rights reserved.
          <br />
          <span style={{ opacity: 0.5, fontSize: '0.65rem' }}>
            Built for the brave. Not recommended for the living.
          </span>
          <br />
          <a
            href="https://thefarmmedia.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ opacity: 0.4, fontSize: '0.65rem', color: 'inherit', textDecoration: 'none' }}
          >
            Site by The Farm Media
          </a>
        </p>
      </div>
    </footer>
  )
}
