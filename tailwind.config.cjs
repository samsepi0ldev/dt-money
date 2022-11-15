/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './src/**/*.{html,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif']
      },
      fontSize: {
        sm: ['14px', '160%'],
        base: ['16px', '160%'],
        lg: ['20px', '160%'],
        xl: ['24px', '160%'],
        '2xl': ['32px', '160%'],
      },
      colors:{
        green: {
          600: '#015F43',
          500: '#00875F',
          400: '#00B37E'
        },
        red: {
          500: '#AA2834',
          400: '#F75A68'
        },
        gray: {
          800: '#121214',
          700: '#202024',
          600: '#29292E',
          500: '#323238',
          300: '#7C7C8A',
          200: '#C4C4CC',
          100: '#E1E1E6'
        }
      }
    },
  },
  plugins: [],
}
