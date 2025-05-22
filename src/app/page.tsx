
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  DollarSign as CircleDollarSignIcon, // Alias to avoid conflict if DollarSign is used differently
  Package,
  BrainCircuit,
  ShieldCheck,
  LayoutGrid,
  Wallet,
  ListChecks,
  Target,
  TrendingUp,
  ShieldAlert,
  FileText,
  Lightbulb,
  Mail,
  Youtube,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  BarChartBig,
  Award,
  Briefcase,
  Landmark,
  HandCoins,
  Users,
  Users2,
  Settings,
  Server,
  Rocket,
  BookOpen,
  BarChart3,
  PiggyBank,
  CreditCard,
  Activity,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Helper component for consistent section wrapping
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
      {bgClassName && bgClassName.includes('bg-wz') && (
        <>
          <motion.div
            className="absolute top-1/4 left-10 w-32 h-32 bg-wz-pink/30 rounded-full filter blur-xl opacity-50 -z-10"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-10 w-40 h-40 bg-wz-yellow/30 rounded-full filter blur-xl opacity-50 -z-10"
            animate={{ scale: [1, 1.2, 1], x: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}
    </section>
  );
};


export default function LandingPage() {

  const coreServices = [
    { icon: LayoutGrid, title: "Dashboard", description: "Get a comprehensive overview of your finances at a glance.", href: "/dashboard", bgColor: "bg-wz-green", textColor: "text-wz-text-dark" },
    { icon: Wallet, title: "Budget", description: "Create and manage your monthly budgets with ease and precision.", href: "/budget", bgColor: "bg-wz-pink", textColor: "text-wz-text-dark" },
    { icon: ListChecks, title: "Expenses", description: "Track every penny and understand your spending habits.", href: "/expenses", bgColor: "bg-wz-purple", textColor: "text-wz-text-dark" },
    { icon: Target, title: "Goals", description: "Set, monitor, and achieve your short-term and long-term financial goals.", href: "/savings-goals", bgColor: "bg-wz-yellow", textColor: "text-wz-text-dark" },
    { icon: TrendingUp, title: "Invest", description: "Grow your wealth by tracking your investments and market performance.", href: "/investments", bgColor: "bg-wz-green", textColor: "text-wz-text-dark" },
    { icon: ShieldAlert, title: "Safety", description: "Build and manage your emergency fund for financial peace of mind.", href: "/emergency-fund", bgColor: "bg-wz-pink", textColor: "text-wz-text-dark" },
    { icon: FileText, title: "Taxes", description: "Simplify tax season with our intuitive estimation and planning tools.", href: "/tax-planner", bgColor: "bg-wz-yellow", textColor: "text-wz-text-dark" }, // Reused yellow
    { icon: Lightbulb, title: "AI", description: "Unlock personalized financial insights and advice powered by AI.", href: "/ai-assistant", bgColor: "bg-wz-purple", textColor: "text-wz-text-dark" }, // Reused purple
  ];


  React.useEffect(() => {
    document.body.classList.add('wzuh-landing-page');
    return () => {
      document.body.classList.remove('wzuh-landing-page');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow">
        {/* Hero Section */}
        <SectionWrapper bgClassName="bg-wz-green !pt-20 md:!pt-28 lg:!pt-32 !pb-12 md:!pb-16" id="hero">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
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
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex justify-center items-center mt-10 lg:mt-0"
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
                {["Plaid", "Yodlee", "Stripe", "Visa", "Mastercard", "Google Pay", "Apple Pay", "Plaid", "Yodlee", "Stripe", "Visa", "Mastercard", "Google Pay", "Apple Pay"].map((partner, i) => (
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
                  className="group p-6 bg-white rounded-xl border-2 border-transparent hover:border-wz-pink hover:bg-wz-pink text-center transition-all duration-300 shadow-md hover:shadow-wz-hard"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ItemIcon className="h-12 w-12 text-wz-yellow mx-auto mb-4 group-hover:text-wz-text-dark transition-colors duration-300" />
                  <h3 className="text-xl font-bold text-wz-text-dark font-heading mb-2">{item.title}</h3>
                  <p className="text-sm text-wz-gray-text group-hover:text-wz-text-dark transition-colors duration-300">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </SectionWrapper>

        {/* FinCo's Core Features Section */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {coreServices.map((service, index) => {
              const ServiceIcon = service.icon;
              return (
                <Link key={service.title} href={service.href} className="block group relative no-underline">
                  <div
                    className={cn(
                      "p-8 h-full flex flex-col items-center justify-between relative border-2 min-h-[450px]",
                      service.bgColor,
                      service.textColor,
                      "border-wz-border-dark",
                      "hover:brightness-110 transition-all duration-200"
                    )}
                  >
                    <Sparkles className="absolute top-2 left-2 h-5 w-5 opacity-30" />
                    <Sparkles className="absolute top-2 right-2 h-5 w-5 opacity-30" />
                    <Sparkles className="absolute bottom-2 left-2 h-5 w-5 opacity-30" />
                    <Sparkles className="absolute bottom-2 right-2 h-5 w-5 opacity-30" />

                    <div className="flex-grow flex flex-col items-center justify-center py-4">
                       <div className="mb-4 p-3 bg-white/30 rounded-full group-hover:scale-110 transition-transform duration-300">
                        <ServiceIcon className={cn("h-10 w-10", service.textColor)} />
                       </div>
                      <Image
                        src={`https://placehold.co/320x220.png`}
                        alt={service.title}
                        width={320}
                        height={220}
                        className="rounded-lg object-cover border-2 border-wz-border-dark/30 group-hover:scale-105 transition-transform duration-300 mb-4"
                        data-ai-hint={`${service.title.toLowerCase().replace(/\s+/g, '-')} illustration`}
                      />
                      <h3 className={cn("text-xl font-bold font-heading mt-2", service.textColor)}>{service.title}</h3>
                      <p className={cn("text-sm mt-2 text-center px-2", service.textColor === 'text-wz-text-dark' ? 'text-wz-gray-text' : 'text-wz-text-light/80')}>{service.description}</p>
                    </div>
                    <Button className="btn-wz btn-wz-outline-dark mt-auto !text-sm !py-2 !px-4 !shadow-wz-hard-sm group-hover:!bg-wz-text-dark group-hover:!text-wz-text-light">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Link>
              );
            })}
          </div>
        </SectionWrapper>

        {/* "Ready to Start Your Financial Journey?" CTA Section */}
        <SectionWrapper id="cta-journey" bgClassName="bg-wz-yellow">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-wz-text-dark font-heading">Ready to Start Your Financial Journey?</h2>
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 !bg-wz-text-dark/5 !border-wz-border-dark !text-wz-text-dark placeholder:text-wz-gray-text/90 focus:!ring-wz-pink focus:!border-wz-pink !py-3 !px-4 !rounded-full"
                suppressHydrationWarning={true}
              />
              <Button type="submit" className="btn-wz btn-wz-pink !py-3 !px-5" suppressHydrationWarning={true}>
                Subscribe
              </Button>
            </form>
          </div>
        </SectionWrapper>

      </main>

      {/* Footer */}
      <footer className="bg-wz-text-dark text-wz-text-light/70 pt-10 pb-8 rounded-t-2xl border-t-4 border-wz-pink">
        <div className="container-default">
          <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-8 items-start mb-8">
            {/* Column 1: Logo, Subscription */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2 no-underline">
                <Sparkles className="h-8 w-8 text-wz-pink" />
                <span className="text-2xl font-bold font-heading text-white">FinCo</span>
              </Link>
              <p className="text-sm">Get weekly financial tips and FinCo updates straight to your inbox.</p>
              <form className="flex gap-2 items-center">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 !bg-wz-text-dark/50 !border-wz-gray-text/50 !text-wz-text-light placeholder:text-wz-gray-text/80 focus:!ring-wz-pink focus:!border-wz-pink !rounded-full !py-2.5"
                  suppressHydrationWarning={true}
                />
                <Button type="submit" className="btn-wz btn-wz-pink !py-2.5 !px-5" suppressHydrationWarning={true}>
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Column 2: Company Links */}
            <div>
              <h5 className="font-bold text-white mb-3 font-heading">Company</h5>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'About', 'Jobs'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-wz-text-light/80 hover:text-wz-pink no-underline transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Resources Links */}
            <div>
              <h5 className="font-bold text-white mb-3 font-heading">Resources</h5>
              <ul className="space-y-2">
                {['Help Center', 'Blog', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-wz-text-light/80 hover:text-wz-pink no-underline transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-wz-gray-text/30 pt-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-sm text-wz-text-light/70 mb-4 md:mb-0">
              © {new Date().getFullYear()} FinCo. All Rights Reserved.
            </p>
            <div className="flex space-x-5">
              {[Twitter, Facebook, Instagram, Youtube].map((SocialIcon, i) => (
                <Link key={i} href="#" className="text-wz-text-light/70 hover:text-wz-pink no-underline transition-colors">
                  <SocialIcon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

