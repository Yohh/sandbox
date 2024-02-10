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
      },
      keyframes: {
        growTaskContent: {
          "0%": { height: "0px" },
          "100%": { height: "40px" },
        },
        showTaskContent: {
          "0%": { opacity: "0" },
          "60%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        growTaskContent: "growTaskContent 0.2s ease-in-out forwards",
        showTaskContent: "showTaskContent 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
