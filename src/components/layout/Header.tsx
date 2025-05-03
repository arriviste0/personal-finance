import Link from "next/link";
import { CircleDollarSign, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button"; // Still use Button for structure
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // Import SheetClose
import { cn } from "@/lib/utils";

export default function Header() {
  return (
     <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-background text-foreground shadow-sm"> {/* Use background, keep border */}
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between"> {/* Adjusted height */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
           <CircleDollarSign className="h-7 w-7 text-primary" /> {/* Use primary color for icon */}
           <span className="font-heading text-2xl font-bold text-foreground">FinTrack</span> {/* Heading font, foreground color */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-6 text-base md:flex"> {/* Increased gap */}
          <Link
            href="/"
             className="font-medium text-foreground/80 transition-colors hover:text-primary hover:underline underline-offset-4" // Use primary for hover
          >
            Dashboard
          </Link>
          <Link
            href="/savings-goals"
             className="font-medium text-foreground/80 transition-colors hover:text-primary hover:underline underline-offset-4"
          >
            Savings Goals
          </Link>
          <Link
            href="/budget"
             className="font-medium text-foreground/80 transition-colors hover:text-primary hover:underline underline-offset-4"
          >
            Budget
          </Link>
          <Link
            href="/tax-planner"
             className="font-medium text-foreground/80 transition-colors hover:text-primary hover:underline underline-offset-4"
          >
            Tax Planner
          </Link>
           <Link
            href="/ai-assistant"
             className="font-medium text-accent transition-colors hover:text-accent/80 hover:underline underline-offset-4" // Accent color for AI
          >
            AI Assistant
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
               {/* Use Button component but apply retro classes */}
              <Button
                 variant="ghost" // Use ghost variant for better contrast
                 size="icon"
                 className="retro-button-ghost text-foreground hover:bg-muted/50 h-9 w-9" // Ghost style with foreground text
               >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
             {/* Retro Sheet styling */}
            <SheetContent
               side="left"
               className="w-[250px] retro-window !rounded-none !border-foreground !shadow-[4px_4px_0px_0px_hsl(var(--foreground))] !p-0" // Apply retro window styling
            >
                {/* Retro Header for Sheet */}
                <div className="retro-window-header !bg-secondary !text-secondary-foreground">
                   <span className="text-lg font-heading">Menu</span>
                   <div className="retro-window-controls">
                       <span className="!border-secondary-foreground !bg-secondary"></span>
                       <span className="!border-secondary-foreground !bg-secondary"></span>
                        {/* Close button integrated into header */}
                       <SheetClose asChild>
                         <span className="!bg-destructive !border-destructive-foreground cursor-pointer"></span>
                       </SheetClose>
                   </div>
                </div>
               <nav className="grid gap-4 text-lg font-medium p-4 retro-window-content"> {/* Standard padding and gap */}
                 <Link
                  href="/"
                  className="flex items-center gap-3 text-lg font-semibold mb-2" // Larger text, spacing
                >
                  <CircleDollarSign className="h-7 w-7 text-primary" />
                  <span className="text-foreground font-heading">FinTrack</span>
                </Link>
                <Link href="/" className="text-foreground hover:underline hover:text-primary underline-offset-4">
                  Dashboard
                </Link>
                <Link
                  href="/savings-goals"
                  className="text-foreground hover:underline hover:text-primary underline-offset-4"
                >
                  Savings Goals
                </Link>
                <Link
                  href="/budget"
                  className="text-foreground hover:underline hover:text-primary underline-offset-4"
                >
                  Budget
                </Link>
                <Link
                  href="/tax-planner"
                  className="text-foreground hover:underline hover:text-primary underline-offset-4"
                 >
                  Tax Planner
                </Link>
                 <Link
                  href="/ai-assistant"
                   className="text-accent hover:underline hover:text-accent/80 underline-offset-4"
                 >
                  AI Assistant
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
