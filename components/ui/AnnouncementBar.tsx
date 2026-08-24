'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/site-config'

// Season announcement bar across the top of the site. Dismissible, and
// the dismissal sticks so it doesn't nag on every page.
//
// Structure follows the standard announcement-bar pattern (message +
// action + close), but styled in the site's own system rather than
// pulling in a component library and its Tailwind preset, which would
// have restyled everything else on the page.
const STORAGE_KEY = 'fos-announce-dismissed-2026'

export default function AnnouncementBar() {
  // Start hidden so the server-rendered markup matches the first client
  // paint; a visitor who dismissed it never sees a flash of it returning.
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) === '1'
    } catch {
      // Private mode / blocked storage: just show it.
    }
    if (!dismissed) {
      setVisible(true)
      document.documentElement.classList.add('has-announce')
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    document.documentElement.classList.remove('has-announce')
    try {
      window.localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // Non-fatal — it just reappears next visit.
    }
  }

  if (!visible) return null

  const opens = siteConfig.season.openingDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <aside className="announce" aria-label="Season announcement">
      <div className="announce-inner">
        <p className="announce-text">
          <span className="announce-tag">{siteConfig.season.year} Season</span>
          <span className="announce-sep" aria-hidden="true" />
          <span>Opening night — {opens}. {siteConfig.season.hoursDisplay}.</span>
        </p>
        <a href={siteConfig.tickets.url} className="announce-cta">
          Get Tickets
        </a>
      </div>
      <button type="button" className="announce-close" onClick={dismiss} aria-label="Dismiss announcement">
        <span aria-hidden="true">×</span>
      </button>
    </aside>
  )
}
