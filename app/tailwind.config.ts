import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: { cyan: '#00E5FF', 'cyan-dim': '#00D4EC' },
        deep: { DEFAULT: '#0c0f0f', 900: '#060808', 800: '#0c0f0f', 700: '#121616' },
        surface: { DEFAULT: '#f6f6f6', lowest: '#ffffff', low: '#f0f1f1', mid: '#e7e8e8', high: '#e1e3e3', highest: '#dbdddd' },
        primary: { DEFAULT: '#006571', container: '#00e3fd' },
        onSurface: '#2d2f2f',
        onSurfaceVariant: '#5a5c5c',
        outline: '#757777',
        outlineVariant: '#acadad',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'cyber-glow': '0px 0px 20px 0px rgba(0, 227, 253, 0.25)',
        'cyber-glow-lg': '0px 0px 40px 0px rgba(0, 227, 253, 0.35)',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #006571 0%, #00e3fd 100%)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
};

export default config;
