/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage:{
        'BG1': "url('/image/contact-us/contact-bg.jpg')",
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.scrollbar-hidden': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'transparent',
          },
          '-ms-overflow-style': 'none',  // For Internet Explorer
          'scrollbar-width': 'none',  // For Firefox
        },
      });
    },
  ],
};
