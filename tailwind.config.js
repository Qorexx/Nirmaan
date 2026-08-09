/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        main: 'var(--color-bg-main)',
        surface: 'var(--color-bg-surface)',
        'surface-secondary': 'var(--color-bg-surface-secondary)',
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        subtle: 'var(--color-border-subtle)',
        'accent-cyan': 'var(--color-accent-cyan)',
        'accent-indigo': 'var(--color-accent-indigo)',
        'accent-emerald': 'var(--color-accent-emerald)',
        'accent-orange': 'var(--color-accent-orange)',
        'accent-gold': 'var(--color-accent-gold)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float-slow 6s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
      keyframes: {
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
