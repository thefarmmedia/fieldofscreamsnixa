'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Anton } from 'next/font/google'
import { blackFriday, blackFridayStateScript, comingSoonTitle } from '@/lib/black-friday'
import { startTakeover } from './takeover'
import './black-friday.css'

const anton = Anton({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-anton' })

/** CSS custom properties for the art hotspots: v({ x: '50%' }) → { '--x': '50%' } */
const v = (vars: Record<string, string | number>) =>
  Object.fromEntries(Object.entries(vars).map(([k, val]) => [`--${k}`, String(val)])) as CSSProperties

const TITLE = ['Black', 'Friday']

const GA_ART = '/images/black-friday/bf-nixa-ga-20.webp'
const PASS_ART = '/images/black-friday/bf-season-pass-99.webp'

const EMBERS = [
  { x: '12%', s: '4px', d: '6.5s', dl: '-1s', dx: '14px' },
  { x: '24%', s: '3px', d: '8s', dl: '-5.2s', dx: '-10px' },
  { x: '37%', s: '5px', d: '7s', dl: '-2.8s', dx: '8px' },
  { x: '55%', s: '3px', d: '9s', dl: '-7s', dx: '-14px' },
  { x: '66%', s: '4px', d: '6s', dl: '-3.6s', dx: '12px' },
  { x: '79%', s: '3px', d: '7.5s', dl: '-0.4s', dx: '-8px' },
  { x: '89%', s: '5px', d: '8.5s', dl: '-6s', dx: '-12px' },
]

const pad = (n: number) => String(n).padStart(2, '0')

function TicketIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16a1 1 0 0 1 1 1v3a2 2 0 0 0 0 4v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-3a2 2 0 0 0 0-4V7a1 1 0 0 1 1-1z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15 7v10" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" />
    </svg>
  )
}

export default function BlackFridaySpecials() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fallbackRef = useRef<HTMLDivElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const eyesRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  // Milliseconds left in the sale; null until the browser has checked the clock.
  const [left, setLeft] = useState<number | null>(null)

  useEffect(() => {
    const cl = document.documentElement.classList
    if (!cl.contains('bf-live')) {
      if (cl.contains('bf-ended')) document.title = comingSoonTitle
      return
    }
    const canvas = canvasRef.current
    const fallback = fallbackRef.current
    const flash = flashRef.current
    const eyes = eyesRef.current
    const section = sectionRef.current
    if (!canvas || !fallback || !flash || !eyes || !section) return

    const stop = startTakeover({ canvas, fallback, flash, eyes, section })

    // Countdown + automatic shut-off at the cutoff.
    const forced = /[?&]bf=on\b/.test(window.location.search)
    let timer = 0
    const tick = () => {
      const ms = blackFriday.endsAt - Date.now()
      if (ms <= 0 && !forced) {
        window.clearInterval(timer)
        stop()
        cl.remove('bf-live', 'bf-intro', 'bf-dissolve', 'bf-reveal', 'bf-fx')
        cl.add('bf-ended')
        document.title = comingSoonTitle
        return
      }
      setLeft(Math.max(0, ms))
    }
    tick()
    timer = window.setInterval(tick, 1000)

    return () => {
      window.clearInterval(timer)
      stop()
    }
  }, [])

  const secs = Math.floor((left ?? 0) / 1000)
  const countdown = [
    { label: 'Days', value: String(Math.floor(secs / 86400)) },
    { label: 'Hours', value: pad(Math.floor((secs % 86400) / 3600)) },
    { label: 'Mins', value: pad(Math.floor((secs % 3600) / 60)) },
    { label: 'Secs', value: pad(secs % 60) },
  ]

  let ch = 0

  return (
    <>
      {/* Sets the page state before first paint: specials live, intro pending, or sale over. */}
      <script dangerouslySetInnerHTML={{ __html: blackFridayStateScript }} />

      <canvas ref={canvasRef} className="bf-fog" aria-hidden="true" />
      <div ref={fallbackRef} className="bf-fog-fallback" aria-hidden="true" />
      <div ref={flashRef} className="bf-flash" aria-hidden="true" />
      <div ref={eyesRef} className="bf-eyes" aria-hidden="true"><i /><i /></div>

      {/* BLACK FRIDAY SPECIALS: hides itself automatically after Fri Nov 27, 11:59 PM CT. */}
      <section ref={sectionRef} className={`bf ${anton.variable}`} id="black-friday" aria-labelledby="bf-title">
        <div className="bf-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="bf-logo" src="/images/sprites/fos-logotype-clean.png" width={1250} height={938} alt="Field of Screams Nixa — Haunted Attractions" />
          <p className="bf-kicker"><span>Limited time only</span></p>
          <h2 className="bf-title" id="bf-title">
            <span className="bf-sr">Black Friday Specials</span>
            <span className="bf-title-black" aria-hidden="true">
              {TITLE.map((word, w) => (
                <span key={word}>
                  {w > 0 && ' '}
                  <span className="w">
                    {word.split('').map(letter => (
                      <span key={ch} className="ch" style={v({ i: ch++ })}>{letter}</span>
                    ))}
                  </span>
                </span>
              ))}
            </span>
            <span className="bf-title-specials" aria-hidden="true">Specials</span>
          </h2>
          <div className="bf-deadline">
            <p className="bf-ends">Ends <strong>{blackFriday.endsLabel}</strong> at 11:59 PM CT</p>
            <div className="bf-countdown" role="timer" aria-label="Time left on the Black Friday specials" hidden={left === null}>
              {countdown.map(unit => (
                <span key={unit.label}><b>{unit.value}</b><small>{unit.label}</small></span>
              ))}
            </div>
          </div>

          <div className="bf-deals">
            <article className="bf-deal bf-deal--ga" style={v({ n: 0 })}>
              <div className="bf-card">
                <div className="bf-art" style={v({ art: `url('${GA_ART}')` })}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={GA_ART} width={1200} height={1200} decoding="async" alt="Field of Screams Nixa Black Friday Special: $20 general admission ticket, good for either attraction at Field of Screams Nixa." />
                  <div className="fx-wrap" aria-hidden="true">
                    <span className="fx fx-loom" style={v({ x: '18.5%', y: '12%', rx: '15%', ry: '20%' })} />
                    <span className="fx fx-lit fx-flicker" style={v({ x: '50%', y: '14%', rx: '32%', ry: '16%', b: 1.5 })} />
                    <span className="fx fx-lit fx-ghost" style={v({ x: '11%', y: '30%', rx: '11%', ry: '15%', b: 1.9 })} />
                    <span className="fx fx-lit fx-heat" style={v({ x: '50%', y: '65%', rx: '34%', ry: '16%', b: 1.5 })} />
                    <span className="fx fx-lit" style={v({ x: '50%', y: '88.6%', rx: '46%', ry: '8%', d: '3.2s', dl: '1s', peak: 0.55 })} />
                    <span className="fx fx-eye is-red" style={v({ x: '17.1%', y: '7.1%', s: '3.6%' })} />
                    <span className="fx fx-eye is-red" style={v({ x: '20%', y: '7.4%', s: '3.6%' })} />
                    <span className="fx fx-sheen" style={v({ l: '16%', r: '13%', t: '33%', btm: '49%' })} />
                    <span className="fx fx-sheen" style={v({ l: '9%', r: '9%', t: '83%', btm: '5.5%', dl: '2.4s' })} />
                    <span className="fx fx-embers">
                      {EMBERS.map(e => <i key={e.x} style={v(e)} />)}
                    </span>
                    <span className="fx fx-mist"><i /><i /></span>
                    <span className="fx fx-glare" />
                  </div>
                </div>
              </div>
              <p className="bf-tag">Nixa</p>
              <h3 className="bf-deal-title"><span className="price">$20</span> General Admission</h3>
              <p className="bf-deal-copy">Good for either attraction at Field of Screams Nixa.</p>
              <a className="bf-btn" href={blackFriday.tickets.generalAdmission} target="_blank" rel="noopener noreferrer">
                <TicketIcon />
                Get $20 Tickets
              </a>
            </article>

            <article className="bf-deal bf-deal--pass" style={v({ n: 1 })}>
              <div className="bf-card">
                <div className="bf-art" style={v({ art: `url('${PASS_ART}')` })}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={PASS_ART} width={1200} height={1200} decoding="async" alt="2027 Season Pass, $99, unlimited uses. Good for both attractions at Field of Screams Nixa and both attractions at Field of Screams Branson. Fast Pass included." />
                  <div className="fx-wrap" aria-hidden="true">
                    <span className="fx fx-strike" />
                    <span className="fx fx-lit fx-bolt" style={v({ x: '50.5%', y: '13%', rx: '6%', ry: '17%', b: 2.4 })} />
                    <span className="fx fx-lit" style={v({ x: '30%', y: '14%', rx: '16%', ry: '12%', d: '3.8s', peak: 0.55 })} />
                    <span className="fx fx-lit" style={v({ x: '70%', y: '13%', rx: '16%', ry: '12%', d: '3.8s', dl: '1.9s', peak: 0.55 })} />
                    <span className="fx fx-lit fx-ghost" style={v({ x: '9%', y: '26%', rx: '10%', ry: '13%', b: 1.9 })} />
                    <span className="fx fx-lit" style={v({ x: '49%', y: '51.5%', rx: '20%', ry: '7.5%', d: '2.6s', dl: '.6s', peak: 0.75 })} />
                    <span className="fx fx-eye is-red" style={v({ x: '12.5%', y: '6.6%', s: '3.2%' })} />
                    <span className="fx fx-eye is-red" style={v({ x: '13.8%', y: '6.6%', s: '3.2%' })} />
                    <span className="fx fx-eye is-green" style={v({ x: '88.4%', y: '10.6%', s: '8.5%', dl: '-1.4s' })} />
                    <span className="fx fx-eye is-green" style={v({ x: '96.1%', y: '10.4%', s: '8.5%', dl: '-1.6s' })} />
                    <span className="fx fx-sheen" style={v({ l: '22.5%', r: '22.5%', t: '59%', btm: '34%', dl: '2.4s' })} />
                    <span className="fx fx-sheen" style={v({ l: '17%', r: '17%', t: '84.8%', btm: '7.4%' })} />
                    <span className="fx fx-mist"><i /><i /></span>
                    <span className="fx fx-glare" />
                  </div>
                </div>
              </div>
              <p className="bf-tag">Nixa + Branson</p>
              <h3 className="bf-deal-title"><span className="price">$99</span> 2027 Season Pass</h3>
              <p className="bf-deal-copy">Unlimited uses at both attractions in Nixa and both in Branson. Fast Pass included.</p>
              <a className="bf-btn" href={blackFriday.tickets.seasonPass} target="_blank" rel="noopener noreferrer">
                <TicketIcon />
                Get Season Pass
              </a>
            </article>
          </div>
        </div>
      </section>
    </>
  )
}
