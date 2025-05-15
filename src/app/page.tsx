
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BarChart2, Briefcase, DollarSign, Handshake, Inbox, LineChart, MessageCircle, Percent, TrendingUp, Users, Youtube, Facebook, Twitter, Instagram } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'; // Added CardFooter
import { Input } from '@/components/ui/input';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50 text-gray-800">
      {/* Main Content Area */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  Invest Your <span className="text-yellow-500">Money</span> In The Future
                </h1>
                <p className="text-lg text-gray-600 max-w-xl">
                  We help you to turn your finances for the better future and get a finance experience in managing finances.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/get-started" passHref>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 text-base rounded-md shadow-md transition-transform hover:scale-105 retro-button">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#services" passHref>
                    <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-3 px-6 text-base rounded-md shadow-md transition-transform hover:scale-105 retro-button">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative mt-12 lg:mt-0">
                <div className="absolute -top-8 -left-8 w-20 h-20 bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-green-300 rounded-lg opacity-50 transform rotate-12 animate-pulse delay-500"></div>
                <Image
                  src="https://placehold.co/600x500.png"
                  alt="Financial Growth"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-xl z-10 relative"
                  data-ai-hint="man business tablet"
                />
                <Card className="absolute -bottom-10 -left-10 sm:-left-16 bg-orange-400 text-white p-4 rounded-lg shadow-2xl w-60 sm:w-72 z-20 retro-card">
                  <CardHeader className="p-0 mb-2 !bg-transparent !border-0">
                    <CardTitle className="text-sm font-semibold !text-white">Data Visualization</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-xs !border-0">
                    <p>Reports, And Insights To Maximize Your Finances And Help Achieve Your Goals.</p>
                    <Link href="#" className="text-white underline mt-2 inline-block text-xs">Contact Our Expert <ArrowRight className="inline h-3 w-3" /></Link>
                  </CardContent>
                </Card>
                <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg z-20 flex items-center space-x-2">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="text-xs font-semibold">Growth Your</p>
                    <p className="text-xs text-gray-500">Revenue Today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto text-center">
            <h3 className="text-sm text-gray-500 uppercase tracking-wider font-medium mb-8">
              We Cooperate From Financial Companies In The World
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-8">
              <p className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">AngelList</p>
              <p className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">THE WORLD BANK</p>
              <p className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">bankinter</p>
              <p className="text-xl font-semibold text-gray-400 hover:text-gray-600 transition-colors">Bankier.pl</p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] retro-card">
                <CardContent className="p-6 space-y-3 !border-0">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 text-white rounded-full p-3">
                      <Percent className="h-6 w-6" />
                    </div>
                    <p className="text-lg font-semibold">50%</p>
                  </div>
                  <p className="text-gray-600">
                    Save Half Your Salary To Stabilize Your Financial Management, We Help You To Be Even Better.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] retro-card">
                <CardContent className="p-6 space-y-3 !border-0">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500 text-white rounded-full p-3">
                      <DollarSign className="h-6 w-6" />
                    </div>
                     <p className="text-lg font-semibold">$2 Bonus</p>
                  </div>
                  <p className="text-gray-600">
                    Do An Investigation To Increase Your Financial Savings And Get A Bonus For Each Month.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Services Section */}
        <section id="services" className="py-16 sm:py-24 bg-white px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-yellow-400 text-black border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] flex flex-col retro-card">
                <CardHeader className="!bg-transparent !border-0">
                  <LineChart className="h-10 w-10 mb-3" />
                  <CardTitle className="text-xl font-semibold">Invest Management</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow !border-0">
                  <p className="text-sm">We Take A Holistic, Comprehensive Approach To Investment Management That's Shaped By Decades Of Research To Determine The Most Efficient Investment Policy.</p>
                </CardContent>
                <CardFooter className="!border-0 !bg-transparent">
                  <Link href="#" className="font-semibold hover:underline flex items-center">Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </CardFooter>
              </Card>
              <Card className="bg-green-500 text-white border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] flex flex-col retro-card">
                <CardHeader className="!bg-transparent !border-0">
                  <TrendingUp className="h-10 w-10 mb-3" />
                  <CardTitle className="text-xl font-semibold !text-white">Financial Plan</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow !border-0">
                  <p className="text-sm">The Financial Needs Of Each Client Is As Unique As Their Own Fingerprints. Our Goal In Financial Planning Is To Give You The Peace Of Mind That You Are On The Right Track.</p>
                </CardContent>
                 <CardFooter className="!border-0 !bg-transparent">
                   <Link href="#" className="font-semibold hover:underline flex items-center">Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </CardFooter>
              </Card>
              <Card className="bg-orange-500 text-white border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] flex flex-col retro-card">
                <CardHeader className="!bg-transparent !border-0">
                  <Briefcase className="h-10 w-10 mb-3" />
                  <CardTitle className="text-xl font-semibold !text-white">Wealth Investment</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow !border-0">
                  <p className="text-sm">We Take A Holistic, Comprehensive Approach To Investment Management That's Shaped By Decades Of Research To Determine The Most Efficient Investment Policy.</p>
                </CardContent>
                 <CardFooter className="!border-0 !bg-transparent">
                   <Link href="#" className="font-semibold hover:underline flex items-center">Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </CardFooter>
              </Card>
              <Card className="bg-blue-600 text-white border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] flex flex-col retro-card">
                <CardHeader className="!bg-transparent !border-0">
                  <Handshake className="h-10 w-10 mb-3" />
                  <CardTitle className="text-xl font-semibold !text-white">Fiduciary Advice</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow !border-0">
                  <p className="text-sm">An Employer Sponsored Retirement Plan Is One Of The Most Important Employee Benefits You Can Offer. Our Expertise Lies In Helping You Mitigate Fiduciary Liability.</p>
                </CardContent>
                 <CardFooter className="!border-0 !bg-transparent">
                   <Link href="#" className="font-semibold hover:underline flex items-center">Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Article Section */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Our Article</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] p-0 overflow-hidden retro-card">
                <Image
                  src="https://placehold.co/800x400.png"
                  alt="Fundamentals of Investment"
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover"
                  data-ai-hint="finance planning desk"
                />
                <div className="p-6 bg-orange-500 text-white">
                  <h3 className="text-2xl font-semibold mb-3">Fundamentals Of Success Investment</h3>
                  <div className="flex items-center space-x-2 text-xs mb-4">
                    <Image src="https://placehold.co/32x32.png" alt="Marcus Claide" width={32} height={32} className="rounded-full" data-ai-hint="man portrait" />
                    <span>Marcus Claide</span>
                    <span>|</span>
                    <span>12 May, 2021</span>
                  </div>
                  <Link href="#" className="font-semibold hover:underline flex items-center">Read More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </div>
              </Card>
              <div className="space-y-8">
                <Card className="border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] retro-card">
                  <CardContent className="p-6 !border-0">
                    <h4 className="text-lg font-semibold mb-2">Take Advantage Of Tax-Smart Strategies To Help Better Reach Goals</h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                       <Image src="https://placehold.co/24x24.png" alt="Dwaine Clark" width={24} height={24} className="rounded-full" data-ai-hint="woman portrait" />
                       <span>Dwaine Clarck</span>
                       <span>|</span>
                       <span>12 May, 2021</span>
                    </div>
                    <Link href="#" className="text-sm font-semibold text-yellow-600 hover:underline flex items-center">Read More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </CardContent>
                </Card>
                <Card className="border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] retro-card">
                  <CardContent className="p-6 !border-0">
                    <h4 className="text-lg font-semibold mb-2">How To Find A Financial Adviser You Can Trust</h4>
                     <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
                       <Image src="https://placehold.co/24x24.png" alt="Vender Cerck" width={24} height={24} className="rounded-full" data-ai-hint="man glasses portrait" />
                       <span>Vender Cerck</span>
                       <span>|</span>
                       <span>12 May, 2021</span>
                    </div>
                    <Link href="#" className="text-sm font-semibold text-yellow-600 hover:underline flex items-center">Read More <ArrowRight className="ml-1 h-4 w-4" /></Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Questions Section */}
        <section className="py-16 sm:py-24 bg-white px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl text-center border-2 border-black rounded-lg shadow-[6px_6px_0px_#000] p-8 sm:p-12 relative retro-card">
             <div className="absolute top-4 left-4 h-3 w-3 bg-yellow-400 rounded-full animate-ping"></div>
             <div className="absolute top-8 right-8 h-4 w-4 bg-green-400 rounded-full animate-ping delay-300"></div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              We Know That You're Going To Have A Lot Of Questions, And We're Here To Help!
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 text-base rounded-md shadow-md transition-transform hover:scale-105 retro-button">
                <MessageCircle className="mr-2 h-5 w-5" /> Send Message
              </Button>
              <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-500 hover:text-white font-semibold py-3 px-6 text-base rounded-md shadow-md transition-transform hover:scale-105 retro-button">
                <Inbox className="mr-2 h-5 w-5" /> Online Chat
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-300 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Fin.Co</h3>
              <p className="text-sm leading-relaxed">
                Enter Your Email To Get Latest News!
              </p>
              <form className="mt-4 flex">
                <Input
                  type="email"
                  placeholder="Enter your email..."
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-l-md focus:ring-yellow-500 focus:border-yellow-500 flex-grow retro-input"
                />
                <Button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black rounded-r-md px-4 py-2 retro-button !rounded-l-none">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#services" className="hover:text-yellow-400">Investment Management</Link></li>
                <li><Link href="#services" className="hover:text-yellow-400">Financial Plan</Link></li>
                <li><Link href="#services" className="hover:text-yellow-400">Wealth Investment</Link></li>
                <li><Link href="#services" className="hover:text-yellow-400">Fiduciary Advice</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-yellow-400">About Us</Link></li>
                <li><Link href="#" className="hover:text-yellow-400">Article</Link></li>
                <li><Link href="#" className="hover:text-yellow-400">Community</Link></li>
                <li><Link href="#" className="hover:text-yellow-400">50% Halt</Link></li> {/* This link seems odd, keeping from image */}
              </ul>
            </div>
             <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us On</h4>
                <div className="flex space-x-4">
                    <Link href="#" className="text-gray-400 hover:text-yellow-400"><Facebook className="h-6 w-6"/></Link>
                    <Link href="#" className="text-gray-400 hover:text-yellow-400"><Twitter className="h-6 w-6"/></Link>
                    <Link href="#" className="text-gray-400 hover:text-yellow-400"><Instagram className="h-6 w-6"/></Link>
                    <Link href="#" className="text-gray-400 hover:text-yellow-400"><Youtube className="h-6 w-6"/></Link>
                </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Fin.Co. All Rights Reserved. (Demo Application)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
