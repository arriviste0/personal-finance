import Link from "next/link";
import { CircleDollarSign, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CircleDollarSign className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">FinTrack</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-6 text-sm md:flex">
          <Link
            href="/"
            className="font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/savings-goals"
            className="font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            Savings Goals
          </Link>
          <Link
            href="/budget"
            className="font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            Budget
          </Link>
          <Link
            href="/tax-planner"
            className="font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            Tax Planner
          </Link>
           <Link
            href="/ai-assistant"
            className="font-medium text-foreground/60 transition-colors hover:text-foreground"
          >
            AI Assistant
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                 <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <CircleDollarSign className="h-6 w-6 text-primary" />
                  <span className="sr-only">FinTrack</span>
                </Link>
                <Link href="/" className="hover:text-foreground">
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
                  className="text-muted-foreground hover:text-foreground"
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
