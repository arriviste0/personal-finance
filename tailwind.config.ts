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
       fontFamily: { // Add font family
         sans: ["var(--font-press-start)", "monospace"], // Use Press Start 2P as default sans/mono
         mono: ["var(--font-press-start)", "monospace"], // Use Press Start 2P as default mono
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
  			chart: { // Keep chart colors or update to neon? Let's keep for now.
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  		},
  		borderRadius: { // Remove default rounding for retro feel
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        full: '9999px', // Keep full for specific cases like avatars if needed
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
        'retro-glow': { // Add a subtle glow animation
          '0%, 100%': { 'box-shadow': '0 0 3px 1px hsl(var(--primary)/0.5)' },
          '50%': { 'box-shadow': '0 0 6px 2px hsl(var(--primary)/0.7)' },
        },
        'retro-blink': { // Add a blinking effect
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.6' },
        },
         'retro-check-pop': { // Animation for checkbox check
           '0%': { transform: 'scale(0.8)', opacity: '0.5' },
           '80%': { transform: 'scale(1.1)', opacity: '1' },
           '100%': { transform: 'scale(1)', opacity: '1' },
         },
         'retro-alert-pulse': { // Animation for destructive alert
            '0%, 100%': { borderColor: 'hsl(var(--destructive)/0.7)' },
            '50%': { borderColor: 'hsl(var(--destructive))' },
         }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'retro-glow': 'retro-glow 1.5s ease-in-out infinite', // Apply glow animation
        'retro-blink': 'retro-blink 1s step-end infinite', // Apply blink animation
         'retro-check-pop': 'retro-check-pop 0.3s ease-out', // Apply check pop animation
         'retro-alert-pulse': 'retro-alert-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite', // Apply alert pulse
      },
      boxShadow: { // Define retro shadow
        'retro': '4px 4px 0px 0px hsl(var(--foreground))',
        'retro-sm': '2px 2px 0px 0px hsl(var(--foreground))',
        'retro-inset': 'inset 2px 2px 0px 0px hsl(var(--foreground)/0.5)',
        'retro-inset-dark': 'inset 2px 2px 0px 0px hsl(var(--background)/0.5)',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
