'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CircleDollarSign, Banknote, PiggyBank, Landmark, TrendingUp, Lightbulb, ShieldAlert, BarChart, Sparkles, Check, Award } from 'lucide-react'; // Added icons
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const featureVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export default function LandingPage() {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        // Trigger fade-in animation on mount
        setFadeIn(true);
    }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
       <section className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
           <CircleDollarSign className="h-24 w-24 text-primary mb-8 mx-auto animate-retro-glow" />
           <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground text-shadow-retro font-heading">
             Take Control of Your <span className="text-primary">Financial Future</span>
          </h1>
           <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
             FinTrack Pro combines powerful budgeting, goal tracking, tax planning, and AI insights into a sleek, retro-modern interface. Stop guessing, start growing.
           </p>
           <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/dashboard" passHref>
               <Button variant="primary" size="lg" className="retro-button">
                Get Started (Demo)
               </Button>
            </Link>
            <Link href="#features" passHref>
              <Button variant="outline" size="lg" className="retro-button">
                Learn More
              </Button>
             </Link>
          </div>
        </motion.div>
      </section>

       {/* "Why FinTrack Pro?" Section */}
       <motion.section
          id="why"
          className="py-20 px-4 bg-muted/50"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
         <div className="container mx-auto text-center">
           <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">Why Choose FinTrack Pro?</h2>
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Go beyond simple tracking. We empower you with the tools and insights needed for true financial mastery.
           </p>
           <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="flex items-start gap-4">
                 <BarChart className="h-8 w-8 text-secondary mt-1 flex-shrink-0" />
                 <div>
                   <h3 className="text-xl font-medium mb-2">Holistic View</h3>
                   <p className="text-muted-foreground">See your budgets, goals, expenses, investments, and potential taxes all in one place.</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <Sparkles className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                 <div>
                   <h3 className="text-xl font-medium mb-2">AI-Powered Insights</h3>
                   <p className="text-muted-foreground">Receive personalized tips and analysis to optimize your savings and spending habits.</p>
                 </div>
              </div>
               <div className="flex items-start gap-4">
                 <Award className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                 <div>
                   <h3 className="text-xl font-medium mb-2">Intuitive Design</h3>
                   <p className="text-muted-foreground">Enjoy a unique retro-modern interface that's both fun and easy to navigate.</p>
                 </div>
              </div>
           </div>
         </div>
       </motion.section>

       {/* Features Section */}
       <motion.section
          id="features"
          className="py-20 px-4"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
        <div className="container mx-auto">
           <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground">Core Features</h2>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              <Card className="retro-card h-full">
                <CardHeader className="retro-card-header !bg-secondary !text-secondary-foreground">
                  <PiggyBank className="h-8 w-8 mb-2" />
                  <CardTitle className="text-xl">Savings Goals</CardTitle>
                  <div className="retro-window-controls"><span className="!bg-secondary !border-secondary-foreground"></span><span className="!bg-secondary !border-secondary-foreground"></span><span className="!bg-secondary !border-secondary-foreground"></span></div>
                </CardHeader>
                <CardContent className="retro-card-content !border-t-0 pt-4">
                   <p className="text-muted-foreground">Define, visualize, and track your progress towards financial milestones, big or small.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              <Card className="retro-card h-full">
                <CardHeader className="retro-card-header !bg-primary !text-primary-foreground">
                  <Landmark className="h-8 w-8 mb-2" />
                  <CardTitle className="text-xl">Intuitive Budgeting</CardTitle>
                   <div className="retro-window-controls"><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span></div>
                </CardHeader>
                <CardContent className="retro-card-content !border-t-0 pt-4">
                   <p className="text-muted-foreground">Set budgets, track spending by category, and gain clarity on where your money goes.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              <Card className="retro-card h-full">
                <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
                  <Lightbulb className="h-8 w-8 mb-2" />
                  <CardTitle className="text-xl">AI Savings Assistant</CardTitle>
                   <div className="retro-window-controls"><span className="!bg-accent !border-accent-foreground"></span><span className="!bg-accent !border-accent-foreground"></span><span className="!bg-accent !border-accent-foreground"></span></div>
                </CardHeader>
                <CardContent className="retro-card-content !border-t-0 pt-4">
                   <p className="text-muted-foreground">Receive personalized insights and actionable tips to optimize your savings strategy.</p>
                </CardContent>
              </Card>
            </motion.div>
             <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
               <Card className="retro-card h-full">
                 <CardHeader className="retro-card-header"> {/* Default Header */}
                   <TrendingUp className="h-8 w-8 mb-2 text-green-500" />
                   <CardTitle className="text-xl">Investment Tracking</CardTitle>
                    <div className="retro-window-controls"><span></span><span></span><span></span></div>
                 </CardHeader>
                 <CardContent className="retro-card-content !border-t-0 pt-4">
                    <p className="text-muted-foreground">Manually log and monitor your investment portfolio performance and asset allocation.</p>
                 </CardContent>
               </Card>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              <Card className="retro-card h-full">
                 <CardHeader className="retro-card-header !bg-destructive !text-destructive-foreground">
                   <ShieldAlert className="h-8 w-8 mb-2" />
                   <CardTitle className="text-xl">Emergency Fund</CardTitle>
                    <div className="retro-window-controls"><span className="!bg-destructive !border-destructive-foreground"></span><span className="!bg-destructive !border-destructive-foreground"></span><span className="!bg-destructive !border-destructive-foreground"></span></div>
                 </CardHeader>
                <CardContent className="retro-card-content !border-t-0 pt-4">
                   <p className="text-muted-foreground">Build, track, and manage your financial safety net for peace of mind.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
              <Card className="retro-card h-full">
                 <CardHeader className="retro-card-header !bg-primary !text-primary-foreground">
                  <Banknote className="h-8 w-8 mb-2" />
                   <CardTitle className="text-xl">Expense Logging</CardTitle>
                    <div className="retro-window-controls"><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span></div>
                 </CardHeader>
                 <CardContent className="retro-card-content !border-t-0 pt-4">
                   <p className="text-muted-foreground">Quickly add and categorize your expenses to stay on top of your spending.</p>
                 </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

       {/* Pricing Section (Placeholder) */}
        <motion.section
           id="pricing"
           className="py-20 px-4 bg-muted/50"
           variants={sectionVariants}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.2 }}
         >
           <div className="container mx-auto text-center">
             <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">Pricing Plans</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
               Choose the plan that fits your financial journey. Start free, upgrade anytime.
             </p>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
               {/* Free Plan */}
               <Card className="retro-card">
                  <CardHeader className="retro-card-header">
                      <CardTitle className="text-2xl">Free</CardTitle>
                      <CardDescription>Get started with essential tracking tools.</CardDescription>
                     <div className="retro-window-controls"><span></span><span></span><span></span></div>
                  </CardHeader>
                 <CardContent className="retro-card-content !border-t-0 space-y-4 pt-4">
                   <p className="text-4xl font-bold">$0<span className="text-sm text-muted-foreground">/month</span></p>
                   <ul className="space-y-2 text-left text-muted-foreground">
                     <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Basic Budgeting</li>
                     <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Savings Goal Tracking (up to 3)</li>
                     <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Manual Expense Logging</li>
                   </ul>
                 </CardContent>
                  
                    <Link href="/dashboard" passHref className="w-full">
                        <Button variant="outline" className="w-full retro-button">Start Free (Demo)</Button>
                    </Link>
                  
               </Card>

                {/* Pro Plan */}
                <Card className="retro-card border-primary shadow-[4px_4px_0px_0px_hsl(var(--primary))]">
                   <CardHeader className="retro-card-header !bg-primary !text-primary-foreground">
                       <CardTitle className="text-2xl">Pro</CardTitle>
                       <CardDescription className="!text-primary-foreground/80">Unlock advanced features & AI.</CardDescription>
                      <div className="retro-window-controls"><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span></div>
                   </CardHeader>
                  <CardContent className="retro-card-content !border-t-0 space-y-4 pt-4">
                     <p className="text-4xl font-bold">$9<span className="text-sm text-muted-foreground">/month</span></p>
                     <ul className="space-y-2 text-left text-muted-foreground">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> All Free Features</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Unlimited Savings Goals</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> AI Savings Assistant</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Detailed Investment Tracking</li>
                       <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Emergency Fund Management</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Tax Estimator</li>
                       <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Priority Support</li>
                     </ul>
                  </CardContent>
                   
                     <Link href="/dashboard" passHref className="w-full">
                         <Button variant="primary" className="w-full retro-button">Go Pro (Demo)</Button>
                     </Link>
                   
                </Card>

               {/* Enterprise/Custom Plan (Optional) */}
               <Card className="retro-card">
                   <CardHeader className="retro-card-header !bg-secondary !text-secondary-foreground">
                       <CardTitle className="text-2xl">Enterprise</CardTitle>
                       <CardDescription className="!text-secondary-foreground/80">Tailored solutions for teams.</CardDescription>
                      <div className="retro-window-controls"><span className="!bg-secondary !border-secondary-foreground"></span><span className="!bg-secondary !border-secondary-foreground"></span><span className="!bg-secondary !border-secondary-foreground"></span></div>
                   </CardHeader>
                  <CardContent className="retro-card-content !border-t-0 space-y-4 pt-4">
                    <p className="text-4xl font-bold">Custom</p>
                    <ul className="space-y-2 text-left text-muted-foreground">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> All Pro Features</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Dedicated Account Manager</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Custom Integrations</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500"/> Advanced Reporting</li>
                    </ul>
                  </CardContent>
                   
                     <Button variant="secondary" className="w-full retro-button">Contact Sales</Button>
                   
               </Card>
             </div>
           </div>
         </motion.section>


       {/* Call to Action Section */}
       <motion.section
          className="py-20 px-4 text-center bg-gradient-to-t from-background via-muted/30 to-background"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
       >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-foreground">Ready to Take Control?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Stop drifting, start directing. Join FinTrack Pro today and build the financial future you deserve.
          </p>
          <Link href="/dashboard" passHref>
            <Button variant="primary" size="lg" className="retro-button">
              Get Started Now (Demo)
            </Button>
          </Link>
       </motion.section>

       {/* Footer (Simple) */}
        <footer className="py-6 text-center border-t-2 border-foreground bg-muted">
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} FinTrack Pro. All rights reserved. (Demo Application)
            </p>
        </footer>

    </div>
  );
}
