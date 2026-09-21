'use client'

import { useState } from 'react'

const AVAILABILITY_OPTIONS = ['Thursdays', 'Fridays', 'Saturdays', 'Sundays']

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ApplicationForm() {
  const [availability, setAvailability] = useState<string[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  const toggleDay = (day: string) => {
    setAvailability((current) =>
      current.includes(day) ? current.filter((d) => d !== day) : [...current, day]
    )
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return

    // Availability is the one required field the browser can't validate
    // for us — a checkbox group has no "at least one" constraint.
    if (availability.length === 0) {
      setStatus('error')
      setError('Please choose at least one night you are available.')
      return
    }

    setStatus('sending')
    setError('')

    const data = new FormData(event.currentTarget)
    const payload = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phone: data.get('phone'),
      age: data.get('age'),
      driversLicense: data.get('driversLicense') ?? '',
      position: data.get('position'),
      backgroundCheck: data.get('backgroundCheck'),
      city: data.get('city'),
      availability,
      workEligible: data.get('workEligible'),
      priorExperience: data.get('priorExperience'),
      workedHereBefore: data.get('workedHereBefore'),
      aboutYou: data.get('aboutYou'),
      website: data.get('website'),
    }

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setStatus('error')
        setError(result.error || 'Something went wrong. Please try again.')
        return
      }

      setStatus('sent')
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'application_submit', { location: 'apply_page' })
      }
    } catch {
      setStatus('error')
      setError('We could not reach our application system. Please try again in a moment.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="apply-success" role="status">
        <p className="section-label">Application Received</p>
        <h2>You&apos;re On The List</h2>
        <p>
          Thanks for applying to Field of Screams Nixa. Our team reviews every application
          and will reach out by email or phone if you&apos;re a fit for this season.
        </p>
      </div>
    )
  }

  return (
    <form className="apply-form" onSubmit={onSubmit} noValidate={false}>
      <div className="apply-row">
        <div className="apply-field">
          <label htmlFor="firstName">First Name <span aria-hidden="true">*</span></label>
          <input id="firstName" name="firstName" type="text" placeholder="First name" required maxLength={80} autoComplete="given-name" />
        </div>
        <div className="apply-field">
          <label htmlFor="lastName">Last Name <span aria-hidden="true">*</span></label>
          <input id="lastName" name="lastName" type="text" placeholder="Last name" required maxLength={80} autoComplete="family-name" />
        </div>
      </div>

      <div className="apply-row">
        <div className="apply-field">
          <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" placeholder="Email" required maxLength={160} autoComplete="email" />
        </div>
        <div className="apply-field">
          <label htmlFor="phone">Phone <span aria-hidden="true">*</span></label>
          <input id="phone" name="phone" type="tel" placeholder="Phone" required maxLength={40} autoComplete="tel" />
        </div>
      </div>

      <fieldset className="apply-field">
        <legend>Age? <span aria-hidden="true">*</span></legend>
        <div className="apply-options">
          <label className="apply-choice">
            <input type="radio" name="age" value="Over 18" required />
            <span>Over 18</span>
          </label>
          <label className="apply-choice">
            <input type="radio" name="age" value="Under 18" />
            <span>Under 18</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="apply-field">
        <legend>Do you have a valid driver&apos;s license?</legend>
        <div className="apply-options">
          <label className="apply-choice">
            <input type="radio" name="driversLicense" value="Yes" />
            <span>Yes</span>
          </label>
          <label className="apply-choice">
            <input type="radio" name="driversLicense" value="No" />
            <span>No</span>
          </label>
        </div>
      </fieldset>

      <div className="apply-field">
        <label htmlFor="position">Position desired <span aria-hidden="true">*</span></label>
        <input
          id="position"
          name="position"
          type="text"
          placeholder="Scare actor, makeup, build crew, admissions, concessions, security…"
          required
          maxLength={120}
        />
      </div>

      <fieldset className="apply-field">
        <legend>If offered a position, do you consent to a background check? <span aria-hidden="true">*</span></legend>
        <div className="apply-options">
          <label className="apply-choice">
            <input type="radio" name="backgroundCheck" value="Yes" required />
            <span>Yes</span>
          </label>
          <label className="apply-choice">
            <input type="radio" name="backgroundCheck" value="No" />
            <span>No</span>
          </label>
        </div>
      </fieldset>

      <div className="apply-field">
        <label htmlFor="city">In which city do you reside? <span aria-hidden="true">*</span></label>
        <input id="city" name="city" type="text" placeholder="City" required maxLength={80} autoComplete="address-level2" />
      </div>

      <fieldset className="apply-field">
        <legend>Availability? <span aria-hidden="true">*</span></legend>
        <div className="apply-options">
          {AVAILABILITY_OPTIONS.map((day) => (
            <label className="apply-choice" key={day}>
              <input
                type="checkbox"
                name="availability"
                value={day}
                checked={availability.includes(day)}
                onChange={() => toggleDay(day)}
              />
              <span>{day}</span>
            </label>
          ))}
        </div>
        <p className="apply-hint">Select every night you can work.</p>
      </fieldset>

      <fieldset className="apply-field">
        <legend>Are you legally eligible for work in the US? <span aria-hidden="true">*</span></legend>
        <div className="apply-options">
          <label className="apply-choice">
            <input type="radio" name="workEligible" value="Yes" required />
            <span>Yes</span>
          </label>
          <label className="apply-choice">
            <input type="radio" name="workEligible" value="No" />
            <span>No</span>
          </label>
        </div>
      </fieldset>

      <div className="apply-field">
        <label htmlFor="priorExperience">
          Have you ever worked at a haunted attraction or seasonal event before? If so, please list all that apply. <span aria-hidden="true">*</span>
        </label>
        <textarea id="priorExperience" name="priorExperience" rows={4} required maxLength={2000} />
      </div>

      <fieldset className="apply-field">
        <legend>Have you ever worked at Field of Screams before? <span aria-hidden="true">*</span></legend>
        <div className="apply-options">
          <label className="apply-choice">
            <input type="radio" name="workedHereBefore" value="Yes" required />
            <span>Yes</span>
          </label>
          <label className="apply-choice">
            <input type="radio" name="workedHereBefore" value="No" />
            <span>No</span>
          </label>
        </div>
      </fieldset>

      <div className="apply-field">
        <label htmlFor="aboutYou">
          Tell us about yourself, why you want to work with us, and any skills or experience you may have. <span aria-hidden="true">*</span>
        </label>
        <textarea id="aboutYou" name="aboutYou" rows={6} required maxLength={4000} />
      </div>

      {/* Honeypot — hidden from people, catches bots that fill everything. */}
      <div className="apply-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <p className="apply-error" role="alert">{error}</p>
      )}

      <button type="submit" className="btn-ticket apply-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  )
}
