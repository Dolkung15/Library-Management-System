import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          50: '#FEF0E9',
          100: '#FCE0D3',
          200: '#F9C1A7',
          300: '#F7A17A',
          400: '#F4824E',
          500: '#F16322',
          600: '#B54A1A',
          700: '#793211',
          800: '#3C1909',
          900: '#180A03',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['data-theme=light'],
          primary: '#F16322',
          secondary: '#f6d860',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
      'night',
    ],
    darkTheme: 'night',
    utils: true,
  },
}
export default config
