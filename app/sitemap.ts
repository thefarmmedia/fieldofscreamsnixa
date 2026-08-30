import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

const base = `https://${siteConfig.domain}`
const lastModified = new Date('2026-08-30')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: base,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/haunted-forest`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/coulrophobia`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${base}/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/gallery`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${base}/sponsors`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${base}/dates`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/directions`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/safety-rules`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]
}
