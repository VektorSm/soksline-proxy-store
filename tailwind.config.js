/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx,mdx}',
    './components/**/*.{ts,tsx,js,jsx,mdx}',
    './content/**/*.{md,mdx}',
    './lib/**/*.{ts,tsx,js,jsx}',
    './pages/**/*.{ts,tsx,js,jsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              wordBreak: 'break-word',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
