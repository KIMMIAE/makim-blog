const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        code: {
          lime: '#b5cea8',
          green: '#6a9955',
          stone: '#808080',
          orange: '#ce9178',
          purple: '#d9a9ff',
          red: '#ff8383',
          blue: '#569cd6',
          yellow: '#dcdcaa',
          white: '#fff',
          sky: '#9cdcfe'
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
