/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0D14',
        slatenavy: '#121622',
        cyberborder: '#1E2536',
        main: 'var(--color-bg-main)',
        surface: 'var(--color-bg-surface)',
        'surface-secondary': 'var(--color-bg-surface-secondary)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        subtle: 'var(--color-border-subtle)',
        gov: {
          light: '#3B82F6',
          DEFAULT: '#1E3A8A',
          dark: '#172554'
        },
        ai: {
          light: 'var(--color-accent-indigo)',
          DEFAULT: 'var(--color-accent-indigo)',
          cyan: 'var(--color-accent-cyan)'
        },
        verify: {
          light: 'var(--color-accent-emerald)',
          DEFAULT: 'var(--color-accent-emerald)'
        },
        x402: {
          light: 'var(--color-accent-orange)',
          DEFAULT: 'var(--color-accent-orange)',
          amber: 'var(--color-accent-gold)'
        },
        ledger: {
          light: 'var(--color-accent-gold)',
          DEFAULT: 'var(--color-accent-gold)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-cyan': 'glowCyan 3s ease-in-out infinite alternate',
      },
      keyframes: {
        glowCyan: {
          '0%': { boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(6, 182, 212, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}
