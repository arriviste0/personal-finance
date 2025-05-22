
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CircleDollarSign,
  Wallet,
  ListChecks,
  Target,
  TrendingUp,
  ShieldAlert,
  FileText,
  Lightbulb,
  Sparkles,
  ArrowRight,
  Package,
  BrainCircuit,
  ShieldCheck,
  LayoutGrid,
  Home,
  Briefcase,
  Settings,
  Users,
  DollarSign,
  BarChart3,
  Receipt,
  BookOpen,
  Server,
  Rocket,
  Award,
  Mail as MailIcon,
  Phone,
  MessageCircle,
  Send,
  User as UserIcon,
  ShoppingCart,
  Search,
  Filter as FilterIcon,
  Tag,
  Clock,
  Youtube,
  Facebook,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  CheckCircle as CheckCircleIcon,
  BarChartBig as BarChartBigIcon,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Landmark,
  HandCoins,
  PiggyBank,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  id?: string;
  containerClassName?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className, bgClassName = "", id, containerClassName = "container-default" }) => {
  return (
    <section id={id} className={cn("section-padding relative overflow-hidden", bgClassName, className)}>
      <div className={cn(containerClassName, "relative z-10")}>
        {children}
      </div>
      {/* Optional: Abstract shapes for background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30" aria-hidden="true">
        {/* Example shape - you can add more and position them */}
        {/* <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-nft-pink/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-nft-yellow/30 rounded-lg blur-2xl transform rotate-45"></div> */}
      </div>
    </section>
  );
};


interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  bgColorClass: string;
  textColorClass: string;
  tags?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, href, bgColorClass, textColorClass, tags }) => {
  return (
    <div className={cn("p-6 rounded-xl border-2 border-wz-border-dark shadow-wz-hard-sm h-full flex flex-col group transition-all duration-300", bgColorClass, textColorClass)}>
      <Icon className="h-10 w-10 mb-4" />
      <h3 className="text-xl font-bold mb-2 font-heading">{title}</h3>
      <p className="text-sm opacity-90 mb-4 flex-grow">{description}</p>
      {tags && tags.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-semibold mb-1">Popular tags:</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <span key={tag} className="text-xs bg-black/10 text-inherit px-2 py-0.5 rounded-full border border-black/20 group-hover:bg-black/20 group-hover:border-black/30 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      <Button asChild variant="outline" className="btn-wz btn-wz-outline-dark mt-auto self-start !text-sm !py-2 !px-4">
        <Link href={href}>
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};


export default function LandingPage() {
  const coreServices = [
    { icon: LayoutGrid, title: "Dashboard", description: "Your financial command center.", href: "/dashboard", bgColorClass: "bg-wz-green", textColorClass: "text-wz-text-dark", tags: ["Overview", "Metrics"] },
    { icon: Wallet, title: "Budget", description: "Plan and manage your monthly budgets.", href: "/budget", bgColorClass: "bg-wz-pink", textColorClass: "text-wz-text-dark", tags: ["Tracking", "Savings"] },
    { icon: ListChecks, title: "Expenses", description: "Log and categorize all your spending.", href: "/expenses", bgColorClass: "bg-wz-purple", textColorClass: "text-wz-text-dark", tags: ["Reports", "Categories"] },
    { icon: Target, title: "Goals", description: "Set and achieve your financial targets.", href: "/savings-goals", bgColorClass: "bg-wz-yellow", textColorClass: "text-wz-text-dark", tags: ["Vacation", "Emergency"] },
    { icon: TrendingUp, title: "Invest", description: "Monitor and grow your investments.", href: "/investments", bgColorClass: "bg-wz-green", textColorClass: "text-wz-text-dark", tags: ["Stocks", "Growth"] },
    { icon: ShieldAlert, title: "Safety", description: "Build your financial safety net.", href: "/emergency-fund", bgColorClass: "bg-wz-pink", textColorClass: "text-wz-text-dark", tags: ["Secure", "Protection"] },
    { icon: FileText, title: "Taxes", description: "Estimate and prepare for your taxes.", href: "/tax-planner", bgColorClass: "bg-wz-yellow", textColorClass: "text-wz-text-dark", tags: ["Estimates", "Planning"] },
    { icon: Lightbulb, title: "AI", description: "Get smart financial insights.", href: "/ai-assistant", bgColorClass: "bg-wz-purple", textColorClass: "text-wz-text-dark", tags: ["Tips", "Automation"] },
  ];

  const partners = ["Plaid", "Yodlee", "Stripe", "Visa", "Mastercard", "American Express", "Google Pay", "Wise"];

  const whyChooseItems = [
    {
      icon: Package,
      title: "All-In-One Simplicity",
      description: "Budgeting, expenses, goals, investments, and taxes – everything seamlessly integrated. No more app-hopping!",
    },
    {
      icon: BrainCircuit,
      title: "AI-Powered Brilliance",
      description: "Our intelligent assistant offers personalized insights, automates tasks, and helps you make smarter financial decisions.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Transparent",
      description: "Bank-level security to protect your data. Clear, honest features with no hidden fees.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-wz-light-bg text-wz-text-dark">
      <main className="flex-grow">
        {/* Hero Section */}
        <SectionWrapper bgClassName="bg-wz-green !pt-20 md:!pt-28 lg:!pt-32 !pb-12 md:!pb-16" id="hero">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-wz-text-dark leading-tight font-heading">
                Master Your <br className="hidden md:inline" />Financial Goals
              </h1>
              <p className="text-lg md:text-xl text-wz-gray-text mb-8 max-w-lg">
                FinCo empowers you to track income, budget smarter, save with purpose, and grow your wealth through intuitive tools and AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="btn-wz btn-wz-pink">
                  <Link href="/get-started">Start Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex justify-center items-center"
            >
              <Image
                src="https://placehold.co/500x550.png"
                alt="FinCo app illustration"
                width={500}
                height={550}
                className="rounded-2xl shadow-lg object-cover border-4 border-wz-border-dark"
                data-ai-hint="finance app tablet"
              />
              <Sparkles className="absolute -top-8 -left-8 h-16 w-16 text-wz-pink opacity-70 animate-pulse" />
              <Sparkles className="absolute -bottom-5 -right-5 h-12 w-12 text-wz-yellow opacity-70 animate-pulse delay-500" />
            </motion.div>
          </div>
        </SectionWrapper>

         {/* Partners Section */}
         <section className="py-4 bg-wz-pink border-y-2 border-wz-border-dark">
           <div className="container-default">
             <div className="partner-slider-container">
               <div className="partner-slider-track">
                 {[...partners, ...partners].map((partner, i) => (
                  <div key={i} className="flex items-center space-x-12 md:space-x-16 lg:space-x-20 px-6">
                     <span className="text-2xl font-bold text-wz-text-dark/80 hover:text-wz-text-dark transition-colors whitespace-nowrap">
                       {partner}
                     </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Fin.Co Section */}
        <SectionWrapper id="why-finco" bgClassName="bg-wz-light-bg">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-wz-text-dark font-heading mb-4">Why Smart People Choose Fin.Co</h2>
            <p className="text-lg text-wz-gray-text max-w-2xl mx-auto">
              We're not just another finance app. We're your dedicated partner in achieving financial freedom.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyChooseItems.map((item) => (
              <motion.div
                key={item.title}
                className="p-6 bg-white rounded-xl border-2 border-wz-border-dark shadow-wz-hard-sm text-center group hover:bg-wz-pink transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <item.icon className="h-12 w-12 text-wz-yellow mx-auto mb-4 group-hover:text-wz-text-dark transition-colors duration-300" />
                <h3 className="text-xl font-bold text-wz-text-dark mb-2 font-heading">{item.title}</h3>
                <p className="text-sm text-wz-gray-text group-hover:text-wz-text-dark transition-colors duration-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>


        {/* "Get the Financial Future..." Section */}
        <SectionWrapper id="get-future" bgClassName="bg-transparent">
           <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="relative"
            >
              <Image
                src="https://placehold.co/550x450.png"
                alt="Happy person planning finances"
                width={550}
                height={450}
                className="rounded-2xl shadow-lg object-cover border-4 border-wz-border-dark"
                data-ai-hint="financial planning happy"
              />
               <Sparkles className="absolute -top-5 -right-5 h-12 w-12 text-wz-green opacity-70 animate-pulse" />
            </motion.div>
            <motion.div
                 initial={{ opacity: 0, x: 50 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-wz-text-dark mb-6 leading-tight font-heading">
                Get the Financial Future of Your Dreams
              </h2>
              <p className="text-lg text-wz-gray-text mb-6">
                FinCo simplifies complex financial decisions into clear, actionable steps. Stop dreaming, start achieving.
              </p>
              <p className="text-lg text-wz-gray-text mb-8 font-semibold">All it takes is three simple steps!</p>
              <Button asChild className="btn-wz btn-wz-pink">
                <Link href="/get-started">Start Planning Your Future <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Explore Our Core Features Section */}
        <SectionWrapper id="services" bgClassName="bg-wz-light-bg">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-wz-text-dark font-heading mb-4">Explore FinCo's Core Features</h2>
            <p className="text-lg text-wz-gray-text max-w-2xl mx-auto">
              From daily expense tracking to long-term investment planning, FinCo offers a comprehensive suite of tools designed for clarity and results.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
                bgColorClass={service.bgColorClass}
                textColorClass={service.textColorClass}
                tags={service.tags}
              />
            ))}
          </div>
        </SectionWrapper>

         {/* "Ready to Start?" CTA Section */}
         <SectionWrapper id="cta-download" bgClassName="bg-wz-light-bg">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-wz-text-dark font-heading">Ready to Start Your Financial Journey?</h2>
            <p className="text-lg text-wz-gray-text mb-8">
              Download the FinCo app today and take the first step towards financial clarity and freedom.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="btn-wz btn-wz-pink">
                    <Link href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 4-4 4-4 0-1.28-2.39-4-4-4-1.09 0-1.4.52-2.67.52S10.18 12 9 12s-1.78.45-2.9.45S4 11.12 4 10c0-1.57 1.5-3.42 3.5-3.42C9.36 6.58 10.31 8 11 8s1.64-1.42 3.5-1.42S18 8.43 18 10c0 .83-.77 1.36-1.42 2.14-.55.63-1.13 1.23-1.41 1.97-.06.15-.09.31-.09.47 0 .8.59 1.42 1.42 1.42.64 0 1.14-.29 1.5-.6.64-.54 1.24-1.19 1.81-1.77 .34-.36.6-.71.74-1.09.18-.44.19-1.76.19-1.76s0-3.91-2.62-5.31c-1.04-.56-2.2-.72-3.28-.56C13.37 3.29 12 4.65 12 4.65s-.88-1.26-2.5-1.26c-1.2 0-2.02.34-2.86.9C4.09 5.5 4 8.21 4 8.21s.02 2.63 1.38 4.05c.4.43.88.79 1.39.99.69.28 1.46.4 2.23.4.07 0 .14,0 .21-.01.09-.01.18-.02.28-.04.37-.06.74-.18 1.1-.36.1-.05.19-.1.29-.16.03-.02.05-.03.08-.05.08-.04.15-.09.23-.14.18-.11.36-.24.53-.38.54-.44 1.05-.94 1.48-1.48l.02-.02c.03-.04.06-.07.09-.11l.03-.03c.03-.04.07-.08.1-.12.15-.19.3-.4.44-.62.36-.56.65-1.17.85-1.79.15-.49.21-1 .21-1.49s-.06-1-.21-1.49c-.2-.62-.49-1.23-.85-1.79-.14-.22-.29-.43-.44-.62-.03-.04-.07-.08-.1-.12l-.03-.03c-.03-.04-.06-.07-.09-.11l-.02-.02c-.43-.54-.94-1.04-1.48-1.48A6.26 6.26 0 0 0 12 2.06c-1.5 0-2.75 1.06-4 1.06C5 3.12 4 7.12 4 7.12S2.72 10.02 2 10.47c-.64.41-1 1-1 1.79 0 .91.36 1.79 1 2.47.69.72 1.71 1.19 2.76 1.19.09 0 .19-.003.28-.006a4.449 4.449 0 0 0 1.6-.31c.3-.1.58-.22.85-.36.02-.01.03-.02.05-.03.11-.06.22-.13.33-.2.02-.01.03-.02.05-.03.08-.04.17-.09.25-.14.27-.16.54-.35.8-.56.36-.28.71-.6 1.03-.95.17-.18.34-.38.5-.58.16-.21.3-.43.44-.66.1-.15.18-.31.26-.47.11-.23.2-.47.28-.72.09-.27.14-.55.14-.84s-.05-.57-.14-.84c-.08-.25-.17-.49-.28-.72-.08-.16-.16-.32-.26-.47-.14-.23-.3-.45-.44-.66-.2-.38-.42-.73-.62-1.05-.27-.27-.55-.51-.85-.73A7.01 7.01 0 0 0 12 20.94z"></path></svg>
                        Get FinCo for iOS
                    </Link>
                </Button>
                <Button asChild className="btn-wz btn-wz-purple">
                    <Link href="#">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M21.5 8.38S22.28 7 22 5.5C21.78 4.35 20.84 3.78 19.5 3.55c-2.28-.4-4.5.88-6 2.08-1.23.98-2.21 2.21-2.76 3.63-.29.74-.48 1.51-.62 2.28C9.94 12.28 9.5 14 8.24 14S6.5 13.15 6.5 12.28c0-1.03.89-1.88 1.97-1.88H12c.55 0 1-.45 1-1s-.45-1-1-1H8.47C4.75 8.4 2 11.19 2 14.72c0 3.53 2.75 6.32 6.47 6.32H12c.55 0 1-.45 1-1s-.45-1-1-1h-3.53c-1.08 0-1.97-.84-1.97-1.87 0-.81.52-1.52 1.26-1.76.05-.02.1-.02.15-.02H12c1.26 0 2.5.72 2.76 2.24.14.77.33 1.54.62 2.28.55 1.42 1.53 2.65 2.76 3.63 1.5 1.2 3.72 2.48 6 2.08 1.34-.23 2.28-.8 2.5-1.95.28-1.5-.5-2.88-.5-2.88m-2.12-1.21c.87-.52 1.38-1.47 1.38-2.53 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 1.06.51 2.01 1.38 2.53M12 10.4c-2.28 0-4.5-.88-6-2.08"/></svg>
                         Get FinCo for Android
                    </Link>
                </Button>
            </div>
          </div>
        </SectionWrapper>

      </main>

      {/* Footer */}
      <footer className="bg-wz-text-dark text-wz-text-light/70 pt-16 pb-8 border-t-4 border-wz-pink">
        <div className="container-default">
          <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-8 mb-10 items-start">
            {/* Column 1: Logo & Subscription */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2 no-underline">
                <CircleDollarSign className="h-8 w-8 text-wz-pink" />
                <span className="text-2xl font-bold font-heading text-wz-text-light">FinCo</span>
              </Link>
              <p className="text-sm text-wz-text-light/80">Get weekly financial tips and FinCo updates straight to your inbox.</p>
              <form className="flex gap-2 max-w-sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="retro-input flex-1 !bg-wz-text-dark/50 !border-wz-gray-text/50 !text-wz-text-light placeholder:!text-wz-text-light/50 focus:!border-wz-pink !rounded-full"
                  suppressHydrationWarning={true}
                />
                <Button type="submit" className="btn-wz btn-wz-pink !py-3 !px-5" suppressHydrationWarning={true}>
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Column 2: Company Links */}
             <div>
              <h4 className="font-semibold text-wz-text-light mb-3 font-heading">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#services" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Features</Link></li>
                <li><Link href="#pricing" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Pricing</Link></li>
                <li><Link href="#about" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">About</Link></li>
                <li><Link href="/careers" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Jobs</Link></li>
              </ul>
            </div>

             {/* Column 3: Resources Links */}
             <div>
              <h4 className="font-semibold text-wz-text-light mb-3 font-heading">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#blog" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Blog</Link></li>
                <li><Link href="#contact" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Contact Support</Link></li>
                <li><Link href="/terms" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-wz-gray-text/30 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="text-wz-text-light/80">
              © {new Date().getFullYear()} FinCo. All Rights Reserved.
            </p>
            <div className="flex space-x-5 mt-4 sm:mt-0">
              <Link href="#" aria-label="Twitter" className="text-wz-text-light/80 hover:text-wz-pink transition-colors no-underline"><TwitterIcon className="h-5 w-5"/></Link>
              <Link href="#" aria-label="YouTube" className="text-wz-text-light/80 hover:text-wz-pink transition-colors no-underline"><Youtube className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Instagram" className="text-wz-text-light/80 hover:text-wz-pink transition-colors no-underline"><InstagramIcon className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Facebook" className="text-wz-text-light/80 hover:text-wz-pink transition-colors no-underline"><Facebook className="h-5 w-5"/></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Placeholder for AppleIcon and Store icon if not in lucide-react
const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.22 6.52c-.63-.01-1.78.47-2.42 1.2C14.21 8.39 14 9.13 14 9.13s-.27.92-1.16.92c-.81 0-1.29-.97-2.13-.97-.91 0-1.75.93-2.3.93-.57 0-1.25-.9-2.17-.88-.85.02-1.56.65-1.99 1.48-.91 1.73-.23 4.27.68 5.62.43.64 1.01 1.41 1.75 1.41.73 0 1-.48 1.91-.48.91 0 1.25.48 1.99.48.77 0 1.27-.74 1.68-1.4.5-.78.84-1.63.84-1.63s.22-.87 1.05-.87c.75 0 1.05.81 1.05.81s.32 1.44 1.26 2.13c.41.3.84.43 1.25.43.06 0 .11 0 .16-.01.7-.08 1.27-.56 1.56-1.15.38-.75.43-1.53.43-1.56-.01-.08-.07-2.06-1.27-3.1-.6-.51-1.33-.8-2.03-.81zM15.5 3c.68 0 1.29.54 1.48 1.19-.16.01-.32.02-.49.02-.77 0-1.48-.34-2.07-.97C14.04 3.22 14.73 3 15.5 3z" />
  </svg>
);

const Store = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21.5 8.38S22.28 7 22 5.5C21.78 4.35 20.84 3.78 19.5 3.55c-2.28-.4-4.5.88-6 2.08-1.23.98-2.21 2.21-2.76 3.63-.29.74-.48 1.51-.62 2.28C9.94 12.28 9.5 14 8.24 14S6.5 13.15 6.5 12.28c0-1.03.89-1.88 1.97-1.88H12c.55 0 1-.45 1-1s-.45-1-1-1H8.47C4.75 8.4 2 11.19 2 14.72c0 3.53 2.75 6.32 6.47 6.32H12c.55 0 1-.45 1-1s-.45-1-1-1h-3.53c-1.08 0-1.97-.84-1.97-1.87 0-.81.52-1.52 1.26-1.76.05-.02.1-.02.15-.02H12c1.26 0 2.5.72 2.76 2.24.14.77.33 1.54.62 2.28.55 1.42 1.53 2.65 2.76 3.63 1.5 1.2 3.72 2.48 6 2.08 1.34-.23 2.28-.8 2.5-1.95.28-1.5-.5-2.88-.5-2.88m-2.12-1.21c.87-.52 1.38-1.47 1.38-2.53 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 1.06.51 2.01 1.38 2.53M12 10.4c-2.28 0-4.5-.88-6-2.08"/>
  </svg>
);

const EthereumIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12.0001 0.666992L11.5584 1.48366L5.69175 11.417L12.0001 15.3337L18.3084 11.417L12.4417 1.48366L12.0001 0.666992Z" fill="currentColor"/>
    <path d="M12.0001 16.517L5.69175 12.3337L12.0001 23.3337L18.3084 12.3337L12.0001 16.517Z" fill="currentColor"/>
    <path d="M12.0001 15.3333L18.3084 11.4166L12.0001 7.58325V15.3333Z" fill="currentColor"/>
    <path d="M5.69141 11.4166L11.9997 15.3333V7.58325L5.69141 11.4166Z" fill="currentColor"/>
  </svg>
);

const VerifiedIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M22.5 12.0001C22.5 17.7991 17.799 22.5001 12 22.5001C6.201 22.5001 1.5 17.7991 1.5 12.0001C1.5 6.2011 6.201 1.50009 12 1.50009C17.799 1.50009 22.5 6.2011 22.5 12.0001Z" fill="currentColor"/>
    <path d="M10.2148 15.7716L7.43207 12.9841L6.20312 14.2116L10.2148 18.2284L18.7962 9.6423L17.5672 8.41479L10.2148 15.7716Z" fill="white"/>
  </svg>
);

    