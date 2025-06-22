
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
}

// --- Budget Sub-Documents ---
export interface BudgetItemSchema {
  _id: ObjectId;
  category: string;
  budget: number;
  spent: number;
  color: string;
}

// --- Budget Collection ---
export interface BudgetSchema {
  _id: ObjectId;
  userId: ObjectId;
  monthYear: string; // Format: "YYYY-MM"
  budgetItems: BudgetItemSchema[];
  totalBudget: number;
  totalSpent: number;
  createdAt: Date;
  updatedAt: Date;
}

// --- Transaction Collection ---
export interface TransactionSchema {
  _id: ObjectId;
  userId: ObjectId;
  date: Date; // Use Date type for better querying
  description: string;
  category: string;
  amount: number; // Negative for expenses, positive for income
  budgetItemId?: ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

// --- Savings Goal Collection ---
export interface SavingsGoalSchema {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  targetAmount: number;
  currentAmount: number;
  iconName: string;
  description?: string | null;
  isComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// --- Emergency Fund Collection ---
export interface EmergencyFundSchema {
  _id: ObjectId;
  userId: ObjectId;
  targetAmount: number;
  currentAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// --- Emergency Fund Transaction Collection ---
export type EmergencyFundTransactionType = 'deposit' | 'withdrawal';
export interface EmergencyFundTransactionSchema {
  _id: ObjectId;
  userId: ObjectId;
  date: Date;
  type: EmergencyFundTransactionType;
  amount: number;
  notes?: string | null;
  createdAt: Date;
}


// --- Investment Collection ---
export type InvestmentType = 'Stock' | 'ETF' | 'Mutual Fund' | 'Crypto' | 'Bond' | 'Other';
export interface InvestmentSchema {
  _id: ObjectId;
  userId: ObjectId;
  name: string;
  ticker?: string | null;
  type: InvestmentType;
  value: number;
  quantity?: number | null;
  purchasePrice?: number | null;
  createdAt: Date;
  updatedAt: Date;
}
