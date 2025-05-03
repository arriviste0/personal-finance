import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Apply retro window style
      "retro-window",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { showControls?: boolean }
>(({ className, showControls = true, children, ...props }, ref) => (
  <div
    ref={ref}
    // Apply retro window header style
    className={cn("retro-window-header", className)}
    {...props}
  >
      <div className="flex-1">{children}</div>
      {showControls && (
         <div className="retro-window-controls">
             <span /> {/* Minimize */}
             <span /> {/* Maximize */}
             <span className="!bg-destructive border-destructive-foreground" /> {/* Close */}
         </div>
      )}
  </div>
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement, // Changed to p for better semantics usually
  React.HTMLAttributes<HTMLHeadingElement> // Kept HTMLAttributes for compatibility
>(({ className, ...props }, ref) => (
  // Use <p> tag but keep the styling as h3 equivalent for consistency
  <p
    ref={ref}
    className={cn(
      // Use header text styles
      "text-sm font-bold leading-none tracking-tight", // Adjusted for header
      className
    )}
    {...props}
   />
))
CardTitle.displayName = "CardTitle"


const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p // Use <p> tag
    ref={ref}
    className={cn("text-xs text-primary-foreground/80", className)} // Adjusted for header
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("retro-window-content", className)} {...props} /> // Apply content style
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    // Apply content style padding, but keep flex properties
    className={cn("flex items-center retro-window-content pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
