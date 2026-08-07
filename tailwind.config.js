/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#0B0D14',
        slatenavy: '#121622',
        cyberborder: '#1E2536',
        main: 'var(--bg-main)',
        surface: 'var(--bg-surface)',
        'surface-secondary': 'var(--bg-surface-secondary)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        subtle: 'var(--border-subtle)',
        gov: {
          light: '#3B82F6',
          DEFAULT: '#1E3A8A',
          dark: '#172554'
        },
        ai: {
          light: 'var(--accent-indigo)',
          DEFAULT: 'var(--accent-indigo)',
          cyan: 'var(--accent-cyan)'
        },
        verify: {
          light: 'var(--accent-emerald)',
          DEFAULT: 'var(--accent-emerald)'
        },
        x402: {
          light: 'var(--accent-orange)',
          DEFAULT: 'var(--accent-orange)',
          amber: 'var(--accent-gold)'
        },
        ledger: {
          light: 'var(--accent-gold)',
          DEFAULT: 'var(--accent-gold)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
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
