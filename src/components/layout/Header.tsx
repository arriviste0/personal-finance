
'use client';

import Link from "next/link";
import { CircleDollarSign, Menu, X, Banknote, LogOut, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { toast } = useToast();
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const handleLinkAccount = () => {
        toast({
            title: "Bank Account Linking (Placeholder)",
            description: "This would normally launch a secure bank linking process.",
        });
    };

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' });
    };

    const isLandingPage = pathname === '/';
    const isAuthenticated = status === 'authenticated';

    const headerClasses = isLandingPage && !isAuthenticated
        ? "sticky top-0 z-50 w-full bg-black text-white shadow-md"
        : "sticky top-0 z-50 w-full border-b-2 border-foreground bg-primary text-primary-foreground";

    const navLinkClasses = (href: string, isMobile: boolean = false) => {
        const isActive = pathname === href || (href === "/about" && pathname.startsWith("/about")); // Example active state for /about

        if (isLandingPage && !isAuthenticated) {
            if (isMobile) {
                 if (isActive) {
                    return "bg-white text-black rounded-md py-2 px-3 block text-base font-medium transition-colors";
                 }
                 return "text-gray-300 hover:bg-white hover:text-black rounded-md py-2 px-3 block text-base font-medium transition-colors";
            }
            // Desktop specific styling for landing unauthenticated
            if (isActive) {
                return "bg-white text-black rounded-md px-3 py-1.5 text-sm font-medium transition-colors";
            }
            return "text-white hover:bg-white hover:text-black rounded-md px-3 py-1.5 text-sm font-medium transition-colors";
        }
        // Default app links styling (authenticated or non-landing pages)
        if (isMobile) {
            return cn("text-gray-700 hover:underline hover:text-primary underline-offset-2 py-1.5 block", isActive && "text-primary underline");
        }
        return cn(
            "font-medium text-primary-foreground/80 hover:text-primary-foreground hover:underline underline-offset-2",
            isActive && "text-primary-foreground underline"
        );
    };


  return (
     <header className={headerClasses}>
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2 no-underline">
           <CircleDollarSign className={cn("h-7 w-7", (isLandingPage && !isAuthenticated) ? "text-white" : "text-primary-foreground")} />
           <span className={cn("font-sans text-xl font-bold", (isLandingPage && !isAuthenticated) ? "text-white" : "text-primary-foreground")}>Fin.Co</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-x-3 lg:gap-x-5 text-base md:flex items-center">
          {isAuthenticated && (
             <>
                 <Link href="/dashboard" className={navLinkClasses('/dashboard')}>Dashboard</Link>
                 <Link href="/budget" className={navLinkClasses('/budget')}>Budget</Link>
                 <Link href="/expenses" className={navLinkClasses('/expenses')}>Expenses</Link>
                 <Link href="/savings-goals" className={navLinkClasses('/savings-goals')}>Savings Goals</Link>
                 <Link href="/investments" className={navLinkClasses('/investments')}>Investments</Link>
                 <Link href="/emergency-fund" className={navLinkClasses('/emergency-fund')}>Emergency Fund</Link>
                 <Link href="/tax-planner" className={navLinkClasses('/tax-planner')}>Tax Planner</Link>
                 <Link href="/ai-assistant" className={cn(navLinkClasses('/ai-assistant'), "text-yellow-300 hover:text-yellow-200")}>AI Assistant</Link>
                 <Button variant={"secondary"} size="sm" className={cn("retro-button", headerClasses.includes("bg-primary") && "!border-primary-foreground !text-primary-foreground hover:!bg-primary-foreground/10")} onClick={handleSignOut}>
                     <LogOut className="mr-1 h-4 w-4"/> Sign Out
                 </Button>
             </>
          )}
           {!isAuthenticated && (
               <>
                  {isLandingPage ? (
                    <>
                      <Link href="/#services" className={navLinkClasses('/#services')}>Discover</Link>
                      <Link href="/about" className={navLinkClasses('/about')}>About</Link>
                      <Link href="/#why-fintrack" className={navLinkClasses('/#why-fintrack')}>Features</Link>
                      <Link href="/#pricing" className={navLinkClasses('/#pricing')}>Pricing</Link>
                      <div className="flex items-center gap-x-2 lg:gap-x-3 ml-auto">
                        <Link
                            href="/login"
                            className="text-white hover:bg-white hover:text-black rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
                        >
                           Log in
                        </Link>
                        <Link href="/get-started" passHref>
                           <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-md px-4 py-1.5 text-sm font-semibold border-0 shadow-none">
                            Get Started
                           </Button>
                        </Link>
                      </div>
                    </>
                  ) : (
                     <div className="flex items-center gap-2 ml-auto">
                        <Link href="/login" passHref>
                           <Button variant="outline" size="sm" className={cn("retro-button", "!border-primary-foreground !text-primary-foreground hover:!bg-primary-foreground/10")}>Login</Button>
                        </Link>
                        <Link href="/get-started" passHref>
                           <Button variant="secondary" size="sm" className={cn("retro-button")}>Register</Button>
                        </Link>
                     </div>
                  )}
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
                 className={cn(
                    "retro-button !shadow-none h-8 w-8",
                    (isLandingPage && !isAuthenticated) ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md" : "border-primary-foreground text-primary-foreground hover:bg-primary/80"
                 )}
               >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
               side="left"
               className={cn(
                   "w-[280px] retro-window !rounded-none !p-0",
                   (isLandingPage && !isAuthenticated) ? "bg-black !border-gray-700 text-white" : "bg-card !border-foreground text-foreground"
                )}
            >
                <div className={cn(
                    "retro-window-header p-3",
                    (isLandingPage && !isAuthenticated) ? "!bg-gray-800 !text-white !border-gray-700" : "!bg-muted !text-foreground !border-foreground"
                 )}>
                   <SheetTitle>
                        <span className="text-lg font-sans font-semibold">Fin.Co Menu</span>
                   </SheetTitle>
                   <div className="retro-window-controls">
                       <span className={cn((isLandingPage && !isAuthenticated) ? "!border-gray-500 !bg-gray-700" : "!border-foreground !bg-muted")}></span>
                       <span className={cn((isLandingPage && !isAuthenticated) ? "!border-gray-500 !bg-gray-700" : "!border-foreground !bg-muted")}></span>
                       <SheetClose asChild>
                         <Button variant="ghost" size="icon" className={cn(
                            "h-4 w-4 p-0 !shadow-none !bg-red-500 !text-white hover:!bg-red-600",
                            (isLandingPage && !isAuthenticated) ? "!border-gray-500" : "!border-black"
                          )}>
                            <X className="h-3 w-3"/>
                            <span className="sr-only">Close</span>
                         </Button>
                       </SheetClose>
                   </div>
                </div>
               <nav className={cn(
                   "grid gap-3 text-base font-medium p-4 retro-window-content",
                   (isLandingPage && !isAuthenticated) ? "!border-gray-700" : "!border-foreground"
                )}>
                 {isAuthenticated ? (
                     <>
                        <Link href="/dashboard" className={navLinkClasses('/dashboard', true)}>Dashboard</Link>
                        <Link href="/budget" className={navLinkClasses('/budget', true)}>Budget</Link>
                        <Link href="/expenses" className={navLinkClasses('/expenses', true)}>Expenses</Link>
                        <Link href="/savings-goals" className={navLinkClasses('/savings-goals', true)}>Savings Goals</Link>
                        <Link href="/investments" className={navLinkClasses('/investments', true)}>Investments</Link>
                        <Link href="/emergency-fund" className={navLinkClasses('/emergency-fund', true)}>Emergency Fund</Link>
                        <Link href="/tax-planner" className={navLinkClasses('/tax-planner', true)}>Tax Planner</Link>
                        <Link href="/ai-assistant" className={cn(navLinkClasses('/ai-assistant', true), (isLandingPage && !isAuthenticated) ? "text-pink-400 hover:text-pink-300" : "text-yellow-600 hover:text-yellow-500")}>AI Assistant</Link>
                        <Button variant="outline" className="w-full retro-button border-green-500 text-green-600 mt-4" onClick={handleLinkAccount}>
                             <Banknote className="mr-2 h-4 w-4"/> Link Bank Account
                        </Button>
                        <Button variant="destructive" size="sm" className="retro-button mt-2" onClick={handleSignOut}>
                             <LogOut className="mr-2 h-4 w-4"/> Sign Out
                        </Button>
                    </>
                 ) : (
                     <>
                         {isLandingPage ? (
                            <>
                              <Link href="/#services" className={navLinkClasses('/#services', true)}>Discover</Link>
                              <Link href="/about" className={navLinkClasses('/about', true)}>About</Link>
                              <Link href="/#why-fintrack" className={navLinkClasses('/#why-fintrack', true)}>Features</Link>
                              <Link href="/#pricing" className={navLinkClasses('/#pricing', true)}>Pricing</Link>
                              <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-gray-700">
                                <Link
                                    href="/login"
                                    className="text-gray-300 hover:bg-white hover:text-black rounded-md py-2 px-3 block text-base font-medium transition-colors"
                                >
                                    Log in
                                </Link>
                                 <Link href="/get-started" passHref>
                                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-md py-2 text-base font-semibold border-0 shadow-none">
                                        Get Started
                                    </Button>
                                </Link>
                              </div>
                            </>
                         ) : (
                            // Fallback for non-landing, unauthenticated pages like /login
                            <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-border">
                                <Link href="/login" passHref>
                                    <Button variant="outline" className="w-full retro-button">Login</Button>
                                </Link>
                                 <Link href="/get-started" passHref>
                                    <Button variant="default" className="w-full retro-button">Register</Button>
                                </Link>
                             </div>
                         )}
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

    