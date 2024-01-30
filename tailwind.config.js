/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: theme('fontFamily.nw'), // Sesuaikan dengan font yang Anda inginkan
          },
        },
      }),
      fontFamily: {
        'nw': ["'Bricolage Grotesque', sans-serif"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

