
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CircleDollarSign, Banknote, PiggyBank, Landmark, TrendingUp, Lightbulb, ShieldAlert, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const featureVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LandingPage() {
    const [bankLinkModalOpen, setBankLinkModalOpen] = useState(false); // Placeholder state for bank linking modal
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        setFadeIn(true);
    }, []);

    // Placeholder function for opening bank linking modal
    const openBankLinkModal = () => {
        console.log("Open bank link modal (placeholder)");
        setBankLinkModalOpen(true); // In a real app, this would likely trigger a modal component
    }

    // Placeholder function for closing bank linking modal
    const closeBankLinkModal = () => {
        setBankLinkModalOpen(false);
    }

  return (
    <div className={`min-h-screen flex flex-col transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-16 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CircleDollarSign className="h-20 w-20 text-primary mb-6 mx-auto animate-retro-glow" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground text-shadow-retro">
            Master Your Finances with <span className="text-primary">FinTrack Pro</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Budgeting, savings goals, tax planning, and AI insights – all in one retro-modern interface.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/dashboard" passHref>
              <Button variant="primary" size="lg" className="retro-button">
                Get Started
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="retro-button" onClick={openBankLinkModal}>
              <Banknote className="mr-2 h-5 w-5" /> Link Bank Account
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12 text-foreground">Why FinTrack Pro?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.1 }}>
              <Card className="retro-card h-full">
                <CardHeader className="retro-card-header !bg-secondary !text-secondary-foreground">
                  <PiggyBank className="h-8 w-8 mb-2" />
                  <CardTitle className="text-xl">Savings Goals</CardTitle>
                  <div className="retro-window-controls"><span className="!bg-secondary !border-secondary-foreground"></span><span className="!bg-secondary !border-secondary-foreground"></span><span className="!bg-secondary !border-secondary-foreground"></span></div>
                </CardHeader>
                <CardContent className="retro-card-content !border-t-0 pt-4">
                  <p className="text-muted-foreground">Visualize and track your progress towards financial goals, big or small.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.2 }}>
              <Card className="retro-card h-full">
                <CardHeader className="retro-card-header !bg-primary !text-primary-foreground">
                  <Landmark className="h-8 w-8 mb-2" />
                  <CardTitle className="text-xl">Budgeting Made Easy</CardTitle>
                   <div className="retro-window-controls"><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span></div>
                </CardHeader>
                <CardContent className="retro-card-content !border-t-0 pt-4">
                  <p className="text-muted-foreground">Set budgets, track spending by category, and understand where your money goes.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.3 }}>
              <Card className="retro-card h-full">
                <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
                  <Lightbulb className="h-8 w-8 mb-2" />
                  <CardTitle className="text-xl">AI Savings Assistant</CardTitle>
                   <div className="retro-window-controls"><span className="!bg-accent !border-accent-foreground"></span><span className="!bg-accent !border-accent-foreground"></span><span className="!bg-accent !border-accent-foreground"></span></div>
                </CardHeader>
                <CardContent className="retro-card-content !border-t-0 pt-4">
                  <p className="text-muted-foreground">Get personalized insights and tips to optimize your savings strategy.</p>
                </CardContent>
              </Card>
            </motion.div>
             <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.4 }}>
              <Card className="retro-card h-full">
                <CardHeader className="retro-card-header"> {/* Default Header */}
                  <TrendingUp className="h-8 w-8 mb-2 text-green-500" />
                  <CardTitle className="text-xl">Investment Tracking</CardTitle>
                   <div className="retro-window-controls"><span></span><span></span><span></span></div>
                </CardHeader>
                <CardContent className="retro-card-content !border-t-0 pt-4">
                  <p className="text-muted-foreground">Monitor your investment portfolio performance and allocation (manual entry).</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.5 }}>
              <Card className="retro-card h-full">
                 <CardHeader className="retro-card-header !bg-destructive !text-destructive-foreground">
                   <ShieldAlert className="h-8 w-8 mb-2" />
                   <CardTitle className="text-xl">Emergency Fund</CardTitle>
                    <div className="retro-window-controls"><span className="!bg-destructive !border-destructive-foreground"></span><span className="!bg-destructive !border-destructive-foreground"></span><span className="!bg-destructive !border-destructive-foreground"></span></div>
                 </CardHeader>
                <CardContent className="retro-card-content !border-t-0 pt-4">
                  <p className="text-muted-foreground">Build and track your financial safety net for peace of mind.</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={featureVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.6 }}>
              <Card className="retro-card h-full">
                 <CardHeader className="retro-card-header !bg-primary !text-primary-foreground">
                  <Banknote className="h-8 w-8 mb-2" />
                  <CardTitle className="text-xl">Link Bank Accounts</CardTitle>
                   <div className="retro-window-controls"><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span></div>
                 </CardHeader>
                <CardContent className="retro-card-content !border-t-0 pt-4">
                  <p className="text-muted-foreground">Securely connect your accounts for automated transaction tracking (via Plaid integration - *placeholder*).</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 text-center bg-gradient-to-t from-background via-muted/30 to-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-foreground">Ready to Take Control?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Start your journey towards financial freedom with FinTrack Pro today.
          </p>
          <Link href="/dashboard" passHref>
            <Button variant="primary" size="lg" className="retro-button">
              Sign Up Now (Demo)
            </Button>
          </Link>
        </motion.div>
      </section>

       {/* Footer (Simple) */}
        <footer className="py-6 text-center border-t-2 border-foreground bg-muted">
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} FinTrack Pro. All rights reserved. (Demo Application)
            </p>
        </footer>


      {/* Placeholder Bank Linking Modal */}
      {bankLinkModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <Card className="retro-window max-w-md w-full">
             <CardHeader className="retro-window-header !bg-primary !text-primary-foreground">
              <CardTitle className="flex items-center gap-2"> <Banknote className="h-5 w-5"/> Link Your Bank Account</CardTitle>
               <div className="retro-window-controls">
                    <span className="!bg-primary !border-primary-foreground"></span>
                    <span className="!bg-primary !border-primary-foreground"></span>
                     <button onClick={closeBankLinkModal} className="h-3 w-3 border border-destructive-foreground bg-destructive transition-transform duration-100 hover:scale-110 cursor-pointer"></button>
               </div>
            </CardHeader>
            <CardContent className="retro-window-content !border-t-0 pt-6 pb-4 space-y-4">
              <p className="text-muted-foreground text-sm">
                FinTrack Pro uses Plaid to securely connect to your bank accounts. This allows for automatic importing of transactions.
              </p>
              <p className="text-xs text-muted-foreground/80">
                (This is a placeholder. In a real application, the Plaid Link flow would be initiated here.)
              </p>
              <Button
                  className="w-full retro-button"
                  variant="primary"
                  onClick={() => alert('Initiate Plaid Link flow... (placeholder)')}
              >
                <PlusCircle className="mr-2 h-4 w-4"/> Connect with Plaid
              </Button>
            </CardContent>
            <CardFooter className="retro-window-content !border-t-2 !pt-3 !pb-3 !flex !justify-end">
                 <Button variant="secondary" className="retro-button" onClick={closeBankLinkModal}>
                    Close
                 </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
