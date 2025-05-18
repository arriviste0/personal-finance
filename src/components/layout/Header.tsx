
'use client';

import Link from "next/link";
import { CircleDollarSign, Menu, X, LogOut, Wallet, Lock, Activity } from "lucide-react"; // Added Wallet, Lock, Activity
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

// Mock data for wallet - in a real app, this would come from context/state
const walletBalance = 12500.75;
const lockedInGoals = 5750.00;

const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export default function Header() {
    const { toast } = useToast();
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' });
    };

    const isLandingPage = pathname === '/';
    const isAuthenticated = status === 'authenticated'; // Or true if middleware is disabled

    const headerClasses = isLandingPage && !isAuthenticated
        ? "sticky top-0 z-50 w-full bg-black text-white shadow-md"
        : "sticky top-0 z-50 w-full border-b-2 border-foreground bg-primary text-primary-foreground";

    const navLinkClasses = (href: string, isMobile: boolean = false) => {
        const isActive = pathname === href || (href === "/about" && pathname.startsWith("/about"));

        if (isLandingPage && !isAuthenticated) {
            if (isMobile) {
                 if (isActive && (href === "/about")) {
                    return "bg-white text-black rounded-md py-2 px-3 block text-base font-medium transition-colors no-underline";
                 }
                 return "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md py-2 px-3 block text-base font-medium transition-colors no-underline";
            }
            let baseClasses = "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium transition-colors duration-150 ease-in-out no-underline ";
            if (isActive && (href === "/about")) {
                return baseClasses + "bg-white text-black rounded-md";
            }
            return baseClasses + "text-white hover:bg-white hover:text-black hover:rounded-md";
        }

        // Default app links styling
        if (isMobile) {
            return cn(
                "text-foreground hover:underline hover:text-primary underline-offset-2 py-1.5 block font-sans no-underline",
                isActive && "text-primary underline font-semibold"
            );
        }
        return cn(
            "font-medium text-primary-foreground/80 hover:text-primary-foreground hover:underline underline-offset-2 font-sans no-underline",
            isActive && "text-primary-foreground underline font-semibold"
        );
    };

  return (
     <header className={headerClasses}>
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8 relative">
        <Link href="/" className="flex items-center space-x-2 no-underline mr-6">
           <CircleDollarSign className={cn("h-7 w-7", (isLandingPage && !isAuthenticated) ? "text-white" : "text-primary-foreground")} />
           <span className={cn("font-sans text-xl font-bold", (isLandingPage && !isAuthenticated) ? "text-white" : "text-primary-foreground")}>Fin.Co</span>
        </Link>

        {/* Wallet Info - Show if not landing page OR if authenticated on landing */}
        {(!isLandingPage || isAuthenticated) && (
          <div className="hidden md:flex items-center gap-4 border-r border-foreground/20 pr-4 mr-4">
            <div className="flex items-center gap-1.5 text-xs">
              <Wallet className="h-4 w-4 opacity-80"/>
              <span>{formatCurrency(walletBalance)}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <Lock className="h-4 w-4 opacity-80"/>
              <span>{formatCurrency(lockedInGoals)}</span>
            </div>
          </div>
        )}

        {/* Desktop Navigation - Centered for landing unauthenticated */}
        {isLandingPage && !isAuthenticated && (
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <nav className="flex items-center gap-x-1 lg:gap-x-2">
              <Link href="/#services" className={navLinkClasses('/#services', false)}>Discover</Link>
              <Link href="/about" className={navLinkClasses('/about', false)}>About</Link>
              <Link href="/#why-fintrack" className={navLinkClasses('/#why-fintrack', false)}>Features</Link>
              <Link href="/#pricing" className={navLinkClasses('/#pricing', false)}>Pricing</Link>
            </nav>
          </div>
        )}

        <nav className={cn("hidden md:flex items-center", (isLandingPage && !isAuthenticated) ? "ml-auto gap-x-2" : "gap-x-3 lg:gap-x-4")}>
          {(!isLandingPage || isAuthenticated) && ( // Show app nav if not landing OR if authenticated on landing
             <>
                 <Link href="/dashboard" className={navLinkClasses('/dashboard')}>Dashboard</Link>
                 <Link href="/budget" className={navLinkClasses('/budget')}>Budget</Link>
                 <Link href="/expenses" className={navLinkClasses('/expenses')}>Expenses</Link>
                 <Link href="/savings-goals" className={navLinkClasses('/savings-goals')}>Savings Goals</Link>
                 <Link href="/investments" className={navLinkClasses('/investments')}>Investments</Link>
                 <Link href="/emergency-fund" className={navLinkClasses('/emergency-fund')}>Emergency</Link>
                 <Link href="/tax-planner" className={navLinkClasses('/tax-planner')}>Tax</Link>
                 <Link href="/ai-assistant" className={cn(navLinkClasses('/ai-assistant'), "text-yellow-300 hover:text-yellow-200")}>AI</Link>
             </>
          )}
           {!isAuthenticated && ( // Always show auth buttons if not authenticated
               <>
                  {isLandingPage ? (
                    <div className="flex items-center gap-x-2">
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center text-white border border-white rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black no-underline"
                        >
                           Log in
                        </Link>
                        <Link href="/get-started" passHref className="no-underline">
                           <Button
                             className="bg-pink-500 hover:bg-pink-600 text-white rounded-md px-3 py-1.5 text-sm font-semibold border-0 shadow-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                           >
                            Get Started
                           </Button>
                        </Link>
                      </div>
                  ) : ( // Auth buttons for non-landing pages when unauthenticated
                     <div className="flex items-center gap-x-2 ml-auto">
                        <Link href="/login" passHref className="no-underline">
                           <Button variant="outline" size="sm" className={cn("retro-button", "!border-primary-foreground !text-primary-foreground hover:!bg-primary-foreground/10")}>Login</Button>
                        </Link>
                        <Link href="/get-started" passHref className="no-underline">
                           <Button variant="secondary" size="sm" className={cn("retro-button")}>Register</Button>
                        </Link>
                     </div>
                  )}
               </>
            )}
             {isAuthenticated && ( // Sign out button for authenticated users
                 <Button variant={"secondary"} size="sm" className={cn("retro-button ml-auto", headerClasses.includes("bg-primary") && "!border-primary-foreground !text-primary-foreground hover:!bg-primary-foreground/10")} onClick={handleSignOut}>
                     <LogOut className="mr-1 h-4 w-4"/> Sign Out
                 </Button>
            )}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden ml-auto">
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
                <Menu className="h-6 w-6" />
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
                    "retro-window-header p-3 flex items-center justify-between", // Ensure flex and justify-between
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
                            "h-4 w-4 p-0 !shadow-none !border-none !bg-red-500 !text-white hover:!bg-red-600",
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
                 {(!isLandingPage || isAuthenticated) && (
                    <>
                        <div className="space-y-1 pb-3 mb-3 border-b border-border">
                             <div className="flex items-center gap-2 px-3 py-1.5 text-sm">
                               <Wallet className="h-4 w-4 text-muted-foreground"/>
                               <span>Wallet: {formatCurrency(walletBalance)}</span>
                             </div>
                             <div className="flex items-center gap-2 px-3 py-1.5 text-sm">
                               <Lock className="h-4 w-4 text-muted-foreground"/>
                               <span>Locked: {formatCurrency(lockedInGoals)}</span>
                             </div>
                        </div>
                        <SheetClose asChild><Link href="/dashboard" className={navLinkClasses('/dashboard', true)}>Dashboard</Link></SheetClose>
                        <SheetClose asChild><Link href="/budget" className={navLinkClasses('/budget', true)}>Budget</Link></SheetClose>
                        <SheetClose asChild><Link href="/expenses" className={navLinkClasses('/expenses', true)}>Expenses</Link></SheetClose>
                        <SheetClose asChild><Link href="/savings-goals" className={navLinkClasses('/savings-goals', true)}>Savings Goals</Link></SheetClose>
                        <SheetClose asChild><Link href="/investments" className={navLinkClasses('/investments', true)}>Investments</Link></SheetClose>
                        <SheetClose asChild><Link href="/emergency-fund" className={navLinkClasses('/emergency-fund', true)}>Emergency Fund</Link></SheetClose>
                        <SheetClose asChild><Link href="/tax-planner" className={navLinkClasses('/tax-planner', true)}>Tax Planner</Link></SheetClose>
                        <SheetClose asChild><Link href="/ai-assistant" className={cn(navLinkClasses('/ai-assistant', true), (isLandingPage && !isAuthenticated) ? "text-pink-400 hover:text-pink-300" : "text-yellow-600 hover:text-yellow-500")}>AI Assistant</Link></SheetClose>
                    </>
                 )}

                 {isAuthenticated ? (
                     <SheetClose asChild>
                        <Button variant="destructive" size="sm" className="retro-button mt-4" onClick={handleSignOut}>
                             <LogOut className="mr-2 h-4 w-4"/> Sign Out
                        </Button>
                     </SheetClose>
                 ) : ( // Unauthenticated specific links
                     <>
                         {isLandingPage ? (
                            <>
                              <SheetClose asChild><Link href="/#services" className={navLinkClasses('/#services', true)}>Discover</Link></SheetClose>
                              <SheetClose asChild><Link href="/about" className={navLinkClasses('/about', true)}>About</Link></SheetClose>
                              <SheetClose asChild><Link href="/#why-fintrack" className={navLinkClasses('/#why-fintrack', true)}>Features</Link></SheetClose>
                              <SheetClose asChild><Link href="/#pricing" className={navLinkClasses('/#pricing', true)}>Pricing</Link></SheetClose>
                              <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-gray-700">
                                <SheetClose asChild>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center text-white border border-white rounded-md py-2 px-3 block text-base font-medium transition-colors hover:bg-white hover:text-black no-underline"
                                >
                                    Log in
                                </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                 <Link href="/get-started" passHref className="no-underline">
                                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-md py-2 text-base font-semibold border-0 shadow-none">
                                        Get Started
                                    </Button>
                                </Link>
                                </SheetClose>
                              </div>
                            </>
                         ) : ( // Unauthenticated, but not on landing page
                            <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-border">
                                <SheetClose asChild>
                                <Link href="/login" passHref className="no-underline">
                                    <Button variant="outline" className="w-full retro-button">Login</Button>
                                </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                 <Link href="/get-started" passHref className="no-underline">
                                    <Button variant="default" className="w-full retro-button">Register</Button>
                                </Link>
                                </SheetClose>
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
