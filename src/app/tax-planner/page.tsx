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
import { estimateTaxes, type TaxEstimate, type TaxInformation } from "@/services/tax-estimator";
import { FileText, Lightbulb, Loader2, Percent, Info } from "lucide-react"; // Added Info
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define filing status enum
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
      deductions: 14600, // Approx standard deduction for single 2024
      credits: 0,
    },
  });

  async function onSubmit(values: TaxFormValues) {
    setIsLoading(true);
    setError(null);
    setTaxEstimate(null);

    try {
      const taxInfo: TaxInformation = values;
      await new Promise(resolve => setTimeout(resolve, 700)); // Simulate delay
      const estimate = await estimateTaxes(taxInfo);
      setTaxEstimate(estimate);
    } catch (err) {
      console.error("Error estimating taxes:", err);
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
      setError(`Failed to estimate taxes: ${errorMessage}. Please check inputs and try again.`);
    } finally {
      setIsLoading(false);
    }
  }

  const formatCurrency = (amount: number) => {
      return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`; // Show decimals
  }

  return (
    <div className="space-y-8"> {/* Increased spacing */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h1 className="text-2xl font-semibold flex items-center gap-2">
               <FileText className="h-6 w-6 text-primary" /> {/* Use primary color */}
               Tax Estimator
            </h1>
            {/* Maybe add a link to IRS or official resources here later */}
          </div>


      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tax Information Form */}
          <Card>
           <CardHeader>
             <CardTitle className="text-lg">Enter Your Tax Information</CardTitle>
             <CardDescription>Provide details to get a basic tax estimate.</CardDescription>
           </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-5"> {/* More spacing */}
                 <FormField
                  control={form.control}
                  name="annualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gross Annual Income</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 75000" {...field} />
                      </FormControl>
                       <FormDescription className="text-xs">Your total income before any deductions.</FormDescription>
                      <FormMessage /> {/* Default style */}
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
                            <SelectValue placeholder="Select your filing status" />
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
                      <FormLabel>Total Deductions</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 14600" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">Enter standard or itemized deduction amount.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="credits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Tax Credits</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 1000" {...field} />
                      </FormControl>
                       <FormDescription className="text-xs">Credits directly reduce the tax you owe.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
               <CardFooter>
                  <Button type="submit" disabled={isLoading || !form.formState.isValid} variant="accent" className="w-full">
                   {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating Estimate...
                    </>
                  ) : (
                    "Estimate My Taxes"
                  )}
                </Button>
               </CardFooter>
            </form>
          </Form>
        </Card>

        {/* Tax Estimate Display */}
        <Card className="flex flex-col"> {/* Flex col */}
           <CardHeader>
             <CardTitle className="text-lg">Estimated Tax Liability</CardTitle>
             <CardDescription>Based on the information provided.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-5 flex-1"> {/* Flex-1 to push footer down */}
            {isLoading && (
               <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground space-y-2">
                 <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 <p className="text-sm font-medium">Calculating your estimate...</p>
               </div>
            )}
             {error && (
                 <Alert variant="destructive" className="flex-1"> {/* Standard destructive alert */}
                    <Info className="h-4 w-4" /> {/* Use Info icon */}
                    <AlertTitle>Calculation Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                 </Alert>
             )}
             {!isLoading && !error && !taxEstimate && (
                 <div className="flex flex-1 flex-col items-center justify-center text-center text-muted-foreground p-6 border border-dashed rounded-lg">
                    <FileText className="h-12 w-12 mb-4" />
                    <p className="text-sm font-medium">Your tax estimate will appear here.</p>
                    <p className="text-xs">Fill out the form and click "Estimate My Taxes".</p>
                 </div>
             )}
             {taxEstimate && !isLoading && !error && (
               <div className="space-y-6 flex-1"> {/* Increased spacing */}
                 {/* Results Grid */}
                 <div className="grid grid-cols-2 gap-4 text-sm border rounded-lg p-4 bg-muted/30">
                    <div className="space-y-1">
                         <Label className="text-xs text-muted-foreground block uppercase tracking-wider">Taxable Income</Label>
                        <p className="font-semibold text-lg">{formatCurrency(taxEstimate.taxableIncome)}</p>
                    </div>
                    <div className="space-y-1">
                         <Label className="text-xs text-muted-foreground block uppercase tracking-wider">Tax Before Credits</Label>
                        <p className="font-semibold text-lg">{formatCurrency(taxEstimate.estimatedTaxLiability)}</p>
                    </div>
                     <div className="space-y-1 border-t pt-3">
                         <Label className="text-xs text-muted-foreground block uppercase tracking-wider">Effective Rate</Label>
                        <p className="font-semibold flex items-center gap-1 text-lg"><Percent className="h-4 w-4" /> {taxEstimate.effectiveTaxRate.toFixed(1)}%</p>
                    </div>
                    <div className="space-y-1 border-t pt-3 text-right">
                         <Label className="text-xs text-muted-foreground block uppercase tracking-wider">Final Estimated Tax</Label>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(taxEstimate.finalTaxAmount)}</p>
                    </div>
                 </div>

                  {/* Suggestions */}
                 <div>
                     <h4 className="font-medium mb-2 flex items-center gap-2 text-base">
                       <Lightbulb className="h-5 w-5 text-accent" /> Potential Tax Savings Suggestions:
                    </h4>
                     <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground bg-background border rounded-lg p-4">
                     {taxEstimate.taxSavingSuggestions.length > 0 ? (
                       taxEstimate.taxSavingSuggestions.map((suggestion, index) => (
                        <li key={index} className="pl-2">{suggestion}</li>
                      ))
                     ) : (
                       <li className="pl-2">No specific automated suggestions. Consider consulting a tax professional.</li>
                     )}
                   </ul>
                 </div>
               </div>
            )}
          </CardContent>
           <CardFooter className="pt-4">
                 <Alert variant="default" className="border-accent bg-accent/10"> {/* Accent alert */}
                    <Info className="h-4 w-4 text-accent" />
                     <AlertTitle className="text-accent font-semibold">Disclaimer</AlertTitle>
                      <AlertDescription className="text-xs text-accent/90">
                        This tool provides a simplified estimate for informational purposes only. Tax laws are complex and change frequently. Always consult with a qualified tax professional for personalized advice.
                    </AlertDescription>
                   </Alert>
           </CardFooter>
        </Card>
      </div>
    </div>
  );
}
