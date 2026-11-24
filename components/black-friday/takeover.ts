/**
 * Black Friday takeover effects for the Nixa homepage.
 *
 * Coming Soon holds for a beat → teal smoke pours in from the floor and the
 * sides with orange embers → red eyes open in the smoke → the smoke tears open
 * on the specials, then settles into low smoke curling behind the page.
 *
 * The pre-paint script in lib/black-friday.ts sets the <html> state classes:
 *   .bf-live (sale running) · .bf-intro (intro pending)
 * This module adds .bf-dissolve (smoke rising) · .bf-reveal (content entering)
 * · .bf-fx (motion effects enabled) · .bf-nogl (no WebGL, CSS smoke fallback).
 */

export type TakeoverEls = {
  canvas: HTMLCanvasElement
  fallback: HTMLDivElement
  flash: HTMLDivElement
  eyes: HTMLDivElement
  section: HTMLElement
}

type Phase = 'none' | 'intro' | 'rise' | 'cover' | 'clear' | 'settle' | 'steady'

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const easeIn = (p: number) => p * p * p
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3)
const easeInOut = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)

/* Smoke: domain-warped noise advected upward so it curls and climbs, with thin
   strands where the warp folds, lit from above in the Nixa teal. Embers are a
   sparse grid of sparks drifting up through it. Output is premultiplied alpha. */
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uTime, uRise, uClear, uAmb, uFlash, uHeat, uEmb;
// Integer-exact lattice hash: cell coordinates wrap to 0..288 and go through the
// permutation polynomial (34x^2 + x) mod 289, so every intermediate value is an exact
// integer below 2^24. Phone GPUs that fuse or reorder float math still get the same value
// on both sides of a cell edge. (A fract()-based hash flips on a 1-ulp rounding difference,
// which showed up on phones as hard, blocky seams in the smoke.)
float m289(float x){ return x - floor(x * (1. / 289.)) * 289.; }
float h(vec2 i){
  i = vec2(m289(i.x), m289(i.y));
  float a = m289((i.x * 34. + 1.) * i.x);
  a = m289(((a + i.y) * 34. + 1.) * (a + i.y));
  a -= step(288.5, a) * 289.;
  return a * (1. / 289.);
}
float n(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1., 0.)), u.x), mix(h(i + vec2(0., 1.)), h(i + vec2(1., 1.)), u.x), u.y); }
float fbm(vec2 p){ float v = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { v += a * n(p); p = m * p; a *= .5; } return v; }
float fbm3(vec2 p){ float v = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 3; i++) { v += a * n(p); p = m * p; a *= .5; } return v / .875; }
float embers(vec2 p, float t){
  float e = 0.;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float sc = 9. + fi * 6.;
    vec2 g = p * sc;
    g.y -= t * (1.1 + fi * .55);
    g.x += sin(g.y * .35 + fi * 2.1 + t * .4) * .55;
    vec2 id = floor(g);
    vec2 f = fract(g) - .5;
    float r = h(id + vec2(fi * 31., fi * 17.));
    vec2 o = vec2(h(id + vec2(4., 7.)), h(id + vec2(9., 3.))) - .5;
    float d = length(f - o * .6);
    float tw = .55 + .45 * sin(t * (2. + r * 5.) + r * 50.);
    e += step(.93 + fi * .02, r) * tw * (smoothstep(.13, 0., d) * .35 + smoothstep(.05, 0., d));
  }
  return e;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  float t = uTime;
  vec2 s = p * 1.7 + vec2(0., -t * .12 - uClear * .9);
  vec2 q = vec2(fbm3(s + vec2(0., -t * .08)), fbm3(s + vec2(5.2, 1.3) + vec2(t * .04, 0.)));
  vec2 r = vec2(fbm3(s + 1.7 * q + vec2(1.7, 9.2) + t * vec2(.02, -.1)),
                fbm3(s + 1.7 * q + vec2(8.3, 2.8) + t * vec2(-.03, -.07)));
  float f = fbm(s + 1.5 * r);
  // Soft billows, plus thin glowing wisps along the ridges of the warp.
  float dens = smoothstep(.28, .82, f);
  float wisp = pow(1. - abs(2. * fbm3(s * 2. + 2. * r + vec2(0., -t * .18)) - 1.), 4.);
  // Intro: smoke pours in from the floor and both sides until it fills the screen.
  float edge = min(uv.y, min(uv.x, 1. - uv.x) * 1.3);
  float front = uRise * 1.25 - .12;
  float cover = smoothstep(-.06, .22, front - edge + (f - .5) * .5);
  // Reveal: torn open from the center with ragged wisps.
  vec2 c = (uv - .5) * vec2(asp, 1.);
  float rad = length(c) / (.5 * sqrt(asp * asp + 1.));
  float hole = smoothstep(uClear * 1.8 - .5, uClear * 1.8 - .15, rad + (f - .5) * .7);
  // Afterwards: smoke curling up from the floor and along the side edges.
  float base = smoothstep(.55, 0., uv.y + (f - .5) * .35);
  float sides = smoothstep(.36, 0., min(uv.x, 1. - uv.x) + (f - .5) * .3) * smoothstep(1., .2, uv.y);
  float amb = uAmb * max(base, sides) * clamp(dens * .8 + wisp * .9, 0., 1.);
  float a = clamp(max(cover * hole, amb), 0., 1.);
  vec3 col = mix(vec3(0., .03, .04), vec3(.02, .27, .31), dens);
  col += vec3(.1, .55, .6) * wisp * (.3 + .7 * dens);
  col += vec3(.3, .62, .65) * pow(dens, 4.) * .35;
  col += uHeat * vec3(1., .3, .04) * smoothstep(.5, 0., uv.y) * (.12 + .3 * dens);
  col += uFlash * vec3(.75, .97, 1.) * (.25 + dens);
  vec4 o = vec4(min(col, vec3(1.)) * a, a);
  float e = embers(p, t) * uEmb * smoothstep(1., .25, uv.y);
  o.rgb += vec3(1., .5, .12) * e;
  o.a = max(o.a, clamp(e, 0., 1.));
  gl_FragColor = min(o, vec4(1.));
}`

/** Starts the takeover and returns a cleanup function. */
export function startTakeover({ canvas, fallback, flash, eyes, section }: TakeoverEls): () => void {
  ;(window as Window & { __bfStarted?: boolean }).__bfStarted = true
  const root = document.documentElement
  const cl = root.classList
  if (!cl.contains('bf-live')) return () => {}

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  const disposers: Array<() => void> = []
  const on = (target: EventTarget, type: string, fn: EventListener, opts?: AddEventListenerOptions) => {
    target.addEventListener(type, fn, opts)
    disposers.push(() => target.removeEventListener(type, fn, opts))
  }
  const after = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    disposers.push(() => window.clearTimeout(id))
  }

  /* ---------- Smoke renderer (WebGL, with a CSS fallback) ---------- */
  const AMBIENT = 0.8
  const fog = { rise: 0.05, clear: 0, amb: 0.45, flash: 0, heat: 0, emb: 0.5 }
  let fogEl: HTMLElement = canvas
  let draw: (time: number) => void = () => {}

  const initWebGL = (): boolean => {
    const opts: WebGLContextAttributes = {
      alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power',
    }
    const gl = (canvas.getContext('webgl', opts) || canvas.getContext('experimental-webgl', opts)) as WebGLRenderingContext | null
    if (!gl) return false
    // Without 32-bit floats in fragment shaders the noise cannot hold together: use the CSS smoke.
    const highp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT)
    if (!highp || highp.precision < 23) return false
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)
      if (!sh) return null
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null
    }
    const vs = compile(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}')
    const fs = compile(gl.FRAGMENT_SHADER, FRAG)
    const prog = gl.createProgram()
    if (!vs || !fs || !prog) return false
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false
    gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (name: string) => gl.getUniformLocation(prog, name)
    const U = {
      res: u('uRes'), time: u('uTime'), rise: u('uRise'), clear: u('uClear'),
      amb: u('uAmb'), flash: u('uFlash'), heat: u('uHeat'), emb: u('uEmb'),
    }

    const size = () => {
      // Smoke is soft, so a reduced resolution is plenty. Phones get a little more,
      // since their small CSS viewport is stretched over many device pixels.
      const s = window.innerWidth < 760 ? 0.6 : 0.5
      canvas.width = Math.max(1, Math.round(window.innerWidth * s))
      canvas.height = Math.max(1, Math.round(window.innerHeight * s))
    }
    size()
    on(window, 'resize', () => { size(); if (reduced) draw(40) }, { passive: true })

    draw = (time) => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(U.res, canvas.width, canvas.height)
      gl.uniform1f(U.time, time)
      gl.uniform1f(U.rise, fog.rise)
      gl.uniform1f(U.clear, fog.clear)
      gl.uniform1f(U.amb, fog.amb)
      gl.uniform1f(U.flash, fog.flash)
      gl.uniform1f(U.heat, fog.heat)
      gl.uniform1f(U.emb, fog.emb)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    return true
  }

  if (!initWebGL()) {
    cl.add('bf-nogl')
    fogEl = fallback
    draw = () => {
      const cover = clamp01((fog.rise - 0.05) / 0.95) * (1 - fog.clear)
      fallback.style.opacity = cover.toFixed(3)
    }
  }
  const smokeBehind = () => fogEl.classList.add('is-behind')

  const strike = (power: number) => {
    fog.flash = power
    flash.classList.remove('is-striking')
    void flash.offsetWidth
    flash.classList.add('is-striking')
  }

  /* ---------- Cards: ignite on view, tilt with the pointer ---------- */
  const cards = Array.from(section.querySelectorAll<HTMLElement>('.bf-card'))
  if (!reduced) cl.add('bf-fx')
  let io: IntersectionObserver | null = null
  let cardsArmed = false
  const armCards = () => {
    if (cardsArmed || reduced) return
    cardsArmed = true
    if (!('IntersectionObserver' in window)) {
      cards.forEach(c => c.classList.add('is-lit'))
      return
    }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const card = entry.target as HTMLElement
      observer.unobserve(card)
      after(() => card.classList.add('is-lit'), Number(card.dataset.delay) || 0)
    }), { threshold: 0.2 })
    io = observer
    cards.forEach((card, i) => {
      card.dataset.delay = String(i * 280)
      observer.observe(card)
    })
  }
  disposers.push(() => io?.disconnect())

  if (finePointer && !reduced) {
    cards.forEach(card => {
      on(card, 'pointermove', e => {
        const ev = e as PointerEvent
        const r = card.getBoundingClientRect()
        const x = (ev.clientX - r.left) / r.width
        const y = (ev.clientY - r.top) / r.height
        card.classList.add('is-hover')
        card.style.setProperty('--ry', `${((x - 0.5) * 14).toFixed(2)}deg`)
        card.style.setProperty('--rx', `${((0.5 - y) * 14).toFixed(2)}deg`)
        card.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
        card.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
      })
      on(card, 'pointerleave', () => {
        card.classList.remove('is-hover')
        card.style.setProperty('--rx', '0deg')
        card.style.setProperty('--ry', '0deg')
      })
    })
  }

  /* ---------- Intro timeline: Coming Soon → smoke → eyes → Black Friday ---------- */
  let seen = false
  try { seen = sessionStorage.getItem('bf-intro') === '1' } catch { /* storage blocked */ }
  const hold = seen ? 300 : 1000
  let rise = 1050
  const cover = seen ? 200 : 1050 // first visit: the eyes open while the smoke is thickest
  const clear = 1450
  const settle = 1800
  const durOf = (ph: Phase) =>
    ph === 'intro' ? hold : ph === 'rise' ? rise : ph === 'cover' ? cover : ph === 'clear' ? clear : ph === 'settle' ? settle : 1

  let phase: Phase = cl.contains('bf-intro') ? 'intro' : 'none'
  let tPhase = performance.now()
  let running = false
  let raf = 0
  let lastDraw = 0
  let lastFrameAt = 0
  const t0 = performance.now()

  const skipEvents = ['pointerdown', 'keydown', 'wheel', 'touchstart']
  const removeSkip = () => skipEvents.forEach(ev => window.removeEventListener(ev, skip))
  disposers.push(removeSkip)

  const beginRise = (now: number) => {
    phase = 'rise'
    tPhase = now
    cl.add('bf-dissolve')
  }

  // Swap the page under full smoke. Entrance animations wait out the cover beat.
  const swap = () => {
    cl.remove('bf-intro', 'bf-dissolve')
    root.style.setProperty('--bf-rv', `${cover / 1000}s`)
    cl.add('bf-reveal')
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    try { sessionStorage.setItem('bf-intro', '1') } catch { /* storage blocked */ }
    removeSkip()
    after(armCards, cover + 1700)
  }

  const step = (now: number) => {
    if (phase === 'none') {
      phase = 'settle'
      tPhase = now
      Object.assign(fog, { rise: 0, amb: 0, emb: 0 })
      smokeBehind()
    }
    const p = clamp01((now - tPhase) / durOf(phase))
    if (phase === 'intro') {
      fog.rise = 0.05
      if (p >= 1) beginRise(now)
    } else if (phase === 'rise') {
      fog.rise = 0.05 + 0.95 * easeIn(p)
      fog.heat = 0.6 * p
      fog.emb = 0.5 + 0.5 * p
      if (p >= 1) {
        phase = 'cover'
        tPhase = now
        swap()
        if (!seen) eyes.classList.add('is-open')
      }
    } else if (phase === 'cover') {
      if (p >= 1) {
        phase = 'clear'
        tPhase = now
        strike(0.6)
      }
    } else if (phase === 'clear') {
      fog.clear = easeOut(p)
      fog.amb = 0.45 * (1 - p)
      fog.heat = 0.6 * (1 - p)
      fog.emb = 1 - 0.6 * p
      if (p >= 1) {
        phase = 'settle'
        tPhase = now
        Object.assign(fog, { rise: 0, clear: 0, amb: 0, heat: 0 })
        eyes.classList.remove('is-open')
        smokeBehind()
      }
    } else if (phase === 'settle') {
      const k = easeInOut(p)
      fog.amb = AMBIENT * k
      fog.emb = Math.max(fog.emb, 0.4 * k)
      if (p >= 1) phase = 'steady'
    }
    fog.flash *= 0.9
  }

  const frame = (now: number) => {
    if (!running) return
    raf = requestAnimationFrame(frame)
    lastFrameAt = performance.now()
    if (document.hidden) return
    // Once the transition is over, the ambient smoke only needs ~30 fps.
    if (phase === 'steady' && now - lastDraw < 32) return
    lastDraw = now
    step(now)
    draw((now - t0) / 1000 + 40)
  }

  // Any input during the opening beat jumps straight into the smoke.
  function skip() {
    if (phase !== 'intro') return
    rise = 650
    beginRise(performance.now())
  }
  skipEvents.forEach(ev => window.addEventListener(ev, skip, { passive: true }))

  if (reduced) {
    // No intro, no animation: a single still frame of low smoke behind the page.
    Object.assign(fog, { rise: 0, amb: AMBIENT, emb: 0.3 })
    smokeBehind()
    draw(40)
    armCards()
  } else {
    running = true
    raf = requestAnimationFrame(frame)
    if (phase === 'none') after(armCards, 300)
    // Watchdog: if the page is on screen but no animation frames ever arrive (some embedded
    // browsers, screenshot tools), show the specials without the intro instead of waiting forever.
    if (phase === 'intro') {
      const watchdog = () => {
        if (phase !== 'intro' && phase !== 'rise' && phase !== 'cover') return
        if (document.visibilityState !== 'visible' || performance.now() - lastFrameAt < 500) {
          after(watchdog, 1000)
          return
        }
        if (cl.contains('bf-intro')) swap()
        cl.remove('bf-reveal', 'bf-fx', 'bf-dissolve') // CSS entrances would stall too, so show everything as-is
        eyes.classList.remove('is-open')
        phase = 'steady'
        Object.assign(fog, { rise: 0, clear: 0, amb: AMBIENT, flash: 0, heat: 0, emb: 0.4 })
        smokeBehind()
        draw(40)
      }
      after(watchdog, hold + rise + cover + 2500)
    }
  }

  return () => {
    running = false
    cancelAnimationFrame(raf)
    disposers.forEach(dispose => dispose())
  }
}
