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
         sans: ['var(--font-sans)', 'system-ui', 'sans-serif'], // Correctly use CSS variable
         heading: ['var(--font-sans)', 'system-ui', 'sans-serif'], // Correctly use CSS variable
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
          '6': 'hsl(var(--chart-6))' // Added chart color
  			},
  		},
  		borderRadius: {
        none: '0',
        sm: '0', // No radius for retro
        DEFAULT: '0', // No radius for retro
        md: '0', // No radius for retro
        lg: '0', // No radius for retro
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
          '0%, 100%': { 'box-shadow': '0 0 4px 1px hsl(var(--primary)/0.6)' },
          '50%': { 'box-shadow': '0 0 8px 3px hsl(var(--primary)/0.8)' },
        },
        'retro-blink': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.5' },
        },
         'retro-check-pop': {
           '0%': { transform: 'scale(0.8)', opacity: '0.5' }, // Wrapped transform in quotes
           '80%': { transform: 'scale(1.1)', opacity: '1' }, // Wrapped transform in quotes
           '100%': { transform: 'scale(1)', opacity: '1' }, // Wrapped transform in quotes
         },
         'retro-alert-pulse': {
            '0%, 100%': { borderColor: 'hsl(var(--destructive)/0.7)', boxShadow: '0 0 0 0 hsl(var(--destructive)/0.4)' }, // Wrapped box-shadow in quotes
            '50%': { borderColor: 'hsl(var(--destructive))', boxShadow: '0 0 0 3px hsl(var(--destructive)/0.1)' }, // Wrapped box-shadow in quotes
         }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'retro-glow': 'retro-glow 1.5s ease-in-out infinite',
        'retro-blink': 'retro-blink 1s step-end infinite',
         'retro-check-pop': 'retro-check-pop 0.3s ease-out',
         'retro-alert-pulse': 'retro-alert-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
         'retro': '3px 3px 0px 0px hsl(var(--foreground)/0.15)', // Slightly reduced shadow
         'retro-sm': '2px 2px 0px 0px hsl(var(--foreground)/0.15)',
         'retro-inset': 'inset 2px 2px 0px 0px hsl(var(--foreground)/0.15)', // Adjusted inset shadow
         'retro-inset-dark': 'inset 2px 2px 0px 0px hsl(var(--foreground)/0.1)',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

