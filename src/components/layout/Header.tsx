
'use client';

import Link from "next/link";
import { CircleDollarSign, Menu, X, Banknote, LogOut, ArrowRight } from "lucide-react"; // Added ArrowRight
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
        ? "sticky top-0 z-50 w-full bg-black text-white" // Landing page, unauthenticated: black background
        : "sticky top-0 z-50 w-full border-b-2 border-foreground bg-primary text-primary-foreground"; // App header or authenticated landing page

    const navLinkClasses = (isActive = false) => {
        if (isLandingPage && !isAuthenticated) {
            if (isActive) {
                return "bg-white text-black rounded-md px-3 py-1.5 text-sm font-medium";
            }
            return "text-gray-300 hover:text-white text-sm font-medium transition-colors";
        }
        // Default app links
        return "font-medium text-primary-foreground/80 hover:text-primary-foreground hover:underline underline-offset-2";
    };

    const mobileNavLinkClasses = "text-gray-700 hover:underline hover:text-yellow-600 underline-offset-2 py-1.5 block"; // Reverted to original mobile for consistency for now
    const mobileLandingUnauthNavLinkClasses = "text-gray-300 hover:text-white py-2 block text-base";
    const mobileLandingUnauthActiveNavLinkClasses = "bg-gray-700 text-white rounded-md py-2 px-3 block text-base";


  return (
     <header className={headerClasses}>
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="mr-6 flex items-center space-x-2">
           <CircleDollarSign className={cn("h-7 w-7", (isLandingPage && !isAuthenticated) ? "text-white" : "text-primary-foreground")} />
           <span className={cn("font-sans text-xl font-bold", (isLandingPage && !isAuthenticated) ? "text-white" : "text-primary-foreground")}>Fin.Co</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-x-3 lg:gap-x-5 text-base md:flex items-center">
          {isAuthenticated && ( // Links for authenticated users (applies to all pages including landing)
             <>
                 <Link href="/dashboard" className={navLinkClasses(pathname === '/dashboard')}>Dashboard</Link>
                 <Link href="/budget" className={navLinkClasses(pathname === '/budget')}>Budget</Link>
                 <Link href="/expenses" className={navLinkClasses(pathname === '/expenses')}>Expenses</Link>
                 <Link href="/savings-goals" className={navLinkClasses(pathname === '/savings-goals')}>Savings Goals</Link>
                 <Link href="/investments" className={navLinkClasses(pathname === '/investments')}>Investments</Link>
                 <Link href="/emergency-fund" className={navLinkClasses(pathname === '/emergency-fund')}>Emergency Fund</Link>
                 <Link href="/tax-planner" className={navLinkClasses(pathname === '/tax-planner')}>Tax Planner</Link>
                 <Link href="/ai-assistant" className={cn(navLinkClasses(pathname === '/ai-assistant'), "text-yellow-300 hover:text-yellow-200")}>AI Assistant</Link>
                 <Button variant={"secondary"} size="sm" className={cn("retro-button", headerClasses.includes("bg-primary") && "!border-primary-foreground !text-primary-foreground hover:!bg-primary-foreground/10")} onClick={handleSignOut}>
                     <LogOut className="mr-1 h-4 w-4"/> Sign Out
                 </Button>
             </>
          )}
           {!isAuthenticated && ( // Links for unauthenticated users
               <>
                  {isLandingPage ? (
                    <>
                      {/* Landing page specific nav items */}
                      <Link href="/#services" className={navLinkClasses(pathname === '/#services')}>Discover</Link>
                      <Link href="/#why-fintrack" className={navLinkClasses(pathname === '/#why-fintrack')}>Features</Link>
                      <Link href="/#pricing" className={navLinkClasses(pathname === '/#pricing')}>Pricing</Link>
                      <Link href="/about" className={navLinkClasses(pathname === '/about')}>About</Link> {/* Example "About" link */}
                      <div className="flex items-center gap-x-2 lg:gap-x-3 ml-auto">
                        <Link href="/login" passHref>
                           <Button variant="link" className="text-white hover:underline px-3 py-1.5 text-sm font-medium">Log in</Button>
                        </Link>
                        <Link href="/get-started" passHref>
                           <Button className="bg-pink-500 hover:bg-pink-600 text-white rounded-md px-4 py-1.5 text-sm font-semibold retro-button !border-pink-500 shadow-none hover:!shadow-none">
                            Get Started
                           </Button>
                        </Link>
                      </div>
                    </>
                  ) : (
                    // Links for other pages when unauthenticated (e.g. /login, /get-started)
                    // Typically, these pages might not have extensive navigation, or might redirect
                    // For now, let's show minimal nav or allow header to adapt if needed
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
                 className={cn("retro-button !shadow-none h-8 w-8", (isLandingPage && !isAuthenticated) ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-primary-foreground text-primary-foreground hover:bg-primary/80")}
               >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
               side="left"
               className={cn("w-[280px] retro-window !rounded-none !p-0", (isLandingPage && !isAuthenticated) ? "bg-black !border-gray-700 text-white" : "bg-amber-50 !border-black text-black" )}
            >
                <div className={cn("retro-window-header p-3", (isLandingPage && !isAuthenticated) ? "!bg-gray-800 !text-white !border-gray-700" : "!bg-yellow-400 !text-black !border-black")}>
                   <SheetTitle>
                        <span className="text-lg font-sans font-semibold">Fin.Co Menu</span>
                   </SheetTitle>
                   <div className="retro-window-controls">
                       <span className={cn((isLandingPage && !isAuthenticated) ? "!border-gray-500 !bg-gray-700" : "!border-black !bg-yellow-400")}></span>
                       <span className={cn((isLandingPage && !isAuthenticated) ? "!border-gray-500 !bg-gray-700" : "!border-black !bg-yellow-400")}></span>
                       <SheetClose asChild>
                         <Button variant="ghost" size="icon" className={cn("h-4 w-4 p-0 !shadow-none !bg-red-500 !text-white hover:!bg-red-600", (isLandingPage && !isAuthenticated) ? "!border-gray-500" : "!border-black")}>
                            <X className="h-3 w-3"/>
                            <span className="sr-only">Close</span>
                         </Button>
                       </SheetClose>
                   </div>
                </div>
               <nav className={cn("grid gap-3 text-base font-medium p-4 retro-window-content", (isLandingPage && !isAuthenticated) ? "!border-gray-700" : "!border-black")}>
                 {isAuthenticated ? (
                     <>
                        <Link href="/dashboard" className={mobileNavLinkClasses}>Dashboard</Link>
                        <Link href="/budget" className={mobileNavLinkClasses}>Budget</Link>
                        <Link href="/expenses" className={mobileNavLinkClasses}>Expenses</Link>
                        <Link href="/savings-goals" className={mobileNavLinkClasses}>Savings Goals</Link>
                        <Link href="/investments" className={mobileNavLinkClasses}>Investments</Link>
                        <Link href="/emergency-fund" className={mobileNavLinkClasses}>Emergency Fund</Link>
                        <Link href="/tax-planner" className={mobileNavLinkClasses}>Tax Planner</Link>
                        <Link href="/ai-assistant" className={cn(mobileNavLinkClasses, "text-yellow-600 hover:text-yellow-500")}>AI Assistant</Link>
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
                              <Link href="/#services" className={mobileLandingUnauthNavLinkClasses}>Discover</Link>
                              <Link href="/#why-fintrack" className={mobileLandingUnauthNavLinkClasses}>Features</Link>
                              <Link href="/#pricing" className={mobileLandingUnauthNavLinkClasses}>Pricing</Link>
                              <Link href="/about" className={pathname === '/about' ? mobileLandingUnauthActiveNavLinkClasses : mobileLandingUnauthNavLinkClasses}>About</Link>
                              <div className="flex flex-col gap-3 mt-6">
                                <Link href="/login" passHref>
                                    <Button variant="outline" className="w-full retro-button !text-white !border-gray-500 hover:!bg-gray-700">Log in</Button>
                                </Link>
                                 <Link href="/get-started" passHref>
                                    <Button variant="default" className="w-full retro-button bg-pink-500 hover:bg-pink-600 text-white border-pink-500">Get Started</Button>
                                </Link>
                              </div>
                            </>
                         ) : (
                            // Fallback for non-landing, unauthenticated pages like /login
                            <div className="flex flex-col gap-3 mt-6">
                                <Link href="/login" passHref>
                                    <Button variant="outline" className="w-full retro-button border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black">Login</Button>
                                </Link>
                                 <Link href="/get-started" passHref>
                                    <Button variant="default" className="w-full retro-button bg-yellow-400 hover:bg-yellow-500 text-black">Register</Button>
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

    