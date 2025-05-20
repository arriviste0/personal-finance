// src/app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  DollarSign,
  HandCoins,
  Lightbulb,
  ListChecks,
  Landmark,
  FileText,
  PiggyBank,
  Users,
  Youtube,
  Facebook,
  Twitter,
  Instagram,
  Briefcase,
  TrendingUp, // Added TrendingUp back as it's used in 4-step plan
  BarChart2,
  Percent,
  Inbox,
  MessageCircle,
  ShieldAlert,
  Banknote,
  Package,
  Settings,
  Users2,
  CircleDollarSign,
  Euro,
  IndianRupee,
  Bitcoin,
  JapaneseYen,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  Cloud,
  ShieldCheck,
  BrainCircuit,
  Sparkles,
  Zap,
  Target,
  BarChartBig,
  Award,
  ChevronDown,
  ChevronUp,
  LayoutGrid, // Added LayoutGrid here
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
  href: string;
  bgColorClass: string;
  iconColorClass?: string;
  textColorClass?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, tags, href, bgColorClass, iconColorClass = "text-chorke-dark-text", textColorClass = "text-chorke-dark-text" }) => {
  return (
    <motion.div whileHover={{ y: -5, boxShadow: "6px 6px 0px hsl(var(--chorke-dark-text))" }} transition={{ type: "spring", stiffness: 300 }} className="h-full">
      <Link href={href} passHref className="no-underline h-full flex">
        <Card className={cn(
          "flex flex-col h-full p-6 transition-all duration-300 border-2 border-chorke-dark-text shadow-[4px_4px_0px_hsl(var(--chorke-dark-text))] hover:shadow-[6px_6px_0px_hsl(var(--chorke-dark-text))]",
          bgColorClass,
          "rounded-none"
        )}>
          <div className="relative mb-4">
            <Icon className={cn("h-10 w-10 mb-3 transition-transform duration-300 group-hover:scale-110", iconColorClass)} />
          </div>
          <h3 className={cn("text-xl font-bold mb-2 font-heading", textColorClass)}>{title}</h3>
          <p className={cn("text-sm flex-grow mb-4 font-sans opacity-90", textColorClass)}>{description}</p>
          <div>
            <h4 className={cn("text-xs font-semibold mb-2 uppercase tracking-wider font-sans opacity-70", textColorClass)}>Popular tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className={cn("text-xs font-medium px-3 py-1 border border-chorke-dark-text bg-white/80 text-chorke-dark-text hover:bg-chorke-dark-text hover:text-white hover:border-white transition-all duration-150 cursor-pointer font-sans no-underline rounded-none")}>{tag}</span>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};


const services = [
  { title: "Dashboard", description: "Your financial overview at a glance.", icon: LayoutGrid, tags: ["Summary", "Overview", "Insights"], href: "/dashboard", bgColorClass: "bg-chorke-green" },
  { title: "Smart Budgeting", description: "Take control of your spending with intuitive budgeting tools.", icon: HandCoins, tags: ["Monthly", "Tracking", "Savings"], href: "/budget", bgColorClass: "bg-chorke-yellow" },
  { title: "Expense Tracking", description: "Log and categorize your expenses effortlessly.", icon: ListChecks, tags: ["Daily Reports", "Categories"], href: "/expenses", bgColorClass: "bg-chorke-pink" },
  { title: "Goal-Oriented Savings", description: "Set, track, and achieve your financial goals faster.", icon: PiggyBank, tags: ["Vacation", "Emergency", "Retirement"], href: "/savings-goals", bgColorClass: "bg-chorke-blue" },
  { title: "Investment Portfolio", description: "Monitor your investments and grow your wealth.", icon: Landmark, tags: ["Stocks", "Crypto", "Growth"], href: "/investments", bgColorClass: "bg-chorke-green" },
  { title: "Emergency Fund", description: "Build and track your safety net.", icon: ShieldAlert, tags: ["Safety", "Security", "Peace of Mind"], href: "/emergency-fund", bgColorClass: "bg-chorke-yellow" },
  { title: "Tax Planning", description: "Estimate and plan for your taxes with ease.", icon: FileText, tags: ["Estimates", "Deductions"], href: "/tax-planner", bgColorClass: "bg-chorke-pink" },
  { title: "AI Financial Advisor", description: "Get personalized insights and advice to optimize your finances.", icon: Lightbulb, tags: ["Personalized", "Tips", "Automation"], href: "/ai-assistant", bgColorClass: "bg-chorke-blue" },
];

const partners = ['PayPal', 'Visa', 'Mastercard', 'Stripe', 'Wise', 'American Express', 'Google Pay'];

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  id?: string;
  showShapes?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className, bgClassName = "bg-chorke-dark-bg", id, showShapes = false }) => {
  return (
    <section id={id} className={cn("py-16 md:py-24 relative", bgClassName, className)}>
      {showShapes && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-chorke-accent-yellow/10 rounded-full -z-10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-chorke-accent-pink/10 rounded-lg transform rotate-45 -z-10"
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}
      <div className="container-default relative z-10">
        {children}
      </div>
    </section>
  );
};

const planSteps = [
  { step: 1, title: "Set Your Goals", description: "Define your financial objetives", icon: Target, borderColor: "border-chorke-accent-yellow", iconColor: "text-chorke-accent-yellow", badgeBg: "bg-chorke-accent-yellow" },
  { step: 2, title: "Get a Tailored Action Plan", description: "Receive a step-by-step plan", icon: BarChartBig, borderColor: "border-chorke-accent-green", iconColor: "text-chorke-accent-green", badgeBg: "bg-chorke-accent-green" },
  { step: 3, title: "Track What Works", description: "Adjust and optimize your plan", icon: TrendingUp, borderColor: "border-chorke-accent-pink", iconColor: "text-chorke-accent-pink", badgeBg: "bg-chorke-accent-pink" },
  { step: 4, title: "Achieve & Grow", description: "Celebrate milestones and continue building your financial future.", icon: Award, borderColor: "border-chorke-accent-blue", iconColor: "text-chorke-accent-blue", badgeBg: "bg-chorke-accent-blue" },
];


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-chorke-dark-bg text-chorke-text-primary">
      <main className="flex-grow">
        {/* Hero Section */}
        <SectionWrapper bgClassName="bg-chorke-dark-bg" showShapes className="pt-24 md:pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-heading text-chorke-accent-yellow">
                Master Your Money with <span className="text-chorke-text-primary">FinCo</span>
              </h1>
              <p className="text-lg text-chorke-text-secondary max-w-xl">
                Track your income, budget smarter, save with purpose, and grow your wealth. FinCo provides the tools and insights you need for a brighter financial future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started" passHref className="no-underline">
                  <Button variant="default" className="chorke-button-solid w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mt-12 lg:mt-0"
            >
              <div className="absolute -top-8 -left-8 w-20 h-20 bg-chorke-accent-pink/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-chorke-accent-green/20 rounded-lg transform rotate-12 animate-pulse delay-500"></div>
              <Image
                src="https://placehold.co/600x500.png"
                alt="Financial planning dashboard and charts"
                width={600}
                height={500}
                className="rounded-lg shadow-xl z-10 relative border-2 border-chorke-card-border"
                priority
                data-ai-hint="financial planning dashboard"
              />
            </motion.div>
          </div>
        </SectionWrapper>

         {/* Why Choose Fin.Co Section */}
        <SectionWrapper id="why-finco" bgClassName="bg-chorke-card-bg" showShapes>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-heading text-chorke-accent-yellow">Why Smart People Choose Fin.Co</h2>
            <p className="text-lg text-chorke-text-secondary max-w-2xl mx-auto mb-12">
              We're not just another finance app. We're your dedicated partner in achieving financial freedom.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                { icon: Package, title: "All-In-One Simplicity", description: "Budgeting, expenses, goals, investments, and taxes – everything seamlessly integrated. No more app-hopping!" },
                { icon: BrainCircuit, title: "AI-Powered Brilliance", description: "Our intelligent assistant offers personalized insights, automates tasks, and helps you make smarter financial decisions." },
                { icon: ShieldCheck, title: "Secure & Transparent", description: "Bank-level security to protect your data. Clear, honest features with no hidden fees." },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="chorke-card group border-2 border-transparent hover:border-chorke-accent-yellow"
                  >
                    <Icon className="h-10 w-10 text-chorke-accent-yellow mb-4" />
                    <h3 className="text-xl font-bold mb-2 font-heading text-chorke-text-primary">{item.title}</h3>
                    <p className="text-chorke-text-secondary group-hover:text-chorke-accent-yellow transition-colors duration-200">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        {/* Partners Section */}
        <SectionWrapper id="partners" bgClassName="bg-chorke-dark-bg">
          <div className="text-center">
            <h3 className="text-sm text-chorke-text-secondary uppercase tracking-wider font-semibold mb-8">Trusted by Leading Financial Companies</h3>
            <div className="partner-slider-container">
              <div className="partner-slider-track">
                {[...partners, ...partners].map((partner, index) => (
                  <div key={`${partner}-${index}`} className="text-chorke-text-secondary hover:text-chorke-text-primary transition-colors flex-shrink-0 px-6 sm:px-10 py-2">
                    <span className="text-xl sm:text-2xl font-medium">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Explore Our Core Features Section */}
        <SectionWrapper id="services" bgClassName="bg-chorke-card-bg" showShapes>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-heading text-chorke-accent-yellow">Explore Our Core Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </SectionWrapper>

        {/* Potential Savings Section */}
        <SectionWrapper id="savings-potential" bgClassName="bg-chorke-dark-bg" showShapes>
          <div className="container-default text-center relative">
            <div className="absolute top-[5%] left-[10%] w-16 h-16 sm:w-20 sm:h-20 z-0">
                <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                    <CircleDollarSign className="w-full h-full text-chorke-accent-pink opacity-70" />
                </motion.div>
            </div>
            <div className="absolute top-[10%] right-[12%] w-12 h-12 sm:w-16 sm:h-16 z-0">
                <motion.div animate={{ y: [0, 8, 0], x: [0, 3, -3, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}>
                    <GraduationCap className="w-full h-full text-chorke-accent-blue opacity-70" />
                </motion.div>
            </div>
            <div className="absolute bottom-[15%] left-[15%] w-10 h-10 sm:w-12 sm:h-12 z-0">
                <motion.div animate={{ x: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}>
                    <Cloud className="w-full h-full text-chorke-text-secondary opacity-60" />
                </motion.div>
            </div>
             <div className="absolute top-[20%] right-[5%] w-14 h-14 sm:w-16 sm:h-16 z-0">
                <motion.div animate={{ y: [0, -8, 0], rotate: [0, -6, 6, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}>
                   <PiggyBank className="w-full h-full text-chorke-accent-green opacity-70" />
                </motion.div>
            </div>
             <div className="absolute bottom-[20%] right-[20%] w-12 h-12 sm:w-14 sm:h-14 z-0">
                <motion.div animate={{ x: [0, -5, 5, 0], scale: [1, 0.95, 1] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}>
                    <Landmark className="w-full h-full text-chorke-accent-yellow opacity-70" />
                </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-chorke-text-primary mb-4 font-heading relative z-10"
            >
              $1,234,567
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-chorke-text-secondary max-w-2xl mx-auto mb-12 font-sans relative z-10"
            >
              Potential annual savings our users achieve with Fin.Co!
            </motion.p>
            <div className="mt-8">
              <Image
                src="https://storage.googleapis.com/idx-dev-fe-plugin-ai-test-assets/01J3Y6N12P55GSJBDY71G3P981.png"
                alt="Cartoon illustration of people achieving financial goals: one running debt-free, one celebrating with money, one investing on a laptop"
                width={900}
                height={450}
                className="rounded-lg shadow-xl mx-auto w-full max-w-[900px] border-2 border-chorke-card-border"
                data-ai-hint="financial success debt-free saving investing"
              />
            </div>
          </div>
        </SectionWrapper>

        {/* Your 4-Step Personalized Financial Plan Section */}
        <SectionWrapper id="financial-plan" bgClassName="bg-chorke-card-bg" showShapes>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 font-heading text-chorke-accent-yellow">
            Your 4-Step Personalized Financial Plan
          </h2>
          <p className="text-lg text-chorke-text-secondary max-w-2xl mx-auto mb-16 text-center">
            Follow these simple steps to take control of your finances and achieve your dreams with Fin.Co.
          </p>
          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
              <div className="w-[calc(100%-4rem)] h-[calc(100%-4rem)] sm:w-[520px] sm:h-[520px] border-[10px] border-chorke-accent-yellow/20 rounded-full opacity-70"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 lg:gap-x-16 lg:gap-y-16 relative z-10 justify-items-center">
              {planSteps.map((step, index) => {
                const StepIcon = step.icon;
                // Order for clockwise: Step 1 (Top-Left), Step 2 (Top-Right), Step 3 (Bottom-Right), Step 4 (Bottom-Left)
                const cardOrder = [0, 1, 3, 2]; // Maps step index to visual grid order
                const stepData = planSteps[cardOrder[index]];

                return (
                  <motion.div
                    key={stepData.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full max-w-xs h-full"
                  >
                    <div className={cn(
                        "relative bg-chorke-dark-bg p-6 rounded-none shadow-lg text-center flex flex-col items-center justify-start border-2 hover:shadow-2xl hover:border-chorke-text-primary transition-all duration-300 h-full",
                        stepData.borderColor
                    )}>
                      <div className={cn(
                        "absolute -top-3 -left-3 h-8 w-8 rounded-full flex items-center justify-center text-chorke-dark-text font-bold text-sm shadow-md",
                        stepData.badgeBg
                      )}>
                        {stepData.step}
                      </div>
                      <StepIcon className={cn("h-10 w-10 my-4", stepData.iconColor)} />
                      <h3 className="text-xl font-bold mb-2 font-heading text-chorke-text-primary">{stepData.title}</h3>
                      <p className="text-sm text-chorke-text-secondary flex-grow">{stepData.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {/* Arrows for visual flow - adjusted for clockwiseness */}
            <div className="hidden md:block absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%_+_2.5rem)] z-0">
                <ChevronRight className="h-8 w-8 text-chorke-text-secondary opacity-70" />
            </div>
            <div className="hidden md:block absolute top-1/2 right-[calc(25%_-_2rem)] transform translate-x-1/2 -translate-y-1/2 z-0">
                <ChevronDown className="h-8 w-8 text-chorke-text-secondary opacity-70" />
            </div>
             <div className="hidden md:block absolute bottom-[25%] left-1/2 transform -translate-x-1/2 translate-y-[calc(50%_+_2.5rem)] z-0 rotate-180">
                <ChevronRight className="h-8 w-8 text-chorke-text-secondary opacity-70 transform -scale-x-100" />
            </div>
             <div className="hidden md:block absolute top-1/2 left-[calc(25%_-_2rem)] transform -translate-x-1/2 -translate-y-1/2 z-0 rotate-180">
                <ChevronDown className="h-8 w-8 text-chorke-text-secondary opacity-70 transform -scale-y-100" />
            </div>
          </div>
        </SectionWrapper>

        {/* Join Us Section (CTA) */}
        <SectionWrapper id="join-cta" bgClassName="bg-chorke-accent-yellow" showShapes>
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-6 font-heading text-chorke-dark-text"
            >
              Join FinCo Today and Take Control of Your Financial Journey.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg mb-8 text-chorke-dark-text/80"
            >
              Sign up for free and start mastering your money with our intuitive tools and AI-powered insights.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/get-started" passHref className="no-underline">
                 <Button variant="default" className="chorke-button-outline !border-chorke-dark-text !text-chorke-dark-text hover:!bg-chorke-dark-text hover:!text-chorke-accent-yellow">
                  Create Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </SectionWrapper>
      </main>

       <footer className="bg-chorke-card-bg text-chorke-text-secondary py-12 sm:py-16 border-t-2 border-chorke-card-border">
        <div className="container-default">
          <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-10">
            <div className="lg:pr-8">
              <Link href="/" className="flex items-center space-x-2 no-underline mb-4">
                <CircleDollarSign className="h-8 w-8 text-chorke-accent-yellow" />
                <span className="text-2xl font-bold font-heading text-chorke-text-primary">FinCo</span>
              </Link>
              <p className="text-sm">Get weekly financial tips and FinCo updates straight to your inbox.</p>
              <form className="mt-4 flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="retro-input !bg-chorke-dark-bg !border-chorke-card-border !text-chorke-text-primary !placeholder-chorke-text-secondary focus:!ring-chorke-accent-yellow focus:!border-chorke-accent-yellow flex-grow !h-11 !border-r-0 !rounded-none"
                  aria-label="Email for newsletter"
                />
                 <Button type="submit" variant="default" className="chorke-button-solid !rounded-none !h-11 !border-l-0 !px-3">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>

            <div>
              <h4 className="text-base font-semibold text-chorke-text-primary mb-4 font-heading">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#services" className="hover:text-chorke-accent-yellow transition-colors no-underline text-sm">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-chorke-accent-yellow transition-colors no-underline text-sm">Pricing</Link></li>
                <li><Link href="/about" className="hover:text-chorke-accent-yellow transition-colors no-underline text-sm">About</Link></li>
                <li><Link href="/careers" className="hover:text-chorke-accent-yellow transition-colors no-underline text-sm">Careers</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="text-base font-semibold text-chorke-text-primary mb-4 font-heading">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="hover:text-chorke-accent-yellow transition-colors no-underline text-sm">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-chorke-accent-yellow transition-colors no-underline text-sm">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-chorke-accent-yellow transition-colors no-underline text-sm">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold text-chorke-text-primary mb-4 font-heading">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="hover:text-chorke-accent-yellow transition-colors no-underline text-sm">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-chorke-accent-yellow transition-colors no-underline text-sm">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-chorke-accent-yellow transition-colors no-underline text-sm">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-chorke-card-border pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="text-chorke-text-secondary/70 mb-4 sm:mb-0">&copy; {new Date().getFullYear()} FinCo. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="text-chorke-text-secondary/70 hover:text-chorke-accent-yellow transition-colors no-underline"><Twitter className="h-5 w-5"/></Link>
              <Link href="#" aria-label="YouTube" className="text-chorke-text-secondary/70 hover:text-chorke-accent-yellow transition-colors no-underline"><Youtube className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Instagram" className="text-chorke-text-secondary/70 hover:text-chorke-accent-yellow transition-colors no-underline"><Instagram className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Facebook" className="text-chorke-text-secondary/70 hover:text-chorke-accent-yellow transition-colors no-underline"><Facebook className="h-5 w-5"/></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

```