'use server';

/**
 * @fileOverview An AI agent that analyzes user spending patterns and provides personalized savings tips.
 *
 * - analyzeSpendingPatterns - A function that analyzes spending patterns and provides savings tips.
 * - AnalyzeSpendingPatternsInput - The input type for the analyzeSpendingPatterns function.
 * - AnalyzeSpendingPatternsOutput - The return type for the analyzeSpendingPatterns function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeSpendingPatternsInputSchema = z.object({
  monthlyIncome: z.number().describe('The user\'s monthly income.'),
  monthlyExpenses: z
    .array(z.object({
      category: z.string().describe('The expense category (e.g., food, rent, entertainment).'),
      amount: z.number().describe('The amount spent in that category.'),
    }))
    .describe('A list of monthly expenses with category and amount.'),
  savingsGoals: z
    .array(z.object({
      goalName: z.string().describe('The name of the savings goal (e.g., vacation, down payment).'),
      targetAmount: z.number().describe('The target amount for the savings goal.'),
      currentAmount: z.number().describe('The current amount saved towards the goal.'),
    }))
    .describe('A list of savings goals with target and current amounts.'),
});
export type AnalyzeSpendingPatternsInput = z.infer<typeof AnalyzeSpendingPatternsInputSchema>;

const AnalyzeSpendingPatternsOutputSchema = z.object({
  spendingAnalysis: z.string().describe('An analysis of the user\'s spending patterns.'),
  savingsTips: z.array(z.string()).describe('Personalized tips for optimizing savings.'),
});
export type AnalyzeSpendingPatternsOutput = z.infer<typeof AnalyzeSpendingPatternsOutputSchema>;

export async function analyzeSpendingPatterns(
  input: AnalyzeSpendingPatternsInput
): Promise<AnalyzeSpendingPatternsOutput> {
  return analyzeSpendingPatternsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSpendingPatternsPrompt',
  input: {
    schema: z.object({
      monthlyIncome: z.number().describe('The user\'s monthly income.'),
      monthlyExpenses: z
        .array(z.object({
          category: z.string().describe('The expense category (e.g., food, rent, entertainment).'),
          amount: z.number().describe('The amount spent in that category.'),
        }))
        .describe('A list of monthly expenses with category and amount.'),
      savingsGoals: z
        .array(z.object({
          goalName: z.string().describe('The name of the savings goal (e.g., vacation, down payment).'),
          targetAmount: z.number().describe('The target amount for the savings goal.'),
          currentAmount: z.number().describe('The current amount saved towards the goal.'),
        }))
        .describe('A list of savings goals with target and current amounts.'),
    }),
  },
  output: {
    schema: z.object({
      spendingAnalysis: z.string().describe('An analysis of the user\'s spending patterns.'),
      savingsTips: z.array(z.string()).describe('Personalized tips for optimizing savings.'),
    }),
  },
  prompt: `You are a personal finance advisor. Analyze the user's spending patterns and provide personalized savings tips.

  Monthly Income: {{{monthlyIncome}}}
  Monthly Expenses:
  {{#each monthlyExpenses}}
  - Category: {{{category}}}, Amount: {{{amount}}}
  {{/each}}
  Savings Goals:
  {{#each savingsGoals}}
  - Goal: {{{goalName}}}, Target: {{{targetAmount}}}, Current: {{{currentAmount}}}
  {{/each}}

  Provide a spending analysis and a list of savings tips based on the provided information.`,
});

const analyzeSpendingPatternsFlow = ai.defineFlow<
  typeof AnalyzeSpendingPatternsInputSchema,
  typeof AnalyzeSpendingPatternsOutputSchema
>(
  {
    name: 'analyzeSpendingPatternsFlow',
    inputSchema: AnalyzeSpendingPatternsInputSchema,
    outputSchema: AnalyzeSpendingPatternsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
