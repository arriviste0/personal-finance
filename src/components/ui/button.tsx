import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-2 border-foreground active:translate-y-px active:translate-x-px active:shadow-none", // Retro base style: no radius, thick border, active state removes shadow
  {
    variants: {
      variant: {
        default: // Primary retro button: solid color, shadow
          "bg-card text-card-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:bg-muted",
        destructive:
           "bg-destructive text-destructive-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:bg-destructive/90",
        outline: // Simple outline, less prominent
          "border-foreground bg-transparent text-foreground hover:bg-foreground/10 shadow-none", // No shadow for outline
        secondary:
           "bg-secondary text-secondary-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:bg-secondary/90",
        ghost: "border-transparent hover:bg-foreground/10 shadow-none", // No border/shadow for ghost
        link: "text-primary underline-offset-4 hover:underline border-transparent shadow-none", // No border/shadow for link
        solid: // Alias for primary retro button style
           "bg-primary text-primary-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:bg-primary/90",
        solidAccent: // Accent retro button style
           "bg-accent text-accent-foreground shadow-[2px_2px_0px_0px_hsl(var(--foreground))] hover:bg-accent/90"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3", // No rounding change needed
        lg: "h-11 px-8", // No rounding change needed
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default", // Default is now the retro shaded button
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
