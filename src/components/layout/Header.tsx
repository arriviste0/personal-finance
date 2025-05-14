'use client'; // Added 'use client' directive

import Link from "next/link";
import { CircleDollarSign, Menu, X, Banknote } from "lucide-react"; // Added Banknote
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast"; // Import useToast
import { usePathname } from "next/navigation";

export default function Header() {
    const { toast } = useToast(); // This hook requires the component to be a Client Component
    const pathname = usePathname();

    const handleLinkAccount = () => {
        // In a real application, initiate the Plaid Link flow here.
        // For this demo, show a success message using the toast.
        toast({
            title: "Bank Account Linking (Placeholder)",
            description: "This would normally launch a secure bank linking process.",
        });
    };

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
          <Sheet>
            <SheetTrigger asChild>
              <Button
                 variant="outline"
                 size="icon"
                 className="border-white text-white hover:bg-white/10 !shadow-none h-9 w-9 bg-black"
               >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
               side="left"
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
