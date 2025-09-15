/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a1a1a',
        'dark-secondary': '#2a2a2a',
        'dark-border': '#3a3a3a',
        'blue-primary': '#3b82f6',
        'green-primary': '#10b981',
        'yellow-warning': '#f59e0b',
        'red-danger': '#ef4444',
      },
      backgroundColor: {
        'dark-bg': '#1a1a1a',
        'dark-secondary': '#2a2a2a',
        'dark-border': '#3a3a3a',
      },
      borderColor: {
        'dark-border': '#3a3a3a',
      },
    },
  },
  plugins: [],
}