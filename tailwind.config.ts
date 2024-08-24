import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          'custom-day-clear': 'radial-gradient(circle at 10% 20%, rgb(7, 121, 222) 0%, rgb(20, 72, 140) 90%)',
          'custom-day-cloudy':'linear-gradient(to right, #243949 0%, #517fa4 100%)',
          'custom-night-clear':'linear-gradient(29deg, rgba(54,47,47,1) 43%, rgba(0,0,0,1) 100%)',
          'custom-night-cloudy':'linear-gradient(29deg, rgba(19,38,54,1) 13%, rgba(0,0,0,1) 100%)',
          'custom':'linear-gradient(1deg, rgba(152,156,160,1) 3%, rgba(22,22,22,1) 100%)'


      },
    },
  },
  plugins: [],
};
export default config;
