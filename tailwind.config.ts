import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './chess/**/*.{js,ts,jsx,tsx,mdx}',
    './game1/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      dropShadow: {
        '3xl': '4px 1px 3px rgba(0, 0, 0, 0.7)',
        '4xl': [
            '0 35px 35px rgba(0, 0, 0, 0.25)',
            '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      keyframes: {
        standingBounce: {
          '0%, 100%': { transform: 'translateY(0)', 'animation-timing-function': 'cubic-bezier(0, .5, .5, 1)' },
          '50%': { transform: 'translateY(-25%)', 'animation-timing-function': 'cubic-bezier(0.5, 0, 1, 0.5)' },
        }
      },
      animation: {
        standingBounce: 'standingBounce 1s infinite',
      }
    },
  },
  plugins: [],
}
export default config
