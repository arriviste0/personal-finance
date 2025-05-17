
'use client';

import Link from "next/link";
import { CircleDollarSign, Menu, X, Banknote, LogOut, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
<<<<<<< HEAD
import { useToast } from "@/hooks/use-toast";
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { toast } = useToast();
    const { data: session, status } = useSession();
=======
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { usePathname } from "next/navigation";

export default function Header() {
    const { toast } = useToast(); // This hook requires the component to be a Client Component
>>>>>>> deaed6c2b62230c74a89b23bbff50f9822168177
    const pathname = usePathname();

    const handleLinkAccount = () => {
        toast({
            title: "Bank Account Linking (Placeholder)",
            description: "This would normally launch a secure bank linking process.",
        });
    };

<<<<<<< HEAD
    const handleSignOut = async () => {
        await signOut({ redirect: true, callbackUrl: '/' });
    };

    const isLandingPage = pathname === '/';
    const isAuthenticated = status === 'authenticated';

    const headerClasses = isLandingPage && !isAuthenticated
        ? "sticky top-0 z-50 w-full bg-black text-white shadow-md"
        : "sticky top-0 z-50 w-full border-b-2 border-foreground bg-primary text-primary-foreground";

    const navLinkClasses = (href: string, isMobile: boolean = false) => {
        // More robust active check: exact match or startsWith for sections
        const isActive = pathname === href || (href.startsWith("/#") && pathname === href) || (href === "/about" && pathname.startsWith("/about"));

        if (isLandingPage && !isAuthenticated) {
            if (isMobile) {
                 if (isActive && (href === "/about" || href.startsWith("/#"))) {
                    return "bg-white text-black rounded-md py-2 px-3 block text-base font-medium transition-colors";
                 }
                 return "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md py-2 px-3 block text-base font-medium transition-colors";
            }
            // Desktop specific styling for landing unauthenticated
            let baseClasses = "inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium transition-colors duration-150 ease-in-out ";
            if (isActive && (href === "/about" || href.startsWith("/#"))) {
                return baseClasses + "bg-white text-black rounded-md";
            }
            // Ensure hover effect for rounded corners, white background, and black text
            return baseClasses + "text-white hover:bg-white hover:text-black hover:rounded-md";
        }

        // Default app links styling (authenticated or non-landing pages)
        if (isMobile) {
            return cn(
                "text-foreground hover:underline hover:text-primary underline-offset-2 py-1.5 block font-sans",
                isActive && "text-primary underline font-semibold"
            );
        }
        return cn(
            "font-medium text-primary-foreground/80 hover:text-primary-foreground hover:underline underline-offset-2 font-sans",
            isActive && "text-primary-foreground underline font-semibold"
        );
    };


  return (
     <header className={headerClasses}>
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 sm:px-6 lg:px-8 relative">
        <Link href="/" className="flex items-center space-x-2 no-underline">
           <CircleDollarSign className={cn("h-7 w-7", (isLandingPage && !isAuthenticated) ? "text-white" : "text-primary-foreground")} />
           <span className={cn("font-sans text-xl font-bold", (isLandingPage && !isAuthenticated) ? "text-white" : "text-primary-foreground")}>Fin.Co</span>
        </Link>

        {/* Desktop Navigation - Centered for landing unauthenticated */}
        {isLandingPage && !isAuthenticated && (
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <nav className="flex items-center gap-x-1 lg:gap-x-2 text-sm">
              <Link href="/#services" className={navLinkClasses('/#services', false)}>Discover</Link>
              <Link href="/about" className={navLinkClasses('/about', false)}>About</Link>
              <Link href="/#why-fintrack" className={navLinkClasses('/#why-fintrack', false)}>Features</Link>
              <Link href="/#pricing" className={navLinkClasses('/#pricing', false)}>Pricing</Link>
            </nav>
          </div>
        )}

        <nav className={cn("hidden md:flex items-center ml-auto", // ml-auto to push auth buttons to right
                           (isLandingPage && !isAuthenticated) ? "gap-x-2" : "gap-x-3 lg:gap-x-4 text-sm")}>
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
                    <div className="flex items-center gap-x-2">
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center text-white border border-white rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                           Log in
                        </Link>
                        <Link href="/get-started" passHref>
                           <Button
                             className="bg-pink-500 hover:bg-pink-600 text-white rounded-md px-4 py-1.5 text-sm font-semibold border-0 shadow-none transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                           >
                            Get Started
                           </Button>
                        </Link>
                      </div>
                  ) : (
                     <div className="flex items-center gap-x-2">
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

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden ml-auto"> {/* ml-auto ensures it's to the right of other content (like centered nav) */}
=======
    const navLinks = [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/budget", label: "Budget" },
      { href: "/expenses", label: "Expenses" },
      { href: "/savings-goals", label: "Saving" },
      { href: "/investments", label: "Investments" },
      { href: "/emergency-fund", label: "Emergency" },
      { href: "/tax-planner", label: "Tax" },
      { href: "/ai-assistant", label: "AI" },
    ];

  return (
     <header className="sticky top-0 z-50 w-full bg-black border-b border-black">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center font-extrabold text-2xl tracking-tight text-white uppercase" style={{fontFamily: 'inherit'}}>
          FINTRACK
        </Link>

        {/* Centered Navigation */}
        <nav className="hidden md:flex flex-1 justify-center gap-8 text-base">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`no-underline font-medium text-white px-4 py-1 transition-colors relative
                ${pathname === link.href ? 'border border-white rounded-full' : 'hover:border hover:border-white hover:rounded-full'}
                group
              `}
              style={{lineHeight: '2.5rem'}}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right-aligned Auth Buttons */}
        <div className="hidden md:flex items-center gap-0 min-w-[220px] justify-end">
          <Link href="/login" className="no-underline text-white font-medium px-6 py-2 hover:underline transition-colors">Log in</Link>
          <div className="h-8 w-px bg-white/20 mx-2" />
          <Link href="/signup">
            <Button className="bg-pink-400 hover:bg-pink-500 text-black font-semibold px-7 py-2 rounded-none transition-all shadow-none border-none">Start selling</Button>
          </Link>
        </div>

        {/* Mobile Navigation (hamburger menu) */}
        <div className="md:hidden">
>>>>>>> deaed6c2b62230c74a89b23bbff50f9822168177
          <Sheet>
            <SheetTrigger asChild>
              <Button
                 variant="outline"
                 size="icon"
<<<<<<< HEAD
                 className={cn(
                    "retro-button !shadow-none h-8 w-8",
                    (isLandingPage && !isAuthenticated) ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md" : "border-primary-foreground text-primary-foreground hover:bg-primary/80"
                 )}
=======
                 className="border-white text-white hover:bg-white/10 !shadow-none h-9 w-9 bg-black"
>>>>>>> deaed6c2b62230c74a89b23bbff50f9822168177
               >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
               side="left"
<<<<<<< HEAD
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
                 {isAuthenticated ? (
                     <>
                        <SheetClose asChild><Link href="/dashboard" className={navLinkClasses('/dashboard', true)}>Dashboard</Link></SheetClose>
                        <SheetClose asChild><Link href="/budget" className={navLinkClasses('/budget', true)}>Budget</Link></SheetClose>
                        <SheetClose asChild><Link href="/expenses" className={navLinkClasses('/expenses', true)}>Expenses</Link></SheetClose>
                        <SheetClose asChild><Link href="/savings-goals" className={navLinkClasses('/savings-goals', true)}>Savings Goals</Link></SheetClose>
                        <SheetClose asChild><Link href="/investments" className={navLinkClasses('/investments', true)}>Investments</Link></SheetClose>
                        <SheetClose asChild><Link href="/emergency-fund" className={navLinkClasses('/emergency-fund', true)}>Emergency Fund</Link></SheetClose>
                        <SheetClose asChild><Link href="/tax-planner" className={navLinkClasses('/tax-planner', true)}>Tax Planner</Link></SheetClose>
                        <SheetClose asChild><Link href="/ai-assistant" className={cn(navLinkClasses('/ai-assistant', true), (isLandingPage && !isAuthenticated) ? "text-pink-400 hover:text-pink-300" : "text-yellow-600 hover:text-yellow-500")}>AI Assistant</Link></SheetClose>
                        <SheetClose asChild>
                            <Button variant="outline" className="w-full retro-button border-green-500 text-green-600 mt-4" onClick={handleLinkAccount}>
                                 <Banknote className="mr-2 h-4 w-4"/> Link Bank Account
                            </Button>
                        </SheetClose>
                         <SheetClose asChild>
                            <Button variant="destructive" size="sm" className="retro-button mt-2" onClick={handleSignOut}>
                                 <LogOut className="mr-2 h-4 w-4"/> Sign Out
                            </Button>
                         </SheetClose>
                    </>
                 ) : (
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
                                    className="inline-flex items-center justify-center text-white border border-white rounded-md py-2 px-3 block text-base font-medium transition-colors hover:bg-white hover:text-black"
                                >
                                    Log in
                                </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                 <Link href="/get-started" passHref>
                                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-md py-2 text-base font-semibold border-0 shadow-none">
                                        Get Started
                                    </Button>
                                </Link>
                                </SheetClose>
                              </div>
                            </>
                         ) : (
                            <div className="flex flex-col gap-3 mt-6 pt-4 border-t border-border">
                                <SheetClose asChild>
                                <Link href="/login" passHref>
                                    <Button variant="outline" className="w-full retro-button">Login</Button>
                                </Link>
                                </SheetClose>
                                <SheetClose asChild>
                                 <Link href="/get-started" passHref>
                                    <Button variant="default" className="w-full retro-button">Register</Button>
                                </Link>
                                </SheetClose>
                             </div>
                         )}
                     </>
                 )}
              </nav>
=======
               className="w-[250px] bg-black text-white p-0"
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                   <span className="text-lg font-extrabold tracking-tight uppercase">FINTRACK</span>
                   <SheetClose asChild>
                     <Button variant="ghost" size="icon" className="h-6 w-6 p-0 !shadow-none !border-none !bg-transparent !text-white hover:!bg-white/10">
                        <X className="h-5 w-5"/>
                        <span className="sr-only">Close</span>
                     </Button>
                   </SheetClose>
                </div>
               <nav className="grid gap-2 text-lg font-medium p-4">
                 {navLinks.map(link => (
                   <Link
                     key={link.href}
                     href={link.href}
                     className={`no-underline px-3 py-2 rounded ${pathname === link.href ? 'border border-white rounded-full' : 'hover:border hover:border-white hover:rounded-full'} group relative`}
                   >
                     {link.label}
                   </Link>
                 ))}
                 <div className="border-t border-white/10 my-2"></div>
                 <Link href="/login" className="no-underline hover:underline px-3 py-2">Log in</Link>
                 <div className="h-8 w-px bg-white/20 my-2" />
                 <Link href="/signup">
                   <Button className="bg-pink-400 hover:bg-pink-500 text-black font-semibold w-full mt-2 rounded-none">Start selling</Button>
                 </Link>
               </nav>
>>>>>>> deaed6c2b62230c74a89b23bbff50f9822168177
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

