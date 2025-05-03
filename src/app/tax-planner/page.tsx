'use client';

import * as React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { estimateTaxes, type TaxEstimate, type TaxInformation } from "@/services/tax-estimator";
import { FileText, Lightbulb, Loader2, Percent } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define filing status enum for Zod schema and component usage
const FilingStatusEnum = z.enum([
    "single",
    "married_filing_jointly",
    "married_filing_separately",
    "head_of_household"
]);

const taxFormSchema = z.object({
  annualIncome: z.coerce.number().min(0, { message: "Annual income must be non-negative." }),
  filingStatus: FilingStatusEnum,
  deductions: z.coerce.number().min(0, { message: "Deductions must be non-negative." }).default(0),
  credits: z.coerce.number().min(0, { message: "Credits must be non-negative." }).default(0),
});

type TaxFormValues = z.infer<typeof taxFormSchema>;

export default function TaxPlannerPage() {
  const [taxEstimate, setTaxEstimate] = React.useState<TaxEstimate | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<TaxFormValues>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      annualIncome: 75000, // More typical income
      filingStatus: "single",
      deductions: 13850, // Approx standard deduction for single 2023
      credits: 0,
    },
  });

  async function onSubmit(values: TaxFormValues) {
    setIsLoading(true);
    setError(null);
    setTaxEstimate(null); // Clear previous estimate

    try {
      const taxInfo: TaxInformation = values;
      const estimate = await estimateTaxes(taxInfo);
      setTaxEstimate(estimate);
    } catch (err) {
      console.error("Error estimating taxes:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to estimate taxes: ${errorMessage}. Please check your inputs.`);
    } finally {
      setIsLoading(false);
    }
  }

  const formatCurrency = (amount: number) => {
      return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-secondary" /> {/* Changed icon color */}
            Tax Planner
         </h1>
         {/* Potential future action button */}
       </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tax Information Form */}
         <Card> {/* Removed glass class */}
          <CardHeader>
            <CardTitle>Estimate Your Taxes</CardTitle>
            <CardDescription>Enter your financial information for an estimate.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                 <FormField
                  control={form.control}
                  name="annualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gross Annual Income ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 75000" {...field} />
                      </FormControl>
                       <FormDescription>Your total income before deductions.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="filingStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Filing Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select filing status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married_filing_jointly">Married Filing Jointly</SelectItem>
                          <SelectItem value="married_filing_separately">Married Filing Separately</SelectItem>
                          <SelectItem value="head_of_household">Head of Household</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deductions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Deductions ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 13850" {...field} />
                      </FormControl>
                      <FormDescription>Standard or itemized deductions.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="credits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Tax Credits ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1000" {...field} />
                      </FormControl>
                       <FormDescription>Credits directly reduce your tax.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
               <CardFooter>
                 <Button type="submit" disabled={isLoading || !form.formState.isValid} variant="solidAccent" className="w-full"> {/* Solid accent, check validity */}
                   {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating...
                    </>
                  ) : (
                    "Estimate Taxes"
                  )}
                </Button>
               </CardFooter>
            </form>
          </Form>
        </Card>

        {/* Tax Estimate Display */}
        <Card> {/* Removed glass class */}
          <CardHeader>
            <CardTitle>Tax Estimate & Suggestions</CardTitle>
            <CardDescription>Estimated liability and potential savings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 min-h-[300px] flex flex-col"> {/* Increased min-height */}
            {isLoading && (
               <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
                 <Loader2 className="h-8 w-8 animate-spin mb-2" />
                 <p>Calculating estimate...</p>
               </div>
            )}
             {error && (
                <Alert variant="destructive" className="flex-1">
                   <AlertTitle>Error</AlertTitle>
                   <AlertDescription>{error}</AlertDescription>
                </Alert>
             )}
             {!isLoading && !error && !taxEstimate && (
                 <div className="flex flex-1 flex-col items-center justify-center text-center text-muted-foreground">
                    <FileText className="h-12 w-12 mb-4" />
                    <p>Enter your information and click "Estimate Taxes" to see results.</p>
                 </div>
             )}
             {taxEstimate && !isLoading && !error && (
               <div className="space-y-6 flex-1"> {/* Increased spacing */}
                 <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <Label className="text-xs text-muted-foreground block mb-1">Taxable Income</Label>
                        <p className="font-medium">{formatCurrency(taxEstimate.taxableIncome)}</p>
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground block mb-1">Tax Liability (Before Credits)</Label>
                        <p className="font-medium">{formatCurrency(taxEstimate.estimatedTaxLiability)}</p>
                    </div>
                    <div>
                        <Label className="text-xs text-muted-foreground block mb-1">Effective Tax Rate</Label>
                        <p className="font-medium flex items-center gap-1"><Percent className="h-3 w-3" /> {taxEstimate.effectiveTaxRate.toFixed(2)}%</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-md col-span-2">
                        <Label className="text-xs text-primary/80 block mb-1">Final Estimated Tax</Label>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(taxEstimate.finalTaxAmount)}</p>
                    </div>

                 </div>
                 <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-1 text-base"> {/* Adjusted size */}
                       <Lightbulb className="h-5 w-5 text-accent" /> Tax Saving Suggestions:
                    </h4>
                    <ul className="space-y-1.5 list-disc list-inside text-sm bg-muted/50 p-3 rounded-md"> {/* Added bg */}
                     {taxEstimate.taxSavingSuggestions.length > 0 ? (
                       taxEstimate.taxSavingSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))
                     ) : (
                       <li>No specific suggestions based on current input. Consider consulting a tax professional.</li>
                     )}
                   </ul>
                 </div>
                  <Alert variant="default" className="bg-secondary/10 border-secondary/30 text-secondary-foreground"> {/* Adjusted alert style */}
                     <FileText className="h-4 w-4 !text-secondary" /> {/* Icon color */}
                     <AlertTitle className="font-semibold">Disclaimer</AlertTitle> {/* Title styling */}
                     <AlertDescription>
                       This is a simplified estimate for informational purposes only. Tax laws are complex. Always consult a qualified tax professional for personalized advice.
                    </AlertDescription>
                   </Alert>
               </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
