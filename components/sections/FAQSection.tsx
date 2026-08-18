'use client'

import { useState } from 'react'
import { siteConfig } from '@/lib/site-config'

export default function FAQSection({ limit }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const items = limit ? siteConfig.faq.slice(0, limit) : siteConfig.faq

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  // Build FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: siteConfig.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return (
    <section className="section" id="faq" aria-labelledby="faq-heading">
      {!limit && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="section-inner">
        <p className="section-label">Before You Enter</p>
        <h2 className="section-title" id="faq-heading">
          Questions from the Living
        </h2>
        <div className="section-divider" />

        <div className="faq-list" role="list">
          {items.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? 'open' : ''}`}
              role="listitem"
            >
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-question-${i}`}
              >
                <span className="faq-question-text">{item.question}</span>
                <span className="faq-icon" aria-hidden="true" />
              </button>
              <div
                className="faq-answer"
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
              >
                <div className="faq-answer-inner">
                  <p className="faq-answer-text">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {limit && (
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="/faq" className="btn-secondary">
              View All Questions
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
