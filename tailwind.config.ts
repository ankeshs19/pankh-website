import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'pankh-navy': '#1A3C6E',
        'pankh-navy-light': '#2A5298',
        'pankh-gold': '#D4A017',
        'pankh-gold-light': '#E8B520',
        primary: {
          blue: '#0A3D62',
          gold: '#D4AF37',
        },
        accent: {
          lightBlue: '#1E5A8E',
          darkGold: '#B8941E',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
