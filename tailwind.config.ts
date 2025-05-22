
import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
       fontFamily: {
         sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
         heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
         pixel: ['var(--font-pixel)', 'cursive'], // Keep if used elsewhere
       },
  		colors: {
        // Base FinCo theme (remains for internal app pages)
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))',
          '6': 'hsl(var(--chart-6))'
  			},
        // Dashboard card header colors (remains for internal app pages)
        'dashboard-pink-header': {
          DEFAULT: 'hsl(var(--dashboard-pink-header-bg))',
          foreground: 'hsl(var(--dashboard-pink-header-fg))',
        },
        'dashboard-purple-header': {
          DEFAULT: 'hsl(var(--dashboard-purple-header-bg))',
          foreground: 'hsl(var(--dashboard-purple-header-fg))',
        },
        'dashboard-blue-header': {
          DEFAULT: 'hsl(var(--dashboard-blue-header-bg))',
          foreground: 'hsl(var(--dashboard-blue-header-fg))',
        },
        // Internal App Header colors (Podportal style, remains for internal app pages)
        'header-top': {
          DEFAULT: 'hsl(var(--header-top-bg))',
          foreground: 'hsl(var(--header-top-fg))',
          border: 'hsl(var(--header-top-border))',
        },
        'header-bottom': {
          DEFAULT: 'hsl(var(--header-bottom-bg))',
          foreground: 'hsl(var(--header-bottom-fg))',
          border: 'hsl(var(--header-bottom-border))',
        },
        // Wzuh-inspired Theme Colors (for landing page)
        'wz-pink': 'hsl(var(--wz-pink))',
        'wz-green': 'hsl(var(--wz-green))',
        'wz-purple': 'hsl(var(--wz-purple))',
        'wz-yellow': 'hsl(var(--wz-yellow))',
        'wz-text-dark': 'hsl(var(--wz-text-dark))',
        'wz-text-light': 'hsl(var(--wz-text-light))',
        'wz-border-dark': 'hsl(var(--wz-border-dark))',
        'wz-light-bg': 'hsl(var(--wz-light-bg))',
        'wz-gray-text': 'hsl(var(--wz-gray-text))',
  		},
  		borderRadius: {
        none: '0',
        sm: 'calc(var(--radius) - 4px)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius)',
        lg: 'calc(var(--radius) + 4px)',
        xl: 'calc(var(--radius) + 8px)',
        '2xl': 'calc(var(--radius) + 16px)',
        '3xl': 'calc(var(--radius) + 24px)',
        full: '9999px',
      },
  		keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
         scrollPartners: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'scroll-partners': 'scrollPartners 60s linear infinite',
      },
      boxShadow: {
        // Retro shadow (can be removed if not used elsewhere)
         'retro': '3px 3px 0px 0px hsl(var(--foreground)/0.10)',
         'retro-sm': '2px 2px 0px 0px hsl(var(--foreground)/0.10)',
        // Wzuh/Neo-Brutalist hard shadow
         'wz-hard': '4px 4px 0px hsl(var(--wz-border-dark))',
         'wz-hard-sm': '2px 2px 0px hsl(var(--wz-border-dark))',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
