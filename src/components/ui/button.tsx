import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Define variants using the retro base class and variant-specific classes from globals.css
const buttonVariants = cva(
  "retro-button", // Base retro button style applied via globals.css
  {
    variants: {
      variant: {
        default: "retro-button-outline", // Retro outline is default
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
        className={cn(buttonVariants({ variant, size, className }), "font-sans")} // Ensure sans font is applied
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
