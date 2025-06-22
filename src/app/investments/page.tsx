
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Landmark, TrendingUp, PlusCircle, Trash2, Edit, DollarSign, X, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useInvestments, useAddInvestment, useUpdateInvestment, useDeleteInvestment } from '@/hooks/use-investments';
import type { InvestmentSchema } from '@/lib/db-schemas';
import { Skeleton } from '@/components/ui/skeleton';


const investmentTypes: InvestmentSchema['type'][] = ['Stock', 'ETF', 'Mutual Fund', 'Crypto', 'Bond', 'Other'];

const chartColors = [
    "hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))",
    "hsl(var(--chart-4))", "hsl(var(--chart-5))", "hsl(var(--muted))",
];

export default function InvestmentsPage() {
  const { data: investments = [], isLoading, error } = useInvestments();
  const addInvestmentMutation = useAddInvestment();
  const updateInvestmentMutation = useUpdateInvestment();
  const deleteInvestmentMutation = useDeleteInvestment();
  const { toast } = useToast();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<InvestmentSchema | null>(null);

  const totalPortfolioValue = useMemo(() => investments.reduce((sum, item) => sum + item.value, 0), [investments]);

  const pieChartData = useMemo(() => investments.filter(item => item.value > 0).map((item, index) => ({
    name: item.ticker || item.name,
    value: item.value,
    fill: chartColors[index % chartColors.length],
  })), [investments]);

  const handleAddOrEditInvestment = (investmentData: Omit<InvestmentSchema, '_id'> | InvestmentSchema) => {
    if ('_id' in investmentData) {
      updateInvestmentMutation.mutate(investmentData as InvestmentSchema, {
        onSuccess: () => {
            toast({ title: "Investment Updated" });
            setIsAddDialogOpen(false);
            setEditingInvestment(null);
        },
        onError: (err) => toast({ title: "Update Failed", description: err.message, variant: "destructive"})
      });
    } else {
      addInvestmentMutation.mutate(investmentData as any, {
          onSuccess: () => {
              toast({ title: "Investment Added" });
              setIsAddDialogOpen(false);
          },
          onError: (err) => toast({ title: "Add Failed", description: err.message, variant: "destructive"})
      });
    }
  };

  const handleDeleteInvestment = (id: string) => {
    deleteInvestmentMutation.mutate(id, {
        onSuccess: () => toast({ title: "Investment Deleted" }),
        onError: (err) => toast({ title: "Delete Failed", description: err.message, variant: "destructive" })
    });
  };

  const openEditDialog = (investment: InvestmentSchema) => {
    setEditingInvestment(investment);
    setIsAddDialogOpen(true);
  };
  
  const onDialogClose = (open: boolean) => {
    if (!open) setEditingInvestment(null);
    setIsAddDialogOpen(open);
  }

  const calculateGainLoss = (investment: InvestmentSchema): number | null => {
      if (investment.purchasePrice && investment.quantity) {
          const costBasis = investment.purchasePrice * investment.quantity;
          return investment.value - costBasis;
      }
      return null;
  }
  
  const formatCurrency = (amount: number) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 pt-8">
         <h1 className="text-3xl font-semibold flex items-center gap-2"><Landmark className="h-7 w-7 text-primary" /> Investment Portfolio</h1>
         <div className="flex items-center gap-2">
            {/* Undo/Redo removed for DB state */}
            <Dialog open={isAddDialogOpen} onOpenChange={onDialogClose}>
               <DialogTrigger asChild><Button variant="primary"><PlusCircle className="mr-2 h-4 w-4" /> Add Investment</Button></DialogTrigger>
               <InvestmentFormDialog
                   key={editingInvestment?._id.toString() || 'add'}
                   investment={editingInvestment}
                   onSave={handleAddOrEditInvestment}
                   onClose={() => onDialogClose(false)}
                   isPending={addInvestmentMutation.isPending || updateInvestmentMutation.isPending}
               />
              </Dialog>
         </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[1fr_300px]">
        <Card className="retro-card">
            <CardHeader className="retro-card-header !bg-secondary !text-secondary-foreground"><CardTitle className="flex items-center gap-2 text-xl"><TrendingUp className="h-5 w-5" />Portfolio Allocation</CardTitle><div className="retro-window-controls"><span className="!bg-secondary !border-secondary-foreground"></span><span className="!bg-secondary !border-secondary-foreground"></span><span className="!bg-secondary !border-secondary-foreground"></span></div></CardHeader>
           <CardContent className="retro-card-content !border-t-0 pt-4">
             <div className="h-[300px] w-full mb-4">
                {isLoading ? <Skeleton className="h-full w-full rounded-full" /> : (
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={pieChartData} cx="50%" cy="50%" labelLine={false} outerRadius={110} innerRadius={55} fill="#8884d8" dataKey="value" nameKey="name">{pieChartData.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.fill} stroke={"hsl(var(--background))"} strokeWidth={1.5} className="focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1" />))}</Pie><RechartsTooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '2px solid hsl(var(--foreground))', fontFamily: 'var(--font-sans)', fontSize: '12px', boxShadow: 'none' }} itemStyle={{ color: 'hsl(var(--foreground))' }} formatter={(value: number) => formatCurrency(value)}/><Legend wrapperStyle={{ fontSize: '12px', paddingTop: '15px', fontFamily: 'var(--font-sans)' }} /></PieChart>
                 </ResponsiveContainer>
                )}
             </div>
             <div className="text-center text-lg font-semibold">Total Value: {isLoading ? <Skeleton className="h-6 w-40 inline-block"/> : formatCurrency(totalPortfolioValue)}</div>
          </CardContent>
        </Card>
        <Card className="retro-card">
           <CardHeader className="retro-card-header !bg-accent !text-accent-foreground"><CardTitle className="flex items-center gap-2 text-xl"><DollarSign className="h-5 w-5" />Key Metrics</CardTitle><div className="retro-window-controls"><span className="!bg-accent !border-accent-foreground"></span><span className="!bg-accent !border-accent-foreground"></span><span className="!bg-accent !border-accent-foreground"></span></div></CardHeader>
           <CardContent className="retro-card-content !border-t-0 space-y-4 pt-4">
                <div className="flex justify-between items-center border-b border-dashed pb-2">
                  <span className="text-muted-foreground text-sm">Total Value</span>
                  <span className="font-semibold text-lg">{isLoading ? <Skeleton className="h-5 w-24"/> : formatCurrency(totalPortfolioValue)}</span>
                </div>
                <div className="flex justify-between items-center border-b border-dashed pb-2">
                  <span className="text-muted-foreground text-sm">Number of Holdings</span>
                  <span className="font-semibold text-lg">{isLoading ? <Skeleton className="h-5 w-8"/> : investments.length}</span>
                </div>
           </CardContent>
         </Card>
      </div>

       <Card className="retro-card overflow-hidden">
          <CardHeader className="retro-card-header"><CardTitle className="text-xl">Investment Details</CardTitle><div className="retro-window-controls"><span></span><span></span><span></span></div></CardHeader>
        <CardContent className="retro-card-content !border-t-0 p-0">
          <div className="overflow-x-auto">
              <Table className="retro-table min-w-[800px]">
                 <TableHeader><TableRow><TableHead className="w-[200px]">Name</TableHead><TableHead>Ticker</TableHead><TableHead>Type</TableHead><TableHead className="text-right">Value</TableHead><TableHead className="text-right">Quantity</TableHead><TableHead className="text-right">Purchase Price</TableHead><TableHead className="text-right">Gain/Loss</TableHead><TableHead className="text-center w-[100px]">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {isLoading ? [...Array(5)].map((_, i) => (<TableRow key={i}><TableCell colSpan={8}><Skeleton className="h-6 w-full" /></TableCell></TableRow>))
                   : error ? <TableRow><TableCell colSpan={8} className="h-24 text-center text-destructive">Error loading investments.</TableCell></TableRow>
                   : investments.length === 0 ? <TableRow><TableCell colSpan={8} className="h-24 text-center text-muted-foreground italic">No investments added yet.</TableCell></TableRow>
                   : investments.map((inv) => {
                     const gainLoss = calculateGainLoss(inv);
                     return (
                      <TableRow key={inv._id.toString()}>
                         <TableCell className="font-medium">{inv.name}</TableCell>
                         <TableCell>{inv.ticker || 'N/A'}</TableCell>
                         <TableCell><Badge variant="secondary" className="retro-badge">{inv.type}</Badge></TableCell>
                         <TableCell className="text-right font-semibold">{formatCurrency(inv.value)}</TableCell>
                         <TableCell className="text-right">{inv.quantity?.toLocaleString() || 'N/A'}</TableCell>
                         <TableCell className="text-right">{inv.purchasePrice ? formatCurrency(inv.purchasePrice) : 'N/A'}</TableCell>
                         <TableCell className={cn("text-right font-medium", gainLoss === null ? 'text-muted-foreground' : gainLoss >= 0 ? 'text-green-500' : 'text-destructive' )}>{gainLoss === null ? 'N/A' : `${gainLoss >= 0 ? '+' : ''}${formatCurrency(gainLoss)}`}</TableCell>
                         <TableCell className="text-center">
                           <div className="flex justify-center items-center gap-1 p-0.5">
                               <Button variant="ghost" size="icon" className="h-7 w-7 !border-0 text-primary hover:bg-primary/10" onClick={() => openEditDialog(inv)}><Edit className="h-4 w-4"/><span className="sr-only">Edit</span></Button>
                                <AlertDialog><AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7 !border-0 text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4"/><span className="sr-only">Delete</span></Button></AlertDialogTrigger>
                                  <AlertDialogContent className="retro-window"><AlertDialogHeader className="retro-window-header !bg-destructive !text-destructive-foreground"><AlertDialogTitle>Delete Investment?</AlertDialogTitle><div className="retro-window-controls"><span></span><span></span></div></AlertDialogHeader><AlertDialogDescription className="retro-window-content !border-t-0 !pt-2">Are you sure you want to delete the "{inv.name}" investment?</AlertDialogDescription><AlertDialogFooter className="retro-window-content !pt-4 !border-t-0 !flex sm:justify-end gap-2"><AlertDialogCancel asChild><Button variant="outline">Cancel</Button></AlertDialogCancel><AlertDialogAction asChild><Button variant="destructive" onClick={() => handleDeleteInvestment(inv._id.toString())}>Delete</Button></AlertDialogAction></AlertDialogFooter></AlertDialogContent>
                                </AlertDialog>
                            </div>
                         </TableCell>
                      </TableRow>
                     );
                    })}
                </TableBody>
              </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface InvestmentFormDialogProps {
  investment?: InvestmentSchema | null;
  onSave: (data: Omit<InvestmentSchema, '_id'> | InvestmentSchema) => void;
  onClose: () => void;
  isPending: boolean;
}

function InvestmentFormDialog({ investment, onSave, onClose, isPending }: InvestmentFormDialogProps) {
    const isEditing = !!investment;
    const [formData, setFormData] = useState<Partial<InvestmentSchema>>({
        name: investment?.name || '',
        ticker: investment?.ticker || '',
        type: investment?.type || 'Stock',
        value: investment?.value || undefined,
        quantity: investment?.quantity || undefined,
        purchasePrice: investment?.purchasePrice || undefined,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let processedValue: string | number | undefined = value;
        if (['value', 'quantity', 'purchasePrice'].includes(name)) {
            processedValue = value === '' ? undefined : parseFloat(value);
            if (isNaN(processedValue as number)) processedValue = undefined;
            else if ((processedValue as number) < 0) processedValue = 0;
        }
        setFormData(prev => ({ ...prev, [name]: processedValue }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleTypeChange = (value: InvestmentSchema['type']) => {
         setFormData(prev => ({ ...prev, type: value }));
         if (errors.type) setErrors(prev => ({ ...prev, type: '' }));
    }

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name?.trim()) newErrors.name = "Name is required.";
        if (formData.value === undefined || (formData.value as number) <= 0) newErrors.value = "Value must be > 0.";
        if (!formData.type) newErrors.type = "Type is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateForm()) {
            if (isEditing) onSave({ ...investment, ...formData } as InvestmentSchema);
            else onSave(formData as Omit<InvestmentSchema, '_id'>);
        }
    };

  return (
    <DialogContent className="retro-window sm:max-w-[500px]">
      <DialogHeader className="retro-window-header !bg-primary !text-primary-foreground">
        <DialogTitle>{isEditing ? 'Edit Investment' : 'Add New Investment'}</DialogTitle>
        <DialogDescription className="!text-primary-foreground/80">{isEditing ? 'Update the details.' : 'Enter details of new investment.'}</DialogDescription>
        <div className="retro-window-controls"><span className="!bg-primary !border-primary-foreground"></span><span className="!bg-primary !border-primary-foreground"></span>
             <DialogClose asChild><Button variant="ghost" size="icon" className="h-4 w-4 p-0 !shadow-none !border-none !bg-destructive !text-destructive-foreground hover:!bg-destructive/80" onClick={onClose}><X className="h-3 w-3"/><span className="sr-only">Close</span></Button></DialogClose>
        </div>
      </DialogHeader>
      <div className="grid gap-4 p-4 retro-window-content !border-t-0">
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><Label htmlFor="name">Name</Label><Input id="name" name="name" value={formData.name} onChange={handleChange} className={cn("retro-input", errors.name && 'border-destructive')} placeholder="e.g., Apple Inc." />{errors.name && <p className="text-xs text-destructive">{errors.name}</p>}</div>
            <div className="space-y-1"><Label htmlFor="ticker">Ticker <span className="text-muted-foreground text-xs">(Opt.)</span></Label><Input id="ticker" name="ticker" value={formData.ticker} onChange={handleChange} className="retro-input" placeholder="e.g., AAPL" /></div>
         </div>
         <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1"><Label htmlFor="type">Type</Label><Select name="type" value={formData.type} onValueChange={handleTypeChange}><SelectTrigger id="type" className={cn("retro-select-trigger", errors.type && 'border-destructive')}><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent className="retro-select-content">{investmentTypes.map(type => (<SelectItem key={type} value={type} className="retro-select-item">{type}</SelectItem>))}</SelectContent></Select>{errors.type && <p className="text-xs text-destructive">{errors.type}</p>}</div>
             <div className="space-y-1"><Label htmlFor="value">Current Value ($)</Label><Input id="value" name="value" type="number" min="0.01" step="0.01" value={formData.value ?? ''} onChange={handleChange} className={cn("retro-input", errors.value && 'border-destructive')} placeholder="e.g., 5500.00" />{errors.value && <p className="text-xs text-destructive">{errors.value}</p>}</div>
         </div>
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><Label htmlFor="quantity">Quantity <span className="text-muted-foreground text-xs">(Opt.)</span></Label><Input id="quantity" name="quantity" type="number" step="any" value={formData.quantity ?? ''} onChange={handleChange} className="retro-input" placeholder="e.g., 25" /></div>
            <div className="space-y-1"><Label htmlFor="purchasePrice">Purchase Price / Unit <span className="text-muted-foreground text-xs">(Opt.)</span></Label><Input id="purchasePrice" name="purchasePrice" type="number" step="0.01" value={formData.purchasePrice ?? ''} onChange={handleChange} className="retro-input" placeholder="e.g., 180.00" /></div>
         </div>
      </div>
      <DialogFooter className="retro-window-content !border-t-0 !flex sm:justify-end gap-3 !p-4">
        <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="primary" onClick={handleSave} disabled={isPending}>{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{isEditing ? 'Save Changes' : 'Add Investment'}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
