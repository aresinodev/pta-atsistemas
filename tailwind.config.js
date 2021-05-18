module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '1/9': '90%',
        '1/8': '80%',
        '1/7': '70%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
