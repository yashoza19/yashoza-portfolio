/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#f0ece2',
            a: {
              color: '#f59e0b',
              '&:hover': {
                color: '#fbbf24',
              },
            },
            strong: {
              color: '#f0ece2',
            },
            'ol > li::marker': {
              color: '#6b6b6b',
            },
            'ul > li::marker': {
              color: '#6b6b6b',
            },
            hr: {
              borderColor: '#1a1a1a',
            },
            blockquote: {
              color: '#6b6b6b',
              borderLeftColor: '#f59e0b',
            },
            h1: {
              color: '#f0ece2',
            },
            h2: {
              color: '#f0ece2',
            },
            h3: {
              color: '#f0ece2',
            },
            h4: {
              color: '#f0ece2',
            },
            code: {
              color: '#f0ece2',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
