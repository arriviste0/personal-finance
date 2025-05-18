
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

const services = [
  {
    title: "Smart Budgeting",
    description: "Take control of your spending with intuitive budgeting tools. Set limits, track progress, and achieve financial clarity.",
    icon: HandCoins,
    tags: ["monthly budget", "category tracking", "spending limits"],
    bgColorClass: "bg-[#2EC4B6]", // Teal
    iconColorClass: "text-white",
    textColorClass: "text-white",
    href: "/budget"
  },
  {
    title: "Goal-Oriented Savings",
    description: "Define your financial goals, from vacations to down payments, and watch your savings grow with automated tracking.",
    icon: PiggyBank,
    tags: ["dream vacation", "new home", "education fund"],
    bgColorClass: "bg-[#FF6B6B]", // Red
    iconColorClass: "text-white",
    textColorClass: "text-white",
    href: "/savings-goals"
  },
  {
    title: "AI Financial Advisor",
    description: "Get personalized insights, spending analysis, and proactive tips from our intelligent AI assistant to optimize your finances.",
    icon: Lightbulb,
    tags: ["smart insights", "spending analysis", "proactive tips"],
    bgColorClass: "bg-[#FFD166]", // Yellow
    iconColorClass: "text-black",
    textColorClass: "text-black",
    href: "/ai-assistant"
  },
  {
    title: "Expense Tracking",
    description: "Log every penny with ease. Categorize expenses, view trends, and understand where your money goes.",
    icon: ListChecks,
    tags: ["receipt scan", "categorization", "spending reports"],
    bgColorClass: "bg-[#F79F79]", // Light Orange/Peach
    iconColorClass: "text-black",
    textColorClass: "text-black",
    href: "/expenses"
  },
  {
    title: "Tax Planning",
    description: "Estimate your tax liability, track deductions, and get ready for tax season with our helpful planning tools.",
    icon: FileText,
    tags: ["tax estimate", "deductions", "IRS forms"],
    bgColorClass: "bg-[#A0C4FF]", // Light Blue
    iconColorClass: "text-black",
    textColorClass: "text-black",
    href: "/tax-planner"
  },
  {
    title: "Investment Portfolio",
    description: "Monitor your stocks, mutual funds, crypto, and other investments all in one place. Make informed decisions.",
    icon: Landmark,
    tags: ["stocks", "crypto", "portfolio overview"],
    bgColorClass: "bg-[#BDB2FF]", // Lavender
    iconColorClass: "text-black",
    textColorClass: "text-black",
    href: "/investments"
  },
];

const partners = ['PayPal', 'Visa', 'Mastercard', 'Stripe', 'Wise', 'American Express', 'Google Pay'];

const CheckCircle = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "h-5 w-5"}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06l-3.894 3.893-1.7-1.7a.75.75 0 0 0-1.06 1.061l2.25 2.25a.75.75 0 0 0 1.06 0l4.5-4.5Z" clipRule="evenodd" />
  </svg>
);

const planSteps = [
  {
    step: 1,
    title: "Set Your Goals",
    description: "Define your financial objetives",
    icon: Target,
    borderColor: "border-orange-500",
    iconColor: "text-orange-500",
    badgeBg: "bg-orange-500",
  },
  {
    step: 2,
    title: "Get a Tailored Action Plan",
    description: "Receive a step-by-step plan",
    icon: BarChartBig,
    borderColor: "border-blue-500",
    iconColor: "text-blue-500",
    badgeBg: "bg-blue-500",
  },
  {
    step: 3,
    title: "Track What Works",
    description: "Adjust and optimize your plan",
    icon: TrendingUp,
    borderColor: "border-purple-500",
    iconColor: "text-purple-500",
    badgeBg: "bg-purple-500",
  },
  {
    step: 4,
    title: "Achieve & Grow",
    description: "Celebrate milestones and continue building your financial future.",
    icon: Award,
    borderColor: "border-green-500",
    iconColor: "text-green-500",
    badgeBg: "bg-green-500",
  },
];


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-amber-50 text-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight font-sans">
                    Invest Your <span className="text-yellow-500">Money</span> Wisely Towards The <span className="text-green-600">Future</span>
                    </h1>
                    <p className="text-lg text-gray-700 max-w-xl font-sans">
                    We empower you to transform your financial landscape, providing a seamless experience in managing your finances for a prosperous tomorrow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/get-started" passHref className="no-underline">
                        <Button className="bg-white text-black hover:bg-yellow-400 hover:text-black font-semibold py-3 px-6 text-base rounded-md shadow-md transition-transform hover:scale-105 retro-button">
                        Get Started Free
                        </Button>
                    </Link>
                    <Link href="#services" passHref className="no-underline">
                        <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold py-3 px-6 text-base rounded-md shadow-md transition-transform hover:scale-105 retro-button">
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
                    <div className="absolute -top-8 -left-8 w-20 h-20 bg-yellow-300 rounded-full opacity-30 animate-pulse"></div>
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-green-300 rounded-lg opacity-30 transform rotate-12 animate-pulse delay-500"></div>
                    <Image
                    src="https://placehold.co/600x500.png"
                    alt="Financial Growth and Planning"
                    width={600}
                    height={500}
                    className="rounded-lg shadow-xl z-10 relative"
                    priority
                    data-ai-hint="financial planning future"
                    />
                    <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="absolute -bottom-10 -left-10 sm:-left-16 bg-orange-400 text-white p-4 rounded-lg shadow-2xl w-60 sm:w-72 z-20 retro-card"
                    >
                    <CardHeader className="p-0 mb-2 !bg-transparent !border-0">
                        <CardTitle className="text-sm font-semibold !text-white font-sans">AI Data Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 text-xs !border-0 font-sans">
                        <p>Unlock reports and insights to maximize your financial health and achieve your goals faster.</p>
                        <Link href="/ai-assistant" className="text-white mt-2 inline-block text-xs font-sans link-underline no-underline hover:text-gray-200">Explore AI Features <ArrowRight className="inline h-3 w-3" /></Link>
                    </CardContent>
                    </motion.div>
                    <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg z-20 flex items-center space-x-2"
                    >
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    <div>
                        <p className="text-xs font-semibold font-sans">Grow Your</p>
                        <p className="text-xs text-gray-500 font-sans">Wealth Today</p>
                    </div>
                    </motion.div>
                </motion.div>
                </div>
            </div>
        </section>

        {/* Why Choose Fin.Co Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-sans text-gray-800">Why Smart People Choose Fin.Co</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 font-sans">
              We're not just another finance app. We're your dedicated partner in achieving financial freedom.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="p-6 bg-card rounded-xl shadow-retro transition-all duration-200 border-2 border-transparent hover:border-yellow-500 group">
                <Package className="h-10 w-10 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 font-sans">All-In-One Simplicity</h3>
                <p className="text-gray-600 font-sans group-hover:text-yellow-500 transition-colors duration-200">Budgeting, expenses, goals, investments, and taxes – everything seamlessly integrated. No more app-hopping!</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="p-6 bg-card rounded-xl shadow-retro transition-all duration-200 border-2 border-transparent hover:border-yellow-500 group">
                <BrainCircuit className="h-10 w-10 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 font-sans">AI-Powered Brilliance</h3>
                <p className="text-gray-600 font-sans group-hover:text-yellow-500 transition-colors duration-200">Our intelligent assistant offers personalized insights, automates tasks, and helps you make smarter financial decisions.</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="p-6 bg-card rounded-xl shadow-retro transition-all duration-200 border-2 border-transparent hover:border-yellow-500 group">
                <ShieldCheck className="h-10 w-10 text-yellow-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 font-sans">Secure & Transparent</h3>
                <p className="text-gray-600 font-sans group-hover:text-yellow-500 transition-colors duration-200">Bank-level security to protect your data. Clear, honest features with no hidden fees.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground uppercase tracking-wider font-sans mb-8">Trusted by leading financial companies</p>
            <div className="partner-slider-container">
              <div className="partner-slider-track">
                {[...partners, ...partners].map((partner, index) => (
                  <div key={`${partner}-${index}`} className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 px-5 sm:px-8 py-2">
                    <span className="text-xl sm:text-2xl font-medium font-sans">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Explore Our Core Features Section */}
        <section id="services" className="py-16 sm:py-24 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-sans">Explore Our Core Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <motion.div key={service.title} whileHover={{ y: -5, boxShadow: "6px 6px 0px #000" }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link href={service.href} passHref className="no-underline">
                      <Card className={`border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] flex flex-col h-full p-6 transition-all duration-300 hover:shadow-[6px_6px_0px_#000] ${service.bgColorClass} group`}>
                        <div className="relative mb-4">
                          <IconComponent className={`h-12 w-12 ${service.iconColorClass} mb-3 transition-transform duration-300 group-hover:scale-110`} />
                        </div>
                        <h3 className={`text-xl font-bold mb-2 font-sans ${service.textColorClass}`}>{service.title}</h3>
                        <p className={`text-sm flex-grow mb-4 font-sans ${service.textColorClass} opacity-90`}>{service.description}</p>
                        <div>
                          <h4 className={`text-xs font-semibold mb-2 uppercase tracking-wider font-sans ${service.textColorClass} opacity-70`}>Popular tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.tags.map(tag => (
                               <span key={tag} className={`text-xs font-medium px-3 py-1 rounded-full border border-black bg-white text-black hover:bg-black hover:text-white hover:border-white transition-all duration-150 cursor-pointer font-sans no-underline`}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Potential Savings Section */}
        <section className="py-16 sm:py-24 bg-amber-50 text-gray-800 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 0.1 }} className="absolute top-[5%] left-[10%] w-16 h-16 sm:w-20 sm:h-20 z-0">
                <CircleDollarSign className="w-full h-full text-pink-400 opacity-70" />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1, y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.3 }} className="absolute top-[10%] right-[12%] w-12 h-12 sm:w-16 sm:h-16 z-0">
                  <GraduationCap className="w-full h-full text-blue-400 opacity-70" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[15%] left-[15%] w-10 h-10 sm:w-12 sm:h-12 z-0">
                  <Cloud className="w-full h-full text-gray-400 opacity-60" />
              </motion.div>
              <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }} transition={{ duration: 2.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: 0.2 }} className="absolute top-[20%] right-[5%] w-14 h-14 sm:w-16 sm:h-16 z-0">
                  <PiggyBank className="w-full h-full text-pink-500 opacity-70" />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: [0, -5, 0] }} transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.4 }} className="absolute bottom-[20%] right-[20%] w-12 h-12 sm:w-14 sm:h-14 z-0">
                  <Landmark className="w-full h-full text-yellow-600 opacity-70" />
              </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-4 font-sans relative z-10"
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
                height={300}
                className="rounded-lg shadow-xl mx-auto w-full max-w-[900px]"
                data-ai-hint="financial success debt-free saving investing"
              />
            </div>
          </div>
        </section>

        {/* Your 4-Step Personalized Financial Plan Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 font-sans text-gray-800">
              Your 4-Step Personalized Financial Plan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16 font-sans text-center">
              Follow these simple steps to take control of your finances and achieve your dreams with Fin.Co.
            </p>
            <div className="relative max-w-4xl mx-auto">
              {/* Background decorative circle */}
              <div className="hidden md:block absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
                <div className="w-[calc(100%-4rem)] h-[calc(100%-4rem)] sm:w-[520px] sm:h-[520px] border-[12px] border-yellow-100 rounded-full opacity-60"></div>
              </div>

              {/* Grid for the cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 lg:gap-x-16 lg:gap-y-16 relative z-10 justify-items-center">
                 {/* Mapping the planSteps: Step 1 (Top-Left), Step 2 (Top-Right), Step 4 (Bottom-Left), Step 3 (Bottom-Right for clockwise visual) */}
                {[planSteps[0], planSteps[1], planSteps[3], planSteps[2]].map((step, index) => {
                  const StepIcon = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="w-full max-w-xs h-full"
                    >
                      <div className={`relative bg-white p-6 rounded-xl border-2 ${step.borderColor} shadow-lg text-center flex flex-col items-center justify-start hover:shadow-xl transition-shadow h-full`}>
                        <div className={`absolute -top-3 -left-3 h-8 w-8 rounded-full ${step.badgeBg} flex items-center justify-center text-black font-bold text-sm shadow-md`}>
                          {step.step}
                        </div>
                        <StepIcon className={`h-10 w-10 ${step.iconColor} my-4`} />
                        <h3 className="text-xl font-bold mb-2 font-sans text-gray-800">{step.title.replace(`Step ${step.step}: `, '')}</h3>
                        <p className="text-sm text-gray-600 font-sans flex-grow">{step.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Arrow Icons for Flow - Adjusted for clockwise 2x2 grid */}
                <div className="hidden md:block absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                    <ChevronRight className="h-10 w-10 text-gray-400 opacity-70" />
                </div>
                <div className="hidden md:block absolute top-1/2 right-[calc(25%-1.25rem)] transform translate-x-1/2 -translate-y-1/2 z-0 rotate-90">
                    <ChevronDown className="h-10 w-10 text-gray-400 opacity-70" />
                </div>
                 <div className="hidden md:block absolute bottom-[25%] left-1/2 transform -translate-x-1/2 translate-y-1/2 z-0 rotate-180">
                    <ChevronLeft className="h-10 w-10 text-gray-400 opacity-70" />
                </div>
                 <div className="hidden md:block absolute top-1/2 left-[calc(25%-1.25rem)] transform -translate-x-1/2 -translate-y-1/2 z-0 -rotate-90">
                    <ChevronUp className="h-10 w-10 text-gray-400 opacity-70" />
                </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 sm:py-24 bg-yellow-400 text-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-6 font-sans"
            >
              Ready to Take Control of Your Finances?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg mb-8 font-sans opacity-90"
            >
              Join thousands of users who are already achieving their financial goals with Fin.Co.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/get-started" passHref className="no-underline">
                 <Button size="lg" className="bg-white text-black hover:bg-yellow-500 font-semibold py-4 px-8 text-lg rounded-md shadow-lg transition-transform hover:scale-105 retro-button retro-button-lg">
                  Sign Up For Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

       <footer className="bg-gray-900 text-gray-300 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-12 mb-10">
            <div className="lg:pr-8">
              <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-6 font-sans leading-snug">
                Subscribe to get tips and tactics to grow the way you want.
              </h3>
              <form className="mt-4 flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-l-md focus:ring-yellow-500 focus:border-yellow-500 flex-grow retro-input !rounded-r-none !border-r-0 !shadow-none !h-11"
                  aria-label="Email for newsletter"
                />
                 <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-r-md px-4 py-2 retro-button !h-11 !rounded-l-none !border-l-0 !shadow-retro-sm hover:!shadow-retro active:!translate-y-0 active:!translate-x-0">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>

             <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-sans">Help</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-white hover:text-yellow-400 transition-colors no-underline font-sans">Help</Link></li>
                <li><Link href="/terms" className="text-white hover:text-yellow-400 transition-colors no-underline font-sans">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-white hover:text-yellow-400 transition-colors no-underline font-sans">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-sans">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#services" className="text-white hover:text-yellow-400 transition-colors no-underline font-sans">Features</Link></li>
                <li><Link href="#pricing" className="text-white hover:text-yellow-400 transition-colors no-underline font-sans">Pricing</Link></li>
                <li><Link href="/about" className="text-white hover:text-yellow-400 transition-colors no-underline font-sans">About</Link></li>
                <li><Link href="/jobs" className="text-white hover:text-yellow-400 transition-colors no-underline font-sans">Jobs</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center mb-4 sm:mb-0">
                <CircleDollarSign className="h-6 w-6 mr-2 text-yellow-400"/>
                <span className="text-white font-semibold font-sans mr-2">Fin.Co</span>
                <span className="text-gray-400 font-sans">&copy; {new Date().getFullYear()} Fin.Co. All Rights Reserved.</span>
            </div>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-yellow-400 transition-colors no-underline"><Twitter className="h-5 w-5"/></Link>
              <Link href="#" aria-label="YouTube" className="text-gray-400 hover:text-yellow-400 transition-colors no-underline"><Youtube className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-yellow-400 transition-colors no-underline"><Instagram className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-yellow-400 transition-colors no-underline"><Facebook className="h-5 w-5"/></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
