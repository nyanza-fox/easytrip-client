import daisyui from 'daisyui';
import daisyuiThemes from 'daisyui/src/theming/themes';

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes['light'],
          primary: '#03AED2',
          secondary: '#68D2E8',
          accent: '#FDDE55',
          neutral: '#FEEFAD',
          'primary-content': '#FFFFFF',
          'secondary-content': '#FFFFFF',
          'success-content': '#FFFFFF',
          'error-content': '#FFFFFF',
          'neutral-content': '#000000',
        },
      },
    ],
  },
};
export default config;
