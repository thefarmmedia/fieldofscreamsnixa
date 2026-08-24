'use client'

import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/site-config'

export default function StickyTicketCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.4)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="sticky-cta"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.35s ease',
      }}
      aria-hidden={!visible}
    >
      <div>
        <div className="sticky-cta-dates">
          {siteConfig.season.displayRange}
        </div>
        <div className="sticky-cta-dates" style={{ color: 'rgba(232,228,220,0.3)' }}>
          Nixa, Missouri
        </div>
      </div>
      <a
        href={siteConfig.tickets.url}
        className="btn-ticket"
        onClick={() => {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'ticket_click', { location: 'sticky_mobile' })
          }
        }}
        tabIndex={visible ? 0 : -1}
      >
        Get Tickets
      </a>
    </div>
  )
}
