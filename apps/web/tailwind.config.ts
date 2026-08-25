import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f4',
          100: '#ddeee6',
          200: '#bcddcd',
          300: '#90c4ac',
          400: '#5da585',
          500: '#3d8a67',
          600: '#2d6f52',
          700: '#265943',
          800: '#1f4636',
          900: '#0b3d2e',
          950: '#06271e',
          DEFAULT: '#0b3d2e',
        },
        cream: {
          50: '#fdfcf9',
          100: '#faf7f0',
          200: '#f3eee3',
          300: '#e9e1d2',
          DEFAULT: '#faf7f0',
        },
        gold: {
          100: '#f6edce',
          200: '#ecdca4',
          300: '#e3c55c',
          400: '#d4ae37',
          500: '#c9a227',
          600: '#a9861d',
          700: '#866a17',
          DEFAULT: '#c9a227',
        },
        ink: {
          DEFAULT: '#101b16',
          soft: '#33443c',
        },
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        sidebar: {
          DEFAULT: '#0f172a',
          foreground: '#e2e8f0',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
