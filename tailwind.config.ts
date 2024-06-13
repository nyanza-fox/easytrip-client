import daisyui from "daisyui";
import daisyuiThemes from "daisyui/src/theming/themes";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "#03AED2",
          "primary-content": "#fff",
          secondary: "#68D2E8",
          "secondary-content": "#fff",
          accent: "#FDDE55",
          "accent-content": "#fff",
          neutral: "#FEEFAD",
          "neutral-content": "#fff",
        },
      },
    ],
  },
};
export default config;
