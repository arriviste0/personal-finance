import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-none text-base font-medium font-sans ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-2 border-foreground bg-card text-foreground shadow-[2px_2px_0px_hsl(var(--foreground))] hover:shadow-[3px_3px_0px_hsl(var(--foreground))] active:translate-y-px active:shadow-[1px_1px_0px_hsl(var(--foreground))] disabled:shadow-none",
        primary:
          "border-2 border-foreground bg-primary text-primary-foreground shadow-[2px_2px_0px_hsl(var(--foreground))] hover:bg-primary/90 hover:shadow-[3px_3px_0px_hsl(var(--foreground))] active:translate-y-px active:shadow-[1px_1px_0px_hsl(var(--foreground))] disabled:shadow-none",
        secondary:
          "border-2 border-foreground bg-secondary text-secondary-foreground shadow-[2px_2px_0px_hsl(var(--foreground))] hover:bg-secondary/90 hover:shadow-[3px_3px_0px_hsl(var(--foreground))] active:translate-y-px active:shadow-[1px_1px_0px_hsl(var(--foreground))] disabled:shadow-none",
        destructive:
          "border-2 border-foreground bg-destructive text-destructive-foreground shadow-[2px_2px_0px_hsl(var(--foreground))] hover:bg-destructive/90 hover:shadow-[3px_3px_0px_hsl(var(--foreground))] active:translate-y-px active:shadow-[1px_1px_0px_hsl(var(--foreground))] disabled:shadow-none",
        accent:
          "border-2 border-foreground bg-accent text-accent-foreground shadow-[2px_2px_0px_hsl(var(--foreground))] hover:bg-accent/90 hover:shadow-[3px_3px_0px_hsl(var(--foreground))] active:translate-y-px active:shadow-[1px_1px_0px_hsl(var(--foreground))] disabled:shadow-none",
        outline:
          "border-2 border-foreground bg-transparent hover:bg-muted",
        ghost: "border-2 border-foreground bg-transparent hover:bg-muted",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
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
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
