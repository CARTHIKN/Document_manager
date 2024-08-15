/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-background': "url('https://img.freepik.com/free-photo/paper-craft-art-document-folder_53876-146275.jpg?w=1060&t=st=1723658929~exp=1723659529~hmac=d3c006390823bf215f2bf95d17a23e4dd90cec985f5a936b6e2efdd199b51a8a')",
      },
    },
  },
  plugins: [],
}

