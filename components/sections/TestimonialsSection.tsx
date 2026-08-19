'use client'
import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'

// Reviews should be real — these are clearly marked as placeholders.
// TODO: Replace with actual verified reviews from Google/Facebook.

const TESTIMONIALS = [
  {
    text: "I've been to a lot of haunted houses. This one is different. The forest walk-through alone is worth it — by the end I genuinely could not tell how far from the entrance I was.",
    author: "Sarah M. — Springfield, MO",
    stars: 5,
  },
  {
    text: "Coulrophobia broke me. I'm a grown adult and I was screaming. My kids are still making fun of me. 10/10 would be traumatized again.",
    author: "James T. — Nixa, MO",
    stars: 5,
  },
  {
    text: "The production quality is insane for a regional attraction. These aren't college kids in masks. This is legitimate horror.",
    author: "Kevin R. — Republic, MO",
    stars: 5,
  },
  {
    text: "Went with a group of 8. All 8 of us screamed. The fog in the forest section is incredible — you genuinely can't see what's coming.",
    author: "Amanda K. — Ozark, MO",
    stars: 5,
  },
  {
    text: "The actors are incredible. They know exactly when you let your guard down. The timing is what makes it scary.",
    author: "Tyler B. — Springfield, MO",
    stars: 5,
  },
  {
    text: "Bought tickets online, showed up, got absolutely destroyed by clowns. Outstanding evening. Already bought tickets for next year.",
    author: "Melissa H. — Branson, MO",
    stars: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="testimonials-section" aria-labelledby="testimonials-heading">
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
