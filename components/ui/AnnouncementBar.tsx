'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { siteConfig } from '@/lib/site-config'

export default function AnnouncementBar() {
  useEffect(() => {
    document.documentElement.classList.add('has-announce')
    return () => document.documentElement.classList.remove('has-announce')
  }, [])

  const line = (
    <>
      <a
        href={siteConfig.tickets.url}
        target="_blank"
        rel="noopener noreferrer"
        className="sponsor-ticker-message"
      >
        Buy Coulrophobia + Haunted Forest together for the best value.
      </a>
      <span className="sponsor-ticker-divider" aria-hidden="true" />

      {siteConfig.sponsors.map((sponsor) => (
        <a
          className="sponsor-ticker-logo"
          href={sponsor.url}
          target="_blank"
          rel="noopener noreferrer"
          key={sponsor.name}
          aria-label={`Visit ${sponsor.name}`}
          title={sponsor.name}
        >
          <Image
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            width={180}
            height={56}
            sizes="180px"
          />
        </a>
      ))}

      <span className="sponsor-ticker-divider" aria-hidden="true" />
    </>
  )

  return (
    <aside className="sponsor-ticker" aria-label="Field of Screams sponsors and ticket information">
      <div className="sponsor-ticker-marquee">
        <div className="sponsor-ticker-track">
          <div className="sponsor-ticker-line">{line}</div>
          <div className="sponsor-ticker-line" aria-hidden="true">{line}</div>
        </div>
      </div>

      <style jsx global>{`
        .sponsor-ticker {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 600;
          height: 54px;
          overflow: hidden;
          background: linear-gradient(90deg, #090204 0%, #170506 50%, #090204 100%);
          border-bottom: 1px solid rgba(196, 26, 0, 0.42);
          box-shadow: 0 5px 22px rgba(0, 0, 0, 0.35);
        }
        .sponsor-ticker-marquee {
          width: 100%;
          height: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent 0, #000 30px, #000 calc(100% - 30px), transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 30px, #000 calc(100% - 30px), transparent 100%);
        }
        .sponsor-ticker-track {
          display: flex;
          align-items: center;
          width: max-content;
          height: 100%;
          animation: sponsorTickerScroll 54s linear infinite;
          will-change: transform;
        }
        .sponsor-ticker-marquee:hover .sponsor-ticker-track {
          animation-play-state: paused;
        }
        .sponsor-ticker-line {
          display: flex;
          align-items: center;
          flex: none;
          height: 100%;
          gap: 34px;
          padding-right: 34px;
          white-space: nowrap;
        }
        .sponsor-ticker-message {
          display: inline-flex;
          align-items: center;
          height: 100%;
          color: #f0ece4;
          text-decoration: none;
          font-family: var(--font-cinzel), Georgia, serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .sponsor-ticker-message:hover,
        .sponsor-ticker-message:focus-visible {
          color: var(--orange-fos);
        }
        .sponsor-ticker-divider {
          width: 1px;
          height: 24px;
          flex: none;
          background: rgba(232, 228, 220, 0.28);
        }
        .sponsor-ticker-logo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: none;
          height: 44px;
          min-width: 92px;
          text-decoration: none;
          opacity: 0.92;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .sponsor-ticker-logo:hover,
        .sponsor-ticker-logo:focus-visible {
          opacity: 1;
          transform: scale(1.06);
        }
        .sponsor-ticker-logo img {
          width: auto !important;
          height: 31px !important;
          max-width: 145px !important;
          object-fit: contain;
        }
        .has-announce .nav {
          top: 54px;
        }
        @keyframes sponsorTickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (max-width: 640px) {
          .sponsor-ticker {
            height: 48px;
          }
          .sponsor-ticker-line {
            gap: 24px;
            padding-right: 24px;
          }
          .sponsor-ticker-message {
            font-size: 0.64rem;
            letter-spacing: 0.055em;
          }
          .sponsor-ticker-logo {
            height: 40px;
            min-width: 78px;
          }
          .sponsor-ticker-logo img {
            height: 27px !important;
            max-width: 122px !important;
          }
          .has-announce .nav {
            top: 48px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sponsor-ticker-marquee {
            overflow-x: auto;
            -webkit-mask-image: none;
            mask-image: none;
          }
          .sponsor-ticker-track {
            animation: none;
          }
          .sponsor-ticker-line[aria-hidden='true'] {
            display: none;
          }
        }
      `}</style>
    </aside>
  )
}
