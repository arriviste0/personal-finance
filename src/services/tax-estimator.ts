/**
 * Represents a user's financial information for tax estimation.
 */
export interface TaxInformation {
  /**
   * The user's annual income.
   */
  annualIncome: number;
  /**
   * The user's filing status (e.g., single, married_filing_jointly).
   */
  filingStatus: "single" | "married_filing_jointly" | "married_filing_separately" | "head_of_household"; // Make status more specific
  /**
   * Any deductions the user is claiming (e.g., standard or itemized).
   */
  deductions: number;
  /**
   * Any credits the user is claiming (reduces tax liability directly).
   */
  credits: number;
}

/**
 * Represents the estimated tax amount and suggestions.
 */
export interface TaxEstimate {
  /**
   * The estimated tax liability before credits.
   */
  estimatedTaxLiability: number;
   /**
   * The final estimated tax amount after applying credits.
   */
   finalTaxAmount: number;
   /**
    * The calculated taxable income after deductions.
    */
   taxableIncome: number;
   /**
    * The effective tax rate.
    */
   effectiveTaxRate: number;
  /**
   * Suggested tax saving strategies
   */
  taxSavingSuggestions: string[];
}

// Simplified US Tax Brackets for 2023 (Illustrative Purposes ONLY)
// Source: IRS (Adapt year and values as needed)
const taxBrackets = {
  single: [
    { rate: 0.10, maxIncome: 11000 },
    { rate: 0.12, maxIncome: 44725 },
    { rate: 0.22, maxIncome: 95375 },
    { rate: 0.24, maxIncome: 182100 },
    { rate: 0.32, maxIncome: 231250 },
    { rate: 0.35, maxIncome: 578125 },
    { rate: 0.37, maxIncome: Infinity },
  ],
  married_filing_jointly: [
     { rate: 0.10, maxIncome: 22000 },
     { rate: 0.12, maxIncome: 89450 },
     { rate: 0.22, maxIncome: 190750 },
     { rate: 0.24, maxIncome: 364200 },
     { rate: 0.32, maxIncome: 462500 },
     { rate: 0.35, maxIncome: 693750 },
     { rate: 0.37, maxIncome: Infinity },
  ],
   // Add other statuses (married_filing_separately, head_of_household) if needed
   // For brevity, we'll just use 'single' logic for these in this example
   married_filing_separately: [ // Often mirrors single, but check specific rules
    { rate: 0.10, maxIncome: 11000 },
    { rate: 0.12, maxIncome: 44725 },
    { rate: 0.22, maxIncome: 95375 },
    { rate: 0.24, maxIncome: 182100 },
    { rate: 0.32, maxIncome: 231250 },
    { rate: 0.35, maxIncome: 346875 }, // Differs here
    { rate: 0.37, maxIncome: Infinity },
   ],
   head_of_household: [
     { rate: 0.10, maxIncome: 15700 },
     { rate: 0.12, maxIncome: 59850 },
     { rate: 0.22, maxIncome: 130000 },
     { rate: 0.24, maxIncome: 209400 }, // Adjusted based on rough estimates, check IRS
     { rate: 0.32, maxIncome: 253750 }, // Adjusted
     { rate: 0.35, maxIncome: 600000 }, // Adjusted
     { rate: 0.37, maxIncome: Infinity },
   ],
};

/**
 * Calculates estimated tax liability based on taxable income and filing status.
 * This is a simplified model and does not account for all tax complexities.
 *
 * @param taxableIncome The income after deductions.
 * @param status The filing status.
 * @returns The estimated tax liability before credits.
 */
function calculateTax(taxableIncome: number, status: TaxInformation['filingStatus']): number {
  const brackets = taxBrackets[status] || taxBrackets.single; // Default to single if status unknown
  let tax = 0;
  let previousMaxIncome = 0;

  for (const bracket of brackets) {
    if (taxableIncome <= previousMaxIncome) {
      break;
    }

    const incomeInBracket = Math.min(taxableIncome, bracket.maxIncome) - previousMaxIncome;
    tax += incomeInBracket * bracket.rate;
    previousMaxIncome = bracket.maxIncome;
  }

  return Math.max(0, tax); // Ensure tax is not negative
}

/**
 * Asynchronously estimates the user's taxes based on the provided financial information.
 * Uses a simplified progressive tax bracket system.
 *
 * @param taxInformation The user's financial information.
 * @returns A promise that resolves to a TaxEstimate object containing the estimated tax amount and suggestions.
 */
export async function estimateTaxes(taxInformation: TaxInformation): Promise<TaxEstimate> {
   // Simulate API call delay (optional)
   // await new Promise(resolve => setTimeout(resolve, 500));

   // Input validation (basic)
   if (taxInformation.annualIncome < 0 || taxInformation.deductions < 0 || taxInformation.credits < 0) {
       throw new Error("Income, deductions, and credits cannot be negative.");
   }

   const taxableIncome = Math.max(0, taxInformation.annualIncome - taxInformation.deductions);
   const estimatedTaxLiability = calculateTax(taxableIncome, taxInformation.filingStatus);
   const finalTaxAmount = Math.max(0, estimatedTaxLiability - taxInformation.credits);
   const effectiveTaxRate = taxInformation.annualIncome > 0 ? (finalTaxAmount / taxInformation.annualIncome) * 100 : 0;

   // Basic Tax Saving Suggestions Logic
   const suggestions: string[] = [];
   if (taxInformation.deductions < (taxInformation.filingStatus === 'married_filing_jointly' ? 27700 : 13850)) { // Simplified standard deduction check for 2023
     suggestions.push("Maximize deductions: Ensure you're claiming all eligible deductions or consider if itemizing benefits you.");
   }
   if (taxableIncome > (taxBrackets[taxInformation.filingStatus]?.[0]?.maxIncome || 11000) && taxInformation.annualIncome > 30000) { // Suggest retirement if income is above lowest bracket and decent salary
     suggestions.push("Contribute to tax-advantaged retirement accounts like a 401(k) or IRA to lower your taxable income.");
   }
   if (taxInformation.annualIncome > 50000) { // Suggest HSA for higher earners (more likely to have HDHP)
       suggestions.push("Explore Health Savings Accounts (HSAs) if you have a High Deductible Health Plan for triple tax benefits.");
   }
   if (taxInformation.credits === 0 && taxInformation.annualIncome < 80000) { // Suggest checking credits if none claimed and income isn't extremely high
       suggestions.push("Review potential tax credits you might be eligible for (e.g., Child Tax Credit, Earned Income Tax Credit, education credits).");
   }
    if (taxableIncome > (taxBrackets[taxInformation.filingStatus]?.[2]?.maxIncome || 95375)) { // Suggest capital gains strategy for higher brackets
        suggestions.push("Consider tax-loss harvesting or holding investments long-term for potentially lower capital gains tax rates.");
    }


  return {
    estimatedTaxLiability: parseFloat(estimatedTaxLiability.toFixed(2)),
    finalTaxAmount: parseFloat(finalTaxAmount.toFixed(2)),
    taxableIncome: parseFloat(taxableIncome.toFixed(2)),
    effectiveTaxRate: parseFloat(effectiveTaxRate.toFixed(2)),
    taxSavingSuggestions: suggestions.length > 0 ? suggestions : ["Consult a tax professional for personalized advice based on your specific situation."], // Default suggestion
  };
}
