'use client'

import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/lib/site-config'

const notice = siteConfig.tickets.weekendNotice
const storageKey = `fos-notice-dismissed:${notice.id}`

export default function WeekendTicketNotice() {
  const [visible, setVisible] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (Date.now() >= Date.parse(notice.expiresAt)) return
    try {
      if (window.sessionStorage.getItem(storageKey)) return
    } catch {
      // The notice still works when browser storage is unavailable.
    }
    setVisible(true)
  }, [])

  useEffect(() => {
    if (!visible) return
    const dialog = dialogRef.current
    if (!dialog) return

    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [visible])

  const dismiss = () => {
    try {
      window.sessionStorage.setItem(storageKey, 'true')
    } catch {
      // Dismissal must not depend on storage permission.
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <dialog
      ref={dialogRef}
      className="weekend-ticket-notice"
      aria-labelledby="weekend-notice-title"
      aria-describedby="weekend-notice-dates weekend-notice-message"
      onCancel={(event) => {
        event.preventDefault()
        dismiss()
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return
        const bounds = event.currentTarget.getBoundingClientRect()
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) dismiss()
      }}
    >
      <button type="button" className="weekend-notice-close" onClick={dismiss} aria-label="Close ticket notice">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <p className="weekend-notice-urgent">URGENT • THIS WEEKEND</p>
      <p className="weekend-notice-brand">{siteConfig.name}</p>
      <h2 id="weekend-notice-title">{notice.title}</h2>
      <p id="weekend-notice-dates" className="weekend-notice-dates">{notice.dates}</p>
      <p id="weekend-notice-message" className="weekend-notice-message">{notice.message}</p>
      <a
        className="weekend-notice-tickets"
        href={siteConfig.tickets.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={dismiss}
      >
        {notice.buttonLabel}
      </a>
      <button type="button" className="weekend-notice-continue" onClick={dismiss}>Continue to website</button>

      <style jsx>{`
        .weekend-ticket-notice {
          position: fixed;
          inset: 0;
          margin: auto;
          width: min(540px, calc(100% - 32px));
          max-width: none;
          max-height: calc(100vh - 32px);
          max-height: calc(100dvh - 32px);
          overflow-y: auto;
          padding: 48px clamp(20px, 5vw, 40px) 24px;
          border: 1px solid rgba(232, 76, 21, 0.65);
          border-top: 4px solid #e84c15;
          border-radius: 10px;
          background: radial-gradient(ellipse at top, #2d0b08, #0b0608 75%);
          color: #f0ece4;
          text-align: center;
          box-shadow: 0 24px 90px rgba(0, 0, 0, 0.7);
          box-sizing: border-box;
        }
        .weekend-ticket-notice::backdrop {
          background: rgba(0, 0, 0, 0.86);
          backdrop-filter: blur(5px);
        }
        .weekend-notice-close {
          position: absolute;
          top: 8px;
          right: 8px;
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: transparent;
          color: #f0ece4;
          cursor: pointer;
        }
        .weekend-notice-close:hover { background: rgba(255, 255, 255, 0.1); }
        .weekend-notice-urgent {
          display: inline-block;
          margin: 0 0 20px;
          padding: 8px 12px;
          border: 1px solid rgba(255, 203, 92, 0.5);
          color: #ffcb5c;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.12em;
        }
        .weekend-notice-brand {
          margin: 0 0 12px;
          color: #cfc4bc;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .weekend-ticket-notice h2 {
          margin: 0;
          font-family: var(--font-cinzel), Georgia, serif;
          font-size: clamp(1.6rem, 6vw, 2.2rem);
          line-height: 1.2;
          text-transform: uppercase;
        }
        .weekend-notice-dates {
          margin: 16px 0;
          color: #ffcb5c;
          font-size: clamp(1rem, 4vw, 1.2rem);
          font-weight: 800;
          letter-spacing: 0.04em;
        }
        .weekend-notice-message {
          margin: 0 0 24px;
          font-size: 1rem;
          line-height: 1.7;
        }
        .weekend-notice-tickets {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 52px;
          padding: 14px 18px;
          border-radius: 4px;
          background: #ffcb5c;
          color: #170704;
          font-size: 1rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-decoration: none;
        }
        .weekend-notice-tickets:hover { background: #ffdc90; }
        .weekend-notice-continue {
          display: block;
          min-height: 44px;
          margin: 8px auto 0;
          padding: 10px;
          border: 0;
          background: transparent;
          color: #cfc4bc;
          font: inherit;
          font-size: 0.85rem;
          text-decoration: underline;
          text-underline-offset: 4px;
          cursor: pointer;
        }
        .weekend-ticket-notice :focus-visible {
          outline: 2px solid #00c4cc;
          outline-offset: 3px;
        }
      `}</style>
    </dialog>
  )
}
