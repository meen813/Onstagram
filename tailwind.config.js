module.exports = {
  darkMode: 'class', // 'media' or 'class'
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}', 
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'beige':'#F5F5DC',
        'light-beige': '#FDFBF6',
      },
    },
  },
  plugins: [],
}
