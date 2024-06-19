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
          primary: '#008DDA',
          secondary: '#41C9E2',
          accent: '#ACE2E1',
          neutral: '#F7EEDD',
          success: '#6FC276',
          warning: '#FFD166',
          error: '#FF6961',
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
