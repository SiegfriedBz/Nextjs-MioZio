import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // // stone-100
        // light: '#f7fafc',
        // stone-50
        light: '#f9fafb',
        // slate-900
        dark: '#1a202c',
        primary: {
          // red-500
          DEFAULT: '#f56565',
          // red-600
          dark: '#e53e3e',
          // red-400
          light: '#fc8181',
        },
        secondary: {
          // green-500
          DEFAULT: '#48bb78',
          // green-600
          dark: '#38a169',
          // green-400
          light: '#68d391',
        },
        tertiary: {
          //  amber-400
          DEFAULT: '#fbbf24',
          // amber-500
          dark: '#f59e0b',
          // amber-300
          light: '#fcd34d',
        },
        quaternary: {
          // rose-50
          DEFAULT: '#fff1f2',
        },
      },
    },
  },
  plugins: [],
}
export default config
