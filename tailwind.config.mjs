export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-blue': 'linear-gradient(to right, #1E3A8A, #4A90E2)',
        'gradient-blue-vertical': 'linear-gradient(to bottom, #1E3A8A, #4A90E2)',
        'gradient-grey': 'linear-gradient(to right, #1F2937, #6B7280)',
        'gradient-grey-vertical': 'linear-gradient(to bottom, #1F2937, #6B7280)',
      },
    },
  },
  plugins: [],
};