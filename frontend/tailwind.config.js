/* @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    // 기존에 있는 거를 수정하기
    extend: {
      colors: {
        mainred: '#941E34',
        maingreen: '#326E6C',
        quizbg: '#A72F2F',
        mainblue: '#0F3491',
        maingray: '#F5F5F5',
      },
    },
    // 기존에 없는 거 추가하기
    fontFamily: {
      nanum: ['nanum', 'sans-serif'],
      GmarketSansMedium: ['GmarketSansMedium', 'sans-serif'],
    },
  },
  plugins: [],
};
