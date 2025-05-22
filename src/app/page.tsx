
'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
  ArrowRight,
  LayoutGrid,
  Wallet,
  ListChecks,
  Target,
  ShieldAlert,
  FileText,
  Lightbulb,
  Package,
  BrainCircuit,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  CircleDollarSign,
  Store,
  Apple as AppleIcon,
  Briefcase,
  CreditCard,
  DollarSign,
  Home,
  Settings,
  Users,
  Zap,
  Star,
  Receipt,
  Users2,
  BookOpen,
  Server,
  Rocket,
  CheckCircle,
  Award,
  HandCoins,
  PiggyBank,
  Landmark,
  Mail as MailIcon,
  Phone,
  MessageCircle,
  Send,
  BarChartBig,
  TrendingUp, // Ensured TrendingUp is imported
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
    </section>
  );
};


interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  bgColor: string;
  textColor: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, href, bgColor, textColor }) => {
  return (
    <motion.div
      className={cn(
        "p-6 rounded-xl border-2 border-wz-border-dark shadow-wz-hard-sm h-full flex flex-col group hover:brightness-95 active:translate-y-px active:shadow-none transition-all duration-150",
        bgColor,
        textColor
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="h-8 w-8 mb-4" />
      <h3 className="text-xl font-bold mb-2 font-heading">{title}</h3>
      <p className="text-sm opacity-90 mb-4 flex-grow">{description}</p>
      <Button asChild className="btn-wz btn-wz-outline-dark mt-auto text-sm !py-2 !px-4 self-start">
        <Link href={href}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </Button>
    </motion.div>
  );
};

const coreServices = [
  { icon: LayoutGrid, title: "Dashboard", description: "Your financial command center.", href: "/dashboard", bgColor: "bg-wz-pink", textColor: "text-wz-text-dark" },
  { icon: Wallet, title: "Budget", description: "Plan and manage your monthly budgets.", href: "/budget", bgColor: "bg-wz-green", textColor: "text-wz-text-dark" },
  { icon: ListChecks, title: "Expenses", description: "Log and categorize all your spending.", href: "/expenses", bgColor: "bg-wz-purple", textColor: "text-wz-text-dark" },
  { icon: Target, title: "Goals", description: "Set and achieve your financial targets.", href: "/savings-goals", bgColor: "bg-wz-yellow", textColor: "text-wz-text-dark" },
  { icon: TrendingUp, title: "Invest", description: "Monitor and grow your investments.", href: "/investments", bgColor: "bg-wz-green", textColor: "text-wz-text-dark" },
  { icon: ShieldAlert, title: "Safety", description: "Build your financial safety net.", href: "/emergency-fund", bgColor: "bg-wz-pink", textColor: "text-wz-text-dark" },
  { icon: FileText, title: "Taxes", description: "Estimate and prepare for your taxes.", href: "/tax-planner", bgColor: "bg-wz-yellow", textColor: "text-wz-text-dark" },
  { icon: Lightbulb, title: "AI", description: "Get smart financial insights.", href: "/ai-assistant", bgColor: "bg-wz-purple", textColor: "text-wz-text-dark" },
];


const partners = ["Plaid", "Yodlee", "Stripe", "Visa", "Mastercard", "American Express", "Google Pay"];

const whyFinCoBenefits = [
  {
    icon: Package,
    title: "All-In-One Simplicity",
    description: "Budgeting, expenses, goals, investments, and taxes – everything seamlessly integrated. No more app-hopping!",
    iconColor: "text-wz-yellow",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Brilliance",
    description: "Our intelligent assistant offers personalized insights, automates tasks, and helps you make smarter financial decisions.",
    iconColor: "text-wz-green",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description: "Bank-level security to protect your data. Clear, honest features with no hidden fees.",
    iconColor: "text-wz-pink",
  },
];


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
        <SectionWrapper bgClassName="bg-wz-green !pt-20 md:!pt-28 lg:!pt-32 !pb-12 md:!pb-16" id="hero">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-wz-text-dark leading-tight">
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
                data-ai-hint="person finance app tablet"
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
           <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
             {whyFinCoBenefits.map((benefit, index) => (
               <motion.div
                 key={index}
                 className={cn(
                    "p-6 lg:p-8 bg-white text-wz-text-dark rounded-none border-2 border-wz-border-dark shadow-wz-hard-sm group transition-all duration-300 h-full flex flex-col hover:bg-wz-pink"
                 )}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.3 }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                 <benefit.icon className={cn("h-10 w-10 mb-4 group-hover:text-wz-text-dark transition-colors duration-300", benefit.iconColor)} />
                 <h3 className="text-xl font-bold text-wz-text-dark mb-2 font-heading">{benefit.title}</h3>
                 <p className="text-sm text-wz-gray-text group-hover:text-wz-text-dark transition-colors duration-300 flex-grow">{benefit.description}</p>
               </motion.div>
             ))}
           </div>
        </SectionWrapper>

        {/* Explore Our Core Features Section */}
        <SectionWrapper id="services" bgClassName="bg-wz-green">
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
                bgColor={service.bgColor}
                textColor={service.textColor}
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
                  <AppleIcon className="mr-2 h-5 w-5" /> Get FinCo for iOS
                </Link>
              </Button>
              <Button asChild className="btn-wz btn-wz-purple">
                <Link href="#">
                  <Store className="mr-2 h-5 w-5" /> Get FinCo for Android
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
                <Sparkles className="h-8 w-8 text-wz-pink" />
                <span className="text-2xl font-bold font-heading text-wz-text-light">FinCo</span>
              </Link>
              <p className="text-sm text-wz-text-light/80">Get weekly financial tips and FinCo updates straight to your inbox.</p>
              <form className="flex gap-2 max-w-sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 !bg-wz-text-dark/50 !border-wz-gray-text/50 !text-wz-text-light placeholder:!text-wz-text-light/50 focus:!border-wz-pink !rounded-full"
                  suppressHydrationWarning={true}
                />
                <Button type="submit" className="btn-wz btn-wz-pink !py-2.5 !px-5" suppressHydrationWarning={true}>
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
                <li><Link href="#careers" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Jobs</Link></li>
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
              <Link href="#" aria-label="Twitter" className="text-wz-text-light/80 hover:text-wz-pink transition-colors no-underline"><Twitter className="h-5 w-5"/></Link>
              <Link href="#" aria-label="YouTube" className="text-wz-text-light/80 hover:text-wz-pink transition-colors no-underline"><Youtube className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Instagram" className="text-wz-text-light/80 hover:text-wz-pink transition-colors no-underline"><Instagram className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Facebook" className="text-wz-text-light/80 hover:text-wz-pink transition-colors no-underline"><Facebook className="h-5 w-5"/></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
