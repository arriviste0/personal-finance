
'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles, // Used for Wzuh logo and decorative elements
  DollarSign,
  Banknote,
  PiggyBank,
  Landmark,
  TrendingUp,
  Lightbulb,
  ShieldAlert,
  PlusCircle,
  Package,
  BrainCircuit,
  ShieldCheck,
  ChevronRight,
  ListChecks,
  Target,
  FileText,
  Wallet,
  LayoutGrid,
  Mail,
  Youtube,
  Facebook,
  Twitter,
  Instagram,
  CircleDollarSign, // Added back
  Award,
  BarChartBig,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Cloud,
  CreditCard,
  GraduationCap,
  HandCoins,
  MessageCircle,
  Phone,
  Rocket,
  Send,
  Server,
  Settings,
  Users,
  Users2,
  BookOpen,
  ArrowRight, // Added ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
  { icon: LayoutGrid, title: "Dashboard", description: "Overview of your finances.", href: "/dashboard" },
  { icon: Wallet, title: "Budget", description: "Create & manage budgets effectively.", href: "/budget" },
  { icon: ListChecks, title: "Expenses", description: "Log and categorize all your spending.", href: "/expenses" },
  { icon: Target, title: "Goals", description: "Set and achieve your financial targets.", href: "/savings-goals" },
  { icon: TrendingUp, title: "Invest", description: "Monitor and grow your investments.", href: "/investments" },
  { icon: ShieldAlert, title: "Safety", description: "Build your financial safety net.", href: "/emergency-fund" },
  { icon: FileText, title: "Taxes", description: "Estimate and prepare for your taxes.", href: "/tax-planner" },
  { icon: Lightbulb, title: "AI", description: "Get smart financial insights.", href: "/ai-assistant" },
];

const serviceBgColors = ["bg-wz-pink", "bg-wz-green", "bg-wz-purple", "bg-wz-yellow"];


export default function LandingPage() {
  useEffect(() => {
    document.body.classList.add('wzuh-landing-page');
    return () => {
      document.body.classList.remove('wzuh-landing-page');
    };
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-wz-light-bg text-wz-text-dark">
      <main className="flex-grow">
        {/* Hero Section */}
        <SectionWrapper bgClassName="bg-wz-green" id="hero" addShapes>
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-120px)] pt-16 pb-10 md:pt-20">
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
                data-ai-hint="finance app tablet"
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

        {/* "FinCo's Core Features" Section */}
        <SectionWrapper id="core-features" bgClassName="bg-wz-light-bg">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-wz-text-dark font-heading inline-block relative">
              FinCo's Core Features
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-2 bg-wz-yellow/80 -z-10 translate-y-1.5"></span>
            </h2>
            <p className="text-lg text-wz-gray-text max-w-xl mx-auto mt-5">
              Select the financial tool you need to start planning and achieving your dreams.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
            {coreServices.map((service, index) => {
              const ServiceIcon = service.icon;
              const bgColor = serviceBgColors[index % serviceBgColors.length];
              const textColorClass = (bgColor === "bg-wz-yellow" || bgColor === "bg-wz-green") ? "text-wz-text-dark" : "text-wz-text-dark";

              return (
                <Link key={service.title} href={service.href} className="block group relative no-underline">
                  <div
                    className={cn(
                      "p-8 h-full flex flex-col items-center justify-between min-h-[450px] relative border-2 border-wz-border-dark",
                      bgColor,
                      textColorClass,
                      "hover:brightness-110 transition-all duration-200"
                    )}
                  >
                    <div className="absolute top-2 left-2 flex gap-0.5"> <Sparkles className="h-3 w-3 opacity-50" /> <Sparkles className="h-3 w-3 opacity-50 delay-75" /> </div>
                    <div className="absolute top-2 right-2 flex gap-0.5"> <Sparkles className="h-3 w-3 opacity-50" /> <Sparkles className="h-3 w-3 opacity-50 delay-100" /> </div>
                    <div className="absolute bottom-2 left-2 flex gap-0.5"> <Sparkles className="h-3 w-3 opacity-50" /> <Sparkles className="h-3 w-3 opacity-50 delay-150" /> </div>
                    <div className="absolute bottom-2 right-2 flex gap-0.5"> <Sparkles className="h-3 w-3 opacity-50" /> <Sparkles className="h-3 w-3 opacity-50 delay-200" /> </div>

                    <div className="flex-grow flex flex-col items-center justify-center py-4 text-center w-full">
                        <div className="mb-5 p-3 bg-white/40 rounded-full group-hover:scale-110 transition-transform duration-300">
                            {ServiceIcon && <ServiceIcon className="h-8 w-8" />}
                        </div>
                        <Image
                            src={`https://placehold.co/300x200.png`}
                            alt={service.title}
                            width={300}
                            height={200}
                            className="rounded-lg object-cover border-2 border-wz-border-dark/30 group-hover:scale-105 transition-transform duration-300 mb-4"
                            data-ai-hint={`${service.title.toLowerCase().replace(/\s+/g, '-')}-illustration finance`}
                        />
                        <h3 className="text-xl font-bold font-heading mt-2">{service.title}</h3>
                         <p className={cn("text-sm mt-2 px-2", textColorClass === "text-wz-text-dark" ? "text-wz-text-dark/80" : "text-wz-text-light/80")}>{service.description}</p>
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
         <SectionWrapper id="cta-journey" bgClassName="bg-wz-yellow" addShapes>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-wz-text-dark font-heading">Ready to Start Your Financial Journey?</h2>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto items-center">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 !bg-white !border-wz-border-dark !text-wz-text-dark placeholder:text-wz-gray-text/90 focus:!ring-wz-pink focus:!border-wz-pink !py-3 !px-4 !rounded-full"
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
      <footer className="bg-wz-text-dark text-wz-text-light/80 py-10 border-t-4 border-wz-pink rounded-t-2xl">
        <div className="container-default">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] lg:grid-cols-[2fr_1fr_1fr] gap-8 mb-8 items-start">
            {/* Column 1: Logo and text */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2 no-underline">
                <CircleDollarSign className="h-8 w-8 text-wz-pink" />
                <span className="text-2xl font-bold font-heading text-wz-light-bg">FinCo</span>
              </Link>
              <p className="text-sm">Get weekly financial tips and FinCo updates straight to your inbox.</p>
            </div>

             {/* Link Columns Wrapper */}
            <div className="md:col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-wz-light-bg mb-4 font-heading">Company</h5>
                  <ul className="space-y-2.5">
                    {[
                      {label: 'Features', href: '#core-features'},
                      {label: 'Pricing', href: '#pricing'},
                      {label: 'About Us', href: '/about'},
                      {label: 'Jobs', href: '/careers'}
                    ].map((item) => (
                      <li key={item.label}>
                        <Link href={item.href} className="text-sm text-wz-light-bg/80 hover:text-wz-pink transition-colors no-underline">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                 {/* Social & Legal Links */}
                 <div>
                    <h5 className="font-semibold text-wz-light-bg mb-4 font-heading">Connect & Legal</h5>
                     <div className="flex space-x-4 mb-4">
                        {[
                            { icon: Twitter, href: "#", label: "Twitter" },
                            { icon: Youtube, href: "#", label: "YouTube" },
                            { icon: Instagram, href: "#", label: "Instagram" },
                            { icon: Facebook, href: "#", label: "Facebook" },
                        ].map((social) => {
                            const Icon = social.icon;
                            return (
                            <Link key={social.label} href={social.href} className="text-wz-light-bg/80 hover:text-wz-pink transition-colors no-underline">
                                <Icon className="h-5 w-5" />
                            </Link>
                            );
                        })}
                     </div>
                     <ul className="space-y-2.5">
                        <li><Link href="/terms" className="text-sm text-wz-light-bg/80 hover:text-wz-pink transition-colors no-underline">Terms & Agreements</Link></li>
                        <li><Link href="/privacy" className="text-sm text-wz-light-bg/80 hover:text-wz-pink transition-colors no-underline">Privacy Policy</Link></li>
                     </ul>
                </div>
            </div>
          </div>

          <div className="border-t border-wz-gray-text/30 pt-8 text-center md:text-left">
            <p className="text-xs text-wz-light-bg/70">
              © {new Date().getFullYear()} FinCo. All Rights Reserved. Your modern finance companion.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

