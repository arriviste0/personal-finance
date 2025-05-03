import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
   "inline-flex items-center rounded-none border-2 border-foreground px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", // Base retro style: no rounding, border
  {
    variants: {
      variant: {
        default:
           "border-primary bg-primary text-primary-foreground hover:bg-primary/80", // Primary has primary border
        secondary:
           "border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/80", // Secondary has secondary border
        destructive:
           "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/80", // Destructive has destructive border
         outline: "text-foreground border-foreground", // Outline keeps foreground border
         retro: "border-foreground bg-muted text-muted-foreground hover:bg-muted/80" // Specific retro variant
      },
    },
    defaultVariants: {
       variant: "retro", // Make retro the default visual style
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
     <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
