/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic OKLCH tokens — mapped so @apply works
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
        // Steel Blue brand palette
        'brand-teal': '#1E6FBF',
        'brand-teal-hover': '#1558A0',
        'brand-dark': '#0D1F3C',
        'brand-muted': '#4A6A8A',
        'splash-bg': '#EEF4FB',
        'teal-ring': '#3B8FE8',
        'teal-pill': '#E8F1FB',
        'teal-pill-mid': '#C5D9F5',
        'teal-pill-border': '#93BBF0',
        // Blue shades (replacing forest green)
        'forest-darkest': '#0D1F3C',
        'forest-dark': '#143D7A',
        'forest-medium': '#1558A0',
        'forest-base': '#1E6FBF',
        'forest-light': '#2E82D4',
        'forest-pale': '#EEF4FB',
        // Header deep navy tokens
        'header-deep': '#0E2347',
        'header-accent': '#4DA3FF',
        'header-muted': '#A8C4E8',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(135deg, #0E2347 0%, #122B58 60%, #163470 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), require('@tailwindcss/container-queries')],
};
