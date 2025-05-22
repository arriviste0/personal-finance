
'use client';

import React from 'react';
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
  Mail,
  ArrowRight,
  CircleDollarSign,
  LayoutGrid,
  Wallet,
  ListChecks,
  Target,
  TrendingUp,
  ShieldAlert,
  FileText,
  Lightbulb,
  Package,
  BrainCircuit,
  ShieldCheck,
  GraduationCap,
  Cloud,
  PiggyBank,
  Landmark,
  BarChartBig,
  Award,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Store,
  Apple,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
    <section id={id} className={cn("py-12 md:py-20 relative overflow-hidden", bgClassName, className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
  buttonText?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon: Icon, title, description, href, bgColor, textColor, buttonText = "Learn More" }) => {
  return (
    <motion.div
      className={cn("p-6 rounded-xl border-2 border-wz-border-dark shadow-sm h-full flex flex-col hover:shadow-lg transition-shadow", bgColor, textColor)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="h-8 w-8 mb-4" />
      <h3 className="text-xl font-bold mb-2 font-heading">{title}</h3>
      <p className="text-sm opacity-80 mb-4 flex-grow">{description}</p>
      <Button asChild className="btn-wz btn-wz-outline-dark mt-auto text-sm !py-2 !px-4">
        <Link href={href}>{buttonText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
      </Button>
    </motion.div>
  );
};

const services = [
  { icon: LayoutGrid, title: "Dashboard", description: "Your financial command center.", href: "/dashboard"},
  { icon: Wallet, title: "Budget", description: "Plan and manage your monthly budgets.", href: "/budget"},
  { icon: ListChecks, title: "Expenses", description: "Log and categorize all your spending.", href: "/expenses"},
  { icon: Target, title: "Goals", description: "Set and achieve your financial targets.", href: "/savings-goals"},
  { icon: TrendingUp, title: "Invest", description: "Monitor and grow your investments.", href: "/investments"},
  { icon: ShieldAlert, title: "Safety", description: "Build your financial safety net.", href: "/emergency-fund"},
  { icon: FileText, title: "Taxes", description: "Estimate and prepare for your taxes.", href: "/tax-planner"},
  { icon: Lightbulb, title: "AI", description: "Get smart financial insights.", href: "/ai-assistant"},
];

const serviceColors = ["bg-wz-pink", "bg-wz-green", "bg-wz-purple", "bg-wz-yellow"];


const partners = ["Plaid", "Yodlee", "Stripe", "Visa", "Mastercard", "American Express", "Google Pay"];

const whyFinCoBenefits = [
  {
    icon: Package,
    title: "All-In-One Simplicity",
    description: "Budgeting, expenses, goals, investments, and taxes – everything seamlessly integrated. No more app-hopping!",
    color: "text-wz-purple",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Brilliance",
    description: "Our intelligent assistant offers personalized insights, automates tasks, and helps you make smarter financial decisions.",
     color: "text-wz-green",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Transparent",
    description: "Bank-level security to protect your data. Clear, honest features with no hidden fees.",
     color: "text-wz-pink",
  },
];

const fourStepPlanData = [
  { step: "1", title: "Set Your Goals", description: "Define your financial objetives", icon: Target, color: "orange", themeColor: "wz-yellow", iconColor: "text-orange-500", borderColor: "border-orange-400", badgeBg: "bg-orange-400" },
  { step: "2", title: "Get a Tailored Action Plan", description: "Receive a step-by-step plan", icon: BarChartBig, color: "blue", themeColor: "wz-blue", iconColor: "text-blue-500", borderColor: "border-blue-400", badgeBg: "bg-blue-400" },
  { step: "3", title: "Track What Works", description: "Adjust and optimize your plan", icon: TrendingUp, color: "purple", themeColor: "wz-purple", iconColor: "text-purple-500", borderColor: "border-purple-400", badgeBg: "bg-purple-400" },
  { step: "4", title: "Achieve & Grow", description: "Celebrate milestones and continue building your financial future.", icon: Award, color: "green", themeColor: "wz-green", iconColor: "text-green-500", borderColor: "border-green-400", badgeBg: "bg-green-400" },
];


export default function LandingPage() {
  React.useEffect(() => {
    document.body.classList.add('wzuh-landing-page');
    return () => {
      document.body.classList.remove('wzuh-landing-page');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-wz-light-bg text-wz-text-dark">
      <main className="flex-grow">
        {/* Hero Section */}
        <SectionWrapper bgClassName="bg-wz-green !py-20 md:!py-28 lg:!py-32" id="hero">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-wz-text-dark leading-tight font-heading">
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
                className="rounded-2xl shadow-xl object-cover border-4 border-wz-border-dark"
                data-ai-hint="person using finance app"
              />
              <Sparkles className="absolute -top-8 -left-8 h-16 w-16 text-wz-pink opacity-70 animate-pulse" />
              <Sparkles className="absolute -bottom-5 -right-5 h-12 w-12 text-wz-yellow opacity-70 animate-pulse delay-500" />
            </motion.div>
          </div>
        </SectionWrapper>

         {/* Partners Section */}
        <section className="py-4 bg-wz-pink border-y-2 border-wz-border-dark">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
               We're not just another finance app. We're your dedicated partner in achieving financial freedom with unparalleled simplicity and intelligence.
             </p>
           </div>
           <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
             {whyFinCoBenefits.map((benefit, index) => (
               <motion.div
                 key={index}
                 className="p-6 lg:p-8 bg-white rounded-xl border-2 border-transparent hover:border-yellow-500 transition-colors duration-200 shadow-md hover:shadow-xl h-full flex flex-col group"
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, amount: 0.3 }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                 <benefit.icon className={cn("h-10 w-10 mb-4", benefit.color)} />
                 <h3 className="text-xl font-bold text-wz-text-dark mb-2 font-heading">{benefit.title}</h3>
                 <p className="text-sm text-wz-gray-text group-hover:text-yellow-600 transition-colors flex-grow">{benefit.description}</p>
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
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                href={service.href}
                bgColor={serviceColors[index % serviceColors.length]}
                textColor="text-wz-text-dark"
                buttonText="Explore"
              />
            ))}
          </div>
        </SectionWrapper>

        {/* Your 4-Step Personalized Financial Plan Section */}
        <SectionWrapper id="financial-plan" bgClassName="bg-wz-light-bg">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-wz-text-dark font-heading mb-4">Your 4-Step Personalized Financial Plan</h2>
            <p className="text-lg text-wz-gray-text max-w-2xl mx-auto">
              Follow these simple steps to take control of your finances and achieve your dreams with FinCo.
            </p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="w-[350px] h-[350px] md:w-[500px] md:h-[500px] border-[12px] border-yellow-200/50 rounded-full opacity-70"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 justify-items-center">
              {fourStepPlanData.map((item, index) => (
                <motion.div
                  key={item.step}
                  className={cn(
                    "p-6 bg-white rounded-xl border-2 shadow-lg flex flex-col h-full w-full max-w-sm relative",
                    item.borderColor
                  )}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className={cn("absolute top-3 left-3 flex items-center justify-center h-7 w-7 rounded-full text-xs font-bold text-black", item.badgeBg)}>
                    {item.step}
                  </span>
                  <div className="flex flex-col items-center text-center pt-8">
                    <item.icon className={cn("h-10 w-10 mb-3", item.iconColor)} />
                    <h3 className={cn("text-lg font-bold font-heading mb-1", item.iconColor)}>{item.title.replace(`Step ${item.step}: `, '')}</h3>
                    <p className="text-sm text-wz-gray-text flex-grow">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Arrows for flow */}
            <ChevronRight className="hidden md:block absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-gray-400 opacity-70 transform -mt-5" />
            <ChevronDown className="hidden md:block absolute top-1/2 right-[20%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-gray-400 opacity-70 transform rotate-0" />
            <ChevronLeft className="hidden md:block absolute bottom-[25%] left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 text-gray-400 opacity-70 transform mt-5 rotate-180" />
            <ChevronUp className="hidden md:block absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-gray-400 opacity-70 transform rotate-0" />
          </div>
        </SectionWrapper>

        {/* "Potential Savings" Section */}
        <SectionWrapper id="potential-savings" bgClassName="bg-wz-yellow">
           <div className="text-center">
             <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative inline-block mb-8"
            >
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-wz-text-dark mb-3 font-heading">
                $1,234,567
              </h2>
              {[
                { icon: CircleDollarSign, color: "text-wz-pink", classes: "top-0 -left-16", delay: 0.1 },
                { icon: GraduationCap, color: "text-wz-green", classes: "top-10 -right-16", delay: 0.2 },
                { icon: Cloud, color: "text-wz-purple", classes: "bottom-10 -left-10", delay: 0.3 },
                { icon: PiggyBank, color: "text-teal-500", classes: "-bottom-8 right-0", delay: 0.4 },
                { icon: Landmark, color: "text-wz-pink", classes: "left-1/2 -top-10 -translate-x-1/2", delay: 0.5 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className={cn("absolute text-4xl md:text-5xl opacity-70", item.classes)}
                  initial={{ opacity:0, y: 20 }}
                  animate={{ opacity: 0.7, y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: item.delay + idx * 0.2, ease: "easeInOut" }}
                >
                  <item.icon className={item.color} />
                </motion.div>
              ))}
            </motion.div>
            <p className="text-lg md:text-xl text-wz-text-dark font-semibold max-w-xl mx-auto mb-10">
              Potential annual savings our users achieve with FinCo!
            </p>
             <Image
                src="https://storage.googleapis.com/idx-dev-fe-plugin-ai-test-assets/01J3Y6N12P55GSJBDY71G3P981.png"
                alt="Cartoon illustrating people achieving financial goals like saving, investing, and becoming debt-free"
                width={900}
                height={300}
                className="rounded-lg shadow-xl mx-auto border-4 border-wz-border-dark object-contain"
                data-ai-hint="financial freedom cartoon people saving investing debt-free"
              />
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
      <footer className="bg-wz-text-dark text-wz-text-light/70 pt-16 pb-8 border-t-4 border-wz-pink">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.5fr_1fr_1fr] gap-8 mb-10 items-start">
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
                <Button type="submit" className="btn-wz btn-wz-pink !py-2.5 !px-5">
                  Subscribe
                </Button>
              </form>
            </div>

             {/* Column 2: Company Links */}
            <div>
              <h4 className="font-semibold text-wz-text-light mb-3 font-heading">Company</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Features</Link></li>
                <li><Link href="#" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Pricing</Link></li>
                <li><Link href="#" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">About</Link></li>
                <li><Link href="#" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Jobs</Link></li>
              </ul>
            </div>

             {/* Column 3: Resources Links */}
             <div>
              <h4 className="font-semibold text-wz-text-light mb-3 font-heading">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Blog</Link></li>
                <li><Link href="#" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Help Center</Link></li>
                <li><Link href="#" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Contact Support</Link></li>
                 <li><Link href="#" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm no-underline text-wz-text-light/80 hover:text-wz-pink">Privacy Policy</Link></li>
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


    