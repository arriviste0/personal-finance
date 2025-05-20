
'use client';

import React from 'react';
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
  LayoutGrid, // Ensure LayoutGrid is imported
  Palette,
  Smartphone,
  Code,
  Layers,
  Settings2Icon,
  Activity,
  Cpu,
  Image as ImageIcon,
  UsersRound,
  ShoppingCart,
  Mail as MailIconLucide,
  ShieldQuestion,
  FileQuestion,
  Bot,
  Building,
  CalendarDays,
  Search,
  HeartHandshake
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
  href: string;
  bgColorClass?: string; // Made optional for NFT theme
  iconColorClass?: string;
  textColorClass?: string;
  borderColorClass?: string;
  tagBgClass?: string;
  tagTextColorClass?: string;
  tagBorderColorClass?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  tags,
  href,
  bgColorClass = "bg-card", // Default to card background
  iconColorClass = "text-nft-pink",
  textColorClass = "text-nft-dark",
  borderColorClass = "border-gray-200",
  tagBgClass = "bg-gray-100",
  tagTextColorClass = "text-gray-700",
  tagBorderColorClass = "border-gray-300"
}) => {
  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Link href={href} passHref className="no-underline h-full flex">
        <div // Changed from Card to div to avoid nested card styles
          className={cn(
            "flex flex-col h-full p-6 transition-all duration-300 border rounded-xl shadow-lg hover:shadow-xl",
            bgColorClass,
            borderColorClass
          )}
        >
          <div className="mb-4">
            <Icon className={cn("h-10 w-10 mb-3 transition-transform duration-300 group-hover:scale-110", iconColorClass)} />
          </div>
          <h3 className={cn("text-xl font-bold mb-2 font-heading", textColorClass)}>{title}</h3>
          <p className={cn("text-sm flex-grow mb-4 font-sans opacity-90", textColorClass === 'text-nft-dark' ? 'text-nft-gray-text' : textColorClass )}>{description}</p>
          <div className="mt-auto">
            <h4 className={cn("text-xs font-semibold mb-2 uppercase tracking-wider font-sans opacity-70", textColorClass === 'text-nft-dark' ? 'text-nft-gray-text' : textColorClass )}>Popular tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className={cn("text-xs font-medium px-3 py-1 border rounded-full hover:opacity-80 transition-all duration-150 cursor-pointer font-sans no-underline", tagBgClass, tagTextColorClass, tagBorderColorClass )}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bgClassName?: string;
  id?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className, bgClassName = "bg-nft-light-bg", id }) => {
  return (
    <section id={id} className={cn("py-16 md:py-24 relative", bgClassName, className)}>
      <div className="container-default relative z-10">
        {children}
      </div>
    </section>
  );
};

const services = [
  { title: "Smart Budgeting", description: "Take control of your spending with intuitive budgeting tools.", icon: HandCoins, tags: ["Monthly", "Tracking", "Savings"], href: "/budget", bgColorClass: "bg-nft-pink/10", iconColorClass:"text-nft-pink", textColorClass:"text-nft-dark", borderColorClass:"border-nft-pink/30", tagBgClass:"bg-nft-pink/20", tagTextColorClass:"text-nft-pink", tagBorderColorClass:"border-nft-pink/40" },
  { title: "Goal-Oriented Savings", description: "Set, track, and achieve your financial goals faster.", icon: PiggyBank, tags: ["Vacation", "Emergency", "Retirement"], href: "/savings-goals", bgColorClass: "bg-nft-teal/10", iconColorClass:"text-nft-teal", textColorClass:"text-nft-dark", borderColorClass:"border-nft-teal/30", tagBgClass:"bg-nft-teal/20", tagTextColorClass:"text-nft-teal", tagBorderColorClass:"border-nft-teal/40" },
  { title: "AI Financial Advisor", description: "Get personalized insights and advice to optimize your finances.", icon: BrainCircuit, tags: ["Personalized", "Tips", "Automation"], href: "/ai-assistant", bgColorClass: "bg-nft-yellow/10", iconColorClass:"text-nft-yellow", textColorClass:"text-nft-dark", borderColorClass:"border-nft-yellow/30", tagBgClass:"bg-nft-yellow/20", tagTextColorClass:"text-nft-yellow", tagBorderColorClass:"border-nft-yellow/40"},
  { title: "Expense Tracking", description: "Log and categorize your expenses effortlessly.", icon: ListChecks, tags: ["Daily Reports", "Categories"], href: "/expenses", bgColorClass: "bg-purple-500/10", iconColorClass:"text-purple-600", textColorClass:"text-nft-dark", borderColorClass:"border-purple-500/30", tagBgClass:"bg-purple-500/20", tagTextColorClass:"text-purple-600", tagBorderColorClass:"border-purple-500/40" },
  { title: "Tax Planning", description: "Estimate and plan for your taxes with ease.", icon: FileText, tags: ["Estimates", "Deductions"], href: "/tax-planner", bgColorClass: "bg-orange-500/10", iconColorClass:"text-orange-600", textColorClass:"text-nft-dark", borderColorClass:"border-orange-500/30", tagBgClass:"bg-orange-500/20", tagTextColorClass:"text-orange-600", tagBorderColorClass:"border-orange-500/40" },
  { title: "Investment Portfolio", description: "Monitor your investments and grow your wealth.", icon: Landmark, tags: ["Stocks", "Crypto", "Growth"], href: "/investments", bgColorClass: "bg-green-500/10", iconColorClass:"text-green-600", textColorClass:"text-nft-dark", borderColorClass:"border-green-500/30", tagBgClass:"bg-green-500/20", tagTextColorClass:"text-green-600", tagBorderColorClass:"border-green-500/40" },
  { title: "Dashboard Overview", description: "Your financial cockpit at a glance.", icon: LayoutGrid, tags: ["Summary", "Overview", "Insights"], href: "/dashboard", bgColorClass: "bg-sky-500/10", iconColorClass:"text-sky-600", textColorClass:"text-nft-dark", borderColorClass:"border-sky-500/30", tagBgClass:"bg-sky-500/20", tagTextColorClass:"text-sky-600", tagBorderColorClass:"border-sky-500/40" },
  { title: "Emergency Fund", description: "Build and track your safety net.", icon: ShieldAlert, tags: ["Safety", "Security", "Peace of Mind"], href: "/emergency-fund", bgColorClass: "bg-red-500/10", iconColorClass:"text-red-600", textColorClass:"text-nft-dark", borderColorClass:"border-red-500/30", tagBgClass:"bg-red-500/20", tagTextColorClass:"text-red-600", tagBorderColorClass:"border-red-500/40" },
];


const popularArtists = [
  { id: 1, name: "Smart Budgeting", username: "@budgetpro", avatar: "https://placehold.co/100x100.png", dataAiHint: "budgeting icon" },
  { id: 2, name: "Goal Savings AI", username: "@goalsaver", avatar: "https://placehold.co/100x100.png", dataAiHint: "piggy bank ai" },
  { id: 3, name: "Invest Track", username: "@investwiz", avatar: "https://placehold.co/100x100.png", dataAiHint: "investment chart" },
  { id: 4, name: "Expense Brain", username: "@expenselog", avatar: "https://placehold.co/100x100.png", dataAiHint: "receipt list" },
  { id: 5, name: "Tax Helper Bot", username: "@taxai", avatar: "https://placehold.co/100x100.png", dataAiHint: "tax document" },
];

const discoverNFTs = [
  { id: 1, title: "AI Budget Planner", currentBid: "Free Tier", creatorName: "FinCo AI", creatorAvatar: "https://placehold.co/40x40.png", imageSrc: "https://placehold.co/300x200.png", dataAiHint: "budget dashboard" },
  { id: 2, title: "Smart Savings Goal", currentBid: "Set Target", creatorName: "Goal Engine", creatorAvatar: "https://placehold.co/40x40.png", imageSrc: "https://placehold.co/300x200.png", dataAiHint: "savings goal progress" },
  { id: 3, title: "Investment Insights", currentBid: "Connect Portfolio", creatorName: "Market Analyzer", creatorAvatar: "https://placehold.co/40x40.png", imageSrc: "https://placehold.co/300x200.png", dataAiHint: "investment graph" },
  { id: 4, title: "Expense Categorizer", currentBid: "Link Account", creatorName: "Receipt Bot", creatorAvatar: "https://placehold.co/40x40.png", imageSrc: "https://placehold.co/300x200.png", dataAiHint: "expense categories" },
];

const articleData = [
  { id: 1, title: "The Power of Compound Interest for Young Savers", author: "Jane Doe, CFA", date: "Apr 15, 2024", imageSrc: "https://placehold.co/400x250.png", dataAiHint: "growing money plant" },
  { id: 2, title: "5 Common Budgeting Mistakes and How to Fix Them", author: "John Smith", date: "Apr 10, 2024", imageSrc: "https://placehold.co/400x250.png", dataAiHint: "person fixing budget" },
  { id: 3, title: "Understanding Your Tax Deductions in 2024", author: "FinCo Experts", date: "Apr 05, 2024", imageSrc: "https://placehold.co/400x250.png", dataAiHint: "tax documents calculator" },
];

const featureSteps = [
  { id: 1, icon: Smartphone, title: "Connect Your Accounts", description: "Securely link your bank accounts for a holistic view of your finances." },
  { id: 2, icon: Target, title: "Set Financial Goals", description: "Define what you're saving for, from a new car to early retirement." },
  { id: 3, icon: BrainCircuit, title: "Get AI-Powered Plans", description: "Let our smart assistant create personalized budgets and savings strategies for you." },
];


export default function LandingPage() {
  const [activeFilter, setActiveFilter] = React.useState("Popular");
  const filters = ["Popular", "Saving", "Investing", "Planning", "AI Tools"];

  return (
    <div className="flex flex-col min-h-screen bg-nft-light-bg text-nft-dark">
      <main className="flex-grow">
        {/* Hero Section */}
        <SectionWrapper bgClassName="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[calc(80vh-80px)]">
            <div className="bg-nft-pink flex flex-col justify-center p-8 md:p-12 lg:p-16 rounded-r-3xl lg:rounded-r-[50px]">
              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white font-heading"
              >
                Master Your Money with FinCo
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg text-white/80 mb-8 max-w-md"
              >
                Track your income, budget smarter, save with purpose, and grow your wealth with our AI-powered platform.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button asChild className="btn-pill bg-nft-dark text-white hover:bg-opacity-90 px-8 py-3 text-base">
                  <Link href="/get-started">Explore Features</Link>
                </Button>
                <Button variant="outline" className="btn-pill border-2 border-white text-white bg-transparent hover:bg-white hover:text-nft-pink px-8 py-3 text-base">
                  How It Works
                </Button>
              </motion.div>
            </div>
            <div className="bg-nft-yellow flex items-center justify-center p-8 md:p-12 rounded-l-3xl lg:rounded-l-[50px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="landing-card bg-white p-6 w-full max-w-sm"
              >
                <Image
                  src="https://placehold.co/400x300.png"
                  alt="FinCo AI Budgeting Assistant"
                  width={400}
                  height={300}
                  className="w-full rounded-lg mb-4"
                  data-ai-hint="AI budgeting assistant interface"
                />
                <h4 className="text-xl font-bold text-nft-dark mb-1 font-heading">AI Budgeting Assistant</h4>
                <p className="text-sm text-nft-gray-text mb-3">Let our AI craft the perfect budget for you.</p>
                <Button className="w-full btn-pill bg-nft-pink text-white hover:bg-nft-pink/90 text-sm">
                  Try Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </SectionWrapper>

        {/* Most Popular Features Section */}
        <SectionWrapper id="popular-features">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-nft-dark font-heading">Our Most Loved Features</h2>
          <p className="text-lg text-nft-gray-text text-center max-w-2xl mx-auto mb-12">
            Discover the tools our users can't get enough of.
          </p>
          <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4">
            {popularArtists.map((artist) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="landing-card flex-shrink-0 w-[280px] p-5 text-center"
              >
                <Image src={artist.avatar} alt={artist.name} width={80} height={80} className="rounded-full mx-auto mb-3 border-2 border-nft-teal" data-ai-hint={artist.dataAiHint} />
                <h4 className="font-semibold text-nft-dark mb-0.5 font-heading">{artist.name}</h4>
                <p className="text-xs text-nft-gray-text mb-3">{artist.username}</p>
                <Button className="w-full btn-pill bg-nft-teal text-white hover:bg-nft-teal/90 text-xs px-4 py-2">
                  Explore Feature
                </Button>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Discover More FinCo Tools Section */}
        <SectionWrapper id="discover-tools" bgClassName="bg-gray-50">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-nft-dark font-heading">Discover More FinCo Tools</h2>
          <p className="text-lg text-nft-gray-text text-center max-w-2xl mx-auto mb-10">
            Filter by category to find the perfect financial tool for your needs.
          </p>
          <div className="flex justify-center flex-wrap gap-3 mb-10">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "btn-pill text-sm px-5 py-2",
                  activeFilter === filter ? "bg-nft-pink text-white border-nft-pink" : "border-gray-300 text-nft-gray-text hover:bg-gray-100 hover:border-gray-400"
                )}
              >
                {filter}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoverNFTs.map((nft) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4 }}
                className="landing-card p-4"
              >
                <Image src={nft.imageSrc} alt={nft.title} width={300} height={200} className="w-full h-40 object-cover rounded-md mb-4" data-ai-hint={nft.dataAiHint}/>
                <h4 className="font-semibold text-nft-dark mb-1 truncate font-heading">{nft.title}</h4>
                <p className="text-xs text-nft-gray-text mb-1">Powered by: <span className="font-medium text-nft-dark">{nft.creatorName}</span></p>
                <p className="text-nft-pink font-semibold text-sm mb-3">{nft.currentBid}</p>
                <Button className="w-full btn-pill bg-nft-yellow text-nft-dark hover:bg-nft-yellow/90 text-sm">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Stats Section */}
        <SectionWrapper id="stats" bgClassName="bg-nft-dark">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "300K+", label: "Users Trust FinCo", color: "text-nft-pink" },
              { value: "15K+", label: "Goals Achieved", color: "text-nft-yellow" },
              { value: "5M+", label: "Transactions Processed", color: "text-nft-teal" },
              { value: "$1.2M+", label: "Saved by Users", color: "text-green-400" },
            ].map(stat => (
              <div key={stat.label}>
                <p className={cn("text-3xl md:text-4xl font-bold mb-1 font-heading", stat.color)}>{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* A New Financial Experience CTA */}
        <SectionWrapper id="new-experience" bgClassName="bg-nft-yellow">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-nft-dark font-heading">A New Financial Experience</h2>
            <p className="text-lg text-nft-dark/80 mb-8">
              FinCo redefines personal finance management, making it intuitive, smart, and empowering for everyone.
            </p>
            <Button asChild className="btn-pill bg-nft-dark text-white hover:bg-opacity-90 px-8 py-3 text-base">
              <Link href="/get-started">Get Started Today</Link>
            </Button>
          </div>
        </SectionWrapper>

        {/* Key Benefits Section */}
        <SectionWrapper id="key-benefits">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
            >
              <Image src="https://placehold.co/600x450.png" alt="Financial planning illustration" width={600} height={450} className="rounded-xl shadow-xl" data-ai-hint="financial planning illustration"/>
            </motion.div>
            <div className="bg-nft-pink/80 p-8 md:p-12 rounded-xl text-white">
              <h2 className="text-3xl font-bold mb-8 font-heading">Unlock Your Financial Potential</h2>
              {featureSteps.map((step, index) => {
                const StepIcon = step.icon;
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="flex items-start gap-4 mb-6 last:mb-0"
                  >
                    <div className="bg-white/20 p-3 rounded-full">
                      <StepIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-1 font-heading">{`0${step.id}. ${step.title}`}</h4>
                      <p className="text-white/80 text-sm">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </SectionWrapper>

        {/* All about Smart Finance (Articles) Section */}
        <SectionWrapper id="articles" bgClassName="bg-gray-50">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-nft-dark font-heading">All about Smart Finance</h2>
              <p className="text-lg text-nft-gray-text">Tips, insights, and guides to help you navigate your finances.</p>
            </div>
            <Button variant="outline" asChild className="btn-pill border-nft-dark text-nft-dark hover:bg-nft-dark hover:text-white text-sm hidden sm:inline-flex">
              <Link href="/blog">See All Articles</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {articleData.map(article => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className="landing-card overflow-hidden"
              >
                <Image src={article.imageSrc} alt={article.title} width={400} height={250} className="w-full h-48 object-cover" data-ai-hint={article.dataAiHint}/>
                <div className="p-5">
                  <h4 className="font-semibold text-lg text-nft-dark mb-2 font-heading truncate">{article.title}</h4>
                  <p className="text-xs text-nft-gray-text mb-1">By {article.author}</p>
                  <p className="text-xs text-nft-gray-text">{article.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
           <div className="text-center mt-8 sm:hidden">
             <Button variant="outline" asChild className="btn-pill border-nft-dark text-nft-dark hover:bg-nft-dark hover:text-white text-sm">
                <Link href="/blog">See All Articles</Link>
              </Button>
           </div>
        </SectionWrapper>

        {/* Take Control CTA Section */}
        <SectionWrapper id="cta-control" bgClassName="bg-nft-teal">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white font-heading">Take Control of Your Financial Future</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="btn-pill bg-nft-pink text-white hover:bg-nft-pink/90 px-8 py-3 text-base">
                <Link href="/get-started">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" className="btn-pill border-2 border-nft-dark text-nft-dark bg-transparent hover:bg-nft-dark hover:text-white px-8 py-3 text-base">
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <footer className="bg-nft-dark text-gray-300 py-12 sm:py-16">
        <div className="container-default">
          <div className="grid lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8 md:gap-12 mb-10">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2 no-underline">
                <CircleDollarSign className="h-8 w-8 text-nft-pink" />
                <span className="text-2xl font-bold font-heading text-white">FinCo</span>
              </Link>
              <p className="text-sm">Subscribe to get financial tips & FinCo updates straight to your inbox.</p>
              <form className="mt-4 flex">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:ring-nft-pink focus:border-nft-pink flex-grow !rounded-r-none h-11"
                  aria-label="Email for newsletter"
                />
                <Button type="submit" className="btn-pill bg-nft-pink text-white hover:bg-nft-pink/90 !rounded-l-none h-11 !px-4">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </div>

            <div>
              <h4 className="text-base font-semibold text-white mb-4 font-heading">FinCo</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-nft-pink transition-colors no-underline text-sm">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-nft-pink transition-colors no-underline text-sm">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-nft-pink transition-colors no-underline text-sm">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-nft-pink transition-colors no-underline text-sm">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base font-semibold text-white mb-4 font-heading">Features</h4>
              <ul className="space-y-2">
                <li><Link href="/budget" className="hover:text-nft-pink transition-colors no-underline text-sm">Budgeting</Link></li>
                <li><Link href="/expenses" className="hover:text-nft-pink transition-colors no-underline text-sm">Expense Tracking</Link></li>
                <li><Link href="/savings-goals" className="hover:text-nft-pink transition-colors no-underline text-sm">Savings Goals</Link></li>
                <li><Link href="/investments" className="hover:text-nft-pink transition-colors no-underline text-sm">Investments</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="text-base font-semibold text-white mb-4 font-heading">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="/#pricing" className="hover:text-nft-pink transition-colors no-underline text-sm">Pricing</Link></li>
                <li><Link href="/faq" className="hover:text-nft-pink transition-colors no-underline text-sm">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-nft-pink transition-colors no-underline text-sm">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-nft-pink transition-colors no-underline text-sm">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="text-gray-500 mb-4 sm:mb-0">&copy; {new Date().getFullYear()} FinCo. All Rights Reserved.</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="text-gray-400 hover:text-nft-pink transition-colors no-underline"><Twitter className="h-5 w-5"/></Link>
              <Link href="#" aria-label="YouTube" className="text-gray-400 hover:text-nft-pink transition-colors no-underline"><Youtube className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Instagram" className="text-gray-400 hover:text-nft-pink transition-colors no-underline"><Instagram className="h-5 w-5"/></Link>
              <Link href="#" aria-label="Facebook" className="text-gray-400 hover:text-nft-pink transition-colors no-underline"><Facebook className="h-5 w-5"/></Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

