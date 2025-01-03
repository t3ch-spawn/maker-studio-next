import type { Config } from "tailwindcss";


export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ibm: "IBM Plex Mono",
      },
    },
    screens: {
      "-1250": { max: "1250px" },
      "-1200": { max: "1200px" },
      "-1024": { max: "1024px" },
      "-968": { max: "968px" },
      "-768": { max: "768px" },
      "-650": { max: "650px" },
      "-600": { max: "600px" },
      "-500": { max: "500px" },
      "-400": { max: "400px" },
      "-350": { max: "350px" },
    },
  },
  plugins: [],
} satisfies Config;
