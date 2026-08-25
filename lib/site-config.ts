/**
 * Site Configuration
 * Update these values to reflect the current season.
 * DO NOT hardcode dates/prices elsewhere — always reference this file.
 */

export const siteConfig = {
  name: 'Field of Screams Nixa',
  shortName: 'FoS Nixa',
  domain: 'fieldofscreamsnixa.com',
  tagline: 'Two Nightmares. One Location.',
  subTagline: 'Haunted Attractions — Nixa, Missouri',

  // ─── Location ─────────────────────────────────────────────────────────
  // Confirmed from official event footage — venue is "Summers at the River"
  address: {
    venue: 'Summers at the River',
    street: '2142 N. Sports Complex Ln.',
    city: 'Nixa',
    state: 'MO',
    zip: '',
    display: 'Summers at the River, 2142 N. Sports Complex Ln., Nixa, MO',
    mapsUrl: 'https://maps.google.com/?q=Summers+at+the+River+2142+N+Sports+Complex+Ln+Nixa+MO',
  },
  phone: '', // TODO: Add phone number from site

  // ─── 2026 Season ──────────────────────────────────────────────────────
  // Confirmed 2026 schedule from the official dates listing.
  season: {
    year: 2026,
    // First opening night — used for the countdown.
    openingDate: new Date('2026-09-18T19:00:00'),
    // Final night runs past midnight, so the close is the small hours of
    // the 2nd rather than 23:00 on the 1st.
    closingDate: new Date('2026-11-02T00:00:00'),
    hoursDisplay: 'Open 7:00 PM – 12:00 AM',
    dates: [
      'September 18', 'September 19',
      'September 25', 'September 26',
      'October 2', 'October 3', 'October 4',
      'October 9', 'October 10', 'October 11',
      'October 16', 'October 17', 'October 18',
      'October 23', 'October 24', 'October 25',
      'October 29', 'October 30', 'October 31',
      'November 1',
    ],
    // The pattern genuinely differs by month, so this states it plainly
    // rather than flattening it to one rule: September is Fri/Sat only,
    // October adds Sundays, and Halloween week picks up Thursday the 29th.
    specialNote:
      'September: Friday & Saturday. October: Friday, Saturday & Sunday, plus Thursday the 29th. Closing night Sunday, November 1.',
    displayRange: 'Sept 18 – Nov 1, 2026',
  },

  // ─── Tickets ──────────────────────────────────────────────────────────
  // Sold through HauntPay. This is an EXTERNAL host, so every link to it
  // opens in a new tab and must not be routed through next/link.
  tickets: {
    url: 'https://app.hauntpay.com/events/field-of-scream-2026',
    generalLabel: 'General Admission',
    vipLabel: 'VIP Fast Pass',
  },

  // ─── Attractions ──────────────────────────────────────────────────────
  attractions: [
    {
      id: 'haunted-forest',
      name: 'Haunted Forest',
      shortName: 'The Forest',
      tagline: 'The trees remember everything.',
      description:
        'Venture into the dark Missouri woods where something ancient and terrible has made its home. The Haunted Forest is an immersive walk-through experience where every shadow hides something watching you. Dense foliage. Disorienting trails. Things that move in the dark.',
      environment: 'forest' as const,
      href: '/haunted-forest',
    },
    {
      id: 'coulrophobia',
      name: 'Coulrophobia',
      shortName: 'The Carnival',
      tagline: 'Are you afraid of clowns? You will be.',
      description:
        'Deep inside the property, the woods give way to something worse — a broken carnival that never should have been built here. Coulrophobia is a descent into a nightmare world of rotting tent fabric, flickering lights, and things wearing painted smiles. Your fear of clowns is about to become very justified.',
      environment: 'coulrophobia' as const,
      href: '/coulrophobia',
    },
  ],

  // ─── Social ───────────────────────────────────────────────────────────
  // TODO: Confirm actual social media URLs
  social: {
    facebook: 'https://www.facebook.com/FieldOfScreamsNixa',
    instagram: 'https://www.instagram.com/fieldofscreamsnixa',
    tiktok: '',
  },

  // ─── Sponsors ─────────────────────────────────────────────────────────
  // From the sponsor sheet provided directly — no URLs were included, so
  // none are linked out. Add a `url` field per sponsor if/when confirmed.
  sponsors: [
    { name: 'Ozarks Concrete Coatings', logo: '/images/sponsors/ozarks-concrete-coatings.png' },
    { name: 'The Farm — Where Businesses Grow', logo: '/images/sponsors/the-farm.png' },
    { name: 'Timeless', logo: '/images/sponsors/timeless.png' },
    { name: "Plato's Closet", logo: '/images/sponsors/platos-closet.png' },
    { name: 'Alamo Drafthouse Cinema', logo: '/images/sponsors/alamo-drafthouse-cinema.png' },
    { name: 'Misfiotic Prints', logo: '/images/sponsors/misfiotic-prints.png' },
    { name: 'Color Works Salon & Spa', logo: '/images/sponsors/color-works-salon-spa.png' },
    { name: 'Garage Beer', logo: '/images/sponsors/garage-beer.png' },
    { name: 'Bit-O-Joy Graphics', logo: '/images/sponsors/bit-o-joy-graphics.png' },
    { name: 'Club K Dental', logo: '/images/sponsors/club-k-dental.png' },
    { name: 'Next Generation Tattoo & Body Piercing', logo: '/images/sponsors/next-generation-tattoo.png' },
    { name: 'Stairway', logo: '/images/sponsors/stairway.png' },
  ],

  // ─── SEO ──────────────────────────────────────────────────────────────
  seo: {
    defaultTitle: 'Field of Screams Nixa | Haunted Attraction | Nixa, Missouri',
    titleTemplate: '%s | Field of Screams Nixa',
    defaultDescription:
      'Field of Screams Nixa is Southwest Missouri\'s premier haunted attraction. Two terrifying experiences — The Haunted Forest and Coulrophobia — in Nixa, MO. Open September 18 through November 1, 2026.',
    ogImage: '/images/fos-banner.jpg',
    twitterCard: 'summary_large_image',
  },

  // ─── Analytics ────────────────────────────────────────────────────────
  // TODO: Add actual IDs from the live site
  analytics: {
    gaId: '', // e.g. 'G-XXXXXXXXXX'
    metaPixelId: '', // e.g. '1234567890'
  },

  // ─── FAQ ──────────────────────────────────────────────────────────────
  faq: [
    {
      question: 'How scary is Field of Screams Nixa?',
      answer:
        'Very. This is a real haunted attraction designed for adults and older teens. We do not recommend it for young children or anyone with heart conditions. The experiences are designed to genuinely terrify you.',
    },
    {
      question: 'Are tickets purchased at the gate or online?',
      answer:
        'Online ticket sales are strongly recommended. Gate availability is not guaranteed on peak nights. Purchase in advance to secure your spot.',
    },
    {
      question: 'How long does each attraction take?',
      answer:
        'Each attraction typically runs 20–35 minutes depending on group size and pace. Plan to spend at least 90 minutes on property if you\'re doing both.',
    },
    {
      question: 'Is Field of Screams Nixa appropriate for children?',
      answer:
        'We recommend guests be at least 10–12 years old. Parental discretion is strongly advised. Children must be accompanied by an adult.',
    },
    {
      question: 'What should I wear?',
      answer:
        'Wear comfortable, closed-toe shoes — the terrain includes uneven ground, grass, and gravel. Dress for outdoor fall weather in Missouri.',
    },
    {
      question: 'Is there parking on site?',
      answer:
        'Yes, free parking is available on the property. Follow signage upon arrival.',
    },
    {
      question: 'Do the actors touch guests?',
      answer:
        'Our actors are trained not to make physical contact with guests. However, this is a fully immersive experience — expect to feel surrounded.',
    },
    {
      question: 'What is your refund policy?',
      answer:
        'Tickets are non-refundable. In the event of weather cancellation, we will work with ticket holders to reschedule.',
    },
    {
      question: 'Are flash photography or phones allowed inside?',
      answer:
        'Phones are allowed but flash photography is prohibited inside the attractions. It ruins the experience for everyone — and you\'re going to want both hands free.',
    },
    {
      question: 'Is Field of Screams Nixa pet-friendly?',
      answer:
        'Pets are not permitted on the property during operating hours.',
    },
  ],
}

export type SiteConfig = typeof siteConfig
export type Attraction = (typeof siteConfig.attractions)[number]
