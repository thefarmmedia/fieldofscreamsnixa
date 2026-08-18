import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import ForestEnvironment from '@/components/environment/ForestEnvironment'
import Navigation from '@/components/ui/Navigation'

export const metadata: Metadata = {
  title: `404 — You've Wandered Off the Trail | ${siteConfig.name}`,
  robots: { index: false },
}

export default function NotFound() {
  return (
    <>
      <ForestEnvironment />
      <Navigation />

      <div className="site-content" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100svh',
        textAlign: 'center',
        padding: '2rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-cinzel), Georgia, serif',
          fontSize: '0.6rem',
          letterSpacing: '0.35em',
          color: 'var(--blood)',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}>
          Error 404
        </p>

        <h1 style={{
          fontFamily: 'var(--font-cinzel), Georgia, serif',
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          fontWeight: 700,
          color: 'var(--bone-light)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          lineHeight: 1.15,
          marginBottom: '1rem',
          maxWidth: 600,
        }}>
          You&apos;ve Wandered Off the Trail.
        </h1>

        <p style={{
          fontFamily: 'var(--font-cinzel), Georgia, serif',
          fontSize: '0.85rem',
          color: 'rgba(232,228,220,0.4)',
          letterSpacing: '0.1em',
          marginBottom: '3rem',
          fontStyle: 'italic',
          maxWidth: 400,
          lineHeight: 1.7,
        }}>
          We wouldn&apos;t recommend doing that.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" className="btn-ticket" style={{ animation: 'none' }}>
            Return to Field of Screams
          </Link>
          <Link href={siteConfig.tickets.url} className="btn-secondary">
            Get Tickets
          </Link>
        </div>

        {/* Atmospheric code */}
        <p style={{
          marginTop: '5rem',
          fontFamily: 'var(--font-special-elite), Courier New, monospace',
          fontSize: '0.65rem',
          color: 'rgba(232,228,220,0.1)',
          letterSpacing: '0.05em',
        }}>
          This page does not exist. Something else might.
        </p>
      </div>
    </>
  )
}
