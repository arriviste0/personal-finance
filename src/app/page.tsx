
'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  DollarSign,
  PiggyBank,
  Landmark,
  Lightbulb,
  ShieldAlert,
  PlusCircle,
  ArrowRight,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
  Mail,
  Send,
  Package,
  BrainCircuit,
  ShieldCheck,
  LayoutGrid,
  Wallet,
  ListChecks,
  Target,
  TrendingUp,
  FileText,
  CircleDollarSign,
  Users,
  Briefcase,
  Zap,
  Star,
  BarChart3,
  Receipt,
  CreditCard,
  Activity,
  Award,
  Settings,
  Users2,
  BookOpen,
  Server,
  Rocket,
  CheckCircle,
  DollarSign as DollarSignIcon, // Aliased to avoid conflict with the variable
  BarChartBig,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Cloud,
  GraduationCap,
  HandCoins,
  MessageCircle,
  Phone,
  User as UserIcon,
  Asterisk // Used as fallback
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Helper component for consistent section wrapping
interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  id?: string;
  containerClassName?: string;
  addShapes?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className, bgClassName = "bg-wz-light-bg", id, containerClassName = "container-default", addShapes = false }) => {
  return (
    <section id={id} className={cn("section-padding relative overflow-hidden", bgClassName, className)}>
      {addShapes && (
        <>
          <motion.div
            className="absolute top-1/4 left-10 w-32 h-32 bg-wz-pink/30 rounded-full filter blur-2xl opacity-50 -z-10"
            animate={{ scale: [1, 1.1, 1.05, 1.1, 1], rotate: [0, 5, -5, 5, 0], x: [0, 10, -10, 10, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-10 w-40 h-40 bg-wz-yellow/30 rounded-full filter blur-2xl opacity-50 -z-10"
            animate={{ scale: [1, 1.2, 1.1, 1.2, 1], y: [0, -15, 10, -15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
           <motion.div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-wz-green/20 rounded-full filter blur-xl opacity-40 -z-10"
            animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}
      <div className={cn(containerClassName, "relative z-10")}>
        {children}
      </div>
    </section>
  );
};

const coreServices = [
  { icon: LayoutGrid, title: "Dashboard", description: "Central hub for your financial overview.", href: "/dashboard", bgColor: "bg-wz-green", textColor: "text-wz-text-dark" },
  { icon: Wallet, title: "Budget", description: "Create and manage your monthly budgets.", href: "/budget", bgColor: "bg-wz-pink", textColor: "text-wz-text-dark" },
  { icon: ListChecks, title: "Expenses", description: "Log and categorize all your spending.", href: "/expenses", bgColor: "bg-wz-purple", textColor: "text-wz-text-dark" },
  { icon: Target, title: "Goals", description: "Set and achieve your financial targets.", href: "/savings-goals", bgColor: "bg-wz-yellow", textColor: "text-wz-text-dark" },
  { icon: TrendingUp, title: "Invest", description: "Monitor and grow your investments.", href: "/investments", bgColor: "bg-wz-green", textColor: "text-wz-text-dark" },
  { icon: ShieldAlert, title: "Safety", description: "Build your financial safety net.", href: "/emergency-fund", bgColor: "bg-wz-pink", textColor: "text-wz-text-dark" },
  { icon: FileText, title: "Taxes", description: "Estimate and prepare for your taxes.", href: "/tax-planner", bgColor: "bg-wz-yellow", textColor: "text-wz-text-dark" },
  { icon: Lightbulb, title: "AI", description: "Get smart financial insights.", href: "/ai-assistant", bgColor: "bg-wz-purple", textColor: "text-wz-text-dark" },
];

const whyFinCoItems = [
  {
    icon: Package,
    title: "All-In-One Simplicity",
    description: "Budgeting, expenses, goals, investments, and taxes – everything seamlessly integrated. No more app-hopping!",
    bgColorClass: "card-wz-pink"
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Brilliance",
    description: "Our intelligent assistant offers personalized insights, automates tasks, and helps you make smarter financial decisions.",
    bgColorClass: "card-wz-green"
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description: "Bank-level security to protect your data. Clear, honest features with no hidden fees.",
    bgColorClass: "card-wz-purple"
  }
];


export default function LandingPage() {
  useEffect(() => {
    document.body.classList.add('wzuh-landing-page');
    document.body.classList.remove('nb-landing-page'); // Ensure neo-brutalism is off
    return () => {
      document.body.classList.remove('wzuh-landing-page');
    };
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-wz-light-bg text-wz-text-dark">
      <main className="flex-grow">
        {/* Hero Section */}
        <SectionWrapper bgClassName="bg-wz-green" id="hero" addShapes>
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(80vh)] md:min-h-[calc(70vh)] pt-16 pb-10 md:pt-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-wz-text-dark leading-tight font-heading">
                Master Your <br className="hidden md:inline" />Financial Goals
              </h1>
              <p className="text-lg md:text-xl text-wz-gray-text mb-10 max-w-lg">
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
              transition={{ duration: 0.7, delay: 0.4 }}
              className="relative hidden lg:flex justify-center items-center"
            >
              <Image
                src="https://placehold.co/500x550.png"
                alt="FinCo app illustration"
                width={500}
                height={550}
                className="rounded-2xl shadow-lg object-cover border-4 border-wz-border-dark"
                data-ai-hint="finance app planning"
              />
              <Sparkles className="absolute -top-8 -left-8 h-16 w-16 text-wz-pink opacity-70 animate-pulse" />
              <Sparkles className="absolute -bottom-5 -right-5 h-12 w-12 text-wz-yellow opacity-70 animate-pulse delay-500" />
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Partners Section */}
         <section className="py-3 bg-wz-pink border-y-2 border-wz-border-dark">
          <div className="partner-slider-container">
            <div className="partner-slider-track">
              {["Plaid", "Yodlee", "Stripe", "Visa", "Mastercard", "PayPal", "American Express", "Plaid", "Yodlee", "Stripe", "Visa", "Mastercard", "PayPal", "American Express"].map((partner, i) => (
                <div key={i} className="flex items-center space-x-12 md:space-x-16 lg:space-x-20 px-6">
                  <span className="text-2xl font-bold text-wz-text-dark/80 hover:text-wz-text-dark transition-colors whitespace-nowrap">
                    {partner}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Smart People Choose Fin.Co Section */}
        <SectionWrapper id="why-finco" bgClassName="bg-wz-light-bg">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-wz-text-dark font-heading inline-block relative">
              Why Smart People Choose Fin.Co
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-wz-yellow/80 -z-10 translate-y-1.5"></span>
            </h2>
            <p className="text-lg text-wz-gray-text max-w-xl mx-auto mt-5">
              We're not just another finance app. We're your dedicated partner in achieving financial freedom.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyFinCoItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className={cn(
                    "card-wz p-8 text-center hover:bg-wz-pink group transition-all duration-300",
                    item.bgColorClass // Base background color
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex justify-center mb-5">
                    <div className={cn("p-3 bg-white/40 rounded-full group-hover:bg-white/60 transition-colors duration-300")}>
                      <IconComponent className="h-10 w-10 text-wz-text-dark group-hover:text-wz-text-dark" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-heading mb-3 text-wz-text-dark">{item.title}</h3>
                  <p className="text-sm text-wz-text-dark/90 group-hover:text-wz-text-dark">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </SectionWrapper>

        {/* FinCo's Core Features Section (Replaces "FinCo for every occasion") */}
        <SectionWrapper id="core-features" bgClassName="bg-wz-green/50">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-wz-text-dark font-heading inline-block relative">
              FinCo's Core Features
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-wz-pink/70 -z-10 translate-y-1.5"></span>
            </h2>
            <p className="text-lg text-wz-gray-text max-w-xl mx-auto mt-5">
              Select the financial tool you need to start planning and achieving your dreams.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {coreServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Link key={service.title} href={service.href} className="block group relative no-underline">
                  <div
                    className={cn(
                      "p-8 h-full flex flex-col items-center justify-between min-h-[450px] relative border-2 border-wz-border-dark",
                      service.bgColor,
                      service.textColor,
                      "hover:brightness-110 transition-all duration-200"
                    )}
                  >
                    <div className="absolute top-2 left-2 flex gap-0.5"> <Sparkles className="h-3 w-3 opacity-50" /> <Sparkles className="h-3 w-3 opacity-50 delay-75" /> </div>
                    <div className="absolute top-2 right-2 flex gap-0.5"> <Sparkles className="h-3 w-3 opacity-50" /> <Sparkles className="h-3 w-3 opacity-50 delay-100" /> </div>
                    <div className="absolute bottom-2 left-2 flex gap-0.5"> <Sparkles className="h-3 w-3 opacity-50" /> <Sparkles className="h-3 w-3 opacity-50 delay-150" /> </div>
                    <div className="absolute bottom-2 right-2 flex gap-0.5"> <Sparkles className="h-3 w-3 opacity-50" /> <Sparkles className="h-3 w-3 opacity-50 delay-200" /> </div>

                    <div className="flex-grow flex flex-col items-center justify-center py-4 text-center w-full">
                        <div className="mb-5 p-4 bg-white/40 rounded-full group-hover:scale-110 transition-transform duration-300">
                            {ServiceIcon && <ServiceIcon className="h-10 w-10" />}
                        </div>
                        <Image
                            src={`https://placehold.co/320x220.png`}
                            alt={service.title}
                            width={320}
                            height={220}
                            className="rounded-lg object-cover border-2 border-wz-border-dark/30 group-hover:scale-105 transition-transform duration-300 mb-4"
                            data-ai-hint={`${service.title.toLowerCase().replace(/\s+/g, '-')}-illustration finance`}
                        />
                        <h3 className="text-xl font-bold font-heading mt-2">{service.title}</h3>
                         <p className={cn("text-sm mt-2 px-2", service.textColor === "text-wz-text-dark" ? "text-wz-text-dark/80" : "text-wz-text-light/80")}>{service.description}</p>
                    </div>
                    <Button className="btn-wz btn-wz-outline-dark mt-auto text-sm !py-2 !px-4 !shadow-wz-hard-sm">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              );
            })}
          </div>
        </SectionWrapper>

         {/* "Ready to Start Your Financial Journey?" CTA Section */}
         <SectionWrapper id="cta-journey" bgClassName="bg-wz-light-bg" addShapes>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-wz-text-dark font-heading">Ready to Start Your Financial Journey?</h2>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto items-center">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 retro-input !bg-white !border-wz-border-dark !text-wz-text-dark placeholder:text-wz-gray-text/90 focus:!ring-wz-pink focus:!border-wz-pink !py-3 !px-4 !rounded-full"
                suppressHydrationWarning={true}
              />
              <Button type="submit" className="btn-wz btn-wz-pink !py-3 !px-5" suppressHydrationWarning={true}>
                Subscribe <Send className="ml-2 h-4 w-4"/>
              </Button>
            </form>
          </div>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <footer className="bg-wz-text-dark text-wz-text-light/80 py-8 border-t-4 border-wz-pink rounded-t-2xl">
        <div className="container-default">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left: Copyright */}
            <p className="text-xs text-wz-text-light/70">
              © {new Date().getFullYear()} FinCo. All Rights Reserved.
            </p>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center space-x-2 no-underline">
              <Sparkles className="h-7 w-7 text-wz-pink" />
              <span className="text-2xl font-bold font-heading text-wz-text-light">FinCo</span>
            </Link>

            {/* Right: Legal Links */}
            <div className="flex items-center space-x-6">
              <Link href="/terms" className="text-xs text-wz-text-light/70 hover:text-wz-pink transition-colors no-underline">
                Terms & Agreements
              </Link>
              <Link href="/privacy" className="text-xs text-wz-text-light/70 hover:text-wz-pink transition-colors no-underline">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
