/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // RBE Official Brand Colors (from current site)
        primary: {
          navy: '#213469',         // #213469 - RBE Navy Blue (Primary Brand Color)
          tan: '#D3CBBC',          // #D3CBBC - RBE Tan/Beige (Accent Color)
          slate: '#555659',        // #555659 - Neutral Dark Grey
          burgundy: '#213469',     // Alias for backward compatibility (now navy)
          maroon: '#213469',       // Alias for backward compatibility (now navy)
        },
        accent: {
          gold: '#B8860B',      // Prestige Gold - For premium accents
          tan: '#D3CBBC',       // RBE Tan/Beige - Primary accent
        },
        prestige: {
          gold: '#B8860B',      // Prestige Gold - For borders and accents
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        // RBE Official Fonts (from current site)
        sans: ['Open Sans', 'Arial', 'sans-serif'],
        serif: ['Raleway', 'Helvetica', 'Arial', 'Lucida', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'corporate': '0 10px 40px -10px rgba(10, 37, 64, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scaleIn': 'scaleIn 0.2s ease-out',
        'scaleOut': 'scaleOut 0.2s ease-in',
        'enterFromLeft': 'enterFromLeft 0.25s ease',
        'enterFromRight': 'enterFromRight 0.25s ease',
        'exitToLeft': 'exitToLeft 0.25s ease',
        'exitToRight': 'exitToRight 0.25s ease',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.96)' },
        },
        enterFromLeft: {
          '0%': { opacity: '0', transform: 'translateX(-200px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        enterFromRight: {
          '0%': { opacity: '0', transform: 'translateX(200px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        exitToLeft: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-200px)' },
        },
        exitToRight: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(200px)' },
        },
      },
    },
  },
  plugins: [],
}
