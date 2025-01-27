import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./Utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        loginBlue: "#0B6EFE",
        adminBgColor: "#f9fafb",
        adminDarkBlueBg: "#e0f2fe",
        adminDarkBlue: "#3c7eff",
        "border-primary": "#D0D5DD",
        moneyGreen: "#1aaf66",
      },
    },
  },
  plugins: [],
} satisfies Config;
