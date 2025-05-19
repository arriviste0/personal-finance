/**
 * @fileOverview Defines TypeScript interfaces for MongoDB collection schemas.
 * These interfaces serve as a blueprint for the data structure of each collection
 * in the FinCo application's database.
 */

import type { ObjectId } from 'mongodb';

// --- User Collection ---
// Stores user account information, including authentication details and main wallet balance.
export interface UserSchema {
  _id: ObjectId;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  password?: string | null; // Hashed password
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  walletBalance: number; // Main available funds for the user
  // financialScore?: number; // For gamification, if implemented
  // badges?: string[]; // For gamification
}

// --- Budget Sub-Documents ---
// These are typically embedded within a Budget document.
export interface SubcategoryItemSchema {
  _id: ObjectId; // Or could be a simple string ID if not needing separate queries
  name: string;
  budget: number;
  spent: number;
}

export interface BudgetItemSchema {
  _id: ObjectId; // Or string ID
  category: string;
  budget: number;
  spent: number;
  color?: string; // For UI display
  subcategories?: SubcategoryItemSchema[];
}

// --- Budget Collection ---
// Stores monthly budgets for each user.
export interface BudgetSchema {
  _id: ObjectId;
  userId: ObjectId; // Foreign key to User collection
  monthYear: string; // Format: "YYYY-MM", e.g., "2024-07"
  budgetItems: BudgetItemSchema[];
  totalBudget: number;
  totalSpent: number;
  createdAt: Date;
  updatedAt: Date;
}

// --- Transaction Collection ---
// Stores all individual financial transactions (income and expenses).
export type TransactionType = 'income' | 'expense';

export interface TransactionSchema {
  _id: ObjectId;
  userId: ObjectId; // Foreign key to User collection
  date: Date; // Changed from string to Date for better querying
  description: string;
  category: string;
  amount: number; // Positive for income, negative for expenses
  type: TransactionType;
  budgetItemId?: ObjectId | string | null; // Optional link to a BudgetItemSchema's _id
  isRecurring: boolean;
  recurrenceInterval?: 'daily' | 'weekly' | 'monthly' | 'yearly' | null; // If isRecurring is true
  nextRecurrenceDate?: Date | null; // If isRecurring is true
  notes?: string | null;
  receiptUrl?: string | null; // Link to stored receipt image/PDF
  createdAt: Date;
  updatedAt: Date;
}

// --- Savings Goal Collection ---
// Stores user-defined savings goals.
export interface SavingsGoalSchema {
  _id: ObjectId;
  userId: ObjectId; // Foreign key to User collection
  name: string;
  targetAmount: number;
  currentAmount: number; // Funds allocated/locked to this goal
  iconName?: string; // For UI display (e.g., "PiggyBank", "Vacation")
  description?: string | null;
  targetDate?: Date | null;
  isComplete: boolean;
  // Family goal fields (optional)
  // familyMembers?: ObjectId[]; // Array of User ObjectIds
  // isFamilyGoal?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// --- Emergency Fund Collection ---
// Dedicated tracking for a user's emergency fund.
// Typically, one document per user.
export interface EmergencyFundSchema {
  _id: ObjectId;
  userId: ObjectId; // Foreign key to User collection
  targetAmount: number;
  currentAmount: number; // Funds allocated/locked to the emergency fund
  createdAt: Date;
  updatedAt: Date;
}

// --- Emergency Fund Transaction Collection ---
// Logs deposits and withdrawals specific to the emergency fund.
export type EmergencyFundTransactionType = 'deposit' | 'withdrawal';
export interface EmergencyFundTransactionSchema {
  _id: ObjectId;
  emergencyFundId: ObjectId; // Foreign key to EmergencyFundSchema
  userId: ObjectId; // To easily query transactions by user
  date: Date;
  type: EmergencyFundTransactionType;
  amount: number; // Always positive, type determines addition/subtraction
  notes?: string | null;
  createdAt: Date;
}

// --- Investment Collection ---
// Stores details of various investments held by the user.
export type InvestmentType = 'Stock' | 'ETF' | 'Mutual Fund' | 'Crypto' | 'Bond' | 'Real Estate' | 'Other';
export interface InvestmentSchema {
  _id: ObjectId;
  userId: ObjectId; // Foreign key to User collection
  name: string; // e.g., "Apple Inc.", "Vanguard S&P 500 ETF"
  ticker?: string | null; // e.g., AAPL, VOO
  type: InvestmentType;
  currentValue: number;
  quantity?: number | null;
  purchasePrice?: number | null; // Price per unit at time of purchase
  purchaseDate?: Date | null;
  // For SIPs
  isSIP?: boolean;
  sipAmount?: number | null;
  sipFrequency?: 'daily' | 'weekly' | 'monthly' | null;
  nextSipDate?: Date | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// --- Tax Profile Collection ---
// Stores user's inputs for tax estimation and planning.
export type FilingStatusType = "single" | "married_filing_jointly" | "married_filing_separately" | "head_of_household";
export interface TaxDeductionItemSchema {
  name: string; // e.g., "Medical Expenses", "Charitable Contributions"
  amount: number;
}
export interface TaxCreditItemSchema {
  name: string; // e.g., "Child Tax Credit"
  amount: number;
}
export interface TaxProfileSchema {
  _id: ObjectId;
  userId: ObjectId; // Foreign key to User collection
  taxYear: number;
  annualIncome: number;
  filingStatus: FilingStatusType;
  itemizedDeductions?: TaxDeductionItemSchema[] | null; // Array for itemized deductions
  standardDeductionTaken?: number | null; // Amount if standard deduction is taken
  totalDeductions: number; // Could be standard or sum of itemized
  taxCredits?: TaxCreditItemSchema[] | null;
  estimatedTaxLiability?: number | null; // Result from last estimation
  // taxDocumentUrls?: { name: string, url: string }[]; // Links to uploaded tax documents
  createdAt: Date;
  updatedAt: Date;
}

// --- AI Assistant Log Collection (Optional) ---
// Logs interactions with the AI assistant for history and potential fine-tuning.
export interface AIAssistantLogSchema {
  _id: ObjectId;
  userId: ObjectId; // Foreign key to User collection
  timestamp: Date;
  userQueryText?: string | null;
  // userQueryVoiceUrl?: string | null; // If voice input is stored
  aiResponseText?: string | null;
  // aiGeneratedPlanId?: ObjectId | null; // If AI generates a specific plan
  // associatedHealthScore?: number | null;
}

// --- Subscription Plan Collection (For Business Model) ---
export type PlanTier = 'free' | 'student' | 'professional' | 'family' | 'premium';
export interface SubscriptionSchema {
  _id: ObjectId;
  userId: ObjectId;
  plan: PlanTier;
  startDate: Date;
  endDate?: Date | null; // For fixed-term subscriptions
  status: 'active' | 'canceled' | 'expired' | 'pending_payment';
  stripeSubscriptionId?: string | null; // Or other payment provider ID
  createdAt: Date;
  updatedAt: Date;
}
