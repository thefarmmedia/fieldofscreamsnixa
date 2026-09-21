import { NextResponse } from 'next/server'

// Forwards employment applications to the CRM's inbound webhook.
//
// This runs server-side on purpose: it keeps the webhook URL out of the
// client bundle, sidesteps CORS, and gives us one place to reject junk
// before it reaches the CRM. Override the URL with an APPLY_WEBHOOK_URL
// env var in Netlify to rotate it without a code change.
const WEBHOOK_URL =
  process.env.APPLY_WEBHOOK_URL ||
  'https://services.leadconnectorhq.com/hooks/0kmfBDIQy8GUurlqhhYG/webhook-trigger/a37d57f3-7b6f-44a5-a870-d2aa9a2589ee'

// Field name -> max accepted length. Anything longer is a bot or a paste
// accident; either way the CRM shouldn't have to store it.
const LIMITS: Record<string, number> = {
  firstName: 80,
  lastName: 80,
  email: 160,
  phone: 40,
  age: 20,
  driversLicense: 10,
  position: 120,
  backgroundCheck: 10,
  city: 80,
  workEligible: 10,
  priorExperience: 2000,
  workedHereBefore: 10,
  aboutYou: 4000,
}

const REQUIRED = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'age',
  'position',
  'backgroundCheck',
  'city',
  'workEligible',
  'priorExperience',
  'workedHereBefore',
  'aboutYou',
] as const

const AVAILABILITY_OPTIONS = ['Thursdays', 'Fridays', 'Saturdays', 'Sundays']

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot — a real person never sees or fills this field.
  if (asString(body.website)) {
    return NextResponse.json({ ok: true })
  }

  const fields: Record<string, string> = {}
  for (const [name, max] of Object.entries(LIMITS)) {
    const value = asString(body[name])
    if (value.length > max) {
      return NextResponse.json({ error: 'One of your answers is too long.' }, { status: 400 })
    }
    fields[name] = value
  }

  const availability = Array.isArray(body.availability)
    ? body.availability.filter((day): day is string => AVAILABILITY_OPTIONS.includes(day as string))
    : []

  const missing = REQUIRED.filter((name) => !fields[name])
  if (missing.length > 0 || availability.length === 0) {
    return NextResponse.json({ error: 'Please fill in every required field.' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  // Flat, snake_case keys — the CRM's inbound webhook maps those onto
  // contact fields directly, and can't map nested objects or arrays.
  const payload = {
    first_name: fields.firstName,
    last_name: fields.lastName,
    full_name: `${fields.firstName} ${fields.lastName}`,
    email: fields.email,
    phone: fields.phone,
    age_bracket: fields.age,
    drivers_license: fields.driversLicense,
    position_desired: fields.position,
    background_check_consent: fields.backgroundCheck,
    city: fields.city,
    availability: availability.join(', '),
    legally_eligible_to_work_us: fields.workEligible,
    prior_haunt_experience: fields.priorExperience,
    worked_at_field_of_screams_before: fields.workedHereBefore,
    about_you: fields.aboutYou,
    applying_for_location: 'Nixa',
    form_name: 'Nixa Employment Application',
    source: 'fieldofscreamsnixa.com/apply',
    submitted_at: new Date().toISOString(),
  }

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      // Status only — never log applicant details.
      console.error(`Apply webhook rejected submission: ${response.status}`)
      return NextResponse.json(
        { error: 'We could not submit your application. Please try again in a moment.' },
        { status: 502 }
      )
    }
  } catch {
    return NextResponse.json(
      { error: 'We could not reach our application system. Please try again in a moment.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
