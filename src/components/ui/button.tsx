import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border", // Added default border
  {
    variants: {
      variant: {
        default: // Changed default to outlined style
          "border-primary bg-transparent text-primary hover:bg-primary/10",
        destructive:
          "border-destructive bg-transparent text-destructive hover:bg-destructive/10",
        outline: // Kept outline, but can be identical to default now
          "border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
           "border-secondary bg-transparent text-secondary hover:bg-secondary/10",
        ghost: "border-transparent hover:bg-accent hover:text-accent-foreground", // Remove border for ghost
        link: "text-primary underline-offset-4 hover:underline border-transparent", // Remove border for link
        solid: "bg-primary text-primary-foreground hover:bg-primary/90 border-primary", // Added solid variant if needed
        solidAccent: "bg-accent text-accent-foreground hover:bg-accent/90 border-accent" // Added solid accent variant
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default", // Default is now outlined
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
