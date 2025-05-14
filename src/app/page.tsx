'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CircleDollarSign, Banknote, PiggyBank, Landmark, TrendingUp, Lightbulb, ShieldAlert, BarChart, Sparkles, Check, Award, Twitter, Instagram, Briefcase, Globe } from 'lucide-react'; // Added icons
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Hero from '@/components/layout/Hero';

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
      <Hero />

      {/* Hero Section */}
      <section className="w-full px-8 py-16 bg-cream flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight">
            Take Control of <br />Your <span className="underline-strong">Money</span> <br />In The Future
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-lg">
            Manage your budgets, set savings goals, plan investments, and get AI-powered insights—all in one place. Your financial future starts here.
          </p>
          <div className="flex gap-4">
            <Button className="bg-yellow text-black font-medium px-6 py-2 rounded hover:bg-yellow/90">Get Started</Button>
            <Button className="bg-green text-white font-medium px-6 py-2 rounded hover:bg-green/90">Consultant</Button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-wrap gap-6 items-center justify-center">
          {/* Cards with financial data visualization */}
          <Card className="w-44 h-44 p-4 bg-orange text-white rounded-lg border-2 border-black">
            <h3 className="font-medium text-sm mb-1">Data Visualization</h3>
            <p className="text-xs mb-2">Track your spending, savings, and investments with clear, actionable charts.</p>
            <div className="mt-2">
              {/* Simple chart representation */}
              <div className="flex gap-1">
                {[40, 60, 30, 80, 50, 70].map((height, index) => (
                  <div 
                    key={index}
                    className="w-3 bg-white/60"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </Card>
          
          <div className="flex flex-col gap-4">
            <Card className="p-4 bg-yellow rounded-lg border-2 border-black">
              <h3 className="font-medium text-sm">Grow Your</h3>
              <p className="text-xs">Savings Today</p>
              <div className="flex justify-end">
                <div className="w-8 h-8 mt-2">📈</div>
              </div>
            </Card>
            
            <Card className="p-4 bg-blue text-white rounded-lg border-2 border-black flex items-center justify-between">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                👨‍💻
              </div>
              <p className="text-xs font-medium">AI<br/>Assistant</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="w-full py-10 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 mb-6">We Cooperate With Trusted Financial Companies</p>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="text-2xl text-gray-400 font-medium">Visa</div>
            <div className="text-2xl text-gray-400 font-medium">Mastercard</div>
            <div className="text-2xl text-gray-400 font-medium">Plaid</div>
            <div className="text-2xl text-gray-400 font-medium">Stripe</div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 rounded-lg border-2 border-black bg-yellow">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="text-2xl font-bold mb-4">Budgeting</h3>
              <p className="mb-6 text-gray-700">Track your income and expenses, set monthly budgets, and never overspend again.</p>
              <a href="#" className="font-medium">Learn More →</a>
            </Card>
            
            <Card className="p-8 rounded-lg border-2 border-black bg-green text-white">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Savings Goals</h3>
              <p className="mb-6">Set, track, and achieve your savings goals for emergencies, travel, or big purchases.</p>
              <a href="#" className="font-medium text-white">Learn More →</a>
            </Card>
            
            <Card className="p-8 rounded-lg border-2 border-black bg-orange text-white">
              <div className="text-2xl mb-2">📈</div>
              <h3 className="text-2xl font-bold mb-4">Investments</h3>
              <p className="mb-6">Monitor your investments and grow your wealth with smart, simple tools.</p>
              <a href="#" className="font-medium text-white">Learn More →</a>
            </Card>
            
            <Card className="p-8 rounded-lg border-2 border-black bg-blue text-white">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="text-2xl font-bold mb-4">Emergency Fund</h3>
              <p className="mb-6">Build and manage your safety net for life's unexpected events.</p>
              <a href="#" className="font-medium text-white">Learn More →</a>
            </Card>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="w-full py-16 bg-cream flex justify-center">
        <Card className="max-w-3xl p-8 rounded-lg border-2 border-black text-center">
          <h2 className="text-2xl font-bold mb-6">We Know That You're Going To Have A Lot Of Questions, And We're Here To Help!</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-yellow text-black font-medium px-6 py-2 rounded hover:bg-yellow/90">Send Message</Button>
            <Button className="bg-green text-white font-medium px-6 py-2 rounded hover:bg-green/90">Contact Us</Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-medium mb-4">Enter Your Email To Get Latest News!</h4>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Enter Your Email..." 
                className="px-4 py-2 rounded-l bg-yellow text-black font-sans border-none outline-none flex-1 placeholder:text-gray-700" 
              />
              <Button className="bg-yellow text-black rounded-l-none rounded-r px-6 py-2 font-bold hover:bg-yellow/90">→</Button>
            </form>
          </div>
          {/* Links */}
          <div>
            <ul className="space-y-2 mt-2">
              <li><span className="font-medium">Service</span></li>
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Article</a></li>
              <li><a href="#" className="hover:text-gray-300">Community</a></li>
              <li><a href="#" className="hover:text-gray-300">50% Half</a></li>
            </ul>
          </div>
          {/* Brand & Social */}
          <div className="flex flex-col items-start md:items-end">
            <div className="font-heading text-2xl mb-2">Fin.Co</div>
            <div className="mb-2 font-medium">Follow Us On</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-yellow"><Twitter size={20} /></a>
              <a href="#" className="hover:text-yellow"><Instagram size={20} /></a>
              <a href="#" className="hover:text-yellow"><Briefcase size={20} /></a>
              <a href="#" className="hover:text-yellow"><Globe size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
