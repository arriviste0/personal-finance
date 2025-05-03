
import Link from "next/link";
import { CircleDollarSign, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet"; // Added SheetTitle
import { cn } from "@/lib/utils";

export default function Header() {
  return (
     <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-primary text-primary-foreground">
      <div className="container flex h-12 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
           <CircleDollarSign className="h-6 w-6 text-primary-foreground" />
           <span className="font-sans text-xl font-medium">FinTrack</span> {/* Updated Name */}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-4 text-base md:flex">
          <Link
            href="/dashboard" // Link to dashboard instead of root
             className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2"
          >
            Dashboard
          </Link>
           <Link
            href="/budget"
             className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2"
          >
            Budget
          </Link>
           <Link
            href="/expenses"
             className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2"
          >
            Expenses
          </Link>
           <Link
            href="/savings-goals"
             className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2"
          >
            Savings Goals
          </Link>
           <Link
            href="/investments" // Added Investments link
             className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2"
          >
            Investments
          </Link>
          <Link
            href="/emergency-fund" // Added Emergency Fund link
            className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2"
          >
            Emergency Fund
          </Link>
          <Link
            href="/tax-planner"
             className="font-medium text-primary-foreground/80 transition-colors hover:text-primary-foreground hover:underline underline-offset-2"
          >
            Tax Planner
          </Link>
           <Link
            href="/ai-assistant"
             className="font-medium text-yellow-300 transition-colors hover:text-yellow-200 hover:underline underline-offset-2" // Use accent for AI
          >
            AI Assistant
          </Link>
           {/* Placeholder for Auth Buttons */}
           {/* <div className="flex items-center gap-2">
               <Button variant="secondary" size="sm" className="retro-button">Login</Button>
               <Button variant="default" size="sm" className="retro-button">Sign Up</Button>
           </div> */}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                 variant="outline"
                 size="icon"
                 className="retro-button border-primary-foreground text-primary-foreground hover:bg-primary/80 !shadow-none h-8 w-8"
               >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
               side="left"
               className="w-[250px] retro-window !rounded-none !border-foreground !shadow-[4px_4px_0px_0px_hsl(var(--foreground))] !p-0"
            >
                {/* Retro Header for Sheet */}
                <div className="retro-window-header !bg-secondary !text-secondary-foreground">
                   <SheetTitle> {/* Added SheetTitle for accessibility */}
                        <span className="text-lg font-sans font-medium">Menu</span>
                   </SheetTitle>
                   <div className="retro-window-controls">
                       <span className="!border-secondary-foreground !bg-secondary"></span>
                       <span className="!border-secondary-foreground !bg-secondary"></span>
                       <SheetClose asChild>
                         <Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80">
                            <X className="h-3 w-3"/>
                            <span className="sr-only">Close</span>
                         </Button>
                       </SheetClose>
                   </div>
                </div>
               <nav className="grid gap-4 text-lg font-medium p-4 retro-window-content">
                 <Link
                  href="/"
                  className="flex items-center gap-3 text-lg font-medium mb-2"
                >
                  <CircleDollarSign className="h-6 w-6 text-primary" />
                  <span className="text-foreground font-sans">FinTrack</span>
                </Link>
                <Link href="/dashboard" className="text-foreground hover:underline hover:text-primary underline-offset-2">
                  Dashboard
                </Link>
                 <Link
                  href="/budget"
                  className="text-foreground hover:underline hover:text-primary underline-offset-2"
                >
                  Budget
                </Link>
                 <Link
                  href="/expenses"
                  className="text-foreground hover:underline hover:text-primary underline-offset-2"
                 >
                  Expenses
                </Link>
                 <Link
                  href="/savings-goals"
                  className="text-foreground hover:underline hover:text-primary underline-offset-2"
                >
                  Savings Goals
                </Link>
                 <Link
                  href="/investments" // Added Investments link
                  className="text-foreground hover:underline hover:text-primary underline-offset-2"
                 >
                  Investments
                </Link>
                <Link
                  href="/emergency-fund" // Added Emergency Fund link
                  className="text-foreground hover:underline hover:text-primary underline-offset-2"
                 >
                  Emergency Fund
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
                 {/* Placeholder for Mobile Auth Links */}
                 {/* <Separator className="my-2" />
                 <Link href="/login" className="text-foreground hover:underline hover:text-primary underline-offset-2">Login</Link>
                 <Link href="/signup" className="text-foreground hover:underline hover:text-primary underline-offset-2">Sign Up</Link> */}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
