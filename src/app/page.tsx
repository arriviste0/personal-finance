'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  DollarSign,
  Sparkles,
  ShieldCheck,
  Package,
  BrainCircuit,
  Target,
  BarChartBig,
  TrendingUp,
  Award,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ListChecks,
  Wallet,
  ShieldAlert,
  FileText,
  Lightbulb,
  Mail,
  Youtube,
  Facebook,
  Twitter,
  Instagram,
  CircleDollarSign,
  LayoutGrid,
  HandCoins,
  Landmark,
  CheckCircle,
  MessageCircle,
  Phone,
  User,
  ShoppingCart,
  CreditCard,
  Activity,
  Users, // Added Users icon for "Most Popular Artists/Features" section
  Settings, // Added for general use if needed
  Server, // Added for general use if needed
  Rocket, // Added for general use if needed
  BookOpen, // Added for articles
  BarChart3, // For stats
  PiggyBank, // Added for services
  DollarSign as DollarSignIcon, // Aliased for clarity if DollarSign is used differently
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
      {/* Placeholder for abstract shapes - can be styled with ::before/::after or SVGs */}
      {bgClassName && bgClassName.includes('bg-wz') && ( // Example: only add for Wzuh specific backgrounds
        <>
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-wz-pink/30 rounded-full filter blur-xl opacity-50 animate-pulse-slow -z-10"></div>
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-wz-yellow/30 rounded-full filter blur-xl opacity-50 animate-pulse-slow animation-delay-2000 -z-10"></div>
        </>
      )}
    </section>
  );
};

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  tags: string[];
  bgColor: string;
  textColor: string;
  borderColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, href, tags, bgColor, textColor, borderColor }) => {
  return (
    <motion.div
      className={cn(
        "landing-card p-6 text-left group flex flex-col border-2",
        bgColor,
        textColor,
        borderColor,
        "hover:shadow-xl transition-all duration-300"
      )}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className={cn("p-2 rounded-lg mr-3", bgColor === 'bg-wz-dark-bg' ? 'bg-wz-pink' : 'bg-white/30')}>
          <Icon className={cn("h-6 w-6", textColor === 'text-wz-text-light' && bgColor === 'bg-wz-dark-bg' ? 'text-wz-pink' : textColor)} />
        </div>
        <h3 className={cn("text-xl font-bold font-heading", textColor)}>{title}</h3>
      </div>
      <p className={cn("text-sm mb-4 flex-grow", textColor === 'text-wz-text-light' ? 'text-wz-text-light/80' : 'text-wz-gray-text')}>{description}</p>
      <div className="mb-4">
        <span className={cn("text-xs font-semibold uppercase tracking-wider", textColor === 'text-wz-text-light' ? 'text-wz-text-light/70' : 'text-wz-gray-text/80')}>Popular tags:</span>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {tags.map(tag => (
            <span key={tag} className={cn("text-xs px-2.5 py-1 rounded-full border-2 font-medium transition-colors duration-200",
              textColor === 'text-wz-text-light'
              ? 'bg-wz-light-bg/10 border-wz-light-bg/30 text-wz-light-bg/90 hover:bg-wz-pink hover:text-wz-text-dark hover:border-wz-pink'
              : 'bg-black/5 border-black/20 text-black/70 hover:bg-black hover:text-white hover:border-black'
            )}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Link href={href} passHref className="no-underline mt-auto">
        <Button className={cn("btn-wz btn-wz-outline-dark w-full !py-2 !text-sm", textColor === 'text-wz-text-light' ? '!border-wz-text-light !text-wz-text-light hover:!bg-wz-text-light hover:!text-wz-text-dark' : '')}>
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </motion.div>
  );
};


export default function LandingPage() {
  const coreServices = [
    { iconName: "LayoutGrid", title: "Dashboard", description: "Your financial command center.", href: "/dashboard" },
    { iconName: "Wallet", title: "Budget", description: "Plan and manage your spending.", href: "/budget" },
    { iconName: "ListChecks", title: "Expenses", description: "Log and categorize all your spending.", href: "/expenses" },
    { iconName: "Target", title: "Goals", description: "Set and achieve your financial targets.", href: "/savings-goals" },
    { iconName: "TrendingUp", title: "Invest", description: "Monitor and grow your investments.", href: "/investments" },
    { iconName: "ShieldAlert", title: "Safety", description: "Build your financial safety net.", href: "/emergency-fund" },
    { iconName: "FileText", title: "Taxes", description: "Estimate and prepare for your taxes.", href: "/tax-planner" },
    { iconName: "Lightbulb", title: "AI", description: "Get smart financial insights.", href: "/ai-assistant" },
  ];

  const serviceColors = [
    { bg: "bg-wz-green", text: "text-wz-text-dark", border: "border-wz-border-dark" },
    { bg: "bg-wz-pink", text: "text-wz-text-dark", border: "border-wz-border-dark" },
    { bg: "bg-wz-purple", text: "text-wz-text-dark", border: "border-wz-border-dark" },
    { bg: "bg-wz-yellow", text: "text-wz-text-dark", border: "border-wz-border-dark" },
  ];


  return (
    // Add wzuh-landing-page class to body for specific landing page styles
    <>
      <main className="flex-grow">
        {/* Hero Section - Wzuh Style */}
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
                <Link href="/get-started" passHref className="no-underline">
                  <Button className="btn-wz btn-wz-pink">Start Now <ArrowRight className="ml-2 h-5 w-5" /></Button>
                </Link>
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

        {/* Partners Section - Wzuh Style */}
         <section className="py-4 bg-wz-pink border-y-2 border-wz-border-dark">
           <div className="container-default">
             <div className="partner-slider-container">
               <div className="partner-slider-track">
                 {["PayPal", "Visa", "Mastercard", "Stripe", "Wise", "American Express", "Google Pay", "PayPal", "Visa", "Mastercard", "Stripe", "Wise", "American Express", "Google Pay"].map((partner, i) => (
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

        {/* "Why Choose Fin.Co?" Section */}
        <SectionWrapper id="why-finco" bgClassName="bg-wz-light-bg">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-wz-text-dark font-heading mb-4">Why Smart People Choose Fin.Co</h2>
            <p className="text-lg text-wz-gray-text max-w-2xl mx-auto">
              We're not just another finance app. We're your dedicated partner in achieving financial freedom.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Package, title: "All-In-One Simplicity", description: "Budgeting, expenses, goals, investments, and taxes – everything seamlessly integrated. No more app-hopping!" },
              { icon: BrainCircuit, title: "AI-Powered Brilliance", description: "Our intelligent assistant offers personalized insights, automates tasks, and helps you make smarter financial decisions." },
              { icon: ShieldCheck, title: "Secure & Transparent", description: "Bank-level security to protect your data. Clear, honest features with no hidden fees." },
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  className="group p-6 bg-white rounded-xl border-2 border-transparent hover:border-wz-pink text-center transition-all duration-300 hover:bg-wz-pink shadow-md hover:shadow-wz-hard"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ItemIcon className="h-12 w-12 text-wz-yellow mx-auto mb-4 group-hover:text-wz-text-dark transition-colors duration-300" />
                  <h3 className="text-xl font-bold text-wz-text-dark group-hover:text-wz-text-dark font-heading mb-2">{item.title}</h3>
                  <p className="text-sm text-wz-gray-text group-hover:text-wz-text-dark transition-colors duration-300">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </SectionWrapper>

        {/* "FinCo's Core Features" Section */}
        <SectionWrapper id="core-features" bgClassName="bg-wz-light-bg">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-wz-text-dark font-heading inline-block relative">
              FinCo's Core Features
              <span className="absolute bottom-0 left-0 w-full h-2 bg-wz-yellow/70 -z-10 transform translate-y-1"></span>
            </h2>
            <p className="text-lg text-wz-gray-text max-w-xl mx-auto mt-4">
              Select the financial goal for which you would like to start planning.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {coreServices.map((service, index) => {
              const ServiceIcon = service.iconName ? (LucideIcons[service.iconName as keyof typeof LucideIcons] || Sparkles) : Sparkles;
              const colorScheme = serviceColors[index % serviceColors.length];
              return (
                <Link key={service.title} href={service.href} className="block group relative text-center no-underline">
                  <div
                    className={cn(
                      "p-8 h-full flex flex-col items-center justify-between relative border-2 min-h-[400px]", 
                      colorScheme.bg,
                      colorScheme.text,
                      colorScheme.border,
                      "hover:brightness-105 transition-all duration-200"
                    )}
                  >
                    <Sparkles className="absolute top-2 left-2 h-5 w-5 opacity-30" />
                    <Sparkles className="absolute top-2 right-2 h-5 w-5 opacity-30" />
                    <Sparkles className="absolute bottom-2 left-2 h-5 w-5 opacity-30" />
                    <Sparkles className="absolute bottom-2 right-2 h-5 w-5 opacity-30" />
                    
                    <div className="flex-grow flex flex-col items-center justify-center py-4">
                      <div className="mb-4">
                        <Image
                          src={`https://placehold.co/300x200.png`}
                          alt={service.title}
                          width={300}
                          height={200}
                          className="rounded-lg object-cover border-2 border-wz-border-dark/30 group-hover:scale-105 transition-transform duration-300"
                          data-ai-hint={`${service.title.toLowerCase().replace(/\s+/g, '-')} graphic`}
                        />
                      </div>
                      <h3 className="text-xl font-bold font-heading mt-2">{service.title}</h3>
                       {/* Optional: Add a short description here if desired */}
                       {/* <p className="text-sm mt-1 text-wz-text-dark/80">{service.description}</p> */}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </SectionWrapper>
        
        {/* "Ready to Start Your Financial Journey?" CTA Section */}
         <SectionWrapper id="cta-download" bgClassName="bg-wz-light-bg">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-wz-text-dark font-heading">Ready to Start Your Financial Journey?</h2>
            <p className="text-lg text-wz-gray-text mb-8">
              Download the FinCo app today and take the first step towards financial clarity and freedom.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="btn-wz btn-wz-pink">
                    <Link href="#" className="no-underline">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 4-4 4-4 0-1.28-2.39-4-4-4-1.09 0-1.4.52-2.67.52S10.18 12 9 12s-1.78.45-2.9.45S4 11.12 4 10c0-1.57 1.5-3.42 3.5-3.42C9.36 6.58 10.31 8 11 8s1.64-1.42 3.5-1.42S18 8.43 18 10c0 .83-.77 1.36-1.42 2.14-.55.63-1.13 1.23-1.41 1.97-.06.15-.09.31-.09.47 0 .8.59 1.42 1.42 1.42.64 0 1.14-.29 1.5-.6.64-.54 1.24-1.19 1.81-1.77 .34-.36.6-.71.74-1.09.18-.44.19-1.76.19-1.76s0-3.91-2.62-5.31c-1.04-.56-2.2-.72-3.28-.56C13.37 3.29 12 4.65 12 4.65s-.88-1.26-2.5-1.26c-1.2 0-2.02.34-2.86.9C4.09 5.5 4 8.21 4 8.21s.02 2.63 1.38 4.05c.4.43.88.79 1.39.99.69.28 1.46.4 2.23.4.07 0 .14,0 .21-.01.09-.01.18-.02.28-.04.37-.06.74-.18 1.1-.36.1-.05.19-.1.29-.16.03-.02.05-.03.08-.05.08-.04.15-.09.23-.14.18-.11.36-.24.53-.38.54-.44 1.05-.94 1.48-1.48l.02-.02c.03-.04.06-.07.09-.11l.03-.03c.03-.04.07-.08.1-.12.15-.19.3-.4.44-.62.36-.56.65-1.17.85-1.79.15-.49.21-1 .21-1.49s-.06-1-.21-1.49c-.2-.62-.49-1.23-.85-1.79-.14-.22-.29-.43-.44-.62-.03-.04-.07-.08-.1-.12l-.03-.03c-.03-.04-.06-.07-.09-.11l-.02-.02c-.43-.54-.94-1.04-1.48-1.48A6.26 6.26 0 0 0 12 2.06c-1.5 0-2.75 1.06-4 1.06C5 3.12 4 7.12 4 7.12S2.72 10.02 2 10.47c-.64.41-1 1-1 1.79 0 .91.36 1.79 1 2.47.69.72 1.71 1.19 2.76 1.19.09 0 .19-.003.28-.006a4.449 4.449 0 0 0 1.6-.31c.3-.1.58-.22.85-.36.02-.01.03-.02.05-.03.11-.06.22-.13.33-.2.02-.01.03-.02.05-.03.08-.04.17-.09.25-.14.27-.16.54-.35.8-.56.36-.28.71-.6 1.03-.95.17-.18.34-.38.5-.58.16-.21.3-.43.44-.66.1-.15.18-.31.26-.47.11-.23.2-.47.28-.72.09-.27.14-.55.14-.84s-.05-.57-.14-.84c-.08-.25-.17-.49-.28-.72-.08-.16-.16-.32-.26-.47-.14-.23-.3-.45-.44-.66-.2-.38-.42-.73-.62-1.05-.27-.27-.55-.51-.85-.73A7.01 7.01 0 0 0 12 20.94z"></path></svg>
                        Get FinCo for iOS
                    </Link>
                </Button>
                <Button asChild className="btn-wz btn-wz-purple">
                    <Link href="#" className="no-underline">
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M21.5 8.38S22.28 7 22 5.5C21.78 4.35 20.84 3.78 19.5 3.55c-2.28-.4-4.5.88-6 2.08-1.23.98-2.21 2.21-2.76 3.63-.29.74-.48 1.51-.62 2.28C9.94 12.28 9.5 14 8.24 14S6.5 13.15 6.5 12.28c0-1.03.89-1.88 1.97-1.88H12c.55 0 1-.45 1-1s-.45-1-1-1H8.47C4.75 8.4 2 11.19 2 14.72c0 3.53 2.75 6.32 6.47 6.32H12c.55 0 1-.45 1-1s-.45-1-1-1h-3.53c-1.08 0-1.97-.84-1.97-1.87 0-.81.52-1.52 1.26-1.76.05-.02.1-.02.15-.02H12c1.26 0 2.5.72 2.76 2.24.14.77.33 1.54.62 2.28.55 1.42 1.53 2.65 2.76 3.63 1.5 1.2 3.72 2.48 6 2.08 1.34-.23 2.28-.8 2.5-1.95.28-1.5-.5-2.88-.5-2.88m-2.12-1.21c.87-.52 1.38-1.47 1.38-2.53 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 1.06.51 2.01 1.38 2.53M12 10.4c-2.28 0-4.5-.88-6-2.08"/></svg>
                         Get FinCo for Android
                    </Link>
                </Button>
            </div>
          </div>
        </SectionWrapper>
      </main>

      {/* Footer - Wzuh Style */}
      <footer className="bg-wz-text-dark text-wz-text-light/70 pt-10 pb-8 rounded-t-2xl border-t-4 border-wz-pink">
        <div className="container-default">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} FinCo. All Rights Reserved.
            </p>
            <div className="mb-4 md:mb-0">
               <Link href="/" className="flex items-center space-x-2 no-underline justify-center md:justify-start">
                <Sparkles className="h-7 w-7 text-wz-pink" />
                <span className="text-2xl font-bold font-heading text-wz-text-light">FinCo</span>
              </Link>
            </div>
            <nav className="flex space-x-6">
              <Link href="/terms" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">
                Terms & Agreements
              </Link>
              <Link href="/privacy" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}

// Helper to map icon names to Lucide components
const LucideIcons: { [key: string]: React.ElementType } = {
  LayoutGrid,
  Wallet,
  ListChecks,
  Target,
  TrendingUp,
  ShieldAlert,
  FileText,
  Lightbulb,
  Sparkles,
  // Add any other icons you might use in coreServices or elsewhere
  // For example, if some services were to have unique icons:
  // PiggyBank,
  // Landmark,
  // HandCoins,
  // Briefcase,
};
