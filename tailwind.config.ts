// tailwind.config.ts
import type { Config } from "tailwindcss"

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Gradient from classes
    "from-orange-400",
  ],
  theme: {
    extend: {
      colors: {
        golden: "#D4AF37",
        turquoise: "#40E0D0",
        ivory: "#FAF9F6",
        charcoal: "#1C1C1C",
      },
      fontFamily: {
        crimsonPro: ["var(--font-crimson-pro)", "serif"],
      },
    },
  },
  plugins: [],
}

export default config
