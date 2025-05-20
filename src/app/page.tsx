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
  TrendingUp,
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
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils'; // Make sure cn is imported

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
          "rounded-none" // Ensure no rounded corners for cards
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
                <span key={tag} className={cn("text-xs font-medium px-3 py-1 border border-chorke-dark-text bg-white/80 text-chorke-dark-text hover:bg-chorke-dark-text hover:text-white hover:border-white transition-all duration-150 cursor-pointer font-sans no-underline", "rounded-none")}>{tag}</span>
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
  { title: "Budgeting", description: "Take control with intuitive budgeting tools.", icon: HandCoins, tags: ["Monthly", "Tracking", "Savings"], href: "/budget", bgColorClass: "bg-chorke-yellow" },
  { title: "Expenses", description: "Log and categorize expenses effortlessly.", icon: ListChecks, tags: ["Reports", "Categories", "Analysis"], href: "/expenses", bgColorClass: "bg-chorke-pink" },
  { title: "Savings Goals", description: "Set, track, and achieve financial goals faster.", icon: PiggyBank, tags: ["Vacation", "Emergency", "Retirement"], href: "/savings-goals", bgColorClass: "bg-chorke-blue" },
  { title: "Investments", description: "Monitor investments and grow your wealth.", icon: Landmark, tags: ["Stocks", "Crypto", "Growth"], href: "/investments", bgColorClass: "bg-chorke-green" },
  { title: "Emergency Fund", description: "Build and track your safety net.", icon: ShieldAlert, tags: ["Safety", "Security", "Peace of Mind"], href: "/emergency-fund", bgColorClass: "bg-chorke-yellow" },
  { title: "Tax Planner", description: "Estimate and plan for your taxes with ease.", icon: FileText, tags: ["Estimates", "Deductions", "Planning"], href: "/tax-planner", bgColorClass: "bg-chorke-pink" },
  { title: "AI Assistant", description: "Personalized insights to optimize finances.", icon: Lightbulb, tags: ["Tips", "Automation", "Guidance"], href: "/ai-assistant", bgColorClass: "bg-chorke-blue" },
];

const partners = ['PayPal', 'Visa', 'Mastercard', 'Stripe', 'Wise', 'American Express', 'Google Pay'];

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  id?: string;
  showShapes?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className, bgClassName = "bg-background", id, showShapes = false }) => {
  return (
    <section id={id} className={cn("py-16 md:py-24 relative", bgClassName, className)}>
      {showShapes && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full -z-10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent/10 rounded-lg transform rotate-45 -z-10"
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
  { step: 1, title: "Set Your Goals", description: "Define your financial objetives", icon: Target, borderColor: "border-orange-500", iconColor: "text-orange-500", badgeBg: "bg-orange-500" },
  { step: 2, title: "Get a Tailored Action Plan", description: "Receive a step-by-step plan", icon: BarChartBig, borderColor: "border-blue-500", iconColor: "text-blue-500", badgeBg: "bg-blue-500" },
  { step: 3, title: "Track What Works", description: "Adjust and optimize your plan", icon: TrendingUp, borderColor: "border-purple-500", iconColor: "text-purple-500", badgeBg: "bg-purple-500" },
  { step: 4, title: "Achieve & Grow", description: "Celebrate milestones and continue building your financial future.", icon: Award, borderColor: "border-green-500", iconColor: "text-green-500", badgeBg: "bg-green-500" },
];


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <main className="flex-grow">
        {/* Hero Section */}
        <SectionWrapper bgClassName="bg-gradient-to-br from-background to-primary/5" showShapes className="pt-24 md:pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-heading">
                Master Your Money with <span className="text-primary">FinCo</span>
              </h1>
              <p className="text-lg text-foreground/80 max-w-xl">
                Track your income, budget smarter, save with purpose, and grow your wealth. FinCo provides the tools and insights you need for a brighter financial future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/get-started" passHref className="no-underline">
                  <Button size="lg" variant="primary" className="btn-primary w-full sm:w-auto">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#services" passHref className="no-underline">
                  <Button size="lg" variant="outline" className="btn-outline-primary w-full sm:w-auto">
                    Discover Features
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
              <div className="absolute -top-8 -left-8 w-20 h-20 bg-accent/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-secondary/20 rounded-lg transform rotate-12 animate-pulse delay-500"></div>
              <Image
                src="https://placehold.co/600x500.png"
                alt="Financial planning dashboard and charts"
                width={600}
                height={500}
                className="rounded-lg shadow-xl z-10 relative"
                priority
                data-ai-hint="financial planning dashboard"
              />
               <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-10 -left-10 sm:-left-16 bg-card p-4 rounded-lg shadow-2xl w-60 sm:w-72 z-20 border border-border"
              >
                <CardHeader className="p-0 mb-2 !bg-transparent !border-0">
                  <CardTitle className="text-sm font-semibold text-primary">AI Data Insights</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-xs text-muted-foreground !border-0">
                  <p>Unlock reports and insights to maximize your financial health.</p>
                  <Link href="/ai-assistant" className="text-primary mt-2 inline-block text-xs font-medium link-underline no-underline hover:text-primary/80">Explore AI Features <ArrowRight className="inline h-3 w-3" /></Link>
                </CardContent>
              </motion.div>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Why Choose Fin.Co Section */}
        <SectionWrapper id="why-finco" bgClassName="bg-background" showShapes>
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-heading">Why Smart People Choose Fin.Co</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-12">
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
                    className="p-6 bg-card rounded-none shadow-lg finco-card transition-all duration-200 border-2 border-border hover:border-primary group"
                  >
                    <Icon className="h-10 w-10 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2 font-heading">{item.title}</h3>
                    <p className="text-foreground/70 group-hover:text-primary transition-colors duration-200">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        {/* Partners Section */}
        <SectionWrapper id="partners" bgClassName="bg-muted/50">
          <div className="text-center">
            <h3 className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-8">Trusted by Leading Financial Companies</h3>
            <div className="partner-slider-container">
              <div className="partner-slider-track">
                {[...partners, ...partners].map((partner, index) => (
                  <div key={`${partner}-${index}`} className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 px-6 sm:px-10 py-2">
                    <span className="text-xl sm:text-2xl font-medium">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Explore Our Core Features Section */}
        <SectionWrapper id="services" bgClassName="bg-background" showShapes>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-heading">Explore Our Core Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </SectionWrapper>

         {/* Potential Savings Section */}
        <SectionWrapper id="savings-potential" bgClassName="bg-amber-50 text-gray-800" showShapes>
          <div className="container-default text-center relative">
            <div className="absolute top-[5%] left-[10%] w-16 h-16 sm:w-20 sm:h-20 z-0">
                <motion.div animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                    <CircleDollarSign className="w-full h-full text-pink-400 opacity-70" />
                </motion.div>
            </div>
            <div className="absolute top-[10%] right-[12%] w-12 h-12 sm:w-16 sm:h-16 z-0">
                <motion.div animate={{ y: [0, 8, 0], x: [0, 3, -3, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}>
                    <GraduationCap className="w-full h-full text-blue-400 opacity-70" />
                </motion.div>
            </div>
            <div className="absolute bottom-[15%] left-[15%] w-10 h-10 sm:w-12 sm:h-12 z-0">
                <motion.div animate={{ x: [0, 5, -5, 0], scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}>
                    <Cloud className="w-full h-full text-gray-400 opacity-60" />
                </motion.div>
            </div>
             <div className="absolute top-[20%] right-[5%] w-14 h-14 sm:w-16 sm:h-16 z-0">
                <motion.div animate={{ y: [0, -8, 0], rotate: [0, -6, 6, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}>
                   <PiggyBank className="w-full h-full text-pink-500 opacity-70" />
                </motion.div>
            </div>
             <div className="absolute bottom-[20%] right-[20%] w-12 h-12 sm:w-14 sm:h-14 z-0">
                <motion.div animate={{ x: [0, -5, 5, 0], scale: [1, 0.95, 1] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }}>
                    <Landmark className="w-full h-full text-yellow-600 opacity-70" />
                </motion.div>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-4 font-heading relative z-10"
            >
              $1,234,567
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-12 font-sans relative z-10"
            >
              Potential annual savings our users achieve with Fin.Co!
            </motion.p>
            <div className="mt-8">
              <Image
                src="https://storage.googleapis.com/idx-dev-fe-plugin-ai-test-assets/01J3Y6N12P55GSJBDY71G3P981.png"
                alt="Cartoon illustration of people achieving financial goals: one running debt-free, one celebrating with money, one investing on a laptop"
                width={900}
                height={450} // Adjusted for a 2:1 aspect ratio if 900 width is desired
                className="rounded-lg shadow-xl mx-auto w-full max-w-[900px]"
                data-ai-hint="financial success debt-free saving investing"
              />
            </div>
          </div>
        </SectionWrapper>


        {/* Your 4-Step Personalized Financial Plan Section */}
        <SectionWrapper id="financial-plan" bgClassName="bg-background" showShapes>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 font-heading">
            Your 4-Step Personalized Financial Plan
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-16 text-center">
            Follow these simple steps to take control of your finances and achieve your dreams with Fin.Co.
          </p>
          <div className="relative max-w-4xl mx-auto">
            <div className="hidden md:block absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
              <div className="w-[calc(100%-4rem)] h-[calc(100%-4rem)] sm:w-[520px] sm:h-[520px] border-[10px] border-primary/10 rounded-full opacity-70"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 lg:gap-x-16 lg:gap-y-16 relative z-10 justify-items-center">
              {[planSteps[0], planSteps[1], planSteps[3], planSteps[2]].map((step, index) => { // Order for clockwise: 1, 2, 4 (bottom-left), 3 (bottom-right)
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="w-full max-w-xs h-full" // Ensure cards can take full height
                  >
                    <div className={cn(
                        "relative bg-card p-6 rounded-none shadow-lg text-center flex flex-col items-center justify-start border-2 hover:shadow-xl transition-shadow h-full",
                        step.borderColor
                    )}>
                      <div className={cn(
                        "absolute -top-3 -left-3 h-8 w-8 rounded-full flex items-center justify-center text-black font-bold text-sm shadow-md",
                        step.badgeBg
                      )}>
                        {step.step}
                      </div>
                      <StepIcon className={cn("h-10 w-10 my-4", step.iconColor)} />
                      <h3 className="text-xl font-bold mb-2 font-heading text-foreground">{step.title}</h3>
                      <p className="text-sm text-foreground/70 flex-grow">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {/* Arrows for visual flow */}
            <div className="hidden md:block absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%_+_2.5rem)] z-0">
                <ChevronRight className="h-8 w-8 text-gray-400 opacity-70" />
            </div>
            <div className="hidden md:block absolute top-1/2 right-[calc(25%_-_2rem)] transform translate-x-1/2 -translate-y-1/2 z-0">
                <ChevronDown className="h-8 w-8 text-gray-400 opacity-70" />
            </div>
             <div className="hidden md:block absolute bottom-[25%] left-1/2 transform -translate-x-1/2 translate-y-[calc(50%_+_2.5rem)] z-0 rotate-180">
                <ChevronLeft className="h-8 w-8 text-gray-400 opacity-70" />
            </div>
             <div className="hidden md:block absolute top-1/2 left-[calc(25%_-_2rem)] transform -translate-x-1/2 -translate-y-1/2 z-0 rotate-180">
                <ChevronUp className="h-8 w-8 text-gray-400 opacity-70" />
            </div>
          </div>
        </SectionWrapper>

        {/* Join Us Section (CTA) */}
        <SectionWrapper id="join-cta" bgClassName="bg-gradient-to-r from-accent/10 via-secondary/5 to-primary/10" showShapes>
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-6 font-heading"
            >
              Join FinCo Today and Take Control of Your Financial Journey.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg mb-8 text-foreground/70"
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
                 <Button size="lg" variant="primary" className="btn-primary">
                  Create Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </SectionWrapper>
      </main>

       <footer className="bg-foreground text-background/80 py-12 sm:py-16">
        <div className="container-default">
          <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-10">
            <div className="lg:pr-8">
              <Link href="/" className="flex items-center space-x-2 no-underline mb-4">
                <CircleDollarSign className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-heading text-background">FinCo</span>
              </Link>
              <p className="text-sm">Get weekly financial tips and FinCo updates straight to your inbox.</p>
              <form className="mt-4 flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-background/10 border-background/20 text-background placeholder-background/60 rounded-none focus:ring-primary focus:border-primary flex-grow !h-11 !border-r-0"
                  aria-label="Email for newsletter"
                />
                 <Button type="submit" variant="primary" className="btn-primary !rounded-none !h-11 !border-l-0 !px-3">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>

            <div>
              <h4 className="text-base font-semibold text-background mb-4 font-heading">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#services" className="hover:text-primary transition-colors no-underline text-sm">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-primary transition-colors no-underline text-sm">Pricing</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors no-underline text-sm">About</Link></li>
                <li><Link href="/careers" className="hover:text-primary transition-colors no-underline text-sm">Careers</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="text-base font-semibold text-background mb-4 font-heading">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/blog" className="hover:text-primary transition-colors no-underline text-sm">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors no-underline text-sm">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-primary transition-colors no-underline text-sm">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold text-background mb-4 font-heading">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="hover:text-primary transition-colors no-underline text-sm">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors no-underline text-sm">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors no-underline text-sm">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="text-background/70 mb-4 sm:mb-0">&copy; {new Date().getFullYear()} FinCo. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="text-background/70 hover:text-primary transition-colors no-underline"><Twitter className="h-5 w-5"/></Link>
              <Link href="#" aria-label="YouTube" className="text-background/70 hover:text-primary transition-colors no-underline"><Youtube className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Instagram" className="text-background/70 hover:text-primary transition-colors no-underline"><Instagram className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Facebook" className="text-background/70 hover:text-primary transition-colors no-underline"><Facebook className="h-5 w-5"/></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
