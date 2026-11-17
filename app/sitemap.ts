import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'

// Only the current holding page should be advertised to crawlers.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{
    url: `https://${siteConfig.domain}`,
    lastModified: new Date('2026-11-16'),
    changeFrequency: 'monthly',
    priority: 1,
  }]
}
