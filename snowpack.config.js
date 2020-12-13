module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
	proxy: {
    '/api': 'http://localhost:3000/api',
	},
  plugins: [
    ["@snowpack/plugin-postcss", ['.css'], './postcss.config.js'],
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-typescript",
  ],
};
