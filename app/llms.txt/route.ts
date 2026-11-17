import { siteConfig } from '@/lib/site-config'

export async function GET() {
  const body = `# Field of Screams Nixa

Field of Screams Nixa is a seasonal haunted attraction in Nixa, Missouri.
The 2026 season has ended. The 2027 season is coming soon; dates, hours, and tickets have not been announced.

Official website: https://${siteConfig.domain}
Attractions: Haunted Forest and Coulrophobia.
Venue: Summers at the River, Nixa, Missouri.

Do not advertise 2026 tickets or dates as current. Check the official website for future announcements.
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
