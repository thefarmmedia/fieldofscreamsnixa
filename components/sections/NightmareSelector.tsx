import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

// Forest SVG for the Haunted Forest card
function ForestCardSVG() {
  return (
    <svg
      viewBox="0 0 400 600"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="forestCardSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#010305" />
          <stop offset="60%" stopColor="#020810" />
          <stop offset="100%" stopColor="#030d18" />
        </linearGradient>
        <radialGradient id="forestMoon" cx="30%" cy="15%" r="25%">
          <stop offset="0%" stopColor="rgba(170, 210, 255, 0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <rect width="400" height="600" fill="url(#forestCardSky)" />
      <rect width="400" height="600" fill="url(#forestMoon)" />

      {/* Distant treeline */}
      <path
        d="M0 340 Q25 310 50 320 Q70 295 90 305 Q110 280 130 292 Q150 268 170 280 Q190 255 210 268 Q230 244 250 258 Q270 234 290 248 Q310 224 330 238 Q350 215 370 230 Q385 220 400 228 L400 600 L0 600Z"
        fill="#020608"
        opacity="0.9"
      />

      {/* Mid trees */}
      <path
        d="M-10 600 L-10 420 L10 380 L0 340 L15 380 L20 420 L30 380 L40 340 L50 380 L55 420 L65 380 L75 340 L85 380 L90 420 L100 380 L110 340 L120 380 L125 420 L135 380 L145 340 L155 380 L160 420"
        stroke="#030a14"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />

      {/* Dead trees mid */}
      <path d="M60 600 C58 520 56 450 58 390 M58 390 C45 375 35 368 28 360 M58 390 C70 378 78 370 84 363 M58 420 C44 410 34 404 26 398 M58 430 C72 420 80 414 86 408"
        stroke="#030a14" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M200 600 C198 510 196 440 198 375 M198 375 C183 358 172 350 164 342 M198 375 C212 360 222 352 228 344 M198 405 C182 393 172 386 164 379 M198 415 C214 403 224 396 230 389"
        stroke="#030a14" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M340 600 C338 520 336 450 338 385 M338 385 C325 370 315 363 308 355 M338 385 C350 372 358 365 364 358 M338 415 C325 403 316 396 308 390"
        stroke="#030a14" strokeWidth="9" strokeLinecap="round" fill="none" />

      {/* Foliage trees near */}
      <path d="M-20 600 C-18 500 -15 420 -12 350 C-10 310 -12 280 -10 250
               M-10 250 C-28 238 -42 230 -50 220 M-10 250 C6 238 18 230 24 220
               M-12 310 C-30 300 -44 293 -52 284 M-12 310 C4 300 16 294 22 285
               M-14 360 C-30 352 -42 346 -50 338"
        stroke="#040c18" strokeWidth="18" strokeLinecap="round" fill="none" />

      <path d="M420 600 C418 500 415 420 412 350 C410 310 412 280 410 250
               M410 250 C428 238 442 230 450 220 M410 250 C394 238 382 230 376 220
               M412 310 C430 300 444 293 452 284 M412 310 C396 300 384 294 378 285
               M414 360 C430 352 442 346 450 338"
        stroke="#040c18" strokeWidth="18" strokeLinecap="round" fill="none" />

      {/* Ground fog */}
      <defs>
        <radialGradient id="forestCardFog" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="rgba(110, 145, 180, 0.3)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <rect width="400" height="600" fill="url(#forestCardFog)" />

      {/* Hidden eyes — very subtle */}
      <ellipse cx="195" cy="380" rx="2" ry="1.5" fill="rgba(150, 210, 50, 0.4)" />
      <ellipse cx="205" cy="380" rx="2" ry="1.5" fill="rgba(150, 210, 50, 0.4)" />

      {/* Bottom gradient */}
      <defs>
        <linearGradient id="forestCardBottom" x1="0" y1="0.6" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(1,2,4,0)" />
          <stop offset="100%" stopColor="rgba(1,2,4,0.98)" />
        </linearGradient>
      </defs>
      <rect width="400" height="600" fill="url(#forestCardBottom)" />
    </svg>
  )
}

// Carnival SVG for the Coulrophobia card
function CarnivalCardSVG() {
  return (
    <svg
      viewBox="0 0 400 600"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="carnivalCardBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#060103" />
          <stop offset="50%" stopColor="#0a0205" />
          <stop offset="100%" stopColor="#0e0308" />
        </linearGradient>
        <radialGradient id="carnivalGlow" cx="50%" cy="30%" r="40%">
          <stop offset="0%" stopColor="rgba(70, 8, 8, 0.2)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <linearGradient id="carnivalBottom" x1="0" y1="0.55" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(6,1,3,0)" />
          <stop offset="100%" stopColor="rgba(6,1,3,0.98)" />
        </linearGradient>
      </defs>
      <rect width="400" height="600" fill="url(#carnivalCardBg)" />
      <rect width="400" height="600" fill="url(#carnivalGlow)" />

      {/* Tent stripe top */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
        <path
          key={x}
          d={`M${x} 0 L${x + 20} 0 L${x + 20} 80 L${x} 80Z`}
          fill={x % 80 === 0 ? 'rgba(80, 10, 10, 0.5)' : 'rgba(30, 5, 5, 0.4)'}
        />
      ))}
      <path d="M0 80 Q50 100 100 80 Q150 60 200 80 Q250 100 300 80 Q350 60 400 80 L400 0 L0 0Z"
        fill="rgba(6,1,3,0.6)" />

      {/* Bulb string */}
      <path d="M0 85 Q50 100 100 85 Q150 70 200 88 Q250 102 300 88 Q350 74 400 90"
        stroke="rgba(40, 25, 10, 0.7)" strokeWidth="1.5" fill="none" />
      {[30, 80, 130, 180, 230, 280, 330, 370].map((x, i) => {
        const states = ['on', 'flicker', 'dead', 'on', 'on', 'dead', 'flicker', 'on']
        const isDead = states[i] === 'dead'
        return (
          <g key={x}>
            <line x1={x} y1={85} x2={x} y2={98} stroke="rgba(40,25,10,0.6)" strokeWidth="1" />
            <ellipse
              cx={x}
              cy={105}
              rx={5}
              ry={7}
              fill={isDead ? 'rgba(20,12,5,0.9)' : 'rgba(190, 165, 60, 0.9)'}
              style={!isDead ? {
                filter: 'drop-shadow(0 0 4px rgba(190,165,60,0.7)) drop-shadow(0 0 12px rgba(180,145,30,0.4))',
                animation: states[i] === 'flicker' ? 'carnivalFlicker 6s steps(1) infinite' : undefined,
              } : undefined}
            />
          </g>
        )
      })}

      {/* Dark corridor / entrance */}
      <rect x="130" y="250" width="140" height="280" fill="rgba(2,0,1,0.95)" />
      <path d="M130 250 Q200 220 270 250" stroke="rgba(60,8,8,0.8)" strokeWidth="3" fill="rgba(2,0,1,0.6)" />
      {/* Arch */}
      <path d="M130 250 Q200 215 270 250 L270 530 L130 530Z" fill="rgba(3,1,2,0.9)" />

      {/* Eyes in doorway darkness */}
      <ellipse cx="188" cy="360" rx="3.5" ry="2.5" fill="rgba(200, 160, 60, 0.35)" />
      <ellipse cx="200" cy="360" rx="3.5" ry="2.5" fill="rgba(200, 160, 60, 0.35)" />
      <ellipse cx="188" cy="390" rx="2" ry="1.5" fill="rgba(160, 30, 20, 0.3)" />
      <ellipse cx="198" cy="390" rx="2" ry="1.5" fill="rgba(160, 30, 20, 0.3)" />

      {/* Carnival sign - distressed */}
      <rect x="50" y="160" width="120" height="40" rx="2"
        fill="rgba(60, 35, 10, 0.8)" stroke="rgba(100, 60, 20, 0.5)" strokeWidth="1" />
      <text x="110" y="186"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="12"
        fill="rgba(180,150,70,0.6)"
        letterSpacing="2"
      >
        ENTER
      </text>
      <rect x="230" y="180" width="100" height="35" rx="2"
        fill="rgba(60, 35, 10, 0.7)" stroke="rgba(100, 60, 20, 0.4)" strokeWidth="1" />
      <text x="280" y="202"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="10"
        fill="rgba(160,130,55,0.5)"
        letterSpacing="1.5"
      >
        IF YOU DARE
      </text>

      {/* Carnival fog ground */}
      <defs>
        <radialGradient id="carnivalFog" cx="50%" cy="100%" r="50%">
          <stop offset="0%" stopColor="rgba(90, 50, 30, 0.25)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <rect width="400" height="600" fill="url(#carnivalFog)" />
      <rect width="400" height="600" fill="url(#carnivalBottom)" />
    </svg>
  )
}

export default function NightmareSelector() {
  const [forest, carnival] = siteConfig.attractions

  return (
    <section className="section" id="nightmare" aria-labelledby="nightmare-heading">
      <div className="section-inner">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="section-label">Two Attractions</p>
          <h2 className="section-title" id="nightmare-heading">Choose Your Nightmare</h2>
          <div className="section-divider" />
          <p style={{
            fontSize: '0.9rem',
            color: 'rgba(232,228,220,0.45)',
            maxWidth: 480,
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            They exist on the same property. They belong to the same darkness.
            They feel nothing like each other.
          </p>
        </div>

        <div className="nightmare-grid">
          {/* Haunted Forest Card */}
          <Link href={forest.href} className="nightmare-card" aria-label={`Learn about ${forest.name}`}>
            <div className="nightmare-card-bg nightmare-card-forest-bg">
              <ForestCardSVG />
            </div>
            <div className="nightmare-card-content">
              <p className="nightmare-card-number">Attraction 01</p>
              <h3 className="nightmare-card-name">{forest.name}</h3>
              <p className="nightmare-card-tagline">{forest.tagline}</p>
              <span className="nightmare-card-cta">
                Enter the Forest
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                  <path d="M0 5H14M10 1L14 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Coulrophobia Card */}
          <Link href={carnival.href} className="nightmare-card" aria-label={`Learn about ${carnival.name}`}>
            <div className="nightmare-card-bg nightmare-card-carnival-bg">
              <CarnivalCardSVG />
            </div>
            <div className="nightmare-card-content">
              <p className="nightmare-card-number">Attraction 02</p>
              <h3
                className="nightmare-card-name glitch-text"
                data-glitch={carnival.name}
              >
                {carnival.name}
              </h3>
              <p className="nightmare-card-tagline">{carnival.tagline}</p>
              <span className="nightmare-card-cta">
                Enter the Carnival
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                  <path d="M0 5H14M10 1L14 5L10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>
        </div>

        {/* Combined ticket CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-cinzel), Georgia, serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            color: 'rgba(232,228,220,0.3)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            One ticket. Both nightmares.
          </p>
          <a href={siteConfig.tickets.url} className="btn-ticket">
            Get Tickets
          </a>
        </div>
      </div>
    </section>
  )
}
