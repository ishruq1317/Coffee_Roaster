/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stoneIvory: "#F6F3EC",
        oatSurface: "#EAE4D7",
        espressoDeep: "#1E1410",
        espressoWarm: "#2C1D18",
        espressoMuted: "#3D2B24",
        terracotta: "#C85A32",
        terracottaHover: "#b24d27",
        butterAccent: "#F3D37A",
        bordeauxAccent: "#5E1926",
        textLightPrimary: "#1E1410",
        textLightMuted: "#6E5D53",
        textDarkPrimary: "#F6F3EC",
        textDarkMuted: "#B8A99E",
      },
      fontFamily: {
        serif: ['"Fraunces"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'tactile': '4px 4px 10px rgba(30, 20, 16, 0.08), -4px -4px 10px rgba(255, 255, 255, 0.8)',
        'tactile-pressed': 'inset 2px 2px 6px rgba(30, 20, 16, 0.12), inset -2px -2px 6px rgba(255, 255, 255, 0.7)',
        'tactile-dark': '4px 4px 12px rgba(10, 6, 5, 0.4), -2px -2px 8px rgba(50, 35, 30, 0.25)',
        'tactile-dark-pressed': 'inset 3px 3px 6px rgba(0, 0, 0, 0.5), inset -2px -2px 6px rgba(60, 40, 32, 0.2)',
        'glass': '0 8px 32px 0 rgba(30, 20, 16, 0.15)',
        'glow-terracotta': '0 0 24px rgba(200, 90, 50, 0.35)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
        keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      scale: {
        '98': '0.98',
      }
    },
  },
  plugins: [],
}
