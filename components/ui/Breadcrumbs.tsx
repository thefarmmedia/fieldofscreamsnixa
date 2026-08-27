import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export interface BreadcrumbItem {
  label: string
  /** Omit on the last item — it renders as the current page, not a link. */
  href?: string
}

/**
 * Visible breadcrumb trail plus its matching BreadcrumbList schema.
 * "Home" is implicit — every trail starts there, so callers only pass the
 * segments after it.
 */
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const trail: BreadcrumbItem[] = [{ label: 'Home', href: '/' }, ...items]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://${siteConfig.domain}${item.href === '/' ? '' : item.href}` } : {}),
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.65rem', letterSpacing: '0.15em' }}>
          {trail.map((item, i) => {
            const isLast = i === trail.length - 1
            return (
              <li key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {i > 0 && <span aria-hidden="true" style={{ color: 'rgba(196,26,0,0.4)' }}>›</span>}
                {isLast || !item.href ? (
                  <span style={{ color: 'rgba(232,228,220,0.6)' }} aria-current="page">{item.label}</span>
                ) : (
                  <Link href={item.href} style={{ color: 'rgba(232,228,220,0.35)', textDecoration: 'none' }}>
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
