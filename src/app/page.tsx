'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, DollarSign, HandCoins, Lightbulb, ListChecks, Landmark, FileText, PiggyBank, Users, Youtube, Facebook, Twitter, Instagram, Briefcase, TrendingUp, BarChart2, Percent, Inbox, MessageCircle, ShieldAlert, Banknote, Package, Settings, Users2, CircleDollarSign } from 'lucide-react'; // Added CircleDollarSign
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
    tagBgClass: "bg-white/20",
    tagTextColorClass: "text-white",
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
    tagBgClass: "bg-white/20",
    tagTextColorClass: "text-white",
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
    tagBgClass: "bg-black/10",
    tagTextColorClass: "text-black",
    href: "/ai-assistant"
  },
  {
    title: "Expense Tracking",
    description: "Log every penny with ease. Categorize expenses, view trends, and understand where your money goes.",
    icon: ListChecks,
    tags: ["receipt scan", "categorization", "spending reports"],
    bgColorClass: "bg-[#F79F79]", // Orange
    iconColorClass: "text-black",
    textColorClass: "text-black",
    tagBgClass: "bg-black/10",
    tagTextColorClass: "text-black",
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
    tagBgClass: "bg-black/10",
    tagTextColorClass: "text-black",
    href: "/tax-planner"
  },
  {
    title: "Investment Portfolio",
    description: "Monitor your stocks, mutual funds, crypto, and other investments all in one place. Make informed decisions.",
    icon: Landmark,
    tags: ["stocks", "crypto", "portfolio overview"],
    bgColorClass: "bg-[#BDB2FF]", // Lavender/Purple
    iconColorClass: "text-black",
    textColorClass: "text-black",
    tagBgClass: "bg-black/10",
    tagTextColorClass: "text-black",
    href: "/investments"
  },
];


export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-amber-50 text-gray-800">
          <div className="container mx-auto">
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
                  <Link href="/get-started" passHref>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 text-base rounded-md shadow-md transition-transform hover:scale-105 retro-button">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link href="#features" passHref>
                    <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-3 px-6 text-base rounded-md shadow-md transition-transform hover:scale-105 retro-button">
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
                    <Link href="/ai-assistant" className="text-white underline mt-2 inline-block text-xs font-sans">Explore AI Features <ArrowRight className="inline h-3 w-3" /></Link>
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

        {/* Why FinTrack Pro Section */}
        <section id="why-fintrack" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-sans">Why Choose FinTrack Pro?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 font-sans">
              We provide a comprehensive suite of tools designed to simplify your financial life, powered by cutting-edge AI.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="retro-card border-2 border-black shadow-[4px_4px_0px_#000] h-full">
                  <CardHeader className="!bg-transparent !border-0 text-center">
                    <ShieldAlert className="h-12 w-12 text-primary mx-auto mb-3" />
                    <CardTitle className="font-sans !text-black">Secure & Private</CardTitle>
                  </CardHeader>
                  <CardContent className="!border-0 text-center">
                    <p className="text-sm text-gray-600 font-sans">Bank-level security and encryption to keep your financial data safe and private.</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="retro-card border-2 border-black shadow-[4px_4px_0px_#000] h-full">
                  <CardHeader className="!bg-transparent !border-0 text-center">
                    <Lightbulb className="h-12 w-12 text-accent mx-auto mb-3" />
                    <CardTitle className="font-sans !text-black">AI-Powered Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="!border-0 text-center">
                    <p className="text-sm text-gray-600 font-sans">Intelligent suggestions, spending analysis, and personalized plans to optimize your finances.</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="retro-card border-2 border-black shadow-[4px_4px_0px_#000] h-full">
                  <CardHeader className="!bg-transparent !border-0 text-center">
                    <Package className="h-12 w-12 text-secondary mx-auto mb-3" />
                    <CardTitle className="font-sans !text-black">All-In-One Platform</CardTitle>
                  </CardHeader>
                  <CardContent className="!border-0 text-center">
                    <p className="text-sm text-gray-600 font-sans">Budgeting, expenses, savings, investments, and taxes seamlessly integrated in one app.</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section id="services" className="py-16 sm:py-24 bg-muted/40 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 font-sans">Explore Our Core Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <motion.div key={service.title} whileHover={{ y: -5, boxShadow: "6px 6px 0px #000" }} transition={{ type: "spring", stiffness: 300 }}>
                    <Link href={service.href} passHref>
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
                              <span key={tag} className={`text-xs font-medium px-3 py-1 rounded-full ${service.tagBgClass} ${service.tagTextColorClass} font-sans`}>{tag}</span>
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


        {/* Pricing Section */}
        <section id="pricing" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-sans">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mb-12 font-sans">
              Choose the plan that's right for you. Get started for free!
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="retro-card border-2 border-black shadow-[4px_4px_0px_#000] p-6 flex flex-col h-full">
                  <CardHeader className="!bg-transparent !border-0 text-center">
                    <CardTitle className="text-2xl font-bold font-sans !text-black">Basic</CardTitle>
                    <CardDescription className="font-sans !text-gray-500">For individuals getting started</CardDescription>
                  </CardHeader>
                  <CardContent className="!border-0 flex-grow text-center">
                    <p className="text-4xl font-bold my-4 font-sans !text-black">$0<span className="text-base font-normal text-gray-500">/mo</span></p>
                    <ul className="space-y-2 text-sm text-gray-600 text-left font-sans">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Budget Tracking</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Expense Management</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Limited AI Insights</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="!border-0 !bg-transparent mt-4">
                    <Link href="/get-started" passHref className="w-full">
                      <Button variant="outline" className="w-full retro-button border-primary text-primary hover:bg-primary hover:text-primary-foreground">Get Started</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="retro-card border-2 border-primary shadow-[4px_4px_0px_hsl(var(--primary))] p-6 flex flex-col h-full relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 text-xs font-semibold rounded-full font-sans">POPULAR</div>
                  <CardHeader className="!bg-transparent !border-0 text-center pt-8">
                    <CardTitle className="text-2xl font-bold font-sans !text-black">Pro</CardTitle>
                    <CardDescription className="font-sans !text-gray-500">For serious finance trackers</CardDescription>
                  </CardHeader>
                  <CardContent className="!border-0 flex-grow text-center">
                    <p className="text-4xl font-bold my-4 font-sans !text-black">$9<span className="text-base font-normal text-gray-500">/mo</span></p>
                     <ul className="space-y-2 text-sm text-gray-600 text-left font-sans">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> All Basic Features</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Advanced AI Insights</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Investment Tracking</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Tax Planning Tools</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Priority Support</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="!border-0 !bg-transparent mt-4">
                     <Link href="/get-started?plan=pro" passHref className="w-full">
                       <Button className="w-full retro-button bg-primary text-primary-foreground hover:bg-primary/90">Choose Pro</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="retro-card border-2 border-black shadow-[4px_4px_0px_#000] p-6 flex flex-col h-full">
                  <CardHeader className="!bg-transparent !border-0 text-center">
                    <CardTitle className="text-2xl font-bold font-sans !text-black">Enterprise</CardTitle>
                    <CardDescription className="font-sans !text-gray-500">For businesses & teams</CardDescription>
                  </CardHeader>
                  <CardContent className="!border-0 flex-grow text-center">
                    <p className="text-4xl font-bold my-4 font-sans !text-black">Custom</p>
                     <ul className="space-y-2 text-sm text-gray-600 text-left font-sans">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> All Pro Features</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Multi-user Access</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Custom Integrations</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-2"/> Dedicated Account Manager</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="!border-0 !bg-transparent mt-4">
                     <Link href="/contact-sales" passHref className="w-full">
                        <Button variant="outline" className="w-full retro-button border-black text-black hover:bg-black hover:text-white">Contact Sales</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>


        {/* Call to Action Section */}
        <section className="py-16 sm:py-24 bg-primary text-primary-foreground px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl text-center">
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
              Join thousands of users who are already achieving their financial goals with FinTrack Pro.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/get-started" passHref>
                <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-8 text-lg rounded-md shadow-lg transition-transform hover:scale-105 retro-button retro-button-lg">
                  Sign Up For Free <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-sans flex items-center">
                <CircleDollarSign className="h-7 w-7 mr-2 text-yellow-400"/> FinTrack Pro
              </h3>
              <p className="text-sm leading-relaxed font-sans">
                Get the latest financial tips and product updates straight to your inbox.
              </p>
              <form className="mt-4 flex">
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-l-md focus:ring-yellow-500 focus:border-yellow-500 flex-grow retro-input !rounded-r-none"
                  aria-label="Email for newsletter"
                />
                <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-r-md px-3 py-2 retro-button !rounded-l-none !border-l-0">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-sans">Quick Links</h4>
              <ul className="space-y-2 text-sm font-sans">
                <li><Link href="#why-fintrack" className="hover:text-yellow-400 hover:underline">Why FinTrack Pro?</Link></li>
                <li><Link href="#services" className="hover:text-yellow-400 hover:underline">Our Features</Link></li>
                <li><Link href="#pricing" className="hover:text-yellow-400 hover:underline">Pricing Plans</Link></li>
                <li><Link href="/get-started" className="hover:text-yellow-400 hover:underline">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-yellow-400 hover:underline">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-sans">Resources</h4>
              <ul className="space-y-2 text-sm font-sans">
                <li><Link href="/blog" className="hover:text-yellow-400 hover:underline">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-yellow-400 hover:underline">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-yellow-400 hover:underline">Support Center</Link></li>
                <li><Link href="/terms" className="hover:text-yellow-400 hover:underline">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-yellow-400 hover:underline">Privacy Policy</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="text-lg font-semibold text-white mb-4 font-sans">Follow Us</h4>
                <div className="flex space-x-4">
                    <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-yellow-400 transition-colors"><Facebook className="h-6 w-6"/></Link>
                    <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-yellow-400 transition-colors"><Twitter className="h-6 w-6"/></Link>
                    <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-yellow-400 transition-colors"><Instagram className="h-6 w-6"/></Link>
                    <Link href="#" aria-label="YouTube" className="text-gray-400 hover:text-yellow-400 transition-colors"><Youtube className="h-6 w-6"/></Link>
                </div>
                 <div className="mt-6">
                    <h4 className="text-lg font-semibold text-white mb-2 font-sans">Need Help?</h4>
                    <Link href="/contact" className="text-sm text-yellow-400 hover:underline font-sans">Contact Our Support Team</Link>
                 </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm font-sans">
            <p>&copy; {new Date().getFullYear()} FinTrack Pro. All Rights Reserved. (Demo Application for Fictional Company)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Placeholder for CheckCircle icon if not already imported
const CheckCircle = ({className}: {className?: string}) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06l-3.894 3.893-1.7-1.7a.75.75 0 0 0-1.06 1.061l2.25 2.25a.75.75 0 0 0 1.06 0l4.5-4.5Z" clipRule="evenodd" />
  </svg>
);

