import Image from 'next/image'
import styles from './coming-soon.module.css'

export default function HomePage() {
  return (
    <main className={styles.page}>
      <section className={styles.content} aria-label="Field of Screams Nixa — 2027 season coming soon">
        <Image
          className={styles.logo}
          src="/images/sprites/fos-logotype.png"
          alt="Field of Screams Nixa — Haunted Attractions"
          width={1000}
          height={750}
          sizes="(max-width: 740px) 92vw, 700px"
          priority
        />
        <div className={styles.season}><span>The 2027 Season</span></div>
        <h1 className={styles.headline}>Coming Soon</h1>
      </section>
    </main>
  )
}
