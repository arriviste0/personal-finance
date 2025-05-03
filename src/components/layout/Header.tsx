import Link from "next/link";
import { CircleDollarSign, Menu } from "lucide-react";
import { Button } from "@/components/ui/button"; // Still use Button for structure
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"; // Import SheetClose
import { cn } from "@/lib/utils";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-primary text-primary-foreground"> {/* Retro header style */}
      <div className="container flex h-12 max-w-screen-2xl items-center justify-between"> {/* Standard height */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CircleDollarSign className="h-6 w-6 text-primary-foreground" /> {/* Use primary color for icon */}
          <span className="text-xl font-medium">FinTrack</span> {/* Bold title */}
           {/* Optional: Add a subtle blink animation for retro feel */}
           <span className="ml-1 h-3 w-3 animate-retro-blink rounded-full bg-accent"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-4 text-base md:flex"> {/* Standard gap and text size */}
          <Link
            href="/"
             className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2" // Retro hover
          >
            Dashboard
          </Link>
          <Link
            href="/savings-goals"
             className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2"
          >
            Savings Goals
          </Link>
          <Link
            href="/budget"
             className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2"
          >
            Budget
          </Link>
          <Link
            href="/tax-planner"
             className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2"
          >
            Tax Planner
          </Link>
           <Link
            href="/ai-assistant"
             className="font-medium text-yellow-300 transition-colors hover:text-yellow-200 hover:underline underline-offset-2" // Accent color for AI
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
                 variant="outline"
                 size="icon"
                 className="border-primary-foreground text-primary-foreground hover:bg-primary/80 !shadow-none h-8 w-8" // Retro button styling for mobile trigger
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
                   <span className="text-lg font-medium">Menu</span>
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
                  className="flex items-center gap-3 text-lg font-medium mb-2" // Larger text, spacing
                >
                  <CircleDollarSign className="h-6 w-6 text-primary" />
                  <span className="text-foreground">FinTrack</span>
                </Link>
                <Link href="/" className="text-foreground hover:underline hover:text-primary underline-offset-2">
                  Dashboard
                </Link>
                <Link
                  href="/savings-goals"
                  className="text-foreground hover:underline hover:text-primary underline-offset-2"
                >
                  Savings Goals
                </Link>
                <Link
                  href="/budget"
                  className="text-foreground hover:underline hover:text-primary underline-offset-2"
                >
                  Budget
                </Link>
                <Link
                  href="/tax-planner"
                  className="text-foreground hover:underline hover:text-primary underline-offset-2"
                 >
                  Tax Planner
                </Link>
                 <Link
                  href="/ai-assistant"
                   className="text-accent hover:underline hover:text-accent/80 underline-offset-2"
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
