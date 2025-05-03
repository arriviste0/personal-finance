'use client';

import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form"; // Removed Controller as it wasn't explicitly used
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { analyzeSpendingPatterns, type AnalyzeSpendingPatternsInput, type AnalyzeSpendingPatternsOutput } from "@/ai/flows/analyze-spending-patterns";
import { Lightbulb, Loader2, PlusCircle, Trash2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from '@/components/ui/separator';

const expenseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.coerce.number().min(0, "Amount must be non-negative"), // Allow 0
});

const goalSchema = z.object({
  goalName: z.string().min(1, "Goal name is required"),
  targetAmount: z.coerce.number().min(1, "Target amount must be positive"),
  currentAmount: z.coerce.number().min(0, "Current amount must be non-negative").default(0), // Allow 0
});

const aiFormSchema = z.object({
  monthlyIncome: z.coerce.number().min(0, "Monthly income must be non-negative."), // Allow 0
  monthlyExpenses: z.array(expenseSchema).min(1, "Add at least one expense category."),
  savingsGoals: z.array(goalSchema).min(1, "Add at least one savings goal."),
});

type AiFormValues = z.infer<typeof aiFormSchema>;

export default function AiAssistantPage() {
  const [analysisResult, setAnalysisResult] = React.useState<AnalyzeSpendingPatternsOutput | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<AiFormValues>({
    resolver: zodResolver(aiFormSchema),
    defaultValues: {
      monthlyIncome: 5000,
      monthlyExpenses: [{ category: "Rent", amount: 1200 }, { category: "Food", amount: 500 }],
      savingsGoals: [{ goalName: "Vacation", targetAmount: 2000, currentAmount: 500 }],
    },
    mode: "onChange", // Add mode for better UX with isValid check
  });

  const { fields: expenseFields, append: appendExpense, remove: removeExpense } = useFieldArray({
     control: form.control,
     name: "monthlyExpenses",
  });

   const { fields: goalFields, append: appendGoal, remove: removeGoal } = useFieldArray({
     control: form.control,
     name: "savingsGoals",
  });


  async function onSubmit(values: AiFormValues) {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null); // Clear previous results

    try {
      const input: AnalyzeSpendingPatternsInput = values;
      const result = await analyzeSpendingPatterns(input);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Error analyzing spending:", err);
      // Provide more specific error if possible, otherwise generic message
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to analyze spending patterns: ${errorMessage}. Please check your input and try again.`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Lightbulb className="h-8 w-8 text-accent" /> AI Savings Assistant
         </h1>
       </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
         <Card>
          <CardHeader>
            <CardTitle>Analyze Your Spending</CardTitle>
            <CardDescription>Provide your financial details for personalized AI insights.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                 <FormField
                  control={form.control}
                  name="monthlyIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Income ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 5000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Monthly Expenses */}
                <div className="space-y-3">
                  <Label className="text-base font-medium">Monthly Expenses</Label>
                   {expenseFields.map((field, index) => (
                     <div key={field.id} className="flex items-end gap-2">
                      <FormField
                        control={form.control}
                        name={`monthlyExpenses.${index}.category`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                             {index === 0 && <FormLabel className="text-xs">Category</FormLabel>}
                            <FormControl>
                              <Input placeholder="e.g., Food" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name={`monthlyExpenses.${index}.amount`}
                        render={({ field }) => (
                          <FormItem className="w-28">
                            {index === 0 && <FormLabel className="text-xs">Amount ($)</FormLabel>}
                            <FormControl>
                              <Input type="number" placeholder="e.g., 400" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <Button
                         type="button"
                         variant="ghost"
                         size="icon"
                         className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive border-transparent"
                         onClick={() => removeExpense(index)}
                         disabled={expenseFields.length <= 1}
                       >
                         <Trash2 className="h-4 w-4" />
                         <span className="sr-only">Remove expense</span>
                       </Button>
                     </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 border-dashed border-primary text-primary hover:bg-primary/10"
                    onClick={() => appendExpense({ category: "", amount: 0 })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Expense
                  </Button>
                   {form.formState.errors.monthlyExpenses && !form.formState.errors.monthlyExpenses.root && form.formState.errors.monthlyExpenses.message && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.monthlyExpenses.message}</p>
                   )}
                </div>

                <Separator />

                {/* Savings Goals */}
                <div className="space-y-3">
                   <Label className="text-base font-medium">Savings Goals</Label>
                   {goalFields.map((field, index) => (
                     <div key={field.id} className="grid grid-cols-3 items-end gap-2">
                       <FormField
                         control={form.control}
                         name={`savingsGoals.${index}.goalName`}
                         render={({ field }) => (
                           <FormItem>
                              {index === 0 && <FormLabel className="text-xs">Goal Name</FormLabel>}
                             <FormControl>
                               <Input placeholder="e.g., Vacation" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                       <FormField
                         control={form.control}
                         name={`savingsGoals.${index}.targetAmount`}
                         render={({ field }) => (
                           <FormItem>
                             {index === 0 && <FormLabel className="text-xs">Target ($)</FormLabel>}
                             <FormControl>
                               <Input type="number" placeholder="e.g., 2000" {...field} />
                             </FormControl>
                             <FormMessage />
                           </FormItem>
                         )}
                       />
                        <div className="flex items-end gap-1">
                           <FormField
                             control={form.control}
                             name={`savingsGoals.${index}.currentAmount`}
                             render={({ field }) => (
                               <FormItem className="flex-1">
                                 {index === 0 && <FormLabel className="text-xs">Current ($)</FormLabel>}
                                 <FormControl>
                                   <Input type="number" placeholder="e.g., 500" {...field} />
                                 </FormControl>
                                 <FormMessage />
                               </FormItem>
                             )}
                           />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                             className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive border-transparent"
                            onClick={() => removeGoal(index)}
                            disabled={goalFields.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove goal</span>
                          </Button>
                       </div>
                     </div>
                  ))}
                   <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 border-dashed border-primary text-primary hover:bg-primary/10"
                    onClick={() => appendGoal({ goalName: "", targetAmount: 1000, currentAmount: 0 })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Goal
                  </Button>
                  {form.formState.errors.savingsGoals && !form.formState.errors.savingsGoals.root && form.formState.errors.savingsGoals.message && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.savingsGoals.message}</p>
                   )}
                </div>
              </CardContent>
               <CardFooter>
                 <Button type="submit" disabled={isLoading || !form.formState.isValid} variant="solidAccent" className="w-full">
                   {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                    </>
                  ) : (
                    "Get AI Insights"
                  )}
                </Button>
               </CardFooter>
            </form>
          </Form>
        </Card>

        {/* AI Analysis Results */}
        <Card>
          <CardHeader>
            <CardTitle>AI Analysis & Tips</CardTitle>
            <CardDescription>Personalized insights based on your data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 min-h-[400px] flex flex-col">
            {isLoading && (
               <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
                 <Loader2 className="h-8 w-8 animate-spin mb-2" />
                 <p>Generating insights...</p>
               </div>
            )}
             {error && (
                <Alert variant="destructive" className="flex-1">
                   <AlertTitle>Error</AlertTitle>
                   <AlertDescription>{error}</AlertDescription>
                </Alert>
             )}
             {!isLoading && !error && !analysisResult && (
                 <div className="flex flex-1 flex-col items-center justify-center text-center text-muted-foreground">
                    <Lightbulb className="h-12 w-12 mb-4" />
                    <p>Enter your financial details and click "Get AI Insights" to see the analysis.</p>
                 </div>
             )}
             {analysisResult && !isLoading && !error && (
               <div className="space-y-6 flex-1 overflow-auto pr-2">
                 <div>
                   <h4 className="font-semibold mb-2 text-lg text-primary">Spending Analysis:</h4>
                   {/* Added whitespace-pre-wrap for better formatting of AI response */}
                   <p className="text-sm whitespace-pre-wrap bg-muted/50 p-3 rounded-md">{analysisResult.spendingAnalysis}</p>
                 </div>
                 <Separator />
                 <div>
                    <h4 className="font-semibold mb-2 text-lg text-secondary">Savings Tips:</h4>
                    {analysisResult.savingsTips.length > 0 ? (
                       <ul className="space-y-2 list-disc list-inside text-sm bg-muted/50 p-3 rounded-md">
                         {analysisResult.savingsTips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                     ) : (
                       <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">No specific savings tips generated.</p>
                     )}
                 </div>
               </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
