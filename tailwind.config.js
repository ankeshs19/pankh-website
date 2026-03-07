/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'pankh-navy': '#1A3C6E',
        'pankh-gold': '#D4A017',
        'pankh-navy-light': '#2A5088',
        'pankh-gold-light': '#E4B827',
      },
      fontFamily: {
        sans: ['Poppins', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
