/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-gray': '#F2F0F1', 
      },
      screens: {
        'sm': {'max': '1023px'},  // Apply styles below 1024px
        'md': {'max': '767px'},   // Apply styles below 768px
        'lg': {'max': '639px'},   // Apply styles below 640px
        'cs': {'max': '419px'},   // custom ; Apply styles below 420px
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}

