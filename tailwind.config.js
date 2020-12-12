const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./public/index.html", "./src/**/*.tsx"],
  darkMode: "class",
  theme: {
		colors: {
			white: colors.white,
			black: colors.black,
			pink: colors.pink,
			purple: colors.violet,
			indigo: colors.indigo,
			orange: colors.orange,
			gray: colors.trueGray,
      red: colors.red,
      blue: colors.lightBlue,
      yellow: colors.amber,
		}
  },
  plugins: [require("@tailwindcss/forms")],
};
