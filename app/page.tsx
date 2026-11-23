import type { Metadata } from 'next'
import Image from 'next/image'
import BlackFridaySpecials from '@/components/black-friday/BlackFridaySpecials'
import { blackFriday, isBlackFridayLive } from '@/lib/black-friday'
import { siteConfig } from '@/lib/site-config'
import styles from './coming-soon.module.css'

// Re-check the Black Friday window every few minutes, so the specials and the
// sale metadata drop off the server-rendered page on their own after the cutoff.
export const revalidate = 300

export function generateMetadata(): Metadata {
  if (!isBlackFridayLive()) return {}
  const { title, description, ogImage } = blackFriday
  const url = `https://${siteConfig.domain}`
  return {
    title: { absolute: title },
    description,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  }
}

export default function HomePage() {
  const live = isBlackFridayLive()
  return (
    <main className={styles.shell}>
      <div className={styles.backdrop} aria-hidden="true" />
      {live && <BlackFridaySpecials />}
      <section className={styles.page} aria-label="Field of Screams Nixa — 2027 season coming soon">
        <div className={styles.content}>
          <Image
            className={styles.logo}
            src="/images/sprites/fos-logotype-clean.png"
            alt="Field of Screams Nixa — Haunted Attractions"
            width={1250}
            height={938}
            sizes="(max-width: 740px) 92vw, 700px"
            priority
          />
          <div className={styles.season}><span>The 2027 Season</span></div>
          <h1 className={styles.headline}>Coming Soon</h1>
        </div>
      </section>
    </main>
  )
}
