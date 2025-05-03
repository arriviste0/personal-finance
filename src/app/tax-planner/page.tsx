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
      annualIncome: 75000,
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
      // Simulate API call delay for retro feel
      await new Promise(resolve => setTimeout(resolve, 700));
      const estimate = await estimateTaxes(taxInfo);
      setTaxEstimate(estimate);
    } catch (err) {
      console.error("Error estimating taxes:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to estimate taxes: ${errorMessage}. Check inputs.`);
    } finally {
      setIsLoading(false);
    }
  }

  const formatCurrency = (amount: number) => {
      // Format for retro display - no decimals unless necessary
      return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-foreground pb-2 mb-4">
            <h1 className="text-2xl font-medium uppercase flex items-center gap-2">
               <FileText className="h-6 w-6" /> {/* Icon color from text */}
               Tax Planner
            </h1>
            {/* Potential future action button */}
          </div>


      <div className="grid gap-6 md:grid-cols-2">
        {/* Tax Information Form */}
          <Card>
           <CardHeader>
             <CardTitle>Estimate Your Taxes</CardTitle>
             <CardDescription>Enter info for estimate.</CardDescription>
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
                        <Input type="number" placeholder="e.g., 75000" {...field} />
                      </FormControl>
                       <FormDescription className="text-xs">Total income before deductions.</FormDescription>
                      <FormMessage className="text-xs" />
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
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married_filing_jointly">Married Jointly</SelectItem>
                          <SelectItem value="married_filing_separately">Married Separately</SelectItem>
                          <SelectItem value="head_of_household">Head of Household</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs"/>
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
                        <Input type="number" placeholder="e.g., 13850" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">Standard or itemized.</FormDescription>
                      <FormMessage className="text-xs"/>
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
                       <FormDescription className="text-xs">Directly reduce tax owed.</FormDescription>
                      <FormMessage className="text-xs"/>
                    </FormItem>
                  )}
                />
              </CardContent>
               <CardFooter>
                  <Button type="submit" disabled={isLoading || !form.formState.isValid} variant="solidAccent" className="w-full">
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
        <Card>
           <CardHeader>
             <CardTitle>Tax Estimate & Suggestions</CardTitle>
             <CardDescription>Estimated liability & savings.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4 min-h-[350px] flex flex-col"> {/* Adjusted min-height */}
            {isLoading && (
               <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
                 <Loader2 className="h-8 w-8 animate-spin mb-2" />
                 <p className="uppercase text-sm">Calculating...</p> {/* Retro loader text */}
               </div>
            )}
             {error && (
                 <Alert variant="destructive" className="retro-window !border-destructive !shadow-[2px_2px_0px_0px_hsl(var(--destructive))] flex-1">
                    <AlertTitle className="retro-window-header !bg-destructive !text-destructive-foreground !border-destructive !text-sm !font-medium">ERROR</AlertTitle>
                    <AlertDescription className="retro-window-content !pt-2">{error}</AlertDescription>
                 </Alert>
             )}
             {!isLoading && !error && !taxEstimate && (
                 <div className="flex flex-1 flex-col items-center justify-center text-center text-muted-foreground">
                    <FileText className="h-10 w-10 mb-3" />
                    <p className="text-sm">Enter info & click "Estimate Taxes".</p>
                 </div>
             )}
             {taxEstimate && !isLoading && !error && (
               <div className="space-y-5 flex-1"> {/* Adjusted spacing */}
                 <div className="grid grid-cols-2 gap-3 text-sm border-2 border-foreground p-2">
                    <div className="border-r-2 border-foreground pr-2">
                         <Label className="text-xs text-muted-foreground block mb-0.5 uppercase">Taxable Income</Label>
                        <p className="font-medium text-base">{formatCurrency(taxEstimate.taxableIncome)}</p>
                    </div>
                    <div>
                         <Label className="text-xs text-muted-foreground block mb-0.5 uppercase">Tax (Before Credits)</Label>
                        <p className="font-medium text-base">{formatCurrency(taxEstimate.estimatedTaxLiability)}</p>
                    </div>
                     <div className="border-r-2 border-foreground pr-2 pt-2 border-t-2 border-foreground">
                         <Label className="text-xs text-muted-foreground block mb-0.5 uppercase">Effective Rate</Label>
                        <p className="font-medium flex items-center gap-1 text-base"><Percent className="h-3 w-3" /> {taxEstimate.effectiveTaxRate.toFixed(1)}%</p> {/* Simplified rate */}
                    </div>
                    <div className="bg-primary/10 p-2 col-span-2 border-t-2 border-foreground text-center">
                         <Label className="text-xs text-primary block mb-0.5 uppercase">Final Estimated Tax</Label>
                        <p className="text-xl font-medium text-primary">{formatCurrency(taxEstimate.finalTaxAmount)}</p>
                    </div>

                 </div>
                 <div>
                     <h4 className="font-medium mb-1 flex items-center gap-1 text-base uppercase">
                       <Lightbulb className="h-5 w-5 text-accent" /> Suggestions:
                    </h4>
                     <ul className="space-y-1 list-disc list-inside text-sm bg-muted/50 p-2 border border-foreground/50"> {/* Retro list */}
                     {taxEstimate.taxSavingSuggestions.length > 0 ? (
                       taxEstimate.taxSavingSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))
                     ) : (
                       <li>No specific suggestions. Consult a pro!</li>
                     )}
                   </ul>
                 </div>
                  <Alert variant="default" className="retro-window !border-secondary !shadow-[2px_2px_0px_0px_hsl(var(--secondary))]">
                      <AlertTitle className="retro-window-header !bg-secondary !text-secondary-foreground !border-secondary !text-sm !font-medium">Disclaimer</AlertTitle>
                      <AlertDescription className="retro-window-content !pt-2 text-xs">
                        This is a simple estimate for info ONLY. Tax laws are complex. Consult a qualified professional.
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
