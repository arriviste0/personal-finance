'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts'; // Changed import
import { Landmark, TrendingUp, PlusCircle, Trash2, Edit, DollarSign, Check, X, Undo, Redo } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Investment {
  id: string;
  name: string; // e.g., "Apple Inc.", "Vanguard S&P 500 ETF"
  ticker?: string; // Optional ticker symbol, e.g., AAPL, VOO
  type: 'Stock' | 'ETF' | 'Mutual Fund' | 'Crypto' | 'Bond' | 'Other';
  value: number;
  quantity?: number; // Optional quantity
  purchasePrice?: number; // Optional purchase price per unit
}

const initialInvestments: Investment[] = [
  { id: "inv1", name: "Apple Inc.", ticker: "AAPL", type: "Stock", value: 5500, quantity: 25, purchasePrice: 180 },
  { id: "inv2", name: "Vanguard S&P 500 ETF", ticker: "VOO", type: "ETF", value: 7000, quantity: 15, purchasePrice: 400 },
  { id: "inv3", name: "Bitcoin", ticker: "BTC", type: "Crypto", value: 2500, quantity: 0.04, purchasePrice: 50000 },
  { id: "inv4", name: "US Treasury Bond", type: "Bond", value: 5000 },
  { id: "inv5", name: "Real Estate Crowdfund", type: "Other", value: 1000 },
];

const investmentTypes: Investment['type'][] = ['Stock', 'ETF', 'Mutual Fund', 'Crypto', 'Bond', 'Other'];

const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
    "hsl(var(--muted))",
];

export default function InvestmentsPage() {
  const [history, setHistory] = useState<{investments: Investment[]}[]>([{ investments: initialInvestments }]);
  const [currentStep, setCurrentStep] = useState(0);

  const { investments } = history[currentStep];

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null);

  const canUndo = currentStep > 0;
  const canRedo = currentStep < history.length - 1;

  const setInvestments = (updater: (prevInvestments: Investment[]) => Investment[]) => {
    const newState = { investments: updater(history[currentStep].investments) };
    const newHistory = history.slice(0, currentStep + 1);
    setHistory([...newHistory, newState]);
    setCurrentStep(newHistory.length);
  };
  
  const handleUndo = () => {
    if (canUndo) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      setCurrentStep(currentStep + 1);
    }
  };

  const totalPortfolioValue = useMemo(() => investments.reduce((sum, item) => sum + item.value, 0), [investments]);

  const pieChartData = useMemo(() => investments.filter(item => item.value > 0).map((item, index) => ({
    name: item.ticker || item.name,
    value: item.value,
    fill: chartColors[index % chartColors.length],
  })), [investments]);

  const handleAddOrEditInvestment = (investmentData: Omit<Investment, 'id'> | Investment) => {
    if ('id' in investmentData) {
      // Editing existing investment
      setInvestments(investments => investments.map(inv => inv.id === investmentData.id ? { ...inv, ...investmentData } : inv));
      setEditingInvestment(null);
    } else {
      // Adding new investment
      const newInvestment: Investment = {
        id: Date.now().toString(),
        ...investmentData,
      };
      setInvestments(investments => [...investments, newInvestment]);
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteInvestment = (id: string) => {
    setInvestments(investments => investments.filter(inv => inv.id !== id));
  };

  const openEditDialog = (investment: Investment) => {
    setEditingInvestment(investment);
    // Reuse the add dialog for editing
    setIsAddDialogOpen(true);
  };

  const calculateGainLoss = (investment: Investment): number | null => {
      if (investment.purchasePrice && investment.quantity) {
          const costBasis = investment.purchasePrice * investment.quantity;
          return investment.value - costBasis;
      }
      return null;
  }

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 pt-8">
         <h1 className="text-3xl font-semibold flex items-center gap-2">
            <Landmark className="h-7 w-7 text-primary" /> Investment Portfolio
         </h1>
         <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" aria-label="Undo" onClick={handleUndo} disabled={!canUndo}>
                <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" aria-label="Redo" onClick={handleRedo} disabled={!canRedo}>
                <Redo className="h-4 w-4" />
            </Button>
            <Dialog open={isAddDialogOpen || !!editingInvestment} onOpenChange={(open) => {
                if (!open) {
                    setIsAddDialogOpen(false);
                    setEditingInvestment(null);
                } else {
                    setIsAddDialogOpen(true); // Ensure add dialog opens if trigger clicked
                }
             }}>
               <DialogTrigger asChild>
                   <Button variant="primary">
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Investment
                   </Button>
               </DialogTrigger>
               <InvestmentFormDialog
                   key={editingInvestment?.id || 'add'} // Ensure dialog resets when switching between add/edit
                   investment={editingInvestment}
                   onSave={handleAddOrEditInvestment}
                   onClose={() => { setIsAddDialogOpen(false); setEditingInvestment(null); }}
               />
              </Dialog>
         </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_300px]">
         {/* Portfolio Chart */}
        <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-secondary !text-secondary-foreground">
             <CardTitle className="flex items-center gap-2 text-xl">
                <TrendingUp className="h-5 w-5" />
                Portfolio Allocation
             </CardTitle>
                <div className="retro-window-controls">
                    <span className="!bg-secondary !border-secondary-foreground"></span>
                    <span className="!bg-secondary !border-secondary-foreground"></span>
                    <span className="!bg-secondary !border-secondary-foreground"></span>
                </div>
           </CardHeader>
           <CardContent className="retro-card-content !border-t-0 pt-4">
             <div className="h-[300px] w-full mb-4">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={110}
                        innerRadius={55}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                       >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke={"hsl(var(--background))"} strokeWidth={1.5} className="focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" />
                        ))}
                      </Pie>
                       <RechartsTooltip
                         contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--foreground))', fontFamily: 'var(--font-sans)', fontSize: '12px', boxShadow: 'none' }}
                         itemStyle={{ color: 'hsl(var(--foreground))' }}
                         formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                       />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '15px', fontFamily: 'var(--font-sans)' }} />
                    </PieChart>
                 </ResponsiveContainer>
             </div>
             <div className="text-center text-lg font-semibold">
                 Total Value: ${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
             </div>
          </CardContent>
        </Card>

         {/* Key Metrics */}
         <Card className="retro-card">
           <CardHeader className="retro-card-header !bg-accent !text-accent-foreground">
             <CardTitle className="flex items-center gap-2 text-xl">
                 <DollarSign className="h-5 w-5" />
                 Key Metrics
             </CardTitle>
               <div className="retro-window-controls">
                    <span className="!bg-accent !border-accent-foreground"></span>
                    <span className="!bg-accent !border-accent-foreground"></span>
                    <span className="!bg-accent !border-accent-foreground"></span>
                </div>
           </CardHeader>
           <CardContent className="retro-card-content !border-t-0 space-y-4 pt-4">
              <div className="flex justify-between items-center border-b border-dashed pb-2">
                  <span className="text-muted-foreground text-sm">Total Value</span>
                  <span className="font-semibold text-lg">${totalPortfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between items-center border-b border-dashed pb-2">
                  <span className="text-muted-foreground text-sm">Number of Holdings</span>
                  <span className="font-semibold text-lg">{investments.length}</span>
              </div>
              {/* Add more metrics like overall gain/loss, best/worst performer etc. later */}
               <div className="flex justify-between items-center pt-2">
                  <span className="text-muted-foreground text-sm">Placeholder Metric</span>
                  <span className="font-semibold text-lg">N/A</span>
              </div>
           </CardContent>
         </Card>
      </div>

      {/* Investments Table */}
       <Card className="retro-card overflow-hidden">
          <CardHeader className="retro-card-header">
           <CardTitle className="text-xl">Investment Details</CardTitle>
            <div className="retro-window-controls">
                <span></span><span></span><span></span>
            </div>
         </CardHeader>
        <CardContent className="retro-card-content !border-t-0 p-0">
          <div className="overflow-x-auto">
              <Table className="retro-table min-w-[800px]">
                 <TableHeader>
                  <TableRow>
                     <TableHead className="w-[200px]">Name</TableHead>
                     <TableHead>Ticker</TableHead>
                     <TableHead>Type</TableHead>
                     <TableHead className="text-right">Value</TableHead>
                     <TableHead className="text-right">Quantity</TableHead>
                     <TableHead className="text-right">Purchase Price</TableHead>
                     <TableHead className="text-right">Gain/Loss</TableHead>
                     <TableHead className="text-center w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {investments.map((inv) => {
                     const gainLoss = calculateGainLoss(inv);
                     return (
                      <TableRow key={inv.id}>
                         <TableCell className="font-medium">{inv.name}</TableCell>
                         <TableCell>{inv.ticker || 'N/A'}</TableCell>
                         <TableCell><Badge variant="secondary" className="retro-badge">{inv.type}</Badge></TableCell>
                         <TableCell className="text-right font-semibold">${inv.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                         <TableCell className="text-right">{inv.quantity?.toLocaleString() || 'N/A'}</TableCell>
                         <TableCell className="text-right">{inv.purchasePrice ? `$${inv.purchasePrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'N/A'}</TableCell>
                         <TableCell className={cn(
                             "text-right font-medium",
                              gainLoss === null ? 'text-muted-foreground' : gainLoss >= 0 ? 'text-green-500' : 'text-destructive'
                             )}>
                             {gainLoss === null ? 'N/A' : `${gainLoss >= 0 ? '+' : ''}$${gainLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                         </TableCell>
                         <TableCell className="text-center">
                           <div className="flex justify-center items-center gap-1 p-0.5 border-2 border-foreground">
                               <Button
                                   variant="ghost"
                                   size="icon"
                                   className="h-7 w-7 !border-0"
                                   onClick={() => openEditDialog(inv)}
                               >
                                   <Edit className="h-4 w-4 text-primary"/>
                                   <span className="sr-only">Edit</span>
                               </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 !border-0">
                                       <Trash2 className="h-4 w-4 text-destructive"/>
                                       <span className="sr-only">Delete</span>
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="retro-window">
                                      <AlertDialogHeader className="retro-window-header !bg-destructive !text-destructive-foreground">
                                        <AlertDialogTitle>Delete Investment?</AlertDialogTitle>
                                         <div className="retro-window-controls"><span></span><span></span></div>
                                    </AlertDialogHeader>
                                       <AlertDialogDescription className="retro-window-content !border-t-0 !pt-2">
                                          Are you sure you want to delete the "{inv.name}" investment? This action cannot be undone.
                                       </AlertDialogDescription>
                                    <AlertDialogFooter className="retro-window-content !pt-4 !border-t-0 !flex sm:justify-end gap-2">
                                      <AlertDialogCancel asChild><Button variant="secondary">Cancel</Button></AlertDialogCancel>
                                      <AlertDialogAction asChild><Button variant="destructive" onClick={() => handleDeleteInvestment(inv.id)}>Delete</Button></AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                            </div>
                         </TableCell>
                      </TableRow>
                     );
                    })}
                   {investments.length === 0 && (
                       <TableRow>
                           <TableCell colSpan={8} className="h-24 text-center text-muted-foreground italic">
                           No investments added yet. Click "Add Investment" to start tracking.
                           </TableCell>
                       </TableRow>
                   )}
                </TableBody>
              </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


// --- Reusable Investment Form Dialog ---
interface InvestmentFormDialogProps {
  investment?: Investment | null;
  onSave: (data: Omit<Investment, 'id'> | Investment) => void;
  onClose: () => void;
}

function InvestmentFormDialog({ investment, onSave, onClose }: InvestmentFormDialogProps) {
    const isEditing = !!investment;
    const [formData, setFormData] = useState<Partial<Investment>>({
        name: investment?.name || '',
        ticker: investment?.ticker || '',
        type: investment?.type || 'Stock',
        value: investment?.value || 0,
        quantity: investment?.quantity || undefined,
        purchasePrice: investment?.purchasePrice || undefined,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let processedValue: string | number | undefined = value;

        if (name === 'value' || name === 'quantity' || name === 'purchasePrice') {
            processedValue = value === '' ? undefined : parseFloat(value);
            if (processedValue !== undefined && isNaN(processedValue)) {
                processedValue = undefined; // Clear if not a valid number
            } else if (processedValue !== undefined && processedValue < 0) {
                 processedValue = 0; // Prevent negative numbers
            }
        }

        setFormData(prev => ({ ...prev, [name]: processedValue }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleTypeChange = (value: Investment['type']) => {
         setFormData(prev => ({ ...prev, type: value }));
         if (errors.type) {
            setErrors(prev => ({ ...prev, type: '' }));
         }
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name?.trim()) newErrors.name = "Investment name is required.";
        if (formData.value === undefined || formData.value <= 0) newErrors.value = "Current value must be greater than 0.";
        if (!formData.type) newErrors.type = "Investment type is required.";
        // Optional fields don't need strict validation unless both are present
        if ((formData.quantity !== undefined && formData.quantity <= 0) ) newErrors.quantity = "Quantity must be positive if entered.";
        if ((formData.purchasePrice !== undefined && formData.purchasePrice < 0)) newErrors.purchasePrice = "Purchase price cannot be negative.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            const saveData: Omit<Investment, 'id'> = {
                name: formData.name!,
                ticker: formData.ticker || undefined,
                type: formData.type!,
                value: formData.value!,
                quantity: formData.quantity,
                purchasePrice: formData.purchasePrice,
            };
             if (isEditing) {
                onSave({ ...investment, ...saveData });
             } else {
                onSave(saveData);
             }
        }
    };


  return (
    <DialogContent className="retro-window sm:max-w-[500px]">
      <DialogHeader className="retro-window-header !bg-primary !text-primary-foreground">
        <DialogTitle>{isEditing ? 'Edit Investment' : 'Add New Investment'}</DialogTitle>
        <DialogDescription className="!text-primary-foreground/80">
            {isEditing ? 'Update the details of your investment.' : 'Enter the details of your new investment.'}
        </DialogDescription>
        <div className="retro-window-controls">
            <span className="!bg-primary !border-primary-foreground"></span>
            <span className="!bg-primary !border-primary-foreground"></span>
             <DialogClose asChild>
                 <Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80" onClick={onClose}>
                    <X className="h-3 w-3"/>
                    <span className="sr-only">Close</span>
                 </Button>
             </DialogClose>
        </div>
      </DialogHeader>
      <div className="grid gap-4 p-4 retro-window-content !border-t-0">
         {/* Use grid layout for form */}
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
               <Label htmlFor="name">Name</Label>
               <Input id="name" name="name" value={formData.name} onChange={handleChange} className={cn("retro-input", errors.name && 'border-destructive focus:border-destructive focus:ring-destructive')} placeholder="e.g., Apple Inc." />
               {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1">
               <Label htmlFor="ticker">Ticker <span className="text-muted-foreground text-xs">(Optional)</span></Label>
               <Input id="ticker" name="ticker" value={formData.ticker} onChange={handleChange} className="retro-input" placeholder="e.g., AAPL" />
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
               <Label htmlFor="type">Type</Label>
               <Select name="type" value={formData.type} onValueChange={handleTypeChange}>
                    <SelectTrigger id="type" className={cn("retro-select-trigger", errors.type && 'border-destructive focus:border-destructive focus:ring-destructive')}>
                        <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="retro-select-content">
                        {investmentTypes.map(type => (
                           <SelectItem key={type} value={type} className="retro-select-item">{type}</SelectItem>
                        ))}
                    </SelectContent>
               </Select>
                {errors.type && <p className="text-xs text-destructive">{errors.type}</p>}
             </div>
             <div className="space-y-1">
               <Label htmlFor="value">Current Value ($)</Label>
               <Input id="value" name="value" type="number" min="0.01" step="0.01" value={formData.value ?? ''} onChange={handleChange} className={cn("retro-input", errors.value && 'border-destructive focus:border-destructive focus:ring-destructive')} placeholder="e.g., 5500.00" />
               {errors.value && <p className="text-xs text-destructive">{errors.value}</p>}
            </div>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
               <Label htmlFor="quantity">Quantity <span className="text-muted-foreground text-xs">(Optional)</span></Label>
               <Input id="quantity" name="quantity" type="number" step="any" value={formData.quantity ?? ''} onChange={handleChange} className={cn("retro-input", errors.quantity && 'border-destructive focus:border-destructive focus:ring-destructive')} placeholder="e.g., 25" />
                {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
            </div>
             <div className="space-y-1">
               <Label htmlFor="purchasePrice">Purchase Price / Unit <span className="text-muted-foreground text-xs">(Optional)</span></Label>
               <Input id="purchasePrice" name="purchasePrice" type="number" step="0.01" value={formData.purchasePrice ?? ''} onChange={handleChange} className={cn("retro-input", errors.purchasePrice && 'border-destructive focus:border-destructive focus:ring-destructive')} placeholder="e.g., 180.00" />
                {errors.purchasePrice && <p className="text-xs text-destructive">{errors.purchasePrice}</p>}
            </div>
         </div>
      </div>
      <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-3 !p-4">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="primary" onClick={handleSave}>
          {isEditing ? 'Save Changes' : 'Add Investment'}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
