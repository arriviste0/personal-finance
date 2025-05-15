
'use client';

import Link from "next/link";
import { CircleDollarSign, Menu, X, Banknote, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation'; // Import usePathname

export default function Header() {
    const { toast } = useToast();
    const { data: session, status } = useSession();
    const pathname = usePathname(); // Get current pathname

    const handleLinkAccount = () => {
        toast({
            title: "Bank Account Linking (Placeholder)",
            description: "This would normally launch a secure bank linking process.",
        });
    };

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' });
    };

    // Determine header style based on route
    const isLandingPage = pathname === '/';
    const headerClasses = isLandingPage
        ? "sticky top-0 z-50 w-full border-b-2 border-gray-200 bg-amber-50 text-gray-800 shadow-sm" // Landing page header
        : "sticky top-0 z-50 w-full border-b-2 border-foreground bg-primary text-primary-foreground"; // App header

  return (
     <header className={headerClasses}>
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center space-x-2">
           <CircleDollarSign className={cn("h-7 w-7", isLandingPage ? "text-yellow-500" : "text-primary-foreground")} />
           <span className={cn("font-sans text-xl font-bold", isLandingPage ? "text-gray-900" : "text-primary-foreground")}>Fin.Co</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-4 text-base md:flex items-center">
          {status === 'authenticated' && (
             <>
                 <Link href="/dashboard" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-gray-600 hover:text-black" : "text-primary-foreground/80 hover:text-primary-foreground")}>
                    Dashboard
                 </Link>
                 <Link href="/budget" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-gray-600 hover:text-black" : "text-primary-foreground/80 hover:text-primary-foreground")}>
                    Budget
                 </Link>
                 <Link href="/expenses" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-gray-600 hover:text-black" : "text-primary-foreground/80 hover:text-primary-foreground")}>
                    Expenses
                 </Link>
                 <Link href="/savings-goals" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-gray-600 hover:text-black" : "text-primary-foreground/80 hover:text-primary-foreground")}>
                    Savings Goals
                 </Link>
                 <Link href="/investments" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-gray-600 hover:text-black" : "text-primary-foreground/80 hover:text-primary-foreground")}>
                    Investments
                 </Link>
                  <Link href="/emergency-fund" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-gray-600 hover:text-black" : "text-primary-foreground/80 hover:text-primary-foreground")}>
                    Emergency Fund
                 </Link>
                  <Link href="/tax-planner" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-gray-600 hover:text-black" : "text-primary-foreground/80 hover:text-primary-foreground")}>
                    Tax Planner
                 </Link>
                 <Link href="/ai-assistant" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-yellow-600 hover:text-yellow-500" : "text-yellow-300 hover:text-yellow-200")}>
                    AI Assistant
                 </Link>
                 <Button variant={isLandingPage ? "outline" : "secondary"} size="sm" className={cn("retro-button", isLandingPage && "border-gray-600 text-gray-700 hover:bg-gray-100")} onClick={handleSignOut}>
                     <LogOut className="mr-1 h-4 w-4"/> Sign Out
                 </Button>
             </>
          )}
           {status === 'unauthenticated' && (
               <>
                   <Link href="/#features" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-gray-600 hover:text-black" : "text-primary-foreground/80 hover:text-primary-foreground")}>Services</Link>
                   <Link href="/#pricing" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-gray-600 hover:text-black" : "text-primary-foreground/80 hover:text-primary-foreground")}>Community</Link>
                   <Link href="/#articles" className={cn("font-medium transition-colors hover:underline underline-offset-2", isLandingPage ? "text-gray-600 hover:text-black" : "text-primary-foreground/80 hover:text-primary-foreground")}>About Us</Link>
                   <div className="flex items-center gap-2 ml-auto">
                      <Link href="/login" passHref>
                         <Button variant="outline" size="sm" className={cn("retro-button", isLandingPage ? "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black" : "!border-primary-foreground !text-primary-foreground hover:!bg-primary-foreground/10")}>Login</Button>
                      </Link>
                      <Link href="/get-started" passHref>
                         <Button variant={isLandingPage ? "default" : "secondary"} size="sm" className={cn("retro-button", isLandingPage ? "bg-yellow-400 hover:bg-yellow-500 text-black" : "")}>Register</Button>
                      </Link>
                   </div>
               </>
            )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                 variant="outline"
                 size="icon"
                 className={cn("retro-button !shadow-none h-8 w-8", isLandingPage ? "border-gray-600 text-gray-700 hover:bg-gray-100" : "border-primary-foreground text-primary-foreground hover:bg-primary/80")}
               >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
               side="left"
               className="w-[280px] retro-window !rounded-none !border-foreground !shadow-[4px_4px_0px_0px_hsl(var(--foreground))] !p-0 bg-amber-50" // Match landing page bg
            >
                <div className="retro-window-header !bg-yellow-400 !text-black">
                   <SheetTitle>
                        <span className="text-lg font-sans font-semibold">Fin.Co Menu</span>
                   </SheetTitle>
                   <div className="retro-window-controls">
                       <span className="!border-black !bg-yellow-400"></span>
                       <span className="!border-black !bg-yellow-400"></span>
                       <SheetClose asChild>
                         <Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-black !bg-red-500 !text-white hover:!bg-red-600">
                            <X className="h-3 w-3"/>
                            <span className="sr-only">Close</span>
                         </Button>
                       </SheetClose>
                   </div>
                </div>
               <nav className="grid gap-3 text-base font-medium p-4 retro-window-content !border-t-2 !border-black">
                 {status === 'authenticated' ? (
                     <>
                        <Link href="/dashboard" className="text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5">Dashboard</Link>
                        <Link href="/budget" className="text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5">Budget</Link>
                        <Link href="/expenses" className="text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5">Expenses</Link>
                        <Link href="/savings-goals" className="text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5">Savings Goals</Link>
                        <Link href="/investments" className="text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5">Investments</Link>
                        <Link href="/emergency-fund" className="text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5">Emergency Fund</Link>
                        <Link href="/tax-planner" className="text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5">Tax Planner</Link>
                        <Link href="/ai-assistant" className="text-yellow-600 hover:underline hover:text-yellow-500 underline-offset-2 py-1.5">AI Assistant</Link>
                        <Button variant="outline" className="w-full retro-button border-green-500 text-green-600 mt-4" onClick={handleLinkAccount}>
                             <Banknote className="mr-2 h-4 w-4"/> Link Bank Account
                        </Button>
                        <Button variant="destructive" size="sm" className="retro-button mt-2" onClick={handleSignOut}>
                             <LogOut className="mr-2 h-4 w-4"/> Sign Out
                        </Button>
                    </>
                 ) : (
                     <>
                         <Link href="/#features" className="text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5">Services</Link>
                         <Link href="/#pricing" className="text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5">Community</Link>
                         <Link href="/#articles" className="text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5">About Us</Link>
                         <div className="flex flex-col gap-3 mt-6">
                            <Link href="/login" passHref>
                                <Button variant="outline" className="w-full retro-button border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black">Login</Button>
                            </Link>
                             <Link href="/get-started" passHref>
                                <Button variant="default" className="w-full retro-button bg-yellow-400 hover:bg-yellow-500 text-black">Register</Button>
                            </Link>
                         </div>
                     </>
                 )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
