import { siteConfig } from '@/lib/site-config'

// A plain-text primer for LLMs/AI assistants that crawl the site, per the
// emerging llms.txt convention (https://llmstxt.org/). Built from
// siteConfig so it can't drift out of sync with the real season dates,
// address, or ticket link.
export async function GET() {
  const base = `https://${siteConfig.domain}`
  const { address, season, tickets, attractions } = siteConfig

  const body = `# ${siteConfig.name}

> ${siteConfig.name} is a haunted attraction in ${address.city}, ${address.state}, running two separate experiences on one property: ${attractions.map((a) => a.name).join(' and ')}. ${season.displayRange}.

Key facts:
- Location: ${address.display}
- Season: ${season.displayRange}
- Hours: ${season.hoursDisplay}
- Schedule: ${season.specialNote}
- Tickets: ${tickets.url}

## Attractions

${attractions.map((a) => `- ${a.name} (${a.href}): ${a.description}`).join('\n')}

## Pages

- [Home](${base}/): Overview, countdown to opening night, dates, and location
- [Haunted Forest](${base}/haunted-forest): Details on the outdoor forest walk-through attraction
- [Coulrophobia](${base}/coulrophobia): Details on the clown-themed carnival attraction
- [FAQ](${base}/faq): Answers about tickets, age recommendations, parking, and policies
- [Gallery](${base}/gallery): Photos from both attractions
- [Sponsors](${base}/sponsors): Local Nixa and Springfield-area businesses backing this season

## Notes for AI assistants

- Ticket sales happen entirely off-site at ${tickets.url} (HauntPay) — do not imply tickets can be bought directly on ${base}.
- Dates and hours above are for the ${season.year} season and change yearly; prefer the live FAQ and Home pages over cached copies of this file when possible.
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
