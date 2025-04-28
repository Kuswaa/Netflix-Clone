/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities })
    {
      addUtilities({
        '.no-scrollbar':
        {
          '&::-webkit-scrollbar':
          {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    }
  ],
}