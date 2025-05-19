
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast'; // Import useToast

interface Allocation {
  id: string;
  name: string;
  amount: number;
  target?: number;
}

interface WalletContextType {
  walletBalance: number;
  allocations: Record<string, Allocation>;
  totalLockedFunds: number;
  depositToAllocation: (allocationId: string, name: string, amount: number, target?: number) => boolean;
  withdrawFromAllocation: (allocationId: string, amount: number) => boolean;
  setInitialWalletBalance: (amount: number) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Initial mock data - this would ideally come from a backend or user setup
const initialAllocationsData: Record<string, Allocation> = {
  "1": { id: "1", name: "Dream Vacation Fund", amount: 0, target: 2000 },
  "emergencyFund": { id: "emergencyFund", name: "Emergency Safety Net", amount: 0, target: 5000 },
  "3": { id: "3", name: "Next-Gen Gaming Setup", amount: 0, target: 800 },
};


export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletBalance, setWalletBalance] = useState<number>(100); // Set initial demo balance to 100
  const [allocations, setAllocations] = useState<Record<string, Allocation>>(initialAllocationsData);
  const { toast } = useToast();

  const totalLockedFunds = React.useMemo(() => {
    return Object.values(allocations).reduce((sum, alloc) => sum + alloc.amount, 0);
  }, [allocations]);

  const setInitialWalletBalance = useCallback((amount: number) => {
    if (amount < 0) {
        toast({ title: "Error", description: "Initial balance cannot be negative.", variant: "destructive"});
        return;
    }
    setWalletBalance(amount);
    toast({ title: "Wallet Updated", description: `Wallet balance set to $${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`});
  }, [toast]);

  const depositToAllocation = useCallback((allocationId: string, name: string, amount: number, target?: number): boolean => {
    if (amount <= 0) {
        // Allow 0 amount deposit for just creating/updating target/name for an allocation
        if (amount < 0) {
            toast({ title: "Invalid Amount", description: "Deposit amount must be non-negative.", variant: "destructive"});
            return false;
        }
    }
    if (walletBalance < amount) {
      toast({ title: "Insufficient Funds", description: "Not enough funds in your main wallet for this deposit.", variant: "destructive"});
      return false;
    }

    setWalletBalance(prevBalance => prevBalance - amount);
    setAllocations(prevAllocations => {
      const existingAllocation = prevAllocations[allocationId];
      const newAmount = (existingAllocation?.amount || 0) + amount;
      return {
        ...prevAllocations,
        [allocationId]: {
          id: allocationId,
          name: existingAllocation?.name || name, // Use existing name if available, otherwise use provided name
          amount: newAmount,
          target: target !== undefined ? target : existingAllocation?.target, // Update target if provided
        },
      };
    });
     if (amount > 0) { // Only show toast if an actual deposit was made
         toast({ title: "Funds Deposited", description: `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} deposited to "${name}".` });
     }
    return true;
  }, [walletBalance, toast]);

  const withdrawFromAllocation = useCallback((allocationId: string, amount: number): boolean => {
    if (amount <= 0) {
        toast({ title: "Invalid Amount", description: "Withdrawal amount must be positive.", variant: "destructive"});
        return false;
    }
    const allocation = allocations[allocationId];
    if (!allocation || allocation.amount < amount) {
      toast({ title: "Insufficient Funds", description: `Not enough funds in "${allocation?.name || 'this allocation'}" to withdraw $${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`, variant: "destructive"});
      return false;
    }

    setWalletBalance(prevBalance => prevBalance + amount);
    setAllocations(prevAllocations => ({
      ...prevAllocations,
      [allocationId]: {
        ...prevAllocations[allocationId],
        amount: prevAllocations[allocationId].amount - amount,
      },
    }));
    toast({ title: "Funds Withdrawn", description: `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} withdrawn from "${allocation.name}".` });
    return true;
  }, [allocations, toast]);


  return (
    <WalletContext.Provider value={{ walletBalance, allocations, totalLockedFunds, depositToAllocation, withdrawFromAllocation, setInitialWalletBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

