/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        hand: ['"Patrick Hand"', 'cursive'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
      },
      colors: {
        paper: '#fdf6e3',
        ink: '#2d2d2d',
        'retro-blue': '#268bd2',
        'retro-red': '#dc322f',
        'retro-green': '#859900',
      },
      animation: {
        'crt-flicker': 'flicker 0.15s infinite',
        'turn-off': 'turn-off 0.55s cubic-bezier(0.23, 1, 0.32, 1) forwards',
        'turn-on': 'turn-on 0.55s cubic-bezier(0.23, 1, 0.32, 1) forwards',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '0.97' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        },
        'turn-off': {
          '0%': { transform: 'scale(1, 1.3) translate3d(0, 0, 0)', filter: 'brightness(1)', opacity: '1' },
          '60%': { transform: 'scale(1, 0.001) translate3d(0, 0, 0)', filter: 'brightness(10)' },
          '100%': { transform: 'scale(0, 0.001) translate3d(0, 0, 0)', opacity: '0' }
        },
        'turn-on': {
          '0%': { transform: 'scale(0, 0.001) translate3d(0, 0, 0)', opacity: '0' },
          '60%': { transform: 'scale(1, 0.001) translate3d(0, 0, 0)', opacity: '1' },
          '100%': { transform: 'scale(1, 1) translate3d(0, 0, 0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [],
}
