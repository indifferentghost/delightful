module.exports = {
  plugins: [
		// TODO MY FUCKING GOD FIX THIS HIDEOUSNESS
    require('tailwindcss')(require('./tailwind.config.js')),
    require('autoprefixer'),
  ],
};