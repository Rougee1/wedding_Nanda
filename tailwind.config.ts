import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bordeaux colors - Lighter bordeaux
        bordeaux: {
          50: '#f5e5e8',
          100: '#e8ccd1',
          200: '#d199a3',
          300: '#ba6675',
          400: '#8c3347',
          500: '#6b1a2a',
          600: '#5a1520',
          700: '#4d1019',
          800: '#5d1a2a', // Lighter bordeaux (much less dark)
          900: '#4a1520',
          950: '#3d1019',
        },
        // Blossom (soft pink/rose) colors - More visible, less white
        blossom: {
          50: '#f0e4e7',
          100: '#e1c9cf',
          200: '#d2aeb7',
          300: '#c3939f',
          400: '#b47887',
          500: '#a55d6f', // More visible blossom color
          600: '#964257',
          700: '#87273f',
          800: '#780c27',
          900: '#69000f',
          950: '#5a0000',
        },
        // Warm cream for background
        cream: {
          50: '#fefdfb',
          100: '#fdf9f3',
          200: '#faf2e6',
          300: '#f5e6d0',
          400: '#eed4b3',
          500: '#e4be8f',
          600: '#d4a574',
          700: '#b8895a',
          800: '#97704b',
          900: '#7a5c40',
        },
        gold: {
          50: '#fdf8ef',
          100: '#f9edda',
          200: '#f2d9b4',
          300: '#e9c083',
          400: '#dfa854',
          500: '#c9a84c',
          600: '#b8923a',
          700: '#9a7530',
          800: '#7d5e2b',
          900: '#664d26',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
        arabic: ['var(--font-amiri)', 'serif'],
      },
      boxShadow: {
        'premium': '0 8px 32px rgba(107, 26, 42, 0.12), 0 2px 8px rgba(0,0,0,0.06)',
        'premium-lg': '0 16px 48px rgba(107, 26, 42, 0.16), 0 4px 12px rgba(0,0,0,0.08)',
        'premium-gold': '0 8px 32px rgba(201, 168, 76, 0.15), 0 2px 8px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
export default config

