'use client'

import { useState, useEffect } from 'react'
import { siteConfig } from '@/lib/site-config'

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function getTimeUntil(target: Date) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null
  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { days, hours, minutes, seconds }
}

function CountUnit({ value, label }: { value: string; label: string }) {
  const [ticking, setTicking] = useState(false)
  const prev = useState(value)[0]

  useEffect(() => {
    if (value !== prev) {
      setTicking(true)
      const t = setTimeout(() => setTicking(false), 200)
      return () => clearTimeout(t)
    }
  }, [value, prev])

  return (
    <div className="countdown-unit">
      <div className={`countdown-number${ticking ? ' tick' : ''}`}>
        {value}
      </div>
      <div className="countdown-label">{label}</div>
    </div>
  )
}

export default function Countdown() {
  const openingDate = siteConfig.season.openingDate
  const [timeLeft, setTimeLeft] = useState<ReturnType<typeof getTimeUntil>>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(getTimeUntil(openingDate))
    const interval = setInterval(() => {
      setTimeLeft(getTimeUntil(openingDate))
    }, 1000)
    return () => clearInterval(interval)
  }, [openingDate])

  if (!mounted) {
    return (
      <section className="countdown-section section" aria-label="Countdown to opening night">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <p className="section-label">The Season Begins</p>
          <h2 className="section-title">The Nightmare Returns</h2>
        </div>
      </section>
    )
  }

  return (
    <section className="countdown-section section" id="dates" aria-label="Countdown to opening night">
      <div className="section-inner" style={{ textAlign: 'center' }}>
        {timeLeft === null ? (
          <>
            <p className="section-label">The Season is Here</p>
            <h2 className="section-title">We&apos;re Open</h2>
            <p className="countdown-open-message">
              We&apos;re waiting for you.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <a href={siteConfig.tickets.url} className="btn-ticket">
                Get Tickets Now
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="section-label">Season {siteConfig.season.year}</p>
            <h2 className="section-title">The Nightmare Returns In</h2>

            <div className="countdown-grid" aria-live="polite" aria-label={`${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}>
              <CountUnit value={String(timeLeft.days)} label="Days" />
              <span className="countdown-separator" aria-hidden="true">:</span>
              <CountUnit value={pad(timeLeft.hours)} label="Hours" />
              <span className="countdown-separator" aria-hidden="true">:</span>
              <CountUnit value={pad(timeLeft.minutes)} label="Minutes" />
              <span className="countdown-separator" aria-hidden="true">:</span>
              <CountUnit value={pad(timeLeft.seconds)} label="Seconds" />
            </div>

            <p style={{
              marginTop: '2rem',
              fontFamily: 'var(--font-cinzel), Georgia, serif',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: 'rgba(232,228,220,0.35)',
              textTransform: 'uppercase',
            }}>
              Opening Night — {openingDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <div style={{ marginTop: '2rem' }}>
              <a href={siteConfig.tickets.url} className="btn-ticket">
                Secure Your Ticket
              </a>
            </div>
          </>
        )}

        {/* Operating dates grid */}
        <div style={{ marginTop: '4rem' }}>
          <p className="section-label">2026 Operating Dates</p>
          <p style={{
            fontSize: '0.8rem',
            color: 'rgba(232,228,220,0.4)',
            marginBottom: '1.5rem',
            letterSpacing: '0.05em',
          }}>
            {siteConfig.season.specialNote} • {siteConfig.season.hoursDisplay}
          </p>
          <div className="dates-grid">
            {siteConfig.season.dates.map((date) => {
              const isHalloween = date.includes('31')
              return (
                <div key={date} className={`date-item ${isHalloween ? 'featured' : ''}`}>
                  {isHalloween ? `🎃 ${date}` : date}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
