import Link from "next/link";
import { CircleDollarSign, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"> {/* Modern header style */}
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between"> {/* Standard height */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CircleDollarSign className="h-7 w-7 text-primary" /> {/* Use primary color for icon */}
          <span className="text-xl font-bold sm:inline-block">FinTrack</span> {/* Bold title */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-6 text-sm md:flex"> {/* Standard gap and text size */}
          <Link
            href="/"
             className="font-medium text-foreground/70 transition-colors hover:text-foreground hover:underline underline-offset-4" // Modern hover
          >
            Dashboard
          </Link>
          <Link
            href="/savings-goals"
             className="font-medium text-foreground/70 transition-colors hover:text-foreground hover:underline underline-offset-4"
          >
            Savings Goals
          </Link>
          <Link
            href="/budget"
             className="font-medium text-foreground/70 transition-colors hover:text-foreground hover:underline underline-offset-4"
          >
            Budget
          </Link>
          <Link
            href="/tax-planner"
             className="font-medium text-foreground/70 transition-colors hover:text-foreground hover:underline underline-offset-4"
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
              <Button variant="ghost" size="icon" className="border-transparent"> {/* Ghost button for mobile */}
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
             {/* Standard Sheet styling */}
            <SheetContent side="left" className="w-[250px]">
               <nav className="grid gap-6 text-lg font-medium pt-6"> {/* Standard padding and gap */}
                 <Link
                  href="/"
                  className="flex items-center gap-3 text-lg font-semibold mb-4" // Larger text, spacing
                >
                  <CircleDollarSign className="h-7 w-7 text-primary" />
                  <span className="text-foreground">FinTrack</span>
                </Link>
                <Link href="/" className="text-foreground/80 hover:text-foreground">
                  Dashboard
                </Link>
                <Link
                  href="/savings-goals"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Savings Goals
                </Link>
                <Link
                  href="/budget"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Budget
                </Link>
                <Link
                  href="/tax-planner"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Tax Planner
                </Link>
                 <Link
                  href="/ai-assistant"
                   className="text-accent hover:text-accent/80"
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
