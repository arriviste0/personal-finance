'use client';

import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Lightbulb, Loader2, PlusCircle, Trash2, Info, Sparkles } from "lucide-react"; // Added Info, Sparkles
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from '@/components/ui/separator';

const expenseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  amount: z.coerce.number().min(0, "Amount must be 0 or greater"),
});

const goalSchema = z.object({
  goalName: z.string().min(1, "Goal name is required"),
  targetAmount: z.coerce.number().min(1, "Target amount must be greater than 0"),
  currentAmount: z.coerce.number().min(0, "Current amount must be 0 or greater").default(0),
});

const aiFormSchema = z.object({
  monthlyIncome: z.coerce.number().min(0, "Income must be 0 or greater"),
  monthlyExpenses: z.array(expenseSchema).min(1, "At least one expense is required."),
  savingsGoals: z.array(goalSchema).min(1, "At least one savings goal is required."),
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
      monthlyExpenses: [{ category: "Rent", amount: 1200 }, { category: "Food", amount: 500 }, { category: "Entertainment", amount: 200 }],
      savingsGoals: [{ goalName: "Vacation Fund", targetAmount: 2000, currentAmount: 500 }],
    },
    mode: "onChange", // Validate on change for better UX
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
    setAnalysisResult(null);

    try {
       // Simulate API call delay
       await new Promise(resolve => setTimeout(resolve, 1500));
      const input: AnalyzeSpendingPatternsInput = values;
      const result = await analyzeSpendingPatterns(input);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Error analyzing spending:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Analysis failed: ${errorMessage}. Please check your input and try again.`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8"> {/* Increased spacing */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
               <Lightbulb className="h-6 w-6 text-accent" /> {/* Use accent color */}
               AI Savings Assistant
            </h1>
             <p className="text-sm text-muted-foreground">Get personalized financial insights.</p>
          </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
         <Card>
          <CardHeader>
            <CardTitle className="text-lg">Analyze Your Finances</CardTitle>
            <CardDescription>Enter your details below to get AI-powered savings tips.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6"> {/* Consistent spacing */}
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
                     <div key={field.id} className="flex items-start gap-2">
                      <FormField
                        control={form.control}
                        name={`monthlyExpenses.${index}.category`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                             {index === 0 && <FormLabel className="sr-only">Category</FormLabel>}
                            <FormControl>
                              <Input placeholder="Expense Category (e.g., Food)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name={`monthlyExpenses.${index}.amount`}
                        render={({ field }) => (
                          <FormItem className="w-32"> {/* Wider amount input */}
                            {index === 0 && <FormLabel className="sr-only">Amount ($)</FormLabel>}
                            <FormControl>
                              <Input type="number" placeholder="Amount" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <Button
                         type="button"
                         variant="ghost"
                         size="icon"
                         className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive mt-0" // Adjusted alignment
                         onClick={() => removeExpense(index)}
                         disabled={expenseFields.length <= 1}
                       >
                         <Trash2 className="h-4 w-4" />
                         <span className="sr-only">Remove Expense</span>
                       </Button>
                     </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 border-dashed text-muted-foreground hover:text-primary hover:border-primary"
                    onClick={() => appendExpense({ category: "", amount: 0 })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Expense Item
                  </Button>
                   {/* Display root array error if present */}
                    {form.formState.errors.monthlyExpenses?.root && (
                      <p className="text-sm font-medium text-destructive">{form.formState.errors.monthlyExpenses.root.message}</p>
                    )}
                </div>

                 <Separator className="my-4" />

                {/* Savings Goals */}
                <div className="space-y-3">
                   <Label className="text-base font-medium">Savings Goals</Label>
                   {goalFields.map((field, index) => (
                     <div key={field.id} className="grid grid-cols-[1fr_auto_auto] items-start gap-2"> {/* Adjusted grid */}
                       <FormField
                         control={form.control}
                         name={`savingsGoals.${index}.goalName`}
                         render={({ field }) => (
                           <FormItem>
                              {index === 0 && <FormLabel className="sr-only">Goal Name</FormLabel>}
                             <FormControl>
                               <Input placeholder="Goal Name (e.g., Vacation)" {...field} />
                             </FormControl>
                             <FormMessage/>
                           </FormItem>
                         )}
                       />
                       <FormField
                         control={form.control}
                         name={`savingsGoals.${index}.targetAmount`}
                         render={({ field }) => (
                           <FormItem className="w-32"> {/* Width for target */}
                             {index === 0 && <FormLabel className="sr-only">Target ($)</FormLabel>}
                             <FormControl>
                               <Input type="number" placeholder="Target $" {...field} />
                             </FormControl>
                             <FormMessage/>
                           </FormItem>
                         )}
                       />
                        <div className="flex items-start gap-1 w-40"> {/* Container for current + remove */}
                           <FormField
                             control={form.control}
                             name={`savingsGoals.${index}.currentAmount`}
                             render={({ field }) => (
                               <FormItem className="flex-1">
                                 {index === 0 && <FormLabel className="sr-only">Current ($)</FormLabel>}
                                 <FormControl>
                                   <Input type="number" placeholder="Current $" {...field} />
                                 </FormControl>
                                 <FormMessage/>
                               </FormItem>
                             )}
                           />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                             className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive"
                            onClick={() => removeGoal(index)}
                            disabled={goalFields.length <= 1}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove Goal</span>
                          </Button>
                       </div>
                     </div>
                  ))}
                   <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2 border-dashed text-muted-foreground hover:text-primary hover:border-primary"
                    onClick={() => appendGoal({ goalName: "", targetAmount: 1000, currentAmount: 0 })}
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Savings Goal
                  </Button>
                  {/* Display root array error if present */}
                   {form.formState.errors.savingsGoals?.root && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.savingsGoals.root.message}</p>
                   )}
                </div>
              </CardContent>
               <CardFooter>
                 <Button type="submit" disabled={isLoading || !form.formState.isValid} variant="accent" className="w-full">
                   {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Insights...
                    </>
                  ) : (
                    <>
                     <Sparkles className="mr-2 h-4 w-4" /> Get AI Savings Tips
                     </>
                  )}
                </Button>
               </CardFooter>
            </form>
          </Form>
        </Card>

        {/* AI Analysis Results */}
        <Card className="flex flex-col"> {/* Flex col */}
           <CardHeader>
             <CardTitle className="text-lg">AI Analysis & Tips</CardTitle>
             <CardDescription>Your personalized financial insights.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-5 flex-1 flex flex-col min-h-[400px]"> {/* Ensure min height */}
            {isLoading && (
                <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground space-y-2">
                   <Loader2 className="h-10 w-10 animate-spin text-primary" />
                   <p className="text-sm font-medium">Analyzing your data...</p>
                   <p className="text-xs">This may take a moment.</p>
                </div>
            )}
             {error && (
                 <Alert variant="destructive" className="flex-1"> {/* Standard destructive alert */}
                    <Info className="h-4 w-4" />
                    <AlertTitle>Analysis Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                 </Alert>
             )}
             {!isLoading && !error && !analysisResult && (
                 <div className="flex flex-1 flex-col items-center justify-center text-center text-muted-foreground p-6 border border-dashed rounded-lg">
                    <Lightbulb className="h-12 w-12 mb-4" />
                    <p className="text-sm font-medium">Insights will appear here.</p>
                    <p className="text-xs">Submit your financial details to get started.</p>
                 </div>
             )}
             {analysisResult && !isLoading && !error && (
                <div className="space-y-6 flex-1 overflow-auto pr-2"> {/* Added overflow */}
                  {/* Analysis Section */}
                  <div>
                    <h4 className="font-semibold mb-2 text-base text-primary">Spending Analysis</h4>
                    <div className="text-sm whitespace-pre-wrap bg-muted/50 p-4 rounded-md border min-h-[100px]">
                        {analysisResult.spendingAnalysis || "No analysis generated."}
                    </div>
                  </div>

                  <Separator />

                  {/* Savings Tips Section */}
                  <div>
                      <h4 className="font-semibold mb-2 text-base text-secondary">Personalized Savings Tips</h4>
                      <div className="bg-muted/50 p-4 rounded-md border min-h-[100px]">
                         {analysisResult.savingsTips.length > 0 ? (
                            <ul className="space-y-2 list-disc list-outside pl-5 text-sm"> {/* List outside */}
                              {analysisResult.savingsTips.map((tip, index) => (
                               <li key={index}>{tip}</li>
                             ))}
                           </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">No specific savings tips could be generated based on the provided data.</p>
                          )}
                      </div>
                  </div>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
