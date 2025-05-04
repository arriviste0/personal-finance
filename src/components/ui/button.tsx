import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Define variants using the retro base class and variant-specific classes from globals.css
const buttonVariants = cva(
  "inline-flex items-center justify-center px-4 py-2 border-2 border-foreground bg-transparent text-foreground shadow-retro-sm transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:active:translate-y-0 disabled:active:translate-x-0 text-base font-medium", // Ensure sans font is applied and merge classes correctly
  {
    variants: {
      variant: {
        default: "retro-button-default", // Default uses outline styling
        primary: "retro-button-primary",
        secondary: "retro-button-secondary",
        accent: "retro-button-accent",
        destructive: "retro-button-destructive",
        ghost: "retro-button-ghost",
        link: "retro-button-link",
        outline: "retro-button-outline", // Explicit outline variant
      },
      size: {
        default: "", // Base style handles default size
        sm: "retro-button-sm",
        lg: "retro-button-lg",
        icon: "retro-button-icon",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className, "font-sans")} // Ensure sans font is applied and merge classes correctly
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
