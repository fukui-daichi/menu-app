module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF7B54', // 濃いオレンジ
        'primary-dark': '#E85C3C', // プライマリの濃いバージョン
        secondary: '#FFB38A', // 中間のパステルオレンジ
        accent: '#FFD1B6', // 明るいパステルオレンジ
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
