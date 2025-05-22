
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  CircleDollarSign, // For FinCo logo in footer
  Twitter, // For footer
  Youtube, // For footer
  Facebook, // For footer
  Instagram, // For footer
  Palette, // Example icon for "Create a Financial Plan"
  BarChart3, // Example icon for "Track & Automate"
  Award, // Example icon for "Achieve Your Dreams"
  Store, // For app store icons
  Apple, // For app store icons
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

const PartnerLogo = ({ name }: { name: string }) => (
  <div className="text-2xl font-bold text-wz-text-dark/70 hover:text-wz-text-dark transition-colors">
    {name}
  </div>
);

export default function LandingPage() {
  return (
    <div className="wzuh-landing-page flex flex-col min-h-screen text-wz-text-dark">
      <main className="flex-grow">
        {/* Hero Section */}
        <SectionWrapper bgClassName="bg-wz-green py-20 md:py-32" id="hero">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-wz-text-dark leading-tight">
                Master Your <br className="hidden md:inline" />Financial Goals
              </h1>
              <p className="text-lg md:text-xl text-wz-gray-text mb-8 max-w-md">
                FinCo empowers you to track income, budget smarter, save with purpose, and grow your wealth through intuitive tools and AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="btn-wz btn-wz-pink text-lg px-8 py-4">
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
        <section className="py-8 bg-wz-pink">
          <div className="container-default">
            <div className="flex flex-wrap justify-around items-center gap-x-8 gap-y-4">
              <PartnerLogo name="Plaid" />
              <PartnerLogo name="Yodlee" />
              <PartnerLogo name="Stripe" />
              <PartnerLogo name="Visa" />
              <PartnerLogo name="Mastercard" />
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-wz-text-dark">
                Get the Financial Future <br className="hidden md:inline" />of Your Dreams.
              </h2>
              <p className="text-lg text-wz-gray-text mb-6 max-w-md">
                With FinCo, achieving your financial aspirations is simpler than ever.
                All it takes is three simple steps!
              </p>
              <Button asChild className="btn-wz btn-wz-pink text-lg px-8 py-4">
                <Link href="#how-it-works">Start Planning <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Our Approach is Simple / How It Works Section */}
        <SectionWrapper id="how-it-works" bgClassName="bg-gray-50">
           <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-wz-text-dark">
                Our Approach is Simple.
              </h2>
              <p className="text-lg text-wz-gray-text mb-8 leading-relaxed">
                FinCo breaks down complex financial management into easy-to-follow steps.
                We guide you from setting clear objectives to celebrating your achievements,
                with smart automation and AI-powered insights along the way.
              </p>
            </motion.div>
            <div className="space-y-6">
              {[
                { title: "Create a Financial Plan", text: "Define your goals, big or small. Our tools help you outline a clear path.", bgColor: "bg-wz-pink", icon: Palette },
                { title: "Track & Automate", text: "Monitor your progress effortlessly. Automate savings and get smart alerts.", bgColor: "bg-wz-purple", icon: BarChart3 },
                { title: "Achieve Your Dreams", text: "Reach your milestones and build a secure financial future with confidence.", bgColor: "bg-wz-green", icon: Award },
              ].map((item, index) => {
                const ItemIcon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    className={cn("p-6 rounded-xl border-2 border-wz-border-dark relative overflow-hidden", item.bgColor)}
                  >
                    <ItemIcon className="h-8 w-8 text-wz-text-dark mb-3" />
                    <h3 className="text-xl font-bold mb-2 text-wz-text-dark">{item.title}</h3>
                    <p className="text-sm text-wz-text-dark/80">{item.text}</p>
                    <Sparkles className="absolute -bottom-3 -right-3 h-10 w-10 text-wz-text-dark/20" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        {/* Financial Plan for Every Life Goal Section */}
        <SectionWrapper id="life-goals">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="p-8 md:p-12 bg-wz-yellow rounded-2xl border-2 border-wz-border-dark"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-wz-text-dark">Financial Plan for Every Life Goal</h2>
              <p className="text-wz-gray-text mb-6">
                Whether it's for education, travel, or retirement, FinCo helps you plan effectively.
              </p>
              <Button asChild className="btn-wz btn-wz-pink">
                <Link href="/get-started">Create a Plan</Link>
              </Button>
              <Sparkles className="absolute top-5 -left-5 h-12 w-12 text-wz-pink opacity-50 -z-10" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 md:p-12 bg-wz-green rounded-2xl border-2 border-wz-border-dark text-center"
            >
              <Image
                src="https://placehold.co/400x300.png"
                alt="Retirement planning"
                width={400}
                height={300}
                className="rounded-xl shadow-md mx-auto mb-4"
                data-ai-hint="retirement planning piggy bank"
              />
              <p className="font-semibold text-wz-text-dark">Plan for a Secure Retirement</p>
            </motion.div>
          </div>
        </SectionWrapper>

         {/* Two-Column Image Section for Goals */}
        <SectionWrapper bgClassName="bg-gray-50 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="p-6 bg-wz-pink rounded-2xl border-2 border-wz-border-dark text-center"
            >
              <Image src="https://placehold.co/450x300.png" alt="Education Fund" width={450} height={300} className="rounded-xl shadow-md mx-auto mb-3" data-ai-hint="student graduation cap money"/>
              <p className="font-semibold text-wz-text-dark">Save for Education</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 bg-wz-purple rounded-2xl border-2 border-wz-border-dark text-center"
            >
              <Image src="https://placehold.co/450x300.png" alt="Emergency Fund" width={450} height={300} className="rounded-xl shadow-md mx-auto mb-3" data-ai-hint="emergency fund shield money"/>
              <p className="font-semibold text-wz-text-dark">Build Your Emergency Fund</p>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* Ready to Start CTA Section */}
        <SectionWrapper id="cta" bgClassName="bg-wz-light-bg">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-wz-text-dark">Ready to Start Your Financial Journey?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="btn-wz btn-wz-pink px-8 py-3">
                <Link href="#">
                  <Apple className="mr-2 h-5 w-5" /> Get FinCo for iOS
                </Link>
              </Button>
              <Button asChild className="btn-wz btn-wz-purple px-8 py-3">
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
        <div className="container-default text-center">
          <Link href="/" className="flex items-center justify-center space-x-2 no-underline mb-6">
            <Sparkles className="h-8 w-8 text-wz-pink" />
            <span className="text-2xl font-bold font-heading text-wz-text-light">FinCo</span>
          </Link>
          <p className="text-sm mb-6">
            © {new Date().getFullYear()} FinCo. All Rights Reserved.
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <Link href="#" className="hover:text-wz-pink transition-colors no-underline text-sm">Terms & Agreements</Link>
            <Link href="#" className="hover:text-wz-pink transition-colors no-underline text-sm">Privacy Policy</Link>
          </div>
          <div className="flex justify-center space-x-5">
            <Link href="#" aria-label="Twitter" className="hover:text-wz-pink transition-colors no-underline"><Twitter className="h-6 w-6"/></Link>
            <Link href="#" aria-label="YouTube" className="hover:text-wz-pink transition-colors no-underline"><Youtube className="h-6 w-6"/></Link>
            <Link href="#" aria-label="Instagram" className="hover:text-wz-pink transition-colors no-underline"><Instagram className="h-6 w-6"/></Link>
            <Link href="#" aria-label="Facebook" className="hover:text-wz-pink transition-colors no-underline"><Facebook className="h-6 w-6"/></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
