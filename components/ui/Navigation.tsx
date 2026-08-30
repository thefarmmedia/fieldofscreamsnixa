'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/haunted-forest', label: 'Haunted Forest' },
  { href: '/coulrophobia', label: 'Coulrophobia' },
  { href: '/dates', label: 'Dates' },
  { href: '/faq', label: 'FAQ' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/directions', label: 'Directions' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          {/* Logo */}
          <Link href="/" className="nav-logo" aria-label="Field of Screams Nixa — Home">
            <Image
              src="/images/fos-logo.jpg"
              alt="FoS Nixa"
              width={48}
              height={48}
              className="nav-logo-img"
              priority
              style={{ borderRadius: '50%' }}
            />
            <span style={{
              fontFamily: 'var(--font-cinzel), Georgia, serif',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: 'rgba(232,228,220,0.7)',
              textTransform: 'uppercase',
              display: 'none',
            }}
              className="md:block"
            >
              Field of Screams
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="nav-links" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href={siteConfig.tickets.url} target="_blank" rel="noopener noreferrer"
            className="btn-ticket"
            style={{ display: 'none', animation: 'none' }}
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'ticket_click', { location: 'nav' })
              }
            }}
          >
            Get Tickets
          </a>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              color: 'var(--bone)',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block',
                width: 24,
                height: 1,
                background: menuOpen && i === 1 ? 'transparent' : 'currentColor',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6px) rotate(-45deg)'
                  : 'none'
                  : 'none',
              }} />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: 'rgba(2, 5, 8, 0.98)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(196,26,0,0.15)',
            padding: '1.5rem',
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                    style={{ display: 'block', padding: '0.75rem 0', borderBottom: '1px solid rgba(232,228,220,0.05)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={siteConfig.tickets.url} target="_blank" rel="noopener noreferrer"
              className="btn-ticket"
              onClick={() => {
                setMenuOpen(false)
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'ticket_click', { location: 'mobile_menu' })
                }
              }}
              style={{ display: 'flex', marginTop: '1.25rem', width: '100%', justifyContent: 'center' }}
            >
              Get Tickets
            </a>
          </div>
        )}
      </nav>

      {/* Mobile styles inline for the hidden desktop btn */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-menu-btn { display: none !important; }
          nav .btn-ticket { display: inline-flex !important; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
