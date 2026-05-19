/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 This tells Tailwind to look inside your src folder
  ],
  theme: {
    extend: {
      // If your code uses custom medieval colors/images we defined, they go here:
      backgroundImage: {
        'medieval-leather': "url('https://www.transparenttextures.com/patterns/dark-leather.png')",
      },
    },
  },
  plugins: [],
}
