'use client'
import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'

// Real reviews, pulled directly from the business's Google listing.
const TESTIMONIALS = [
  {
    text: "This was definitely a fun experience, the trail was well designed with a good variety of different scenes to walk through the actors were great and interactive. Definitely worth the visit!",
    author: "Robin Barnes",
    stars: 5,
    datePublished: '2025-11',
  },
  {
    text: "This is our 4th time coming to Field of Screams and this is the best year yet! So much attention to detail and lots of jump scares. Had a phenomenal time and can't wait for next year!!! 💀🪦🦇",
    author: "Skylyn Lindsey",
    stars: 5,
    datePublished: '2025-11',
  },
  {
    text: "we had such an expectedly great time when we went! both attractions were well done and thoroughly scaring. we cried in both. the forest was my favorite and the actors/actresses did phenomenal, especially kiara. i cant wait to go back next season.",
    author: "Samantha Determan",
    stars: 5,
    datePublished: '2025-11',
  },
  {
    text: "I've been to Field of Screams every year since it's inception. It's grown in leaps and bounds every year, driven by the passion and vision of the folks behind it. Reasonable prices, incredible customer service, and a real dedication to the horror are why I'd recommend it to everyone and anyone who loves a good spook.",
    author: "Nathan Lee",
    stars: 5,
    datePublished: '2025-11',
  },
  {
    text: "A creative haunt with Soo many activities too! Great staff, amazing bonfires, delicious concessions, and pure autumn spookiness.",
    author: "Brandon Lauthern",
    stars: 5,
    datePublished: '2025-11',
  },
  {
    text: "So much fun! Great scare actors and such beautiful and creepy sets! Definitely recommend!",
    author: "Rachael Shepherd",
    stars: 5,
    datePublished: '2025-10',
  },
]

const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'AmusementPark',
  name: siteConfig.name,
  review: TESTIMONIALS.map((t) => ({
    '@type': 'Review',
    reviewRating: { '@type': 'Rating', ratingValue: t.stars, bestRating: 5 },
    author: { '@type': 'Person', name: t.author },
    reviewBody: t.text,
    datePublished: t.datePublished,
  })),
}

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <div className="testimonials-bg" aria-hidden="true">
        <Image
          src="/images/attraction/clown-skull-dark.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '50% 20%' }}
        />
      </div>

      <div className="section-inner">
        <p className="section-label">Reviews</p>
        <h2 className="section-title" id="testimonials-heading">
          What the Survivors Said
        </h2>
        <div className="section-divider" />

        <div className="testimonial-rail">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="testimonial-slide">
              <div className="testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
                {'★'.repeat(t.stars)}
              </div>
              <blockquote className="testimonial-quote">{t.text}</blockquote>
              <figcaption className="testimonial-author">{t.author}</figcaption>
            </figure>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Read More Reviews on Facebook
          </a>
        </div>
      </div>
    </section>
  )
}
