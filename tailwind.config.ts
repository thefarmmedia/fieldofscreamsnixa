import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#010204',
        'forest-deep': '#020508',
        'forest-dark': '#050c14',
        'forest-mid': '#080e18',
        'forest-tree': '#040a10',
        blood: '#c41a00',
        'blood-bright': '#e02000',
        'orange-fos': '#e84c15',
        'teal-fos': '#00c4cc',
        bone: '#e8e4dc',
        'bone-light': '#f0ece4',
        'carnival-void': '#0a0305',
        'carnival-red': '#5a0a08',
        'carnival-cream': '#c8b898',
        'carnival-yellow': '#a89840',
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-special-elite)', 'Courier New', 'monospace'],
      },
      animation: {
        'fog-drift-1': 'fogDrift1 90s ease-in-out infinite',
        'fog-drift-2': 'fogDrift2 65s ease-in-out infinite reverse',
        'fog-drift-3': 'fogDrift3 110s ease-in-out infinite',
        'fog-ground': 'fogGround 45s ease-in-out infinite',
        'fog-fg': 'fogFg 120s ease-in-out infinite',
        'branch-sway': 'branchSway 18s ease-in-out infinite',
        'pulse-blood': 'pulseBlood 3s ease-in-out infinite',
        'glitch': 'glitch 0.3s step-start infinite',
        'carnival-flicker': 'carnivalFlicker 6s steps(1) infinite',
        'balloon-rise': 'balloonRise 18s ease-in-out forwards',
        'clown-peek': 'clownPeek 0.4s ease-out forwards',
        'clown-retreat': 'clownRetreat 0.25s ease-in forwards',
        'eyes-appear': 'eyesAppear 3s ease-in-out forwards',
        'countdown-tick': 'countdownTick 0.15s ease-out',
      },
      keyframes: {
        fogDrift1: {
          '0%, 100%': { transform: 'translateX(0) scaleX(1)', opacity: '0.8' },
          '33%': { transform: 'translateX(3%) scaleX(1.02)', opacity: '1' },
          '66%': { transform: 'translateX(-2%) scaleX(0.99)', opacity: '0.7' },
        },
        fogDrift2: {
          '0%, 100%': { transform: 'translateX(0) scaleX(1)', opacity: '0.6' },
          '40%': { transform: 'translateX(-4%) scaleX(1.03)', opacity: '0.9' },
          '70%': { transform: 'translateX(2%) scaleX(0.98)', opacity: '0.5' },
        },
        fogDrift3: {
          '0%, 100%': { transform: 'translateX(0)', opacity: '0.7' },
          '50%': { transform: 'translateX(5%)', opacity: '0.9' },
        },
        fogGround: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4%)' },
        },
        fogFg: {
          '0%, 100%': { transform: 'translateX(0)', opacity: '0.04' },
          '40%': { transform: 'translateX(-3%)', opacity: '0.06' },
          '70%': { transform: 'translateX(2%)', opacity: '0.03' },
        },
        branchSway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '30%': { transform: 'rotate(0.4deg)' },
          '70%': { transform: 'rotate(-0.3deg)' },
        },
        pulseBlood: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(196,26,0,0.4), 0 0 60px rgba(196,26,0,0.15)' },
          '50%': { boxShadow: '0 0 35px rgba(224,32,0,0.6), 0 0 80px rgba(224,32,0,0.25)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)', clipPath: 'none' },
          '20%': { transform: 'translate(-2px, 1px)', clipPath: 'polygon(0 20%, 100% 20%, 100% 40%, 0 40%)' },
          '40%': { transform: 'translate(2px, -1px)', clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)' },
          '60%': { transform: 'translate(-1px, 2px)' },
          '80%': { transform: 'translate(1px, -1px)' },
        },
        carnivalFlicker: {
          '0%, 89%, 91%, 93%, 95%, 97%, 100%': { opacity: '1' },
          '90%, 92%, 94%, 96%': { opacity: '0.15' },
        },
        balloonRise: {
          '0%': { transform: 'translateY(100vh) translateX(0)', opacity: '0' },
          '5%': { opacity: '0.6' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-20vh) translateX(3vw)', opacity: '0' },
        },
        clownPeek: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(65%)' },
        },
        clownRetreat: {
          '0%': { transform: 'translateX(65%)' },
          '100%': { transform: 'translateX(110%)' },
        },
        eyesAppear: {
          '0%': { opacity: '0' },
          '20%': { opacity: '0.7' },
          '80%': { opacity: '0.5' },
          '100%': { opacity: '0' },
        },
        countdownTick: {
          '0%': { transform: 'scale(1.3)', color: '#e02000' },
          '100%': { transform: 'scale(1)', color: 'inherit' },
        },
      },
    },
  },
  plugins: [],
}

export default config
