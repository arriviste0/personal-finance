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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { estimateTaxes, type TaxEstimate, type TaxInformation } from "@/services/tax-estimator";
import { FileText, Lightbulb, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const taxFormSchema = z.object({
  annualIncome: z.coerce.number().min(0, { message: "Annual income must be positive." }),
  filingStatus: z.string().min(1, { message: "Please select a filing status." }),
  deductions: z.coerce.number().min(0, { message: "Deductions must be positive." }).default(0),
  credits: z.coerce.number().min(0, { message: "Credits must be positive." }).default(0),
});

type TaxFormValues = z.infer<typeof taxFormSchema>;

export default function TaxPlannerPage() {
  const [taxEstimate, setTaxEstimate] = React.useState<TaxEstimate | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<TaxFormValues>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      annualIncome: 50000,
      filingStatus: "single",
      deductions: 0,
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
      setError("Failed to estimate taxes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-8 w-8 text-blue-600" /> Tax Planner
         </h1>
         {/* Potential future action button */}
       </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Tax Information Form */}
         <Card className="glass">
          <CardHeader>
            <CardTitle>Estimate Your Taxes</CardTitle>
            <CardDescription>Enter your financial information to get an estimate.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                 <FormField
                  control={form.control}
                  name="annualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Income ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 60000" {...field} />
                      </FormControl>
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
                      <FormLabel>Deductions ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 12000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="credits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tax Credits ($)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
               <CardFooter>
                 <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
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
        <Card className="glass">
          <CardHeader>
            <CardTitle>Tax Estimate & Suggestions</CardTitle>
            <CardDescription>Estimated tax liability and potential savings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 min-h-[200px] flex flex-col justify-center">
            {isLoading && (
               <div className="flex flex-col items-center justify-center text-muted-foreground">
                 <Loader2 className="h-8 w-8 animate-spin mb-2" />
                 <p>Calculating estimate...</p>
               </div>
            )}
             {error && (
                <Alert variant="destructive">
                   <AlertTitle>Error</AlertTitle>
                   <AlertDescription>{error}</AlertDescription>
                </Alert>
             )}
             {!isLoading && !error && !taxEstimate && (
                <p className="text-center text-muted-foreground">
                 Enter your information and click "Estimate Taxes" to see results.
                </p>
             )}
             {taxEstimate && !isLoading && !error && (
               <div className="space-y-4">
                 <div>
                   <Label className="text-sm text-muted-foreground">Estimated Tax Amount</Label>
                   <p className="text-3xl font-bold text-primary">${taxEstimate.taxAmount.toLocaleString()}</p>
                 </div>
                 <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-1">
                       <Lightbulb className="h-4 w-4 text-accent" /> Tax Saving Suggestions:
                    </h4>
                    <ul className="space-y-1 list-disc list-inside text-sm">
                     {taxEstimate.taxSavingSuggestions.length > 0 ? (
                       taxEstimate.taxSavingSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))
                     ) : (
                       <li>No specific suggestions based on current input. Consider consulting a tax professional.</li>
                     )}
                   </ul>
                 </div>
                  <Alert variant="default" className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                     <FileText className="h-4 w-4 !text-blue-600" />
                     <AlertTitle className="text-blue-800 dark:text-blue-300">Disclaimer</AlertTitle>
                     <AlertDescription className="text-blue-700 dark:text-blue-400">
                       This is an estimate for informational purposes only. Consult a qualified tax professional for personalized advice.
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
