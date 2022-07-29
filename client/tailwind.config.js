/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlack: '#010101',
        customWhite: '#fefefe',
        electricViolet: '#902bf5',
        coral: '#fc7b54',
        scooter: '#31bacd',
        secondaryWhite: '#F7F7F8',
      },
    },
  },
  variants: {
    fill: ['hover', 'focus'], // this line does the trick
  },
  plugins: [],
};
