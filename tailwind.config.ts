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
       },
  		colors: {
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
        'brand-yellow': 'hsl(var(--brand-yellow))',
        'brand-green': 'hsl(var(--brand-green))',
        'brand-orange': 'hsl(var(--brand-orange))',
        'brand-blue': 'hsl(var(--brand-blue))',
        'brand-dark': 'hsl(var(--brand-dark))',
        'brand-light-gray': 'hsl(var(--brand-light-gray))',

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
        // New Header Theme Colors
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
        // Chorke Theme Colors
        'chorke-dark-bg': 'hsl(var(--chorke-bg-dark))',
        'chorke-text-primary': 'hsl(var(--chorke-text-primary))',
        'chorke-text-secondary': 'hsl(var(--chorke-text-secondary))',
        'chorke-accent-yellow': 'hsl(var(--chorke-accent-yellow))',
        'chorke-accent-green': 'hsl(var(--chorke-accent-green))',
        'chorke-accent-pink': 'hsl(var(--chorke-accent-pink))',
        'chorke-accent-blue': 'hsl(var(--chorke-accent-blue))',
        'chorke-card-border': 'hsl(var(--chorke-card-border))',
        'chorke-dark-card': 'hsl(var(--chorke-dark))',
  		},
  		borderRadius: {
        none: '0',
        sm: 'calc(var(--radius) - 2px)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius)',
        lg: 'calc(var(--radius) + 2px)',
        xl: 'calc(var(--radius) + 4px)',
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
        'retro-glow': {
          '0%, 100%': { 'box-shadow': '0 0 3px 0.5px hsl(var(--primary)/0.5)' },
          '50%': { 'box-shadow': '0 0 6px 2px hsl(var(--primary)/0.7)' },
        },
        'retro-blink': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.6' },
        },
         'retro-check-pop': {
           '0%': { transform: 'scale(0.8)', opacity: '0.5' },
           '80%': { transform: 'scale(1.1)', opacity: '1' },
           '100%': { transform: 'scale(1)', opacity: '1' },
         },
         'retro-alert-pulse': {
            '0%, 100%': { borderColor: 'hsl(var(--destructive)/0.7)', boxShadow: '0 0 0 0 hsl(var(--destructive)/0.3)' },
            '50%': { borderColor: 'hsl(var(--destructive))', boxShadow: '0 0 0 2.5px hsl(var(--destructive)/0.05)' },
         },
         scrollPartners: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'retro-glow': 'retro-glow 1.5s ease-in-out infinite',
        'retro-blink': 'retro-blink 1s step-end infinite',
         'retro-check-pop': 'retro-check-pop 0.3s ease-out',
         'retro-alert-pulse': 'retro-alert-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
         'scroll-partners': 'scrollPartners 40s linear infinite',
      },
      boxShadow: {
         'retro': '3px 3px 0px 0px hsl(var(--foreground)/0.10)',
         'retro-sm': '2px 2px 0px 0px hsl(var(--foreground)/0.10)',
         'retro-inset': 'inset 2px 2px 0px 0px hsl(var(--foreground)/0.10)',
         'retro-inset-dark': 'inset 2px 2px 0px 0px hsl(var(--foreground)/0.08)',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
