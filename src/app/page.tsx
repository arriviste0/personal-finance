
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  CircleDollarSign,
  Twitter,
  Youtube,
  Facebook,
  Instagram,
  Palette,
  BarChart3,
  Award,
  Store,
  Apple,
  ChevronRight,
  Mail,
  Heart,
  Briefcase,
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
  HandCoins,
  PiggyBank,
  Landmark,
  Users,
  Receipt,
  DollarSign,
  Zap,
  Star,
  MessageCircle,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  id?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className, bgClassName = "bg-wz-light-bg", id }) => {
  return (
    <section id={id} className={cn("py-16 md:py-24 relative overflow-hidden", bgClassName, className)}>
      <div className="container-default relative z-10">
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
  bgColor: string; // e.g., 'bg-wz-pink'
  textColor: string; // e.g., 'text-wz-text-dark'
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, href, bgColor, textColor }) => {
  return (
    <motion.div
      className={cn("p-6 rounded-xl border-2 border-wz-border-dark shadow-sm h-full flex flex-col", bgColor, textColor)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="h-8 w-8 mb-4" />
      <h3 className="text-xl font-bold mb-2 font-heading">{title}</h3>
      <p className="text-sm opacity-80 mb-4 flex-grow">{description}</p>
      <Button asChild className="btn-wz btn-wz-outline-dark mt-auto text-sm !py-2 !px-4">
        <Link href={href}>Learn More <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </Button>
    </motion.div>
  );
};


const PartnerLogo = ({ name, className }: { name: string, className?: string }) => (
  <div className={cn("text-2xl font-bold text-wz-gray-text/80 hover:text-wz-text-dark transition-colors", className)}>
    {name}
  </div>
);

const services = [
  { icon: LayoutGrid, title: "Dashboard", description: "Your financial command center.", href: "/dashboard", bgColor: "bg-wz-pink", textColor: "text-wz-text-dark" },
  { icon: Wallet, title: "Budget", description: "Plan and manage your monthly budgets.", href: "/budget", bgColor: "bg-wz-green", textColor: "text-wz-text-dark" },
  { icon: ListChecks, title: "Expenses", description: "Log and categorize all your spending.", href: "/expenses", bgColor: "bg-wz-purple", textColor: "text-wz-text-dark" },
  { icon: Target, title: "Goals", description: "Set and achieve your financial targets.", href: "/savings-goals", bgColor: "bg-wz-yellow", textColor: "text-wz-text-dark" },
  { icon: TrendingUp, title: "Invest", description: "Monitor and grow your investments.", href: "/investments", bgColor: "bg-wz-green", textColor: "text-wz-text-dark" },
  { icon: ShieldAlert, title: "Safety", description: "Build your financial safety net.", href: "/emergency-fund", bgColor: "bg-wz-pink", textColor: "text-wz-text-dark" },
  { icon: FileText, title: "Taxes", description: "Estimate and prepare for your taxes.", href: "/tax-planner", bgColor: "bg-wz-yellow", textColor: "text-wz-text-dark" },
  { icon: Lightbulb, title: "AI", description: "Get smart financial insights.", href: "/ai-assistant", bgColor: "bg-wz-purple", textColor: "text-wz-text-dark" },
];


export default function LandingPage() {
  React.useEffect(() => {
    document.body.classList.add('wzuh-landing-page');
    return () => {
      document.body.classList.remove('wzuh-landing-page');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-wz-text-dark">
      <main className="flex-grow">
        {/* Hero Section */}
        <SectionWrapper bgClassName="bg-wz-green py-20 md:py-32" id="hero">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-wz-text-dark leading-tight font-heading">
                Master Your <br className="hidden md:inline" />Financial Goals
              </h1>
              <p className="text-lg md:text-xl text-wz-gray-text mb-8 max-w-md">
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
              className="relative flex justify-center"
            >
              <Image
                src="https://placehold.co/500x550.png"
                alt="FinCo app illustration"
                width={500}
                height={550}
                className="rounded-2xl shadow-xl object-cover"
                data-ai-hint="person using finance app"
              />
              <Sparkles className="absolute -top-8 -left-8 h-16 w-16 text-wz-pink opacity-70 animate-pulse" />
              <Sparkles className="absolute -bottom-5 -right-5 h-12 w-12 text-wz-yellow opacity-70 animate-pulse delay-500" />
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Partners Section */}
        <section className="py-6 bg-wz-pink">
           <div className="container-default">
             <div className="partner-slider-container">
               <div className="partner-slider-track">
                 {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-12 md:space-x-16 lg:space-x-20 px-6">
                    <PartnerLogo name="Plaid" />
                    <PartnerLogo name="Visa" />
                    <PartnerLogo name="Mastercard" />
                    <PartnerLogo name="Stripe" />
                    <PartnerLogo name="Wise" />
                    <PartnerLogo name="American Express" />
                    <PartnerLogo name="Google Pay" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Get the Financial Future of Your Dreams Section */}
        <SectionWrapper id="get-future">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <Image
                src="https://placehold.co/550x450.png"
                alt="Happy person looking at finances"
                width={550}
                height={450}
                className="rounded-2xl shadow-xl object-cover"
                data-ai-hint="happy person finance planning"
              />
              <Sparkles className="absolute top-5 -right-5 h-10 w-10 text-wz-green opacity-80 animate-pulse delay-300" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-wz-text-dark font-heading">
                Get the Financial Future <br className="hidden md:inline" />of Your Dreams.
              </h2>
              <p className="text-lg text-wz-gray-text mb-6 max-w-md">
                With FinCo, achieving your financial aspirations is simpler than ever.
                All it takes is three simple steps!
              </p>
              <Button asChild className="btn-wz btn-wz-pink">
                <Link href="#how-it-works">Start Planning <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </div>
        </SectionWrapper>

         {/* Explore FinCo's Core Features Section */}
        <SectionWrapper id="services" bgClassName="bg-wz-light-bg">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-wz-text-dark font-heading mb-4">Explore FinCo's Core Features</h2>
            <p className="text-lg text-wz-gray-text max-w-2xl mx-auto">
              From daily expense tracking to long-term investment planning, FinCo offers a comprehensive suite of tools.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
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


        {/* Ready to Start CTA Section */}
        <SectionWrapper id="cta" bgClassName="bg-wz-light-bg">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-wz-text-dark font-heading">Ready to Start Your Financial Journey?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="btn-wz btn-wz-pink">
                <Link href="#">
                  <Apple className="mr-2 h-5 w-5" /> Get FinCo for iOS
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
      <footer className="bg-wz-text-dark text-wz-text-light/70 py-12">
        <div className="container-default">
          <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-8 items-start mb-8">
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
                  className="flex-1 !bg-wz-text-dark/50 !border-wz-gray-text/50 !text-wz-text-light placeholder:!text-wz-text-light/50 focus:!border-wz-pink focus:!ring-wz-pink !rounded-full"
                />
                <Button type="submit" className="btn-wz btn-wz-pink !py-2.5">
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Column 2 & 3: Links (Removed as per previous request to only keep Company links) */}
            <div>
              <h4 className="font-semibold text-wz-text-light mb-3 font-heading">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/#services" className="hover:text-wz-pink text-sm no-underline text-wz-text-light/80">Features</Link></li>
                <li><Link href="#" className="hover:text-wz-pink text-sm no-underline text-wz-text-light/80">Pricing</Link></li>
                <li><Link href="#" className="hover:text-wz-pink text-sm no-underline text-wz-text-light/80">About</Link></li>
                <li><Link href="#" className="hover:text-wz-pink text-sm no-underline text-wz-text-light/80">Jobs</Link></li>
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
